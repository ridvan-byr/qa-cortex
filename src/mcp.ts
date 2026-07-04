#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { ReviewPipeline } from "./core/ReviewPipeline.js";
import { BenchmarkRunner } from "./evaluation/BenchmarkRunner.js";
import { GeminiProvider } from "./reviewer/GeminiProvider.js";
import { Scanner } from "./core/Scanner.js";
import * as fs from 'fs';
import * as path from 'path';

// Load app version from package.json dynamically
let appVersion = "0.1.0";
try {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    appVersion = packageJson.version || "0.1.0";
  }
} catch (err) {
  // Fail silently, fallback to default version
}

const server = new Server({
  name: "qa-brain-mcp",
  version: appVersion
}, {
  capabilities: {
    tools: {}
  }
});

// Register tools with rich descriptions for AI agents
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "review_file",
        description: "Runs a repository-aware AI review on a single Playwright test file. Validates CSS/XPath locator resilience, Page Object Model (POM) encapsulation, wait strategy usage, and test isolation. Returns a detailed JSON report including evidence, severity, and recommendations.",
        inputSchema: {
          type: "object",
          properties: {
            filePath: {
              type: "string",
              description: "Absolute path to the Playwright spec/test file (e.g. C:/project/tests/login.spec.ts)"
            }
          },
          required: ["filePath"]
        }
      },
      {
        name: "review_repository",
        description: "Scans a test directory recursively for Playwright tests, runs reviews, and outputs a Quality/Risk repository summary. Automatically ignores node_modules/dist/.git and matches optional ignore patterns.",
        inputSchema: {
          type: "object",
          properties: {
            dirPath: {
              type: "string",
              description: "Absolute path to the test directory to scan recursively"
            },
            maxFiles: {
              type: "number",
              description: "Maximum number of spec files to analyze in this run to optimize execution time (default: 30)"
            },
            ignorePatterns: {
              type: "array",
              items: { type: "string" },
              description: "List of glob patterns to exclude from analysis (e.g. ['**/generated/**', '**/fixtures/**'])"
            }
          },
          required: ["dirPath"]
        }
      },
      {
        name: "run_benchmark",
        description: "Runs the built-in QA Brain calibration suite against local ground truth specs. Verifies engine accuracy by calculating Precision, Recall, and checking for regressions.",
        inputSchema: {
          type: "object",
          properties: {}
        }
      }
    ]
  };
});

// Call tools implementation
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const provider = new GeminiProvider(); // Uses standard process.env.GEMINI_API_KEY if present

  try {
    switch (name) {
      case "review_file": {
        const filePath = path.resolve(args?.filePath as string);
        if (!fs.existsSync(filePath)) {
          throw new Error(`File does not exist: ${filePath}`);
        }
        
        const pipeline = new ReviewPipeline(".", provider);
        const { result } = await pipeline.runPipeline(filePath);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
        };
      }
      
      case "review_repository": {
        const dirPath = path.resolve(args?.dirPath as string);
        if (!fs.existsSync(dirPath)) {
          throw new Error(`Directory does not exist: ${dirPath}`);
        }

        const maxFiles = (args?.maxFiles as number) || 30;
        const ignorePatterns = (args?.ignorePatterns as string[]) || [];

        const files = Scanner.scanDirectory(dirPath, ignorePatterns);
        const pipeline = new ReviewPipeline(".", provider);
        const summary = await Scanner.runScan(files, pipeline, { maxFiles, ignorePatterns });

        return {
          content: [{ type: "text", text: JSON.stringify(summary, null, 2) }]
        };
      }

      case "run_benchmark": {
        const results = await BenchmarkRunner.runAll();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      isError: true,
      content: [{ type: "text", text: `Error executing tool ${name}: ${error.message}` }]
    };
  }
});

// Start MCP Sunucusu
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("QA Brain MCP Server running on stdio");
}

main().catch((error) => {
  console.error("MCP Server failed to start:", error);
  process.exit(1);
});

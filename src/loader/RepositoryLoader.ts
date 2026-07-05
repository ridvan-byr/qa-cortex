import * as fs from 'fs';
import * as path from 'path';

export class RepositoryLoader {
  constructor(private rootPath: string) {}

  /**
   * Reads a file raw content from the repository path.
   */
  public readRawFile(relativeFilePath: string): string | null {
    const fullPath = path.resolve(this.rootPath, relativeFilePath);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      return fs.readFileSync(fullPath, 'utf8');
    }
    return null;
  }

  /**
   * Checks if a directory exists in the repository.
   */
  public directoryExists(relativeDirPath: string): boolean {
    const fullPath = path.resolve(this.rootPath, relativeDirPath);
    return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
  }

  /**
   * Scans a directory recursively for files matching the given extension.
   */
  public scanDirectory(relativeDirPath: string, match: string | string[] = '.ts'): string[] {
    const files: string[] = [];
    const fullPath = path.resolve(this.rootPath, relativeDirPath);
    if (!fs.existsSync(fullPath)) return [];

    const allowed = Array.isArray(match) ? match : [match];

    const traverse = (currentDir: string) => {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const resolvedPath = path.resolve(currentDir, entry.name);
        if (entry.isDirectory()) {
          traverse(resolvedPath);
        } else if (entry.isFile() && allowed.some(ext => entry.name.endsWith(ext))) {
          files.push(path.relative(this.rootPath, resolvedPath));
        }
      }
    };

    traverse(fullPath);
    return files;
  }
}

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.resolve(__dirname, 'repos');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Find all repositories*.json configuration files in the validation directory
const files = fs.readdirSync(__dirname);
const configFiles = files.filter(f => f.startsWith('repositories') && f.endsWith('.json'));

console.log(`Found configurations: ${configFiles.join(', ')}`);

for (const configFile of configFiles) {
  const configPath = path.join(__dirname, configFile);
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log(`\nProcessing config: ${configFile}`);
  if (!config.repositories || !Array.isArray(config.repositories)) {
    continue;
  }

  for (const repo of config.repositories) {
    if (!repo.url) {
      console.log(`[Skip] ${repo.name} has no URL.`);
      continue;
    }

    // Resolve local directory path relative to targetDir
    const relativeToTarget = path.relative(targetDir, path.resolve(repo.localPath));
    const repoFolder = relativeToTarget.split(path.sep)[0];
    const clonePath = path.join(targetDir, repoFolder);

    if (fs.existsSync(clonePath)) {
      console.log(`[Exists] ${repo.name} already cloned at ${clonePath}`);
      continue;
    }

    console.log(`[Cloning] ${repo.name} (${repo.url}) to ${clonePath}...`);
    try {
      execSync(`git clone ${repo.url} "${clonePath}" --depth 1`, { stdio: 'inherit' });
      console.log(`✓ Successfully cloned ${repo.name}`);
    } catch (error) {
      console.error(`✗ Failed to clone ${repo.name}:`, error.message);
    }
  }
}

console.log('\nAll repositories processed.');

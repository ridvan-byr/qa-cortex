const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const configPath = path.resolve(__dirname, 'repositories.json');
if (!fs.existsSync(configPath)) {
  console.error(`Config file not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const targetDir = path.resolve(__dirname, 'repos');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log(`Cloning validation repositories into ${targetDir}...`);

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

console.log('\nAll repositories cloned. You can now run the validation suite.');

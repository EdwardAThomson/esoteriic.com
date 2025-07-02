const chokidar = require('chokidar');
const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

// Paths
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

// Express server for local development
const app = express();
const PORT = 3000;

// Serve files from dist directory
app.use(express.static(distDir));
app.use(express.static(path.join(__dirname, '../node_modules')));

// For SPAs - redirect all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Development server running at http://localhost:${PORT}`);
});

// Run initial build
console.log('Running initial build...');
const initialBuild = spawn('node', [path.join(__dirname, 'build.js')], {
  stdio: 'inherit'
});

initialBuild.on('close', (code) => {
  if (code !== 0) {
    console.error('Initial build failed');
    return;
  }
  
  console.log('Watching for changes...');
  
  // Watch for changes in the src directory
  const watcher = chokidar.watch(srcDir, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });
  
  // Rebuild on changes
  watcher.on('change', (filePath) => {
    console.log(`File ${filePath} changed. Rebuilding...`);
    const rebuild = spawn('node', [path.join(__dirname, 'build.js')], {
      stdio: 'inherit'
    });
    
    rebuild.on('close', (code) => {
      if (code !== 0) {
        console.error('Rebuild failed');
        return;
      }
      console.log('Rebuild completed successfully!');
    });
  });
}); 
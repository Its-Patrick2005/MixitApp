#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Set environment variables to avoid ES module issues
process.env.NODE_OPTIONS = '--experimental-loader @babel/register';
process.env.EXPO_USE_DEV_SERVER = 'true';

// Start expo with legacy mode
const expoProcess = spawn('npx', ['expo', 'start', '--clear', '--no-dev'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

expoProcess.on('error', (error) => {
  console.error('Failed to start Expo:', error);
  process.exit(1);
});

expoProcess.on('close', (code) => {
  console.log(`Expo process exited with code ${code}`);
  process.exit(code);
}); 
const { spawn } = require('child_process');
const path = require('path');

// Set environment variables for legacy compatibility
process.env.NODE_OPTIONS = '--experimental-loader @babel/register --max-old-space-size=4096';
process.env.EXPO_USE_LEGACY_MODULES = 'true';

// Force CommonJS mode
process.env.EXPO_USE_COMMONJS = 'true';

console.log('Starting Expo with legacy compatibility mode...');
console.log('Node.js version:', process.version);
console.log('NODE_OPTIONS:', process.env.NODE_OPTIONS);

// Start expo with legacy flags
const expo = spawn('npx', ['expo', 'start', '--clear', '--no-dev'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: process.env.NODE_OPTIONS,
    EXPO_USE_LEGACY_MODULES: 'true',
    EXPO_USE_COMMONJS: 'true'
  }
});

expo.on('error', (error) => {
  console.error('Failed to start expo:', error);
  console.log('Trying alternative approach...');
  
  // Try alternative approach
  const altExpo = spawn('npx', ['expo', 'start', '--clear', '--no-dev', '--tunnel'], {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096',
      EXPO_USE_LEGACY_MODULES: 'true'
    }
  });
  
  altExpo.on('error', (altError) => {
    console.error('Alternative approach also failed:', altError);
    console.log('Please install Node.js 20.x LTS to resolve this issue.');
  });
});

expo.on('close', (code) => {
  console.log(`Expo process exited with code ${code}`);
}); 
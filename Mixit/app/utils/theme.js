// Theme configuration for light and dark modes
export const lightTheme = {
  // Background colors
  primaryBackground: '#D9ECD9',
  secondaryBackground: '#ffffff',
  tertiaryBackground: '#f8f9fa',
  cardBackground: '#ffffff',
  modalBackground: '#ffffff',
  
  // Text colors
  primaryText: '#003A00',
  secondaryText: '#666666',
  tertiaryText: '#888888',
  inverseText: '#ffffff',
  
  // Green colors (existing app colors)
  primaryGreen: '#008000',
  secondaryGreen: '#B0D8B0',
  lightGreen: '#e8f5e8',
  darkGreen: '#003A00',
  
  // Status colors
  success: '#008000',
  error: '#ff6b6b',
  warning: '#ffa500',
  
  // Border colors
  border: '#B0D8B0',
  borderLight: '#e9ecef',
  borderDark: '#003A00',
  
  // Shadow colors
  shadow: '#003A00',
  
  // Map colors
  mapBackground: '#f8f9fa',
  routeColor: '#008000',
  
  // Input colors
  inputBackground: '#ffffff',
  inputBorder: '#B0D8B0',
  inputPlaceholder: '#888888',
  
  // Button colors
  buttonPrimary: '#008000',
  buttonSecondary: '#B0D8B0',
  buttonDisabled: '#cccccc',
  
  // Navigation colors
  navBackground: '#ffffff',
  navActive: '#008000',
  navInactive: '#003A00',
};

export const darkTheme = {
  // Background colors
  primaryBackground: '#0a0a0a',
  secondaryBackground: '#1a1a1a',
  tertiaryBackground: '#2a2a2a',
  cardBackground: '#1a1a1a',
  modalBackground: '#1a1a1a',
  
  // Text colors
  primaryText: '#ffffff',
  secondaryText: '#cccccc',
  tertiaryText: '#999999',
  inverseText: '#0a0a0a',
  
  // Green colors (adapted for dark mode)
  primaryGreen: '#4CAF50',
  secondaryGreen: '#2E7D32',
  lightGreen: '#1B5E20',
  darkGreen: '#81C784',
  
  // Status colors
  success: '#4CAF50',
  error: '#f44336',
  warning: '#ff9800',
  
  // Border colors
  border: '#2E7D32',
  borderLight: '#424242',
  borderDark: '#4CAF50',
  
  // Shadow colors
  shadow: '#000000',
  
  // Map colors
  mapBackground: '#1a1a1a',
  routeColor: '#4CAF50',
  
  // Input colors
  inputBackground: '#2a2a2a',
  inputBorder: '#2E7D32',
  inputPlaceholder: '#666666',
  
  // Button colors
  buttonPrimary: '#4CAF50',
  buttonSecondary: '#2E7D32',
  buttonDisabled: '#424242',
  
  // Navigation colors
  navBackground: '#1a1a1a',
  navActive: '#4CAF50',
  navInactive: '#cccccc',
};

// Default export for compatibility
export default { lightTheme, darkTheme }; 

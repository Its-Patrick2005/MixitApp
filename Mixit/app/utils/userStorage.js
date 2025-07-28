import AsyncStorage from '@react-native-async-storage/async-storage';

// Get the current user's email from AsyncStorage
const getCurrentUserEmail = async () => {
  try {
    const email = await AsyncStorage.getItem('profileUsername');
    return email || 'anonymous';
  } catch (error) {
    console.log('Error getting current user email:', error);
    return 'anonymous';
  }
};

// Create a user-specific storage key
const getUserSpecificKey = async (baseKey) => {
  const userEmail = await getCurrentUserEmail();
  return `${userEmail}_${baseKey}`;
};

// User-specific storage functions
export const userStorage = {
  // Get user-specific data
  async getItem(key) {
    try {
      const userKey = await getUserSpecificKey(key);
      const value = await AsyncStorage.getItem(userKey);
      return value;
    } catch (error) {
      console.log('Error getting user-specific item:', error);
      return null;
    }
  },

  // Set user-specific data
  async setItem(key, value) {
    try {
      const userKey = await getUserSpecificKey(key);
      await AsyncStorage.setItem(userKey, value);
    } catch (error) {
      console.log('Error setting user-specific item:', error);
    }
  },

  // Remove user-specific data
  async removeItem(key) {
    try {
      const userKey = await getUserSpecificKey(key);
      await AsyncStorage.removeItem(userKey);
    } catch (error) {
      console.log('Error removing user-specific item:', error);
    }
  },

  // Clear all data for current user
  async clearUserData() {
    try {
      const userEmail = await getCurrentUserEmail();
      const keys = await AsyncStorage.getAllKeys();
      const userKeys = keys.filter(key => key.startsWith(`${userEmail}_`));
      await AsyncStorage.multiRemove(userKeys);
    } catch (error) {
      console.log('Error clearing user data:', error);
    }
  },

  // Get all keys for current user
  async getUserKeys() {
    try {
      const userEmail = await getCurrentUserEmail();
      const keys = await AsyncStorage.getAllKeys();
      return keys.filter(key => key.startsWith(`${userEmail}_`));
    } catch (error) {
      console.log('Error getting user keys:', error);
      return [];
    }
  }
};

// Migration function to move existing data to user-specific storage
export const migrateToUserSpecificStorage = async () => {
  try {
    const userEmail = await getCurrentUserEmail();
    if (userEmail === 'anonymous') return; // Don't migrate for anonymous users

    const keysToMigrate = [
      'cookbooks',
      'mealPlanData',
      'groceryItems',
      'savedMarketRecipes'
    ];

    for (const key of keysToMigrate) {
      const oldValue = await AsyncStorage.getItem(key);
      if (oldValue) {
        // Move to user-specific storage
        await userStorage.setItem(key, oldValue);
        // Remove from global storage
        await AsyncStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.log('Error migrating to user-specific storage:', error);
  }
}; 
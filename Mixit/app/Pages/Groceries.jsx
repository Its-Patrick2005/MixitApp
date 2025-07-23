import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../theme.jsx';

const Groceries = () => {
  const { theme } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, color: theme.primaryText }}>Groceries</Text>
    </View>
  )
}

export default Groceries

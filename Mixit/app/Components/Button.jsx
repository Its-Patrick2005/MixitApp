import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from '../theme.jsx';

const Button = ({ title, onPress }) => {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.primaryGreen,
        paddingHorizontal: '30%',
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 16,
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      onPress={onPress}
    >
      <Text style={{ 
        color: 'white', 
        fontSize: 18, 
        fontWeight: '600', 
        textAlign: 'center' 
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

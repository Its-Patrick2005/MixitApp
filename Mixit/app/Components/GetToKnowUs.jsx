import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '../theme.jsx';

const GetToKnowUs = ({ name, icon, selectedOptions, setSelectedOptions }) => {
  const { theme } = useTheme();
  
  const handlePressIn = () => {
    // Add press in animation if needed
  };

  const handlePressOut = () => {
    // Add press out animation if needed
  };

  const handlePress = () => {
    if (selectedOptions.includes(name)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== name));
    } else {
      setSelectedOptions([...selectedOptions, name]);
    }
  };

  const isSelected = selectedOptions.includes(name);

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={{
        backgroundColor: isSelected ? theme.lightGreen : theme.cardBackground,
        borderWidth: 1,
        borderColor: isSelected ? theme.primaryGreen : theme.border,
        borderRadius: 12,
        padding: 20,
        minHeight: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {icon && <View style={{ marginRight: 16 }}>{icon}</View>}
      <Text style={{ color: theme.primaryText }}>{name}</Text>
      <View style={{ marginLeft: 16 }}>
        {isSelected && <Text>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default GetToKnowUs;

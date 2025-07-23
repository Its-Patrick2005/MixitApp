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
        flexDirection: "row",
        alignItems: "center",
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isSelected ? 0.2 : 0.1,
        shadowRadius: 4,
        elevation: isSelected ? 4 : 2,
        minHeight: 60,
        width: '100%',
      }}
    >
      {icon && <View style={{ marginRight: 16, minWidth: 24 }}>{icon}</View>}
      <Text
        style={{
          fontSize: 16,
          fontWeight: isSelected ? "600" : "400",
          color: isSelected ? theme.primaryGreen : theme.primaryText,
          flex: 1,
          textAlign: 'left',
        }}
      >
        {name}
      </Text>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: isSelected ? theme.primaryGreen : theme.borderLight,
          backgroundColor: isSelected ? theme.primaryGreen : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 12,
        }}
      >
        {isSelected && (
          <Text style={{ color: theme.inverseText, fontSize: 12, fontWeight: 'bold' }}>
            ✓
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default GetToKnowUs;

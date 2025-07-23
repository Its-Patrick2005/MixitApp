import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '../theme.jsx';
import ImportPopUp from "./ImportPopUp";

const ImportTab = ({ currentPage = "Home" }) => {
  const navigation = useNavigation();
  const [showImportPopup, setShowImportPopup] = useState(false);
  const { theme } = useTheme();

  const getTabStyle = (pageName) => {
    const isActive = currentPage === pageName;
    return {
      container: {
        alignItems: 'center',
        transform: [{ scale: isActive ? 1.1 : 1 }],
      },
      icon: isActive ? theme.primaryGreen : theme.navInactive,
      text: {
        fontSize: 14,
        marginTop: 8,
        color: isActive ? theme.primaryGreen : theme.navInactive,
        fontWeight: isActive ? 'bold' : 'normal',
      }
    };
  };

  const handleWriteFromScratch = () => {
    try {
      setShowImportPopup(false);
      navigation.navigate("UserInput");
    } catch (error) {
      Alert.alert('Error', 'Failed to open recipe editor. Please try again.');
    }
  };

  const handleAddButtonPress = () => {
    try {
      setShowImportPopup(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to open import options. Please try again.');
    }
  };

  const handleCloseImportPopup = () => {
    try {
      setShowImportPopup(false);
    } catch (error) {
    }
  };

  const handleNavigation = (routeName) => {
    try {
      navigation.navigate(routeName);
    } catch (error) {
      Alert.alert('Error', `Failed to navigate to ${routeName}. Please try again.`);
    }
  };

  return (
    <>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 24, 
        position: 'relative',
        backgroundColor: !theme.isDarkMode && theme.lightGreen ? theme.lightGreen : theme.navBackground,
        borderTopWidth: 1,
        borderTopColor: theme.borderLight,
      }}>
        <TouchableOpacity 
          style={getTabStyle("Home").container}
          onPress={() => handleNavigation("Home")} 
        >
          <Foundation name="home" size={30} color={getTabStyle("Home").icon} />
          <Text style={getTabStyle("Home").text}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={getTabStyle("Recipe").container}
          onPress={() => handleNavigation("Recipe")}
        >
          <Ionicons name="receipt-outline" size={30} color={getTabStyle("Recipe").icon} />
          <Text style={getTabStyle("Recipe").text}>Recipes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{ 
            alignItems: 'center', 
            position: 'absolute', 
            top: -32, 
            left: '55%', 
            transform: [{ translateX: -35 }] 
          }}
          onPress={handleAddButtonPress}
        >
          <Ionicons name="add-circle-sharp" size={70} color={theme.primaryGreen} />
          {/* <Text style={{ fontSize: 14, color: theme.primaryText }}>Add</Text> */}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={getTabStyle("MealPlan").container}
          onPress={() => handleNavigation("MealPlan")}
        >
          <MaterialIcons name="schedule" size={30} color={getTabStyle("MealPlan").icon} />
          <Text style={getTabStyle("MealPlan").text}>Schedule</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={getTabStyle("Groceries").container}
          onPress={() => handleNavigation("Groceries")}
        >
          <MaterialIcons name="local-grocery-store" size={30} color={getTabStyle("Groceries").icon} />
          <Text style={getTabStyle("Groceries").text}>Store</Text>
        </TouchableOpacity>
      </View>
      <ImportPopUp 
        visible={showImportPopup} 
        onClose={handleCloseImportPopup} 
        onWriteFromScratch={handleWriteFromScratch}
      />
    </>
  );
};

export default ImportTab;

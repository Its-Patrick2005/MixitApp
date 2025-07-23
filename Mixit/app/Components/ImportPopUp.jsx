import { Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import foodList from "../FoodData";
import { useTheme } from '../theme.jsx';
import FoodScanner from './FoodScanner';

const ImportPopUp = ({ visible, onClose, onWriteFromScratch }) => {
  const navigation = useNavigation();
  const [pasteModalVisible, setPasteModalVisible] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [pasteError, setPasteError] = useState("");
  const [scannerVisible, setScannerVisible] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const { theme } = useTheme();

  // Handle paste text search
  const handlePasteSubmit = () => {
    
    if (!pasteText.trim()) {
      setPasteError("Please enter a recipe name");
      return;
    }

    const searchTerm = pasteText.trim().toLowerCase();
    
    // Enhanced search algorithm
    const found = foodList.find(food => {
      const foodName = food.name.toLowerCase();
      const searchWords = searchTerm.split(' ');
      const foodWords = foodName.split(' ');
      
      // Exact match
      if (foodName === searchTerm) return true;
      
      // Contains match
      if (foodName.includes(searchTerm) || searchTerm.includes(foodName)) return true;
      
      // Word-by-word match
      return searchWords.some(searchWord => 
        foodWords.some(foodWord => 
          foodWord.includes(searchWord) || searchWord.includes(foodWord)
        )
      );
    });

    if (found) {
      setPasteModalVisible(false);
      setPasteText("");
      setPasteError("");
      
      // Navigate to MealCard
      navigation.navigate("MealCard", { 
        food: {
          id: found.id,
          name: found.name,
          image: found.image,
          rating: found.rating,
          ingredients: found.ingredients,
          method: found.method,
          funFact: found.funFact
        }
      });
    } else {
      setPasteError(`Recipe "${pasteText}" not found. Try: Pancakes, Omelette, French Toast`);
    }
  };

  // Handle food detected from scanner
  const handleFoodDetected = (detectedFood) => {
    // Reset scanner state
    setScannerVisible(false);
    setCapturedImageUri(null);
    // Navigate to MealCard
    navigation.navigate("MealCard", { food: detectedFood });
  };

  // Handle camera press - directly open camera
  const handleCameraPress = async () => {
    try {
      
      // Reset any previous state first
      setCapturedImageUri(null);
      setScannerVisible(false);
      
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Please allow camera access in your device settings to scan food items.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => {
            }}
          ]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets[0] && result.assets[0].uri) {
        
        // Set the captured image first
        setCapturedImageUri(result.assets[0].uri);
        
        // Open scanner immediately
        setScannerVisible(true);
        
        // Close the import popup immediately
        onClose();
        
      } else {
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open camera. Please try again.');
    }
  };

  // Handle scanner close
  const handleScannerClose = () => {
    setScannerVisible(false);
    setCapturedImageUri(null);
  };

  // Handle write from scratch
  const handleWriteFromScratch = () => {
    onClose();
    navigation.navigate("UserInput");
  };

  // Handle paste text - navigate to RecipeSearch page
  const handlePasteText = () => {
    onClose();
    navigation.navigate("RecipeSearch");
  };

  // Handle main popup close
  const handleClose = () => {
    setPasteModalVisible(false);
    setPasteText("");
    setPasteError("");
    setScannerVisible(false);
    onClose();
  };

  return (
    <>
      {/* Main Import Popup Modal */}
      {visible && (
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={handleClose}
        >
          <View style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <View style={{
              backgroundColor: theme.modalBackground,
              borderRadius: 20,
              padding: 24,
              width: "90%",
              alignItems: "center",
              shadowColor: theme.shadow,
              shadowOpacity: 0.3,
              shadowRadius: 15,
              elevation: 15
            }}>
              {/* Close Button */}
              <TouchableOpacity
                style={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}
                onPress={handleClose}
              >
                <Ionicons name="close" size={28} color={theme.primaryText} />
              </TouchableOpacity>
              
              <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 24, color: theme.primaryText }}>
                Import Recipe
              </Text>
              
              {/* Import Options */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 24 }}>
                {/* Browser Option */}
                <TouchableOpacity style={{ alignItems: "center", flex: 1 }}>
                  <Foundation name="trees" size={32} color={theme.primaryGreen} />
                  <Text style={{ color: theme.primaryGreen, fontWeight: "bold", marginTop: 8 }}>Browser</Text>
                </TouchableOpacity>
                
                {/* Camera Option */}
                <TouchableOpacity 
                  style={{ alignItems: "center", flex: 1 }} 
                  onPress={handleCameraPress}
                  activeOpacity={0.7}
                >
                  <Ionicons name="camera-outline" size={32} color={theme.primaryGreen} />
                  <Text style={{ color: theme.primaryGreen, fontWeight: "bold", marginTop: 8 }}>Camera</Text>
                </TouchableOpacity>
                
                {/* Paste Text Option */}
                <TouchableOpacity 
                  style={{ alignItems: "center", flex: 1 }} 
                  onPress={handlePasteText}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="content-paste" size={32} color={theme.primaryGreen} />
                  <Text style={{ color: theme.primaryGreen, fontWeight: "bold", marginTop: 8 }}>Paste Text</Text>
                </TouchableOpacity>
              </View>
              
              {/* Write From Scratch Option */}
              <TouchableOpacity
                onPress={handleWriteFromScratch}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: theme.tertiaryBackground,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme.borderLight,
                  width: "100%",
                  marginBottom: 16,
                  paddingHorizontal: 12,
                  height: 40
                }}
                activeOpacity={0.7}
              >
                <MaterialIcons name="edit" size={20} color={theme.primaryText} />
                <Text style={{
                  flex: 1,
                  marginLeft: 8,
                  color: theme.primaryText,
                  fontSize: 16,
                  opacity: 0.7
                }}>
                  Write From Scratch
                </Text>
              </TouchableOpacity>
              
              {/* Decorative line */}
              <View style={{
                height: 4,
                width: "60%",
                backgroundColor: theme.primaryGreen,
                borderRadius: 2,
                marginTop: 8
              }} />
            </View>
          </View>
        </Modal>
      )}

      {/* Food Scanner Modal - Always rendered */}
      <FoodScanner
        visible={scannerVisible}
        onClose={handleScannerClose}
        onFoodDetected={handleFoodDetected}
        capturedImageUri={capturedImageUri}
      />

      {/* Paste Text Modal */}
      <Modal
        visible={pasteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPasteModalVisible(false)}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: "rgba(0,0,0,0.5)", 
          justifyContent: "center", 
          alignItems: "center" 
        }}>
          <View style={{ 
            backgroundColor: theme.modalBackground, 
            borderRadius: 20, 
            padding: 24, 
            width: '90%', 
            alignItems: 'center', 
            shadowColor: theme.shadow, 
            shadowOpacity: 0.3, 
            shadowRadius: 15, 
            elevation: 15 
          }}>
            {/* Close Button */}
            <TouchableOpacity
              style={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}
              onPress={() => {
                setPasteModalVisible(false);
                setPasteText("");
                setPasteError("");
              }}
            >
              <Ionicons name="close" size={28} color={theme.primaryText} />
            </TouchableOpacity>
            
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 16, color: theme.primaryText }}>
              Search Recipe
            </Text>
            
            <Text style={{ fontSize: 14, color: theme.secondaryText, marginBottom: 16, textAlign: 'center' }}>
              Type the name of a recipe to find it in our database
            </Text>
            
            <Text style={{ fontSize: 12, color: theme.tertiaryText, marginBottom: 16, textAlign: 'center' }}>
              Try: Pancakes, Omelette, French Toast, Caesar Salad, Grilled Salmon, Chocolate Cake
            </Text>
            
            {/* Search Input */}
            <TextInput
              placeholder="Type recipe name..."
              value={pasteText}
              onChangeText={(text) => {
                setPasteText(text);
                setPasteError(""); // Clear error when user types
              }}
              style={{ 
                borderWidth: 1, 
                borderColor: pasteError ? theme.error : theme.borderLight, 
                borderRadius: 8, 
                padding: 12, 
                width: "100%", 
                marginBottom: 12, 
                fontSize: 16,
                backgroundColor: theme.inputBackground,
                color: theme.primaryText,
              }}
              placeholderTextColor={theme.inputPlaceholder}
              autoFocus
              autoCapitalize="words"
              autoCorrect={false}
            />
            
            {/* Error Message */}
            {pasteError ? (
              <Text style={{ color: theme.error, marginBottom: 8, textAlign: 'center', fontSize: 14 }}>
                {pasteError}
              </Text>
            ) : null}
            
            {/* Action Buttons */}
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8, width: '100%' }}>
              <TouchableOpacity
                onPress={handlePasteSubmit}
                disabled={!pasteText.trim()}
                style={{ 
                  backgroundColor: pasteText.trim() ? theme.primaryGreen : theme.buttonDisabled, 
                  borderRadius: 8, 
                  paddingVertical: 12, 
                  paddingHorizontal: 24,
                  flex: 1,
                  alignItems: 'center'
                }}
                activeOpacity={0.7}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                  Search Recipe
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* Cancel Button */}
            <TouchableOpacity 
              onPress={() => { 
                setPasteModalVisible(false); 
                setPasteText(""); 
                setPasteError(""); 
              }}
              activeOpacity={0.7}
            >
              <Text style={{ color: theme.tertiaryText, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ImportPopUp;

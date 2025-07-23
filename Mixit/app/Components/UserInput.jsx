import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ingredientsData from '../Ingredients';
import { useTheme } from '../theme.jsx';

const UserInput = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(['']);
  const [methods, setMethods] = useState(['']);
  const [notes, setNotes] = useState('');
  const [cookbookPopupVisible, setCookbookPopupVisible] = useState(false);
  const [selectedCookbook, setSelectedCookbook] = useState(null);
  const [cookbooks, setCookbooks] = useState([]);
  const [showCreateCookbook, setShowCreateCookbook] = useState(false);
  const [newCookbookName, setNewCookbookName] = useState('');
  const ingredientRefs = useRef([]);
  const methodRefs = useRef([]);
  const { theme, isDarkMode } = useTheme();

  // Load cookbooks on mount
  React.useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('cookbooks');
      if (saved) setCookbooks(JSON.parse(saved));
    })();
  }, []);

  // Utility: flatten all ingredients into a single array
  const allIngredients = Object.values(ingredientsData).flat();

  // Utility: simple string similarity (Levenshtein distance)
  function getLevenshtein(a, b) {
    if (!a || !b) return Math.max(a?.length || 0, b?.length || 0);
    const matrix = Array.from({ length: a.length + 1 }, () => []);
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + 1
          );
        }
      }
    }
    return matrix[a.length][b.length];
  }

  // Utility: find best match for a user input
  function findBestIngredientMatch(input) {
    if (!input.trim()) return null;
    let best = null;
    let minDist = Infinity;
    for (const ing of allIngredients) {
      const dist = getLevenshtein(input.trim().toLowerCase(), ing.name.toLowerCase());
      if (dist < minDist) {
        minDist = dist;
        best = ing;
      }
      // Exact match shortcut
      if (dist === 0) break;
    }
    // Accept if close enough (allow 1 for short, 2 for longer)
    if (minDist <= 1 || (input.length > 5 && minDist <= 2)) return best;
    return null;
  }

  // Dynamic ingredient input logic
  const handleIngredientChange = (text, idx) => {
    const updated = [...ingredients];
    updated[idx] = text;
    setIngredients(updated);
    // Add new input if last and not empty
    if (idx === ingredients.length - 1 && text.trim() !== '') {
      setIngredients([...updated, '']);
    }
  };
  // Remove empty trailing inputs
  const getCleanIngredients = () => ingredients.filter((i) => i.trim() !== '');

  // Dynamic method input logic
  const handleMethodChange = (text, idx) => {
    const updated = [...methods];
    updated[idx] = text;
    setMethods(updated);
    if (idx === methods.length - 1 && text.trim() !== '') {
      setMethods([...updated, '']);
    }
  };
  const getCleanMethods = () => methods.filter((m) => m.trim() !== '');

  // Focus next ingredient input
  const handleIngredientSubmit = (idx) => {
    if (ingredients[idx].trim() !== '' && idx === ingredients.length - 1) {
      setIngredients((prev) => {
        const newArr = [...prev, ''];
        setTimeout(() => {
          if (ingredientRefs.current[idx + 1]) {
            ingredientRefs.current[idx + 1].focus();
          }
        }, 100);
        return newArr;
      });
    } else if (ingredientRefs.current[idx + 1]) {
      ingredientRefs.current[idx + 1].focus();
    }
  };
  // Focus next method input
  const handleMethodSubmit = (idx) => {
    if (methods[idx].trim() !== '' && idx === methods.length - 1) {
      setMethods((prev) => {
        const newArr = [...prev, ''];
        setTimeout(() => {
          if (methodRefs.current[idx + 1]) {
            methodRefs.current[idx + 1].focus();
          }
        }, 100);
        return newArr;
      });
    } else if (methodRefs.current[idx + 1]) {
      methodRefs.current[idx + 1].focus();
    }
  };

  // Image picker logic
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log('ImagePicker result:', result);
      if (!result.canceled && result.assets && result.assets[0].uri) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error in pickImage:', error);
      alert('An error occurred while picking the image.');
    }
  };
  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log('Camera result:', result);
      if (!result.canceled && result.assets && result.assets[0].uri) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error in takePhoto:', error);
      alert('An error occurred while taking the photo.');
    }
  };

  // Save recipe logic
  const handleSave = async () => {
    if (!title.trim() || !selectedCookbook) {
      alert('Please enter a title and select a cookbook.');
      return;
    }
    const newRecipe = {
      name: title.trim(),
      image,
      ingredients: getCleanIngredients(),
      method: getCleanMethods(),
      notes,
    };
    // Find and update the selected cookbook
    const updatedCookbooks = cookbooks.map((cb) => {
      if (cb.title === selectedCookbook.title) {
        return { ...cb, recipes: [...cb.recipes, newRecipe] };
      }
      return cb;
    });
    setCookbooks(updatedCookbooks);
    await AsyncStorage.setItem('cookbooks', JSON.stringify(updatedCookbooks));
    alert('Recipe saved!');
    navigation.goBack();
  };

  // Cookbook popup handler
  const handleCookbookPopup = () => setCookbookPopupVisible(true);

  // Create new cookbook logic
  const handleCreateCookbook = async () => {
    const name = newCookbookName.trim();
    if (!name) {
      alert('Please enter a cookbook name.');
      return;
    }
    // Check for duplicate
    if (cookbooks.some(cb => cb.title.toLowerCase() === name.toLowerCase())) {
      alert('A cookbook with this name already exists.');
      return;
    }
    const newCookbook = { title: name, recipes: [] };
    const updatedCookbooks = [...cookbooks, newCookbook];
    setCookbooks(updatedCookbooks);
    setSelectedCookbook(newCookbook);
    setShowCreateCookbook(false);
    setNewCookbookName('');
    setCookbookPopupVisible(false);
    await AsyncStorage.setItem('cookbooks', JSON.stringify(updatedCookbooks));
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingTop: 48, 
        paddingHorizontal: 20, 
        backgroundColor: theme.secondaryGreen 
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: theme.primaryText, fontWeight: 'bold', fontSize: 20 }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Text style={{ 
            color: isDarkMode ? 'white' : theme.primaryGreen, 
            fontWeight: 'bold', 
            fontSize: 20 
          }}>Save</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled" extraScrollHeight={40} enableOnAndroid={true}>
        {/* Card Section */}
        <View style={{ 
          backgroundColor: theme.cardBackground, 
          borderRadius: 18, 
          padding: 20, 
          marginBottom: 32, 
          shadowColor: theme.shadow, 
          shadowOpacity: 0.08, 
          shadowRadius: 8, 
          elevation: 2, 
          borderWidth: 1, 
          borderColor: theme.border 
        }}>
          <TextInput
            placeholder="Title"
            placeholderTextColor={theme.inputPlaceholder}
            style={{ fontSize: 20, fontWeight: 'bold', color: theme.primaryText, marginBottom: 16 }}
            value={title}
            onChangeText={setTitle}
            editable={true}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 17, color: theme.primaryText, flex: 1 }}>Image</Text>
            <TouchableOpacity
              style={{ borderWidth: 2, borderColor: theme.primaryGreen, borderRadius: 10, padding: 8 }}
              onPress={pickImage}
              onLongPress={takePhoto}
            >
              {image ? (
                <Image source={{ uri: image }} style={{ width: 40, height: 40, borderRadius: 8 }} />
              ) : (
                <MaterialIcons name="photo-camera" size={28} color={theme.primaryGreen} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 8 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 17, color: theme.primaryText, flex: 1 }}>Cookbooks</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleCookbookPopup}>
              <Text style={{ color: theme.primaryGreen, fontStyle: 'italic', marginRight: 4 }}>
                {selectedCookbook ? selectedCookbook.title : 'Select Cookbook'}
              </Text>
              <MaterialIcons name="chevron-right" size={24} color={theme.primaryGreen} />
            </TouchableOpacity>
          </View>
          <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 8 }} />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 17, color: theme.primaryText, flex: 1 }}>Info</Text>
            <MaterialIcons name="chevron-right" size={24} color={theme.primaryGreen} />
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 8 }} />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, color: theme.primaryText, flex: 1 }}>Nutrition</Text>
            <MaterialIcons name="chevron-right" size={24} color={theme.primaryGreen} />
          </TouchableOpacity>
        </View>
        {/* Ingredients Section */}
        <Text style={{ color: theme.primaryText, fontWeight: 'bold', fontSize: 15, marginBottom: 8 }}>INGREDIENTS</Text>
        {ingredients.map((ing, idx) => {
          const match = findBestIngredientMatch(ing);
          return (
            <View key={idx} style={{ marginBottom: 12 }}>
              <TextInput
                ref={ref => ingredientRefs.current[idx] = ref}
                placeholder="Add ingredient or heading"
                placeholderTextColor={theme.inputPlaceholder}
                style={{ 
                  backgroundColor: theme.cardBackground, 
                  borderRadius: 10, 
                  padding: 14, 
                  fontSize: 16, 
                  color: theme.primaryText, 
                  borderWidth: 1, 
                  borderColor: theme.border 
                }}
                value={ing}
                onChangeText={text => handleIngredientChange(text, idx)}
                returnKeyType="next"
                onSubmitEditing={() => handleIngredientSubmit(idx)}
              />
              {match && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <Text style={{ fontSize: 18 }}>{match.emoji}</Text>
                  <Text style={{ marginLeft: 8, color: theme.primaryGreen, fontWeight: 'bold' }}>{match.name}</Text>
                  {match.name.toLowerCase() !== ing.trim().toLowerCase() && (
                    <Text style={{ marginLeft: 8, color: theme.tertiaryText, fontStyle: 'italic' }}>(Did you mean?)</Text>
                  )}
                </View>
              )}
            </View>
          );
        })}
        {/* Method Section */}
        <Text style={{ color: theme.primaryText, fontWeight: 'bold', fontSize: 15, marginBottom: 8 }}>METHOD</Text>
        {methods.map((m, idx) => (
          <TextInput
            key={idx}
            ref={ref => methodRefs.current[idx] = ref}
            placeholder="Add step or heading"
            placeholderTextColor={theme.inputPlaceholder}
            style={{ 
              backgroundColor: theme.cardBackground, 
              borderRadius: 10, 
              padding: 14, 
              fontSize: 16, 
              marginBottom: 12, 
              color: theme.primaryText, 
              borderWidth: 1, 
              borderColor: theme.border 
            }}
            value={m}
            onChangeText={text => handleMethodChange(text, idx)}
            returnKeyType="next"
            onSubmitEditing={() => handleMethodSubmit(idx)}
          />
        ))}
        {/* Notes Section */}
        <Text style={{ color: theme.primaryText, fontWeight: 'bold', fontSize: 15, marginBottom: 8 }}>NOTES</Text>
        <TextInput
          placeholder="Add your recipe notes"
          placeholderTextColor={theme.inputPlaceholder}
          style={{ 
            backgroundColor: theme.cardBackground, 
            borderRadius: 10, 
            padding: 14, 
            fontSize: 16, 
            marginBottom: 24, 
            color: theme.primaryText, 
            borderWidth: 1, 
            borderColor: theme.border 
          }}
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </KeyboardAwareScrollView>
      {/* Cookbook Popup */}
      <Modal
        visible={cookbookPopupVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCookbookPopupVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ 
            backgroundColor: theme.modalBackground, 
            borderRadius: 20, 
            padding: 24, 
            width: '90%', 
            alignItems: 'center', 
            shadowColor: theme.shadow, 
            shadowOpacity: 0.2, 
            shadowRadius: 10, 
            elevation: 10 
          }}>
            <TouchableOpacity
              style={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}
              onPress={() => setCookbookPopupVisible(false)}
            >
              <MaterialIcons name="close" size={28} color={theme.primaryText} />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 24, color: theme.primaryText }}>Select Cookbook</Text>
            <ScrollView style={{ width: '100%', maxHeight: 300 }}>
              {cookbooks.length === 0 ? (
                <Text style={{ color: theme.tertiaryText, textAlign: 'center', marginVertical: 20 }}>No cookbooks found.</Text>
              ) : (
                cookbooks.map((cb, idx) => (
                  <TouchableOpacity
                    key={cb.title}
                    onPress={() => {
                      setSelectedCookbook(cb);
                      setCookbookPopupVisible(false);
                    }}
                    style={{
                      padding: 16,
                      borderRadius: 10,
                      backgroundColor: selectedCookbook && selectedCookbook.title === cb.title ? theme.lightGreen : theme.tertiaryBackground,
                      marginBottom: 10,
                      borderWidth: 1,
                      borderColor: theme.primaryGreen,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialIcons name="book" size={22} color={theme.primaryGreen} />
                    <Text style={{ marginLeft: 12, color: theme.primaryText, fontWeight: 'bold', fontSize: 16 }}>{cb.title}</Text>
                    <Text style={{ marginLeft: 8, color: theme.primaryGreen, fontSize: 14 }}>{cb.recipes.length} recipes</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
            {/* Create New Cookbook Button */}
            {showCreateCookbook ? (
              <View style={{ width: '100%', marginTop: 16 }}>
                <TextInput
                  placeholder="New cookbook name"
                  value={newCookbookName}
                  onChangeText={setNewCookbookName}
                  style={{
                    borderWidth: 1,
                    borderColor: theme.primaryGreen,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                    fontSize: 16,
                    backgroundColor: theme.inputBackground,
                    color: theme.primaryText,
                  }}
                  placeholderTextColor={theme.inputPlaceholder}
                />
                <TouchableOpacity
                  onPress={handleCreateCookbook}
                  style={{
                    backgroundColor: theme.primaryGreen,
                    padding: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Create Cookbook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowCreateCookbook(false);
                    setNewCookbookName('');
                  }}
                  style={{ alignItems: 'center', padding: 8 }}
                >
                  <Text style={{ color: theme.tertiaryText }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setShowCreateCookbook(true)}
                style={{
                  backgroundColor: theme.primaryGreen,
                  padding: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginTop: 16,
                  width: '100%',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Create New Cookbook</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserInput;

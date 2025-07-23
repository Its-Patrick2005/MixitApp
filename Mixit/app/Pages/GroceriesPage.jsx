import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GroceryMap from '../Components/GroceryMap';
import ImportTab from '../Components/ImportTab';
import Navbar from '../Components/Navbar';
import foodList from '../FoodData';
import { useTheme } from '../theme.jsx';

const GroceriesPage = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [deleteModal, setDeleteModal] = useState({ visible: false, item: null, checked: false });

  // New state for market list/recipe mode
  const [sourceModalVisible, setSourceModalVisible] = useState(false);
  const [cookbookModalVisible, setCookbookModalVisible] = useState(false);
  const [cookbookRecipesModalVisible, setCookbookRecipesModalVisible] = useState(false);
  const [mealPlanModalVisible, setMealPlanModalVisible] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);
  const [selectedCookbook, setSelectedCookbook] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]); // Array of saved recipes
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeChecked, setRecipeChecked] = useState([]);
  const [recipeUnchecked, setRecipeUnchecked] = useState([]);
  const [mealPlanData, setMealPlanData] = useState({});
  const [selectedMealPlanRecipe, setSelectedMealPlanRecipe] = useState(null);
  const [recipeMode, setRecipeMode] = useState(false);
  const [hasMarketList, setHasMarketList] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    loadData();
    loadCookbooks();
    loadMealPlanData();
  }, []);

  useEffect(() => {
    saveData();
  }, [groceryItems, checkedItems]);

  // Restore persisted market list on mount
  useEffect(() => {
    (async () => {
      const savedRecipesData = await AsyncStorage.getItem('savedMarketRecipes');
      if (savedRecipesData) {
        const recipes = JSON.parse(savedRecipesData);
        setSavedRecipes(recipes);
        setHasMarketList(recipes.length > 0);
      }
    })();
  }, []);

  // Check for active market list
  useEffect(() => {
    (async () => {
      const savedRecipe = await AsyncStorage.getItem('marketListRecipe');
      setHasMarketList(!!savedRecipe);
    })();
  }, [recipeMode]);

  const loadData = async () => {
    try {
      const active = await AsyncStorage.getItem('groceryItems');
      const checked = await AsyncStorage.getItem('checkedItems');
      if (active) setGroceryItems(JSON.parse(active));
      if (checked) setCheckedItems(JSON.parse(checked));
    } catch (e) {
      console.log('Load error', e);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('groceryItems', JSON.stringify(groceryItems));
      await AsyncStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    } catch (e) {
      console.log('Save error', e);
    }
  };

  const loadCookbooks = async () => {
    try {
      const saved = await AsyncStorage.getItem('cookbooks');
      if (saved) setCookbooks(JSON.parse(saved));
    } catch (e) {
      console.log('Cookbook load error', e);
    }
  };

  const loadMealPlanData = async () => {
    try {
      const saved = await AsyncStorage.getItem('mealPlanData');
      if (saved) setMealPlanData(JSON.parse(saved));
    } catch (e) {
      console.log('Meal plan load error', e);
    }
  };

  // --- Normal grocery list logic ---
  const addItem = () => {
    if (inputValue.trim() !== '') {
      setGroceryItems([...groceryItems, inputValue.trim()]);
      setInputValue('');
      setInputVisible(false);
    }
  };

  const checkItem = (item) => {
    setGroceryItems(groceryItems.filter(i => i !== item));
    setCheckedItems([...checkedItems, item]);
  };

  const uncheckItem = (item) => {
    setCheckedItems(checkedItems.filter(i => i !== item));
    setGroceryItems([...groceryItems, item]);
  };

  const clearItem = () => {
    const { item, checked } = deleteModal;
    if (item) {
      if (checked) {
        setCheckedItems(checkedItems.filter(i => i !== item));
      } else {
        setGroceryItems(groceryItems.filter(i => i !== item));
      }
    }
    setDeleteModal({ visible: false, item: null, checked: false });
  };

  // --- Market list/recipe mode logic ---
  const enterRecipeMode = (recipe) => {
    setSelectedRecipe(recipe);
    
    // Check if recipe already exists in saved recipes
    const existingRecipeIndex = savedRecipes.findIndex(r => r.name === recipe.name);
    
    if (existingRecipeIndex >= 0) {
      // Recipe exists, load its saved state
      const existingRecipe = savedRecipes[existingRecipeIndex];
      setRecipeChecked(existingRecipe.checked || []);
      setRecipeUnchecked(existingRecipe.unchecked || []);
    } else {
      // New recipe, initialize with all ingredients unchecked
      setRecipeUnchecked(recipe.ingredients ? [...recipe.ingredients] : []);
      setRecipeChecked([]);
    }
    
    setRecipeMode(true);
  };

  const leaveRecipeMode = () => {
    setRecipeMode(false);
    
    if (selectedRecipe) {
      // Update or add the recipe to saved recipes
      const updatedRecipes = [...savedRecipes];
      const existingIndex = updatedRecipes.findIndex(r => r.name === selectedRecipe.name);
      
      const recipeData = {
        ...selectedRecipe,
        checked: recipeChecked,
        unchecked: recipeUnchecked,
        lastUpdated: new Date().toISOString()
      };
      
      if (existingIndex >= 0) {
        // Update existing recipe
        updatedRecipes[existingIndex] = recipeData;
      } else {
        // Add new recipe
        updatedRecipes.push(recipeData);
      }
      
      setSavedRecipes(updatedRecipes);
      AsyncStorage.setItem('savedMarketRecipes', JSON.stringify(updatedRecipes));
    }
  };

  // Function to clear a specific saved recipe
  const clearSavedRecipe = (recipeName) => {
    const updatedRecipes = savedRecipes.filter(r => r.name !== recipeName);
    setSavedRecipes(updatedRecipes);
    setHasMarketList(updatedRecipes.length > 0);
    AsyncStorage.setItem('savedMarketRecipes', JSON.stringify(updatedRecipes));
    
    // If we're currently viewing this recipe, clear the view
    if (selectedRecipe && selectedRecipe.name === recipeName) {
      setSelectedRecipe(null);
      setRecipeMode(false);
      setRecipeChecked([]);
      setRecipeUnchecked([]);
    }
  };

  // Function to clear all saved recipes
  const clearAllSavedRecipes = () => {
    setSavedRecipes([]);
    setSelectedRecipe(null);
    setRecipeMode(false);
    setRecipeChecked([]);
    setRecipeUnchecked([]);
    setHasMarketList(false);
    AsyncStorage.removeItem('savedMarketRecipes');
  };

  const checkRecipeIngredient = (ingredient) => {
    const newUnchecked = recipeUnchecked.filter(i => i !== ingredient);
    const newChecked = [...recipeChecked, ingredient];
    setRecipeUnchecked(newUnchecked);
    setRecipeChecked(newChecked);
    
    // Update the saved recipe state immediately
    if (selectedRecipe) {
      const updatedRecipes = [...savedRecipes];
      const existingIndex = updatedRecipes.findIndex(r => r.name === selectedRecipe.name);
      
      const recipeData = {
        ...selectedRecipe,
        checked: newChecked,
        unchecked: newUnchecked,
        lastUpdated: new Date().toISOString()
      };
      
      if (existingIndex >= 0) {
        updatedRecipes[existingIndex] = recipeData;
      } else {
        updatedRecipes.push(recipeData);
      }
      
      setSavedRecipes(updatedRecipes);
      AsyncStorage.setItem('savedMarketRecipes', JSON.stringify(updatedRecipes));
    }
  };

  const uncheckRecipeIngredient = (ingredient) => {
    const newChecked = recipeChecked.filter(i => i !== ingredient);
    const newUnchecked = [...recipeUnchecked, ingredient];
    setRecipeChecked(newChecked);
    setRecipeUnchecked(newUnchecked);
    
    // Update the saved recipe state immediately
    if (selectedRecipe) {
      const updatedRecipes = [...savedRecipes];
      const existingIndex = updatedRecipes.findIndex(r => r.name === selectedRecipe.name);
      
      const recipeData = {
        ...selectedRecipe,
        checked: newChecked,
        unchecked: newUnchecked,
        lastUpdated: new Date().toISOString()
      };
      
      if (existingIndex >= 0) {
        updatedRecipes[existingIndex] = recipeData;
      } else {
        updatedRecipes.push(recipeData);
      }
      
      setSavedRecipes(updatedRecipes);
      AsyncStorage.setItem('savedMarketRecipes', JSON.stringify(updatedRecipes));
    }
  };

  // --- Cookbook/Meal Plan selection logic ---
  const handleAddGrocery = () => {
    setSourceModalVisible(true);
  };

  // Cookbook selection
  const handleSelectCookbook = (cookbook) => {
    setSelectedCookbook(cookbook);
    setCookbookModalVisible(false);
    setCookbookRecipesModalVisible(true);
  };
  const handleSelectCookbookRecipe = (recipe) => {
    setCookbookRecipesModalVisible(false);
    enterRecipeMode(recipe);
  };

  // Meal plan selection
  const getAllMealPlanRecipes = () => {
    // Flatten all recipes in the current week
    const recipes = [];
    Object.values(mealPlanData).forEach(weekObj => {
      Object.values(weekObj).forEach(dayArr => {
        if (Array.isArray(dayArr)) {
          dayArr.forEach(recipe => {
            recipes.push(recipe);
          });
        }
      });
    });
    return recipes;
  };
  const handleSelectMealPlanRecipe = (recipe) => {
    setMealPlanModalVisible(false);
    enterRecipeMode(recipe);
  };

  // --- UI ---
  // Show the market list view if a recipe is selected and in recipe mode
  if (recipeMode && selectedRecipe) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
        <Navbar />
        
        {/* Map Modal - rendered at top level for immediate access */}
        <GroceryMap 
          visible={mapVisible}
          onClose={() => setMapVisible(false)}
          recipeName={selectedRecipe?.name}
        />
        
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Back/Clear button */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16 }}>
            <TouchableOpacity onPress={leaveRecipeMode} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="arrow-back" size={24} color={theme.primaryGreen} />
              <Text style={{ color: theme.primaryGreen, fontWeight: 'bold', fontSize: 16, marginLeft: 6 }}>Back to List</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMapVisible(true)}
              style={{
                backgroundColor: theme.primaryGreen,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: theme.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Ionicons name="location" size={18} color="white" />
              <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginLeft: 6 }}>Map</Text>
            </TouchableOpacity>
          </View>

          {/* Recipe Card (using MealCard design) */}
          <View
            style={{
              height: 250,
              position: "relative",
              overflow: "hidden",
              borderRadius: 20,
              marginHorizontal: 20,
              marginBottom: 24,
              shadowColor: theme.shadow,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Image
              source={{ uri: selectedRecipe.image }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
            {/* Gradient overlay for better text readability */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 58, 0, 0.3)",
              }}
            />
            
            {/* Food name with enhanced styling */}
            <View style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 20,
              paddingBottom: 25,
            }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textShadowColor: "rgba(0, 0, 0, 0.8)",
                  textShadowOffset: { width: 2, height: 2 },
                  textShadowRadius: 4,
                  lineHeight: 32,
                }}
              >
                {selectedRecipe.name}
              </Text>
              
              {/* Rating badge */}
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                alignSelf: 'flex-start',
                marginTop: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.darkGreen, marginRight: 4 }}>
                  ⭐ {selectedRecipe.rating}
                </Text>
              </View>
            </View>

            {/* Decorative corner accent */}
            <View style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 60,
              height: 60,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <Image
                source={require("../../assets/images/Asset 4.png")}
                style={{ width: 40, height: 40, resizeMode: 'contain' }}
              />
            </View>
          </View>

          {/* Ingredients List (checkboxes only) */}
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primaryText, marginBottom: 12 }}>Ingredients</Text>
            {recipeUnchecked.length === 0 && recipeChecked.length === 0 && (
              <Text style={{ color: theme.tertiaryText, fontSize: 16, textAlign: 'center', marginVertical: 24 }}>No ingredients found for this recipe.</Text>
            )}
            {recipeUnchecked.map((ingredient, idx) => (
              <TouchableOpacity key={idx} onPress={() => checkRecipeIngredient(ingredient)} style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginBottom: 12, 
                backgroundColor: theme.cardBackground, 
                borderRadius: 12, 
                padding: 14, 
                borderWidth: 1, 
                borderColor: theme.border, 
                shadowColor: theme.shadow, 
                shadowOpacity: 0.06, 
                shadowRadius: 4, 
                elevation: 2 
              }}>
                <Ionicons name="square-outline" size={24} color={theme.primaryGreen} style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 16, color: theme.primaryText }}>{ingredient}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Checked Section */}
          {recipeChecked.length > 0 && (
            <View style={{ marginTop: 32, marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.primaryGreen, marginBottom: 8 }}>Checked</Text>
              {recipeChecked.map((ingredient, idx) => (
                <TouchableOpacity key={idx} onPress={() => uncheckRecipeIngredient(ingredient)} style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginBottom: 10, 
                  backgroundColor: theme.lightGreen, 
                  borderRadius: 12, 
                  padding: 14, 
                  borderWidth: 1, 
                  borderColor: theme.border, 
                  shadowColor: theme.shadow, 
                  shadowOpacity: 0.04, 
                  shadowRadius: 2, 
                  elevation: 1 
                }}>
                  <Ionicons name="checkbox" size={24} color={theme.primaryGreen} style={{ marginRight: 12 }} />
                  <Text style={{ fontSize: 16, color: theme.primaryText }}>{ingredient}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  // --- Normal grocery list UI ---
  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
      <Navbar />
      
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.primaryText }}>My Grocery List</Text>
      </View>

      <ScrollView
        style={{ paddingHorizontal: 16, marginTop: 16 }}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* Add Item button - always visible */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 12 }}>
          <TouchableOpacity
            onPress={handleAddGrocery}
            style={{ 
              backgroundColor: theme.primaryGreen, 
              paddingHorizontal: 12, 
              paddingVertical: 6, 
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="add" size={16} color="white" />
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginLeft: 4 }}>Add Item</Text>
          </TouchableOpacity>
        </View>
        {/* Market List Cards (if recipes are saved) */}
        {savedRecipes.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primaryText }}>Market Lists</Text>
            </View>
            {savedRecipes.map((recipe, index) => (
              <TouchableOpacity
                key={recipe.name + index}
                onPress={() => enterRecipeMode(recipe)}
                onLongPress={() => {
                  console.log('Long press detected for:', recipe.name);
                  Alert.alert(
                    "Delete Market List",
                    `Are you sure you want to delete "${recipe.name}" from your market lists?`,
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                          console.log('Deleting recipe:', recipe.name);
                          clearSavedRecipe(recipe.name);
                        }
                      }
                    ]
                  );
                }}
                delayLongPress={500}
                activeOpacity={0.7}
                style={{
                  backgroundColor: theme.cardBackground,
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 16,
                  shadowColor: theme.shadow,
                  shadowOpacity: 0.12,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 6,
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={{ uri: recipe.image }} style={{ width: 80, height: 80, borderRadius: 16, marginRight: 16, borderWidth: 2, borderColor: theme.border }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.primaryText, marginBottom: 4 }}>{recipe.name}</Text>
                    <Text style={{ color: theme.primaryGreen, fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>⭐ {recipe.rating}</Text>
                    <Text style={{ color: theme.tertiaryText, fontSize: 14, marginBottom: 4 }}>
                      {recipe.checked ? recipe.checked.length : 0} checked • {recipe.unchecked ? recipe.unchecked.length : 0} remaining
                    </Text>
                    <Text style={{ color: theme.tertiaryText, fontSize: 12 }}>Tap to view market list</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color={theme.primaryGreen} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Checked items */}
        {checkedItems.length > 0 && (
          <>
            <Text style={{ fontWeight: '600', color: theme.secondaryText, marginTop: 16, marginBottom: 8 }}>Checked List</Text>
            {checkedItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => uncheckItem(item)}
                onLongPress={() =>
                  setDeleteModal({ visible: true, item, checked: true })
                }
                style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  backgroundColor: theme.tertiaryBackground, 
                  borderRadius: 8, 
                  padding: 8, 
                  marginBottom: 8 
                }}
              >
                <Text style={{ textDecorationLine: 'line-through', color: theme.tertiaryText }}>{item}</Text>
                <Ionicons name="checkmark-done" size={20} color={theme.primaryGreen} />
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Inline input box */}
        {inputVisible && (
          <View style={{ marginTop: 16 }}>
            <TextInput
              placeholder="Enter grocery item"
              value={inputValue}
              onChangeText={setInputValue}
              style={{ 
                borderWidth: 1, 
                borderColor: theme.borderLight, 
                borderRadius: 8, 
                paddingHorizontal: 8, 
                paddingVertical: 4, 
                marginBottom: 8, 
                backgroundColor: theme.inputBackground,
                color: theme.primaryText,
              }}
              placeholderTextColor={theme.inputPlaceholder}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, gap: 16 }}>
              <TouchableOpacity onPress={() => setInputVisible(false)}>
                <Text style={{ color: theme.error }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addItem}>
                <Text style={{ color: theme.primaryGreen, fontWeight: 'bold' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Delete confirm modal */}
      <Modal
        transparent
        visible={deleteModal.visible}
        animationType="fade"
        onRequestClose={() => setDeleteModal({ visible: false, item: null, checked: false })}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: theme.modalBackground, borderRadius: 8, padding: 16, width: '75%' }}>
            <Text style={{ marginBottom: 16, textAlign: 'center', color: theme.primaryText }}>Clear "{deleteModal.item}"?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => setDeleteModal({ visible: false, item: null, checked: false })}
                style={{ padding: 8 }}
              >
                <Text style={{ color: theme.secondaryText }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={clearItem} style={{ padding: 8 }}>
                <Text style={{ color: theme.error, fontWeight: 'bold' }}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Source selection modal */}
      <Modal visible={sourceModalVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: theme.modalBackground, borderRadius: 20, padding: 24, width: '85%', alignItems: 'center', shadowColor: theme.shadow, shadowOpacity: 0.2, shadowRadius: 10, elevation: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 24, color: theme.primaryText }}>Add Grocery Item</Text>
            <TouchableOpacity style={{ alignItems: 'center', marginBottom: 20, width: '100%' }} onPress={() => { setSourceModalVisible(false); setCookbookModalVisible(true); }}>
              <Ionicons name="book" size={32} color={theme.primaryGreen} />
              <Text style={{ color: theme.primaryText, fontWeight: 'bold', marginTop: 8, fontSize: 16 }}>Add from Cookbooks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', width: '100%' }} onPress={() => { setSourceModalVisible(false); setMealPlanModalVisible(true); }}>
              <Ionicons name="calendar" size={32} color={theme.primaryGreen} />
              <Text style={{ color: theme.primaryText, fontWeight: 'bold', marginTop: 8, fontSize: 16 }}>Add from Meal Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSourceModalVisible(false)} style={{ marginTop: 24 }}>
              <Text style={{ color: theme.tertiaryText, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cookbook selection modal */}
      <Modal visible={cookbookModalVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: theme.modalBackground, borderRadius: 20, padding: 24, width: '85%', alignItems: 'center', shadowColor: theme.shadow, shadowOpacity: 0.2, shadowRadius: 10, elevation: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 24, color: theme.primaryText }}>Select Cookbook</Text>
            <ScrollView style={{ width: '100%', maxHeight: 300 }}>
              {cookbooks.length === 0 ? (
                <Text style={{ color: theme.tertiaryText, textAlign: 'center', marginVertical: 20 }}>No cookbooks found.</Text>
              ) : (
                cookbooks.map((cb, idx) => (
                  <TouchableOpacity
                    key={cb.title}
                    onPress={() => handleSelectCookbook(cb)}
                    style={{ 
                      padding: 16, 
                      borderRadius: 10, 
                      backgroundColor: selectedCookbook && selectedCookbook.title === cb.title ? theme.lightGreen : theme.tertiaryBackground, 
                      marginBottom: 10, 
                      borderWidth: 1, 
                      borderColor: theme.primaryGreen, 
                      flexDirection: 'row', 
                      alignItems: 'center' 
                    }}
                  >
                    <Ionicons name="book" size={22} color={theme.primaryGreen} />
                    <Text style={{ marginLeft: 12, color: theme.primaryText, fontWeight: 'bold', fontSize: 16 }}>{cb.title}</Text>
                    <Text style={{ marginLeft: 8, color: theme.primaryGreen, fontSize: 14 }}>{cb.recipes.length} recipes</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
            <TouchableOpacity onPress={() => setCookbookModalVisible(false)} style={{ marginTop: 16 }}>
              <Text style={{ color: theme.tertiaryText, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cookbook recipes modal */}
      <Modal visible={cookbookRecipesModalVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: theme.modalBackground, borderRadius: 20, padding: 24, width: '85%', alignItems: 'center', shadowColor: theme.shadow, shadowOpacity: 0.2, shadowRadius: 10, elevation: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 24, color: theme.primaryText }}>Select Recipe</Text>
            <ScrollView style={{ width: '100%', maxHeight: 300 }}>
              {selectedCookbook && selectedCookbook.recipes.length === 0 ? (
                <Text style={{ color: theme.tertiaryText, textAlign: 'center', marginVertical: 20 }}>No recipes found in this cookbook.</Text>
              ) : (
                selectedCookbook && selectedCookbook.recipes.map((recipe, idx) => {
                  // Find full recipe details from foodList
                  const fullRecipe = foodList.find(f => f.name === recipe.name) || recipe;
                  return (
                    <TouchableOpacity
                      key={recipe.name + idx}
                      onPress={() => handleSelectCookbookRecipe(fullRecipe)}
                      style={{ 
                        padding: 16, 
                        borderRadius: 10, 
                        backgroundColor: theme.tertiaryBackground, 
                        marginBottom: 10, 
                        borderWidth: 1, 
                        borderColor: theme.primaryGreen, 
                        flexDirection: 'row', 
                        alignItems: 'center' 
                      }}
                    >
                      <Image source={{ uri: fullRecipe.image }} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
                      <Text style={{ color: theme.primaryText, fontWeight: 'bold', fontSize: 16 }}>{fullRecipe.name}</Text>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
            <TouchableOpacity onPress={() => setCookbookRecipesModalVisible(false)} style={{ marginTop: 16 }}>
              <Text style={{ color: theme.tertiaryText, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Meal plan recipes modal */}
      <Modal visible={mealPlanModalVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: theme.modalBackground, borderRadius: 20, padding: 24, width: '85%', alignItems: 'center', shadowColor: theme.shadow, shadowOpacity: 0.2, shadowRadius: 10, elevation: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 24, color: theme.primaryText }}>Select from Meal Plan</Text>
            <ScrollView style={{ width: '100%', maxHeight: 300 }}>
              {getAllMealPlanRecipes().length === 0 ? (
                <Text style={{ color: theme.tertiaryText, textAlign: 'center', marginVertical: 20 }}>No recipes found in meal plan.</Text>
              ) : (
                getAllMealPlanRecipes().map((recipe, idx) => (
                  <TouchableOpacity
                    key={recipe.name + idx}
                    onPress={() => handleSelectMealPlanRecipe(recipe)}
                    style={{ 
                      padding: 16, 
                      borderRadius: 10, 
                      backgroundColor: theme.tertiaryBackground, 
                      marginBottom: 10, 
                      borderWidth: 1, 
                      borderColor: theme.primaryGreen, 
                      flexDirection: 'row', 
                      alignItems: 'center' 
                    }}
                  >
                    <Image source={{ uri: recipe.image }} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
                    <Text style={{ color: theme.primaryText, fontWeight: 'bold', fontSize: 16 }}>{recipe.name}</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
            <TouchableOpacity onPress={() => setMealPlanModalVisible(false)} style={{ marginTop: 16 }}>
              <Text style={{ color: theme.tertiaryText, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ImportTab currentPage="Groceries" />
    </View>
  );
};

export default GroceriesPage;

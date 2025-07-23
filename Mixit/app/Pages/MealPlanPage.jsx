import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDays, format, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ImportTab from '../Components/ImportTab';
import Navbar from '../Components/Navbar';
import foodList from '../FoodData';
import { useTheme } from '../theme.jsx';

const MealPlanPage = ({ navigation }) => {
  const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [days, setDays] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [inNoteMode, setInNoteMode] = useState(false);
  const [noteType, setNoteType] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [mealPlanData, setMealPlanData] = useState({});
  
  // New states for meal type and recipe selection
  const [mealTypeModalVisible, setMealTypeModalVisible] = useState(false);
  const [recipeModalVisible, setRecipeModalVisible] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [selectedDayForMeal, setSelectedDayForMeal] = useState(null);
  const [recipeSearchQuery, setRecipeSearchQuery] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const newDays = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i);
      const label = format(date, 'EEEE do');
      newDays.push(label);
    }
    setDays(newDays);
  }, [startDate]);

  useEffect(() => {
    loadMealPlanData();
  }, []);

  // Add focus listener to reload meal plan data when returning to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMealPlanData();
    });

    return unsubscribe;
  }, [navigation]);

  const loadMealPlanData = async () => {
    try {
      const savedMealPlan = await AsyncStorage.getItem('mealPlanData');
      if (savedMealPlan) {
        setMealPlanData(JSON.parse(savedMealPlan));
      }
    } catch (error) {
      console.log('Error loading meal plan data:', error);
    }
  };

  const getDayKey = (dayLabel) => {
    // Extract day name from label (e.g., "Monday 1st" -> "Monday")
    const dayName = dayLabel.split(' ')[0];
    return dayName;
  };

  const getWeekKey = (startDate) => {
    return format(startDate, 'yyyy-MM-dd');
  };

  const getRecipesForDay = (dayLabel) => {
    const dayKey = getDayKey(dayLabel);
    const weekKey = getWeekKey(startDate);
    
    if (mealPlanData[weekKey] && mealPlanData[weekKey][dayKey]) {
      return mealPlanData[weekKey][dayKey];
    }
    return [];
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate("MealCard", { 
      food: {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        rating: recipe.rating,
        ingredients: recipe.ingredients,
        method: recipe.method,
        funFact: recipe.funFact
      }
    });
  };

  const removeRecipeFromDay = async (dayLabel, recipeIndex) => {
    const dayKey = getDayKey(dayLabel);
    const weekKey = getWeekKey(startDate);
    const updatedMealPlan = { ...mealPlanData };
    
    if (updatedMealPlan[weekKey] && updatedMealPlan[weekKey][dayKey]) {
      updatedMealPlan[weekKey][dayKey] = updatedMealPlan[weekKey][dayKey].filter((_, index) => index !== recipeIndex);
      
      // Remove the day key if no recipes left
      if (updatedMealPlan[weekKey][dayKey].length === 0) {
        delete updatedMealPlan[weekKey][dayKey];
      }
      
      // Remove the week key if no days left
      if (Object.keys(updatedMealPlan[weekKey]).length === 0) {
        delete updatedMealPlan[weekKey];
      }
      
      setMealPlanData(updatedMealPlan);
      
      try {
        await AsyncStorage.setItem('mealPlanData', JSON.stringify(updatedMealPlan));
      } catch (error) {
        console.log('Error saving meal plan data:', error);
      }
    }
  };

  const addRecipeToDay = async (recipe) => {
    const dayKey = getDayKey(selectedDayForMeal);
    const weekKey = getWeekKey(startDate);
    
    if (!mealPlanData[weekKey]) {
      mealPlanData[weekKey] = {};
    }
    
    if (!mealPlanData[weekKey][dayKey]) {
      mealPlanData[weekKey][dayKey] = [];
    }
    
    // Check if recipe is already added to this day in this week
    const isAlreadyAdded = mealPlanData[weekKey][dayKey].some(
      (existingRecipe) => existingRecipe.name === recipe.name
    );

    if (isAlreadyAdded) {
      alert(`${recipe.name} is already added to ${dayKey} this week!`);
      return;
    }

    // Check if day already has 3 recipes
    if (mealPlanData[weekKey][dayKey].length >= 3) {
      alert(`${dayKey} already has 3 recipes this week. Please remove one first.`);
      return;
    }

    const updatedMealPlan = {
      ...mealPlanData,
      [weekKey]: {
        ...mealPlanData[weekKey],
        [dayKey]: [...mealPlanData[weekKey][dayKey], {
          name: recipe.name,
          image: recipe.image,
          id: recipe.id,
          rating: recipe.rating,
          ingredients: recipe.ingredients,
          method: recipe.method,
          funFact: recipe.funFact
        }]
      }
    };

    setMealPlanData(updatedMealPlan);
    
    try {
      await AsyncStorage.setItem('mealPlanData', JSON.stringify(updatedMealPlan));
      alert(`${recipe.name} has been added to ${dayKey} this week!`);
    } catch (error) {
      console.log('Error saving meal plan data:', error);
    }
  };

  const getFilteredRecipes = (mealType) => {
    if (!mealType) return [];
    
    let filteredRecipes = foodList.filter(food => {
      if (!food || !food.id) return false;
      
      const foodId = food.id.toLowerCase();
      const mealTypeLower = mealType.toLowerCase();
      
      if (mealTypeLower === 'breakfast') {
        return foodId.includes('breakfast');
      } else if (mealTypeLower === 'lunch') {
        return foodId.includes('lunch');
      } else if (mealTypeLower === 'dinner') {
        return foodId.includes('dinner');
      } else if (mealTypeLower === 'supper') {
        return foodId.includes('supper');
      }
      return false;
    });

    // Apply search filter if there's a search query
    if (recipeSearchQuery.trim()) {
      const searchLower = recipeSearchQuery.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchLower)
      );
    }

    return filteredRecipes;
  };

  const handleAddMeal = (dayLabel) => {
    setSelectedDayForMeal(dayLabel);
    setMealTypeModalVisible(true);
  };

  const handleMealTypeSelect = (mealType) => {
    setSelectedMealType(mealType);
    setMealTypeModalVisible(false);
    setRecipeModalVisible(true);
  };

  const goToPreviousWeek = () => {
    setStartDate(addDays(startDate, -7));
  };

  const goToNextWeek = () => {
    setStartDate(addDays(startDate, 7));
  };

  const endDate = addDays(startDate, 6);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Notes'];
  const mealIcons = {
    'Breakfast': '🌅',
    'Lunch': '🌞',
    'Dinner': '🌙',
    'Notes': '📝',
    'Shopping': '🛒',
    'Prep': '🔪',
    'Cooking': '👨‍🍳',
    'Serving': '🍽️'
  };

  const noteItems = ['Shopping', 'Prep', 'Cooking', 'Serving'];

  const toggleMenu = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      setActiveMenu(index);
    }
    setInNoteMode(false);
    setNoteType(null);
  };

  const resetAll = () => {
    setActiveMenu(null);
    setInNoteMode(false);
    setNoteType(null);
    setNoteText('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
      <Navbar />
      <View style={{ backgroundColor: theme.primaryBackground, zIndex: 10 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.primaryText }}>Meal Plan</Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Groceries')}>
              <View style={{ backgroundColor: theme.lightGreen, borderRadius: 20, padding: 4 }}>
                <Ionicons name="add-circle" size={28} color={theme.primaryGreen} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ backgroundColor: theme.tertiaryBackground, borderRadius: 20, padding: 4 }}>
                <Ionicons name="ellipsis-horizontal" size={28} color={theme.primaryGreen} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Date Range */}
        <View style={{ alignItems: 'center', marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
          <TouchableOpacity 
            onPress={goToPreviousWeek}
            style={{ backgroundColor: theme.cardBackground, borderRadius: 20, padding: 8, shadowColor: theme.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
          >
            <Ionicons name="chevron-back" size={24} color={theme.primaryGreen} />
          </TouchableOpacity>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: theme.primaryText, fontWeight: '500' }}>
              {format(startDate, 'dd MMM yyyy')} - {format(endDate, 'dd MMM yyyy')}
            </Text>
            <Text style={{ fontSize: 12, color: theme.tertiaryText, marginTop: 4 }}>
              Week {format(startDate, 'w')} of {format(startDate, 'yyyy')}
            </Text>
          </View>

          <TouchableOpacity 
            onPress={goToNextWeek}
            style={{ backgroundColor: theme.cardBackground, borderRadius: 20, padding: 8, shadowColor: theme.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
          >
            <Ionicons name="chevron-forward" size={24} color={theme.primaryGreen} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        {/* Scrollable Days List */}
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 150 }} 
          style={{ paddingHorizontal: 16, marginTop: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {days.map((day, index) => {
            const dayRecipes = getRecipesForDay(day);
            return (
              <View
                key={index}
                style={{ 
                  backgroundColor: theme.cardBackground, 
                  borderRadius: 12, 
                  padding: 16, 
                  marginBottom: 12, 
                  position: 'relative',
                  zIndex: activeMenu === index ? 100 : 0, 
                  elevation: activeMenu === index ? 20 : 1,
                  shadowColor: theme.shadow,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
              >
                <Text style={{ fontWeight: '600', color: theme.primaryText, marginBottom: 12, fontSize: 18 }}>{day}</Text>
                
                {/* Meal slots */}
                <View style={{ gap: 8 }}>
                  {[0, 1, 2].map((slotIndex) => {
                    const recipe = dayRecipes[slotIndex];
                    return (
                      <View key={slotIndex} style={{ height: 48, backgroundColor: theme.tertiaryBackground, borderRadius: 8, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
                        {recipe ? (
                          <TouchableOpacity 
                            onPress={() => handleRecipePress(recipe)}
                            onLongPress={() => removeRecipeFromDay(day, slotIndex)}
                            style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                          >
                            <Image
                              source={{ uri: recipe.image }}
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                marginRight: 12,
                              }}
                            />
                            <Text style={{ color: theme.primaryText, fontWeight: '500', flex: 1 }} numberOfLines={1}>
                              {recipe.name}
                            </Text>
                            <Ionicons name="chevron-forward" size={16} color={theme.primaryGreen} />
                          </TouchableOpacity>
                        ) : (
                          <Text style={{ color: theme.tertiaryText, fontSize: 14 }}>No meal planned</Text>
                        )}
                      </View>
                    );
                  })}
                </View>

                <TouchableOpacity
                  style={{ position: 'absolute', right: 16, top: 16 }}
                  onPress={() => handleAddMeal(day)}
                >
                  <Ionicons name="add-circle" size={32} color={theme.primaryGreen} />
                </TouchableOpacity>

                {activeMenu === index && !inNoteMode && !noteType && (
                  <View
                    style={{ 
                      position: 'absolute', 
                      right: 64, 
                      top: 16, 
                      backgroundColor: theme.modalBackground, 
                      borderRadius: 8, 
                      padding: 12, 
                      width: 208,
                      zIndex: 110, 
                      elevation: 30,
                      shadowColor: theme.shadow,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 8,
                      borderWidth: 1,
                      borderColor: theme.border,
                    }}
                  >
                    {mealTypes.map((type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => {
                          if (type === 'Notes') {
                            setInNoteMode(true);
                          } else {
                            alert(`${type} selected for ${day}`);
                            resetAll();
                          }
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.borderLight }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ marginRight: 12, fontSize: 20 }}>{mealIcons[type]}</Text>
                          <Text style={{ color: theme.primaryText, fontWeight: '500' }}>{type}</Text>
                        </View>
                        {type === 'Notes' && (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="folder" size={18} color={theme.primaryGreen} />
                            <Ionicons name="chevron-forward" size={18} color={theme.primaryGreen} />
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {activeMenu === index && inNoteMode && !noteType && (
                  <View
                    style={{ 
                      position: 'absolute', 
                      right: 64, 
                      top: 16, 
                      backgroundColor: theme.modalBackground, 
                      borderRadius: 8, 
                      padding: 12, 
                      width: 208,
                      zIndex: 110, 
                      elevation: 30,
                      shadowColor: theme.shadow,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 8,
                      borderWidth: 1,
                      borderColor: theme.border,
                    }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: '600', color: theme.tertiaryText, marginBottom: 8, paddingHorizontal: 4 }}>Notes Folder</Text>
                    {noteItems.map((item) => (
                      <TouchableOpacity
                        key={item}
                        onPress={() => setNoteType(item)}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.borderLight }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ marginRight: 12, fontSize: 20 }}>{mealIcons[item]}</Text>
                          <Text style={{ color: theme.primaryText, fontWeight: '500' }}>{item}</Text>
                        </View>
                        <Ionicons name="folder" size={18} color={theme.primaryGreen} />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {activeMenu === index && noteType && (
                  <View style={{ marginTop: 12, backgroundColor: theme.tertiaryBackground, padding: 16, borderRadius: 8, borderWidth: 1, borderColor: theme.border }}>
                    <Text style={{ color: theme.primaryText, marginBottom: 8, fontWeight: '500' }}>Note for {noteType}:</Text>
                    <TextInput
                      multiline
                      placeholder="Enter note..."
                      value={noteText}
                      onChangeText={setNoteText}
                      style={{
                        backgroundColor: theme.inputBackground,
                        borderRadius: 8,
                        padding: 12,
                        color: theme.primaryText,
                        minHeight: 80,
                        textAlignVertical: 'top',
                        borderWidth: 1,
                        borderColor: theme.border,
                      }}
                      placeholderTextColor={theme.inputPlaceholder}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                      <TouchableOpacity onPress={resetAll}>
                        <Text style={{ color: theme.error }}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        alert(`Note saved for ${noteType}`);
                        resetAll();
                      }}>
                        <Text style={{ color: theme.primaryGreen, fontWeight: 'bold' }}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        {/* Meal Type Selection Modal */}
        <Modal
          visible={mealTypeModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMealTypeModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              backgroundColor: theme.modalBackground,
              borderRadius: 20,
              padding: 24,
              width: '90%',
              alignItems: 'center',
              shadowColor: theme.shadow,
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 10,
            }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.primaryText, marginBottom: 24 }}>
                Select Meal Type for {selectedDayForMeal}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => (
                  <TouchableOpacity
                    key={mealType}
                    onPress={() => handleMealTypeSelect(mealType)}
                    style={{
                      backgroundColor: theme.tertiaryBackground,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: theme.border,
                    }}
                  >
                    <Text style={{ color: theme.primaryText, fontWeight: '500' }}>{mealType}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity onPress={() => setMealTypeModalVisible(false)} style={{ marginTop: 24 }}>
                <Text style={{ color: theme.tertiaryText, fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Recipe Selection Modal */}
        <Modal
          visible={recipeModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setRecipeModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              backgroundColor: theme.modalBackground,
              borderRadius: 20,
              padding: 24,
              width: '90%',
              maxHeight: '80%',
              shadowColor: theme.shadow,
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 10,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.primaryText }}>
                  Select Recipe for {selectedMealType}
                </Text>
                <TouchableOpacity onPress={() => setRecipeModalVisible(false)}>
                  <Ionicons name="close" size={24} color={theme.primaryText} />
                </TouchableOpacity>
              </View>

              {/* Search Input */}
              <TextInput
                placeholder="Search recipes..."
                value={recipeSearchQuery}
                onChangeText={setRecipeSearchQuery}
                style={{
                  borderWidth: 1,
                  borderColor: theme.borderLight,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                  fontSize: 16,
                  backgroundColor: theme.inputBackground,
                  color: theme.primaryText,
                }}
                placeholderTextColor={theme.inputPlaceholder}
              />

              {/* Recipe List */}
              <ScrollView style={{ maxHeight: 400 }}>
                {getFilteredRecipes(selectedMealType).map((recipe) => (
                  <TouchableOpacity
                    key={recipe.name}
                    onPress={() => {
                      addRecipeToDay(recipe);
                      setRecipeModalVisible(false);
                      setRecipeSearchQuery('');
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 12,
                      marginBottom: 8,
                      backgroundColor: theme.tertiaryBackground,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                    }}
                  >
                    <Image
                      source={{ uri: recipe.image }}
                      style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: theme.primaryText }}>
                        {recipe.name}
                      </Text>
                      <Text style={{ fontSize: 12, color: theme.secondaryText }}>
                        ⭐ {recipe.rating}
                      </Text>
                    </View>
                    <Ionicons name="add-circle" size={20} color={theme.primaryGreen} />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {getFilteredRecipes(selectedMealType).length === 0 && (
                <View style={{ alignItems: 'center', padding: 20 }}>
                  <Text style={{ color: theme.tertiaryText, textAlign: 'center' }}>
                    No {selectedMealType?.toLowerCase()} recipes found.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Modal>

      </ScrollView>
      <ImportTab currentPage="MealPlan" />
    </View>
  );
};

export default MealPlanPage;

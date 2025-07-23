import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ImportTab from '../Components/ImportTab';
import Navbar from '../Components/Navbar';
import foodList from '../FoodData';
import { useTheme } from '../theme.jsx';

const MealPlan = () => {
  const [mealPlanData, setMealPlanData] = useState({});
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { theme } = useTheme();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Dinner'];

  useEffect(() => {
    loadMealPlan();
  }, []);

  const loadMealPlan = async () => {
    try {
      const savedMealPlan = await AsyncStorage.getItem('mealPlanData');
      if (savedMealPlan) {
        setMealPlanData(JSON.parse(savedMealPlan));
      }
    } catch (error) {
      console.log('Error loading meal plan:', error);
    }
  };

  const saveMealPlan = async (newMealPlan) => {
    try {
      await AsyncStorage.setItem('mealPlanData', JSON.stringify(newMealPlan));
      setMealPlanData(newMealPlan);
    } catch (error) {
      console.log('Error saving meal plan:', error);
    }
  };

  const addRecipeToMealPlan = (recipe) => {
    if (!selectedDay || !selectedMeal) return;

    const newMealPlan = { ...mealPlanData };
    if (!newMealPlan[selectedDay]) {
      newMealPlan[selectedDay] = {};
    }
    if (!newMealPlan[selectedDay][selectedMeal]) {
      newMealPlan[selectedDay][selectedMeal] = [];
    }

    // Check if recipe already exists
    const exists = newMealPlan[selectedDay][selectedMeal].some(r => r.name === recipe.name);
    if (exists) {
      Alert.alert('Recipe already added', 'This recipe is already in your meal plan for this meal.');
      return;
    }

    // Check if meal already has 3 recipes
    if (newMealPlan[selectedDay][selectedMeal].length >= 3) {
      Alert.alert('Meal Full', 'You can only add up to 3 recipes per meal.');
      return;
    }

    newMealPlan[selectedDay][selectedMeal].push(recipe);
    saveMealPlan(newMealPlan);
    setAddRecipeModalVisible(false);
    setSelectedDay(null);
    setSelectedMeal(null);
  };

  const removeRecipeFromMealPlan = (day, meal, recipeIndex) => {
    Alert.alert(
      'Remove Recipe',
      'Are you sure you want to remove this recipe from your meal plan?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const newMealPlan = { ...mealPlanData };
            newMealPlan[day][meal].splice(recipeIndex, 1);
            if (newMealPlan[day][meal].length === 0) {
              delete newMealPlan[day][meal];
            }
            if (Object.keys(newMealPlan[day]).length === 0) {
              delete newMealPlan[day];
            }
            saveMealPlan(newMealPlan);
          },
        },
      ]
    );
  };

  const getRecipeCount = (day, meal) => {
    return mealPlanData[day]?.[meal]?.length || 0;
  };

  const getRecipeCountForDay = (day) => {
    if (!mealPlanData[day]) return 0;
    return Object.values(mealPlanData[day]).reduce((total, meals) => total + meals.length, 0);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
      <Navbar />
      
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.primaryText }}>Meal Plan</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedDay(null);
            setSelectedMeal(null);
            setAddRecipeModalVisible(true);
          }}
          style={{
            backgroundColor: theme.primaryGreen,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name="add" size={16} color="white" />
          <Text style={{ color: 'white', marginLeft: 4, fontWeight: '600' }}>Add Recipe</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ paddingHorizontal: 16, marginTop: 16 }}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {days.map((day) => (
          <View key={day} style={{ marginBottom: 24 }}>
            {/* Day Header */}
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: theme.secondaryGreen,
              borderRadius: 12,
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.primaryText }}>{day}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="restaurant" size={16} color={theme.primaryGreen} />
                <Text style={{ marginLeft: 4, color: theme.primaryGreen, fontWeight: '600' }}>
                  {getRecipeCountForDay(day)} recipes
                </Text>
              </View>
            </View>

            {/* Meals */}
            {meals.map((meal) => (
              <View key={meal} style={{ marginBottom: 16 }}>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 8 
                }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: theme.primaryText }}>{meal}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedDay(day);
                      setSelectedMeal(meal);
                      setAddRecipeModalVisible(true);
                    }}
                    style={{
                      backgroundColor: theme.lightGreen,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="add" size={14} color={theme.primaryGreen} />
                    <Text style={{ color: theme.primaryGreen, marginLeft: 4, fontSize: 12, fontWeight: '600' }}>
                      Add ({getRecipeCount(day, meal)}/3)
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Recipe Cards */}
                {mealPlanData[day]?.[meal]?.map((recipe, index) => (
                  <View
                    key={`${recipe.name}-${index}`}
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderRadius: 12,
                      padding: 12,
                      marginBottom: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      shadowColor: theme.shadow,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                      borderWidth: 1,
                      borderColor: theme.border,
                    }}
                  >
                    <Image
                      source={{ uri: recipe.image }}
                      style={{ width: 50, height: 50, borderRadius: 8, marginRight: 12 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: theme.primaryText, marginBottom: 2 }}>
                        {recipe.name}
                      </Text>
                      <Text style={{ fontSize: 12, color: theme.secondaryText }}>
                        ⭐ {recipe.rating}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeRecipeFromMealPlan(day, meal, index)}
                      style={{
                        backgroundColor: theme.error,
                        padding: 6,
                        borderRadius: 12,
                      }}
                    >
                      <Ionicons name="trash" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Empty State */}
                {(!mealPlanData[day]?.[meal] || mealPlanData[day][meal].length === 0) && (
                  <View style={{
                    backgroundColor: theme.tertiaryBackground,
                    borderRadius: 12,
                    padding: 20,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: theme.borderLight,
                    borderStyle: 'dashed',
                  }}>
                    <Ionicons name="restaurant-outline" size={32} color={theme.tertiaryText} />
                    <Text style={{ color: theme.tertiaryText, marginTop: 8, textAlign: 'center' }}>
                      No recipes planned for {meal.toLowerCase()}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Add Recipe Modal */}
      <Modal
        visible={addRecipeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddRecipeModalVisible(false)}
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
                Add Recipe to Meal Plan
              </Text>
              <TouchableOpacity onPress={() => setAddRecipeModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.primaryText} />
              </TouchableOpacity>
            </View>

            {/* Day and Meal Selection */}
            {!selectedDay && (
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: theme.primaryText, marginBottom: 12 }}>
                  Select Day:
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {days.map((day) => (
                    <TouchableOpacity
                      key={day}
                      onPress={() => setSelectedDay(day)}
                      style={{
                        backgroundColor: theme.tertiaryBackground,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        marginRight: 8,
                        borderWidth: 1,
                        borderColor: theme.border,
                      }}
                    >
                      <Text style={{ color: theme.primaryText, fontWeight: '500' }}>{day}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {selectedDay && !selectedMeal && (
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: theme.primaryText, marginBottom: 12 }}>
                  Select Meal for {selectedDay}:
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  {meals.map((meal) => (
                    <TouchableOpacity
                      key={meal}
                      onPress={() => setSelectedMeal(meal)}
                      style={{
                        backgroundColor: theme.tertiaryBackground,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: theme.border,
                      }}
                    >
                      <Text style={{ color: theme.primaryText, fontWeight: '500' }}>{meal}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Recipe Selection */}
            {selectedDay && selectedMeal && (
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: theme.primaryText, marginBottom: 12 }}>
                  Select Recipe for {selectedMeal} on {selectedDay}:
                </Text>
                <ScrollView style={{ maxHeight: 300 }}>
                  {foodList.map((recipe) => (
                    <TouchableOpacity
                      key={recipe.name}
                      onPress={() => addRecipeToMealPlan(recipe)}
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
              </View>
            )}

            {/* Back Button */}
            {(selectedDay || selectedMeal) && (
              <TouchableOpacity
                onPress={() => {
                  if (selectedMeal) {
                    setSelectedMeal(null);
                  } else if (selectedDay) {
                    setSelectedDay(null);
                  }
                }}
                style={{
                  backgroundColor: theme.secondaryText,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginTop: 16,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      <ImportTab currentPage="MealPlan" />
    </View>
  );
};

export default MealPlan;

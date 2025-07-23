import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, startOfWeek } from 'date-fns';
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image as ExpoImage } from 'expo-image';
import ingredientsData from '../Ingredients';
import { useTheme } from '../theme.jsx';

const MealCard = ({ route, navigation }) => {
  const { food } = route.params;
  const screenHeight = Dimensions.get("window").height;
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);
  const [createCookbookModalVisible, setCreateCookbookModalVisible] = useState(false);
  const [newCookbookName, setNewCookbookName] = useState("");
  const { theme } = useTheme();
  
  // New meal plan states
  const [mealPlanModalVisible, setMealPlanModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [mealPlanData, setMealPlanData] = useState({});

  // Load cookbooks from AsyncStorage on component mount
  useEffect(() => {
    loadCookbooks();
    loadMealPlanData();
  }, []);

  const loadCookbooks = async () => {
    try {
      const savedCookbooks = await AsyncStorage.getItem('cookbooks');
      if (savedCookbooks) {
        setCookbooks(JSON.parse(savedCookbooks));
      }
    } catch (error) {
      console.log('Error loading cookbooks:', error);
    }
  };

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

  const saveMealPlanData = async (updatedMealPlan) => {
    try {
      await AsyncStorage.setItem('mealPlanData', JSON.stringify(updatedMealPlan));
    } catch (error) {
      console.log('Error saving meal plan data:', error);
    }
  };

  const addToMealPlan = (dayKey) => {
    // Get the current week's start date (Monday)
    const today = new Date();
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekKey = format(currentWeekStart, 'yyyy-MM-dd');
    
    if (!mealPlanData[weekKey]) {
      mealPlanData[weekKey] = {};
    }
    
    if (!mealPlanData[weekKey][dayKey]) {
      mealPlanData[weekKey][dayKey] = [];
    }
    
    // Check if recipe is already added to this day in this week
    const isAlreadyAdded = mealPlanData[weekKey][dayKey].some(
      (recipe) => recipe.name === food.name
    );

    if (isAlreadyAdded) {
      Alert.alert('Already Added', `${food.name} is already added to ${dayKey} this week!`);
      return;
    }

    // Check if day already has 3 recipes
    if (mealPlanData[weekKey][dayKey].length >= 3) {
      Alert.alert('Day Full', `${dayKey} already has 3 recipes this week. Please remove one first.`);
      return;
    }

    const updatedMealPlan = {
      ...mealPlanData,
      [weekKey]: {
        ...mealPlanData[weekKey],
        [dayKey]: [...mealPlanData[weekKey][dayKey], {
          name: food.name,
          image: food.image,
          id: food.id,
          rating: food.rating,
          ingredients: food.ingredients,
          method: food.method,
          funFact: food.funFact
        }]
      }
    };

    setMealPlanData(updatedMealPlan);
    saveMealPlanData(updatedMealPlan);
    setMealPlanModalVisible(false);
    Alert.alert('Success', `${food.name} has been added to ${dayKey} this week!`);
  };

  const getDayOptions = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Get the current week's start date
    const today = new Date();
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekKey = format(currentWeekStart, 'yyyy-MM-dd');
    
    return days.map(day => ({
      day,
      recipeCount: mealPlanData[weekKey] && mealPlanData[weekKey][day] ? mealPlanData[weekKey][day].length : 0
    }));
  };

  const saveCookbooks = async (updatedCookbooks) => {
    try {
      await AsyncStorage.setItem('cookbooks', JSON.stringify(updatedCookbooks));
    } catch (error) {
      console.log('Error saving cookbooks:', error);
    }
  };

  // Function to add recipe to cookbook
  const addToCookbook = (cookbookIndex) => {
    const currentCookbook = cookbooks[cookbookIndex];
    
    // Check if the food is already in the cookbook
    const isAlreadyAdded = currentCookbook.recipes.some(
      (recipe) => recipe.name.toLowerCase() === food.name.toLowerCase()
    );

    if (isAlreadyAdded) {
      Alert.alert('Already Added', `${food.name} is already in ${currentCookbook.title}!`);
      setImportModalVisible(false);
      return;
    }

    const updatedCookbooks = [...cookbooks];
    updatedCookbooks[cookbookIndex].recipes.push({
      name: food.name,
      image: food.image,
    });
    setCookbooks(updatedCookbooks);
    saveCookbooks(updatedCookbooks);
    setImportModalVisible(false);
    Alert.alert('Success', `${food.name} has been added to ${cookbooks[cookbookIndex].title}!`);
  };

  // Function to create a new cookbook
  const createNewCookbook = () => {
    if (newCookbookName.trim()) {
      const newCookbook = {
        title: newCookbookName.trim(),
        recipes: [{
          name: food.name,
          image: food.image,
        }]
      };
      const updatedCookbooks = [...cookbooks, newCookbook];
      setCookbooks(updatedCookbooks);
      saveCookbooks(updatedCookbooks);
      setCreateCookbookModalVisible(false);
      setNewCookbookName("");
      Alert.alert('Success', `${food.name} has been added to your new cookbook "${newCookbookName.trim()}"!`);
    } else {
      Alert.alert('Error', 'Please enter a valid cookbook name.');
    }
  };

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

  const Card = ({ children }) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      {children}
    </View>
  );

  return (
    <ScrollView
      style={{ backgroundColor: theme.primaryBackground, flex: 1, paddingTop: '10%', paddingHorizontal: 12 }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Back Button */}
       <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <AntDesign name="left" size={24} color={theme.primaryGreen} />
          <Text style={{ fontSize: 18, color: theme.primaryGreen }}>Back</Text>
        </TouchableOpacity>

      {/* Food Image */}
      <View
        style={{
          height: screenHeight * 0.35,
          position: "relative",
          overflow: "hidden",
          borderRadius: 20,
          marginHorizontal: 10,
          marginBottom: 20,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <ExpoImage
          source={food.image ? { uri: food.image } : require("../../assets/images/Logo.png")}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          placeholder={require("../../assets/images/Logo.png")}
          transition={300}
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
            {food.name}
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
              ⭐ {food.rating}
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
          <ExpoImage
            source={require("../../assets/images/Asset 4.png")}
            style={{ width: 40, height: 40 }}
            contentFit="contain"
            transition={300}
          />
        </View>
      </View>

      {/* Rating and Action Buttons */}
      <View style={{ padding: 20, paddingBottom: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 18, marginBottom: 16, color: theme.primaryText, fontWeight: '600' }}>
          Ready to cook? 
        </Text>
        <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
          <TouchableOpacity
            onPress={() => setMealPlanModalVisible(true)}
            style={{
              backgroundColor: theme.primaryGreen,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 25,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              shadowColor: theme.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Ionicons name="calendar" size={18} color="white" />
            <Text style={{ color: 'white', marginLeft: 8, fontSize: 14, fontWeight: 'bold' }}>
              Meal Plan
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => {
              if (cookbooks.length === 0) {
                setCreateCookbookModalVisible(true);
              } else {
                setImportModalVisible(true);
              }
            }}
            style={{
              backgroundColor: theme.primaryGreen,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 25,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              shadowColor: theme.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Ionicons name="add-circle" size={18} color="white" />
            <Text style={{ color: 'white', marginLeft: 8, fontSize: 14, fontWeight: 'bold' }}>
              Save Recipe
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Ingredients Section */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ backgroundColor: theme.primaryGreen, padding: 8, borderRadius: 20, marginRight: 10 }}>
            <Ionicons name="restaurant" size={20} color="white" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.primaryText }}>
            Ingredients
          </Text>
        </View>
        <View style={{
          backgroundColor: theme.tertiaryBackground,
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
          borderLeftWidth: 4,
          borderLeftColor: theme.primaryGreen,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          {Array.isArray(food.ingredients) ? (
            food.ingredients.map((item, index) => {
              const match = findBestIngredientMatch(item);
              return (
                <View key={index} style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginBottom: 8,
                  paddingVertical: 4,
                }}>
                  {match ? (
                    <Text style={{ fontSize: 18, marginRight: 8 }}>{match.emoji}</Text>
                  ) : (
                    <View style={{ backgroundColor: theme.primaryGreen, width: 6, height: 6, borderRadius: 3, marginRight: 12 }} />
                  )}
                  <Text style={{ fontSize: 16, color: theme.primaryText, flex: 1 }}>
                    {match ? match.name : item}
                    {match && match.name.toLowerCase() !== item.trim().toLowerCase() && (
                      <Text style={{ color: theme.tertiaryText, fontStyle: 'italic', marginLeft: 6 }}> (Did you mean?)</Text>
                    )}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text style={{ fontSize: 16, color: theme.primaryText }}>{food.ingredients}</Text>
          )}
        </View>
      </View>

      {/* Method Section */}
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ backgroundColor: theme.primaryGreen, padding: 8, borderRadius: 20, marginRight: 10 }}>
            <Ionicons name="list" size={20} color="white" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.primaryText }}>
            Method
          </Text>
        </View>
        <View style={{
          backgroundColor: theme.tertiaryBackground,
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
          borderLeftWidth: 4,
          borderLeftColor: theme.primaryGreen,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          {Array.isArray(food.method) ? (
            food.method.map((step, index) => (
              <View key={index} style={{ 
                flexDirection: 'row', 
                marginBottom: 12,
                alignItems: 'flex-start',
              }}>
                <View style={{
                  backgroundColor: theme.primaryGreen,
                  borderRadius: 12,
                  width: 24,
                  height: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                  marginTop: 2,
                }}>
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={{ fontSize: 16, color: theme.primaryText, flex: 1, lineHeight: 22 }}>
                  {step}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{ fontSize: 16, color: theme.primaryText }}>{food.method}</Text>
          )}
        </View>
      </View>

      {/* Fun Fact Section */}
      {food.funFact && (
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ backgroundColor: theme.primaryGreen, padding: 8, borderRadius: 20, marginRight: 10 }}>
              <Ionicons name="bulb" size={20} color="white" />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.primaryText }}>
              Fun Fact
            </Text>
          </View>
          <View style={{
            backgroundColor: theme.lightGreen,
            borderRadius: 16,
            padding: 16,
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: theme.primaryGreen,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 24, marginRight: 8 }}>💡</Text>
              <Text style={{ fontSize: 16, color: theme.primaryText, flex: 1, lineHeight: 22, fontStyle: 'italic' }}>
                {food.funFact}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Import to Cookbook Modal */}
      <Modal visible={importModalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: theme.modalBackground, padding: 20, borderRadius: 12, width: '85%', maxHeight: '70%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: theme.primaryText }}>
              Add to Cookbook
            </Text>
            
            <ScrollView style={{ maxHeight: 300 }}>
              {cookbooks.map((cookbook, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => addToCookbook(index)}
                  style={{
                    padding: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.borderLight,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="book" size={20} color={theme.primaryGreen} />
                  <Text style={{ marginLeft: 8, fontSize: 16, flex: 1, color: theme.primaryText }}>
                    {cookbook.title}
                  </Text>
                  <Text style={{ color: theme.secondaryText, fontSize: 12 }}>
                    {cookbook.recipes.length} recipes
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                setImportModalVisible(false);
                setCreateCookbookModalVisible(true);
              }}
              style={{
                backgroundColor: theme.primaryGreen,
                padding: 12,
                borderRadius: 8,
                marginTop: 16,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Create New Cookbook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setImportModalVisible(false)}
              style={{
                padding: 12,
                marginTop: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: theme.secondaryText }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Create Cookbook Modal */}
      <Modal visible={createCookbookModalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: theme.modalBackground, padding: 20, borderRadius: 12, width: '85%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: theme.primaryText }}>
              Create New Cookbook
            </Text>
            
            <TextInput
              placeholder="Enter cookbook name"
              value={newCookbookName}
              onChangeText={setNewCookbookName}
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

            <TouchableOpacity
              onPress={createNewCookbook}
              style={{
                backgroundColor: theme.primaryGreen,
                padding: 12,
                borderRadius: 8,
                marginBottom: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Create Cookbook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCreateCookbookModalVisible(false);
                setNewCookbookName("");
              }}
              style={{
                padding: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: theme.secondaryText }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add to Meal Plan Modal */}
      <Modal visible={mealPlanModalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ 
            backgroundColor: theme.modalBackground, 
            padding: 24, 
            borderRadius: 20, 
            width: '90%', 
            maxHeight: '75%',
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ 
                backgroundColor: theme.primaryGreen, 
                padding: 8, 
                borderRadius: 20, 
                marginRight: 12 
              }}>
                <Ionicons name="calendar" size={24} color="white" />
              </View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.primaryText }}>
                Add to Meal Plan
              </Text>
            </View>
            
            <Text style={{ 
              fontSize: 16, 
              color: theme.secondaryText, 
              marginBottom: 20, 
              textAlign: 'center',
              lineHeight: 22,
            }}>
              Select a day to add &quot;{food.name}&quot; to your meal plan
            </Text>
            
            <ScrollView 
              style={{ maxHeight: 350 }}
              showsVerticalScrollIndicator={false}
            >
              {getDayOptions().map(({ day, recipeCount }) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => addToMealPlan(day)}
                  style={{
                    padding: 16,
                    marginBottom: 8,
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: recipeCount >= 3 ? theme.tertiaryBackground : theme.cardBackground,
                    borderWidth: 1,
                    borderColor: recipeCount >= 3 ? theme.borderLight : theme.border,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: recipeCount >= 3 ? 0 : 0.1,
                    shadowRadius: 4,
                    elevation: recipeCount >= 3 ? 0 : 2,
                  }}
                  disabled={recipeCount >= 3}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{ 
                      backgroundColor: recipeCount >= 3 ? theme.buttonDisabled : theme.primaryGreen, 
                      padding: 8, 
                      borderRadius: 12,
                      marginRight: 12,
                    }}>
                      <Ionicons name="calendar" size={16} color="white" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ 
                        fontSize: 16, 
                        fontWeight: '600', 
                        color: recipeCount >= 3 ? theme.buttonDisabled : theme.primaryText,
                        marginBottom: 2,
                      }}>
                        {day}
                      </Text>
                      <Text style={{ 
                        color: recipeCount >= 3 ? theme.buttonDisabled : theme.secondaryText, 
                        fontSize: 12,
                      }}>
                        {recipeCount}/3 recipes
                      </Text>
                    </View>
                  </View>
                  <View style={{ 
                    backgroundColor: recipeCount >= 3 ? theme.tertiaryBackground : theme.primaryGreen, 
                    padding: 6, 
                    borderRadius: 12,
                  }}>
                    {recipeCount >= 3 ? (
                      <Ionicons name="close-circle" size={16} color={theme.buttonDisabled} />
                    ) : (
                      <Ionicons name="add" size={16} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setMealPlanModalVisible(false)}
              style={{
                padding: 16,
                marginTop: 20,
                alignItems: 'center',
                borderTopWidth: 1,
                borderTopColor: theme.borderLight,
                paddingTop: 20,
              }}
            >
              <Text style={{ color: theme.secondaryText, fontSize: 16, fontWeight: '500' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MealCard;

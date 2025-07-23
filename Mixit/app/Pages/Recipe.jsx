import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FoodCard3 } from "../Components/FoodCard";
import foodList from "../FoodData";
import { useTheme } from '../theme.jsx';

// ============ Recipe Screen ============
const Recipe = ({ cookbooks = [], setCookbooks = () => {} }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cookbookNameModalVisible, setCookbookNameModalVisible] = useState(false);
  const [activeCookbookIndex, setActiveCookbookIndex] = useState(null);
  const [localCookbooks, setLocalCookbooks] = useState([]);
  const navigation = useNavigation();
  const { theme } = useTheme();

  // Load cookbooks from AsyncStorage on component mount
  useEffect(() => {
    loadCookbooks();
  }, []);

  // Add focus listener to reload cookbooks when returning to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCookbooks();
    });

    return unsubscribe;
  }, [navigation]);

  const loadCookbooks = async () => {
    try {
      const savedCookbooks = await AsyncStorage.getItem('cookbooks');
      if (savedCookbooks) {
        const parsedCookbooks = JSON.parse(savedCookbooks);
        setLocalCookbooks(parsedCookbooks);
        if (setCookbooks) {
          setCookbooks(parsedCookbooks);
        }
      }
    } catch (error) {
      console.log('Error loading cookbooks:', error);
    }
  };

  const saveCookbooks = async (updatedCookbooks) => {
    try {
      await AsyncStorage.setItem('cookbooks', JSON.stringify(updatedCookbooks));
    } catch (error) {
      console.log('Error saving cookbooks:', error);
    }
  };

  const handleCreateCookbook = () => {
    setCookbookNameModalVisible(true);
  };

  const handleConfirmCreateCookbook = (cookbookName) => {
    if (cookbookName.trim()) {
      const newCookbook = {
        title: cookbookName.trim(),
        recipes: [],
      };
      const updatedCookbooks = [...localCookbooks, newCookbook];
      setLocalCookbooks(updatedCookbooks);
      saveCookbooks(updatedCookbooks);
      if (setCookbooks) {
        setCookbooks(updatedCookbooks);
      }
      setCookbookNameModalVisible(false);
    } else {
      alert("Please enter a cookbook name.");
    }
  };

  const handleAddRecipe = (foodName) => {
    const found = foodList.find(
      (item) => item.name.toLowerCase() === foodName.trim().toLowerCase()
    );

    if (!found || activeCookbookIndex === null) {
      alert("Food not found.");
      return;
    }

    // Check if the food is already in the cookbook
    const currentCookbook = localCookbooks[activeCookbookIndex];
    const isAlreadyAdded = currentCookbook.recipes.some(
      (recipe) => recipe.name.toLowerCase() === found.name.toLowerCase()
    );

    if (isAlreadyAdded) {
      alert(`${found.name} is already added to this cookbook!`);
      setModalVisible(false);
      return;
    }

    const updatedCookbooks = [...localCookbooks];
    updatedCookbooks[activeCookbookIndex].recipes.push({
      name: found.name,
      image: found.image,
    });

    setLocalCookbooks(updatedCookbooks);
    saveCookbooks(updatedCookbooks);
    if (setCookbooks) {
      setCookbooks(updatedCookbooks);
    }
    setModalVisible(false);
    alert(`${found.name} has been added to ${currentCookbook.title}!`);
  };

  const handleDeleteCookbook = (index) => {
    const updatedCookbooks = localCookbooks.filter((_, i) => i !== index);
    setLocalCookbooks(updatedCookbooks);
    saveCookbooks(updatedCookbooks);
    if (setCookbooks) {
      setCookbooks(updatedCookbooks);
    }
  };

  const handleDeleteRecipe = (cookbookIndex, recipeIndex) => {
    const updatedCookbooks = [...localCookbooks];
    updatedCookbooks[cookbookIndex].recipes = updatedCookbooks[cookbookIndex].recipes.filter((_, i) => i !== recipeIndex);
    setLocalCookbooks(updatedCookbooks);
    saveCookbooks(updatedCookbooks);
    if (setCookbooks) {
      setCookbooks(updatedCookbooks);
    }
  };

  // Group cookbooks into rows of two
  const groupedCookbooks = [];
  for (let i = 0; i < localCookbooks.length; i += 2) {
    groupedCookbooks.push(localCookbooks.slice(i, i + 2));
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.primaryBackground, paddingTop: 40, paddingHorizontal: 12 }}
      contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Cookbooks Grid in Rows of 2 */}
      {groupedCookbooks.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {row.map((cookbook, index) => {
            const realIndex = rowIndex * 2 + index;
            return (
              <View key={realIndex} style={{ position: 'relative', width: '48%', marginBottom: 16 }}>
                <FoodCard3
                  cardName={cookbook.title}
                  text={`${cookbook.recipes.length} Recipes`}
                  image={cookbook.recipes.slice(0, 3).map((r) => r.image)}
                  onPress={() =>
                    navigation.navigate("Recipe3", {
                      recipes: cookbook.recipes,
                      cookbookTitle: cookbook.title,
                      cookbookIndex: realIndex,
                    })
                  }
                  onLongPress={() => {
                    Alert.alert(
                      'Delete Cookbook',
                      `Are you sure you want to delete "${cookbook.title}"?`,
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Delete', style: 'destructive', onPress: () => handleDeleteCookbook(realIndex) },
                      ]
                    );
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -8,
                    left: 8,
                    zIndex: 10,
                    backgroundColor: theme.cardBackground,
                    borderRadius: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: theme.primaryGreen,
                  }}
                  onPress={() => {
                    setActiveCookbookIndex(realIndex);
                    setModalVisible(true);
                  }}>
                  <Ionicons name="add" size={20} color={theme.primaryGreen} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ))}

      {/* Create New Cookbook */}
      <TouchableOpacity
        style={{
          backgroundColor: theme.primaryBackground,
          paddingVertical: 40,
          width: '40%',
          paddingHorizontal: 16,
          borderRadius: 12,
          marginTop: 16,
          marginLeft: 8,
          marginBottom: 40,
          borderWidth: 2,
          borderColor: theme.primaryGreen,
          alignItems: 'center',
        }}
        onPress={handleCreateCookbook}>
        <Ionicons name="add-circle-outline" size={24} color={theme.primaryGreen} />
        <Text style={{
          color: theme.primaryGreen,
          fontWeight: '600',
          textAlign: 'center',
          marginTop: 8,
        }}>
          Create New Cookbook
        </Text>
      </TouchableOpacity>

      {/* Add Recipe Modal */}
      <Recipe2
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddRecipe={handleAddRecipe}
      />

      {/* Create Cookbook Modal */}
      <CookbookNameModal
        visible={cookbookNameModalVisible}
        onClose={() => setCookbookNameModalVisible(false)}
        onConfirm={handleConfirmCreateCookbook}
      />
    </ScrollView>
  );
};

// ============ Recipe3 Screen (Cookbook Details) ============
export const Recipe3 = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { recipes, cookbookTitle, cookbookIndex } = route.params;
  const { theme } = useTheme();

  const confirmDeleteRecipe = async (idx) => {
    Alert.alert(
      'Delete Recipe',
      `Are you sure you want to delete "${recipes[idx].name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const savedCookbooks = await AsyncStorage.getItem('cookbooks');
              if (savedCookbooks) {
                const cookbooks = JSON.parse(savedCookbooks);
                cookbooks[cookbookIndex].recipes = cookbooks[cookbookIndex].recipes.filter((_, i) => i !== idx);
                await AsyncStorage.setItem('cookbooks', JSON.stringify(cookbooks));
                navigation.goBack();
              }
            } catch (error) {
              console.log('Error deleting recipe:', error);
            }
          }
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: theme.secondaryGreen,
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color={theme.primaryGreen} />
        </TouchableOpacity>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.primaryText,
        }}>
          {cookbookTitle}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Recipes List */}
      <ScrollView style={{ padding: 16 }}>
        {recipes.map((recipe, index) => (
          <View key={index} style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            borderWidth: 1,
            borderColor: theme.border,
          }}>
            <TouchableOpacity
              onPress={() => {
                // Find the complete recipe data from foodList
                const fullRecipe = foodList.find(f => f.name === recipe.name) || recipe;
                navigation.navigate("MealCard", { 
                  food: {
                    id: fullRecipe.id || recipe.id || `recipe-${index}`,
                    name: fullRecipe.name,
                    image: fullRecipe.image,
                    rating: fullRecipe.rating || 4.0,
                    ingredients: fullRecipe.ingredients || [],
                    method: fullRecipe.method || [],
                    funFact: fullRecipe.funFact || ""
                  }
                });
              }}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Image
                source={{ uri: recipe.image }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  marginRight: 16,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: theme.primaryText,
                  marginBottom: 4,
                }}>
                  {recipe.name}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: theme.secondaryText,
                }}>
                  Recipe in cookbook
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.primaryGreen} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => confirmDeleteRecipe(index)}
              style={{
                backgroundColor: theme.error,
                padding: 8,
                borderRadius: 8,
                position: 'absolute',
                top: 16,
                right: 16,
              }}
            >
              <Ionicons name="trash-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}

        {recipes.length === 0 && (
          <View style={{
            alignItems: 'center',
            padding: 40,
          }}>
            <Text style={{
              fontSize: 16,
              color: theme.tertiaryText,
              textAlign: 'center',
            }}>
              No recipes in this cookbook yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// ============ Recipe2 Modal (Add Recipe) ============
export const Recipe2 = ({ visible, onClose, onAddRecipe }) => {
  const [foodName, setFoodName] = useState("");
  const { theme } = useTheme();

  const handleSubmit = () => {
    if (foodName.trim()) {
      onAddRecipe(foodName);
      setFoodName("");
    } else {
      alert("Please enter a food name.");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <View style={{
          backgroundColor: theme.modalBackground,
          borderRadius: 20,
          padding: 24,
          width: "90%",
          alignItems: "center",
          shadowColor: theme.shadow,
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 10,
        }}>
          <TouchableOpacity
            style={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}
            onPress={onClose}
          >
            <Ionicons name="close" size={28} color={theme.primaryText} />
          </TouchableOpacity>
          
          <Text style={{
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 24,
            color: theme.primaryText,
          }}>
            Add Recipe
          </Text>
          
          <TextInput
            placeholder="Enter food name"
            value={foodName}
            onChangeText={setFoodName}
            style={{
              borderWidth: 1,
              borderColor: theme.borderLight,
              borderRadius: 8,
              padding: 12,
              width: "100%",
              marginBottom: 16,
              fontSize: 16,
              backgroundColor: theme.inputBackground,
              color: theme.primaryText,
            }}
            placeholderTextColor={theme.inputPlaceholder}
            autoFocus
          />
          
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: theme.primaryGreen,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 24,
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Add Recipe
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: theme.tertiaryText, fontSize: 16 }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ============ Cookbook Name Modal ============
const CookbookNameModal = ({ visible, onClose, onConfirm }) => {
  const [cookbookName, setCookbookName] = useState("");
  const { theme } = useTheme();

  const handleSubmit = () => {
    onConfirm(cookbookName);
    setCookbookName("");
  };

  const handleClose = () => {
    setCookbookName("");
    onClose();
  };

  return (
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
        alignItems: "center",
      }}>
        <View style={{
          backgroundColor: theme.modalBackground,
          borderRadius: 20,
          padding: 24,
          width: "90%",
          alignItems: "center",
          shadowColor: theme.shadow,
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 10,
        }}>
          <TouchableOpacity
            style={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}
            onPress={handleClose}
          >
            <Ionicons name="close" size={28} color={theme.primaryText} />
          </TouchableOpacity>
          
          <Text style={{
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 24,
            color: theme.primaryText,
          }}>
            Create New Cookbook
          </Text>
          
          <TextInput
            placeholder="Enter cookbook name"
            value={cookbookName}
            onChangeText={setCookbookName}
            style={{
              borderWidth: 1,
              borderColor: theme.borderLight,
              borderRadius: 8,
              padding: 12,
              width: "100%",
              marginBottom: 16,
              fontSize: 16,
              backgroundColor: theme.inputBackground,
              color: theme.primaryText,
            }}
            placeholderTextColor={theme.inputPlaceholder}
            autoFocus
          />
          
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: theme.primaryGreen,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 24,
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Create Cookbook
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleClose}>
            <Text style={{ color: theme.tertiaryText, fontSize: 16 }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Recipe;

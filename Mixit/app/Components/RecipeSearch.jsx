import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import foodList from '../FoodData';
import { useTheme } from '../theme.jsx';

const RecipeSearch = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { theme } = useTheme();

  const handleSearch = () => {
    if (!searchText.trim()) {
      Alert.alert('Error', 'Please enter a recipe name to search');
      return;
    }

    const searchTerm = searchText.trim().toLowerCase();
    console.log('Searching for:', searchTerm);
    
    // Enhanced search algorithm
    const results = foodList.filter(food => {
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

    console.log('Search results:', results);
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleRecipePress = (recipe) => {
    console.log('Selected recipe:', recipe.name);
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: theme.primaryBackground,
      paddingTop: 60,
      paddingHorizontal: 20
    }}>
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 24 
      }}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={theme.primaryGreen} />
        </TouchableOpacity>
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: theme.primaryText,
          marginLeft: 16
        }}>
          Search Recipe
        </Text>
      </View>

      {/* Search Input */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ 
          fontSize: 16, 
          color: theme.secondaryText, 
          marginBottom: 8 
        }}>
          Type the name of a recipe to find it in our database
        </Text>
        <Text style={{ 
          fontSize: 14, 
          color: theme.tertiaryText, 
          marginBottom: 16 
        }}>
          Try: Pancakes, Omelette, French Toast, Caesar Salad, Grilled Salmon, Chocolate Cake
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Type recipe name..."
            value={searchText}
            onChangeText={setSearchText}
            style={{ 
              flex: 1,
              borderWidth: 1, 
              borderColor: theme.borderLight, 
              borderRadius: 12, 
              padding: 16, 
              fontSize: 16,
              backgroundColor: theme.inputBackground,
              color: theme.primaryText,
              marginRight: 12
            }}
            placeholderTextColor={theme.inputPlaceholder}
            autoFocus
            autoCapitalize="words"
            autoCorrect={false}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            onPress={handleSearch}
            disabled={!searchText.trim()}
            style={{ 
              backgroundColor: searchText.trim() ? theme.primaryGreen : theme.buttonDisabled, 
              borderRadius: 12, 
              padding: 16,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Results */}
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {hasSearched && searchResults.length === 0 && (
          <View style={{ 
            alignItems: 'center', 
            padding: 40 
          }}>
            <Ionicons name="search" size={60} color={theme.tertiaryText} />
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: theme.primaryText,
              marginTop: 16,
              textAlign: 'center'
            }}>
              No recipes found
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: theme.secondaryText,
              marginTop: 8,
              textAlign: 'center'
            }}>
              Try searching for a different recipe name
            </Text>
          </View>
        )}

        {searchResults.map((recipe, index) => (
          <TouchableOpacity
            key={recipe.id}
            onPress={() => handleRecipePress(recipe)}
            style={{
              backgroundColor: theme.cardBackground,
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              shadowColor: theme.shadow,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4,
              borderLeftWidth: 4,
              borderLeftColor: theme.primaryGreen,
            }}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                overflow: 'hidden',
                marginRight: 16,
                borderWidth: 2,
                borderColor: theme.primaryGreen,
              }}>
                <Text style={{ 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: theme.lightGreen,
                  textAlign: 'center',
                  lineHeight: 56,
                  fontSize: 24
                }}>
                  🍽️
                </Text>
              </View>
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
                  color: theme.primaryGreen,
                  fontWeight: '500',
                }}>
                  ⭐ {recipe.rating} • {recipe.ingredients?.length || 0} ingredients
                </Text>
              </View>
              <View style={{
                backgroundColor: theme.lightGreen,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
              }}>
                <Ionicons name="arrow-forward" size={16} color={theme.primaryGreen} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecipeSearch; 
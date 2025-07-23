import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image as ExpoImage } from 'expo-image';
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import foodList from "../FoodData";
import { useTheme } from '../theme.jsx';

const Search = ({ searchType = "food", cookbooks = [], setCookbooks = () => {} }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();

  // Filter based on search type
  const filteredResults = searchType === "cookbooks" 
    ? cookbooks.filter((cookbook) =>
        cookbook.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : foodList.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleItemPress = (item) => {
    if (searchType === "cookbooks") {
      // Navigate to cookbook details
      navigation.navigate("Recipe3", {
        recipes: item.recipes,
        cookbookTitle: item.title,
        cookbookIndex: cookbooks.findIndex(cb => cb.title === item.title),
        setCookbooks: setCookbooks,
        cookbooks: cookbooks,
      });
    } else {
      // Navigate to food details
      navigation.navigate("MealCard", { 
        food: {
          id: item.id,
          name: item.name,
          image: item.image,
          rating: item.rating,
          ingredients: item.ingredients,
          method: item.method,
          funFact: item.funFact
        }
      });
    }
  };

  const getPlaceholderText = () => {
    return searchType === "cookbooks" ? "Search for cookbooks..." : "Search for food...";
  };

  return (
    <View style={{ backgroundColor: theme.primaryBackground, paddingTop: 40 }}>
      {/* Search Input with Icon */}
      <View style={{ marginHorizontal: 16, marginBottom: 16, position: 'relative' }}>
        <View style={{
          backgroundColor: theme.secondaryBackground,
          borderRadius: 20,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 6,
          borderWidth: 2,
          borderColor: theme.primaryGreen,
        }}>
          <TextInput
            style={{
              paddingLeft: 50,
              paddingRight: 16,
              paddingVertical: 16,
              fontSize: 16,
              color: theme.primaryText,
            }}
            placeholder={getPlaceholderText()}
            placeholderTextColor={theme.inputPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={() => {
              // This will trigger when user taps the search button on keyboard
              // The search is already live, so this just dismisses the keyboard
            }}
          />
          <Fontisto
            name="search"
            size={20}
            color={theme.primaryGreen}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
            }}
          />
        </View>
      </View>

      {/* Results List */}
      {searchQuery.trim() !== "" && (
        <ScrollView
          style={{ maxHeight: 600 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredResults.map((item, index) => (
            <TouchableOpacity
              key={searchType === "cookbooks" ? index : item.id}
              style={{
                backgroundColor: theme.cardBackground,
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                marginHorizontal: 16,
                shadowColor: theme.shadow,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 4,
                borderLeftWidth: 4,
                borderLeftColor: theme.primaryGreen,
              }}
              onPress={() => handleItemPress(item)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {searchType === "cookbooks" ? (
                  // Cookbook display
                  <View style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: theme.lightGreen,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                    borderWidth: 2,
                    borderColor: theme.primaryGreen,
                  }}>
                    <Fontisto name="bookmark" size={24} color={theme.primaryGreen} />
                  </View>
                ) : (
                  // Food display
                  <View style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    overflow: 'hidden',
                    marginRight: 16,
                    borderWidth: 2,
                    borderColor: theme.primaryGreen,
                  }}>
                    <ExpoImage
                      source={item.image ? { uri: item.image } : require('../../assets/images/Logo.png')}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                      placeholder={require('../../assets/images/Logo.png')}
                      transition={300}
                    />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: theme.primaryText,
                    marginBottom: 4,
                  }}>
                    {searchType === "cookbooks" ? item.title : item.name}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: theme.primaryGreen,
                    fontWeight: '500',
                  }}>
                    {searchType === "cookbooks" 
                      ? `${item.recipes.length} Recipes` 
                      : `⭐ ${item.rating}`
                    }
                  </Text>
                </View>
                <View style={{
                  backgroundColor: theme.lightGreen,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}>
                  <Fontisto 
                    name={searchType === "cookbooks" ? "arrow-right" : "arrow-right"} 
                    size={16} 
                    color={theme.primaryGreen} 
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* No results message */}
      {searchQuery.trim() !== "" && filteredResults.length === 0 && (
        <View style={{
          alignItems: 'center',
          padding: 20,
          marginHorizontal: 16,
        }}>
          <View style={{
            backgroundColor: theme.lightGreen,
            padding: 20,
            borderRadius: 16,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: theme.primaryGreen,
          }}>
            <Fontisto name="search" size={40} color={theme.primaryGreen} />
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: theme.primaryText,
              marginTop: 8,
              textAlign: 'center',
            }}>
              No {searchType === "cookbooks" ? "cookbooks" : "food"} found
            </Text>
            <Text style={{
              fontSize: 14,
              color: theme.primaryGreen,
              marginTop: 4,
              textAlign: 'center',
            }}>
              Try a different search term
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Search;

import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image as ExpoImage } from 'expo-image';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import FoodData from "../FoodData";
import { useTheme } from '../theme.jsx';

const placeholderImage = require('../../assets/images/Logo.png');

const meals = {
  breakfast: {
    name: "Breakfast",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2017/08/smoothie-bowl-3a8632c.jpg",
  },
  lunch: {
    name: "Lunch",
    image:
      "https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF_Y23_M_W27_UK_03_3_low-6510a59e.jpg",
  },
  dinner: {
    name: "Dinner",
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/dinner-ideas-2.jpg",
  },
  supper: {
    name: "Supper",
    image:
      "https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/italian-sunday-supper-0dda667a.jpg",
  },
};

// --------------------- FoodCard (Circular Image Card) ----------------------
const FoodCard = ({ name, image }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (image) ExpoImage.prefetch(image);
  }, [image]);
  
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Detailedfoodlist", {
          mealName: name.toLowerCase(),
        })
      }
      style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 8, marginLeft: 8 }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 50,
          overflow: "hidden",
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 12,
          marginBottom: 6,
          backgroundColor: theme.cardBackground,
        }}
      >
        <ExpoImage
          source={error || !image ? placeholderImage : { uri: image }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          placeholder={placeholderImage}
          onLoadEnd={() => setLoading(false)}
          onError={() => { setError(true); setLoading(false); }}
          transition={300}
        />
        {loading && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(220,220,220,0.3)', justifyContent: 'center', alignItems: 'center' }}>
            <ExpoImage source={placeholderImage} style={{ width: 16, height: 16, opacity: 0.5 }} />
          </View>
        )}
      </View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: theme.primaryText,
          textAlign: "center",
          lineHeight: 18,
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

// --------------------- Horizontal Food Card Scroll ------------------------
const FoodCards = () => {
  const { theme } = useTheme();
  
  // Prefetch images for meals
  useEffect(() => {
    Object.values(meals).forEach(meal => {
      if (meal.image) ExpoImage.prefetch(meal.image);
    });
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {Object.values(meals).map((meal, idx) => (
        <View
          key={meal.name}
          style={{
            marginLeft: idx === 0 ? 2 : 0,
            marginRight: idx === Object.values(meals).length - 1 ? 2 : 12,
          }}
        >
          <FoodCard name={meal.name} image={meal.image} />
        </View>
      ))}
    </ScrollView>
  );
};

// --------------------- Grid of Food Images ------------------------
const FoodCard2Component = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
  // Prefetch all food images for FoodCard2 and Detailedfoodlist
  useEffect(() => {
    FoodData.forEach(food => {
      if (food.image) ExpoImage.prefetch(food.image);
    });
  }, []);

  const handleFoodPress = useCallback((food) => {
    navigation.navigate("MealCard", { 
      food: {
        id: food.id,
        name: food.name,
        image: food.image,
        rating: food.rating,
        ingredients: food.ingredients,
        method: food.method,
        funFact: food.funFact
      }
    });
  }, [navigation]);

  const foodCards = useMemo(() => {
    return FoodData.map((food) => (
      <TouchableOpacity
        key={food.id}
        onPress={() => handleFoodPress(food)}
        style={{
          width: "48%",
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            aspectRatio: 1,
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: theme.cardBackground,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.35,
            shadowRadius: 15,
            elevation: 15,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <ExpoImage
            source={food.image ? { uri: food.image } : placeholderImage}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            placeholder={placeholderImage}
            transition={300}
          />
          
          {/* Gradient overlay for better text readability */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              backgroundColor: "rgba(0, 58, 0, 0.4)",
            }}
          />
          
          {/* Rating badge */}
          <View
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: theme.darkGreen }}>
              ⭐ {food.rating}
            </Text>
          </View>
          
          {/* Food name overlay */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#ffffff",
                textShadowColor: "rgba(0, 0, 0, 0.8)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
                lineHeight: 18,
              }}
            >
              {food.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  }, [handleFoodPress, theme]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 30,
      }}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={6}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {foodCards}
      </View>
    </ScrollView>
  );
};

FoodCard2Component.displayName = "FoodCard2";

export const FoodCard2 = React.memo(FoodCard2Component);

// --------------------- Detailed Food List Page ------------------------
export const Detailedfoodlist = React.memo(() => {
  const route = useRoute();
  const navigation = useNavigation();
  const mealName = route.params?.mealName || "";
  const { theme } = useTheme();

  // Prefetch all food images for FoodCard2 and Detailedfoodlist
  useEffect(() => {
    FoodData.forEach(food => {
      if (food.image) ExpoImage.prefetch(food.image);
    });
  }, []);

  const filteredFoods = useMemo(() => {
    return FoodData.filter((food) =>
      food.id.toLowerCase().startsWith(mealName)
    );
  }, [mealName]);

  const handleFoodPress = useCallback((food) => {
    navigation.navigate("MealCard", { 
      food: {
        id: food.id,
        name: food.name,
        image: food.image,
        rating: food.rating,
        ingredients: food.ingredients,
        method: food.method,
        funFact: food.funFact
      }
    });
  }, [navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const foodCards = useMemo(() => {
    return filteredFoods.map((food) => (
      <View
        key={food.id}
        style={{
          width: "48%",
          marginBottom: 12,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => handleFoodPress(food)}>
          <View
          style={{
            width: "100%",
            aspectRatio: 1,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.border,
            overflow: "hidden",
            backgroundColor: theme.cardBackground,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 12,
            position: "relative",
          }}
        >
          <ExpoImage
            source={food.image ? { uri: food.image } : placeholderImage}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            placeholder={placeholderImage}
            transition={300}
          />
          
          {/* Gradient overlay for better text readability */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              backgroundColor: "rgba(0, 58, 0, 0.4)",
            }}
          />
          
          {/* Food name overlay */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#ffffff",
                textShadowColor: "rgba(0, 0, 0, 0.8)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
                lineHeight: 18,
                textAlign: "center",
              }}
            >
              {food.name}
            </Text>
          </View>
        </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginTop: 8,
            textAlign: "center",
            color: theme.primaryText,
          }}
        >
          ⭐ {food.rating}
        </Text>
      </View>
    ));
  }, [filteredFoods, handleFoodPress, theme]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.primaryBackground }}
      contentContainerStyle={{
        paddingHorizontal: 8,
        paddingTop: "10%",
        paddingBottom: 30,
      }}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={6}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: theme.primaryText,
            textTransform: "capitalize",
          }}
        >
          {mealName}
        </Text>
        <TouchableOpacity
          onPress={handleGoBack}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <AntDesign name="left" size={24} color={theme.primaryGreen} />
          <Text style={{ fontSize: 18, color: theme.primaryGreen }}>Back</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {filteredFoods.length > 0 ? (
          foodCards
        ) : (
          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 16, color: theme.tertiaryText }}>
              No foods found for {mealName || "this meal"}.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
});
Detailedfoodlist.displayName = "Detailedfoodlist";

// --------------------- Grid Layout Addable Card ------------------------
export const FoodCard3 = ({ cardName, image = [], text, onPress, onLongPress }) => {
  const { theme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.primaryBackground, flex: 1, paddingHorizontal: 16, paddingTop: 40 }}>
      <TouchableOpacity
        style={{ 
          borderRadius: 12, 
          borderWidth: 1, 
          borderColor: theme.border, 
          padding: 4, 
          width: 180, 
          height: 150 
        }}
        activeOpacity={0.9}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {/* Image Grid */}
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* Left Large Image */}
          <View style={{ width: '50%', marginRight: 4, backgroundColor: theme.tertiaryBackground, borderRadius: 8, overflow: 'hidden' }}>
            {image[0] ? (
              <ExpoImage
                source={{ uri: image[0] }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            ) : (
              <View style={{ width: '100%', height: '100%', backgroundColor: theme.tertiaryBackground }} />
            )}
          </View>

          {/* Right Stacked Images */}
          <View style={{ width: '48%', justifyContent: 'space-between' }}>
            <View style={{ height: '48%', backgroundColor: theme.tertiaryBackground, borderRadius: 8, overflow: 'hidden', marginBottom: 4 }}>
              {image[1] ? (
                <ExpoImage
                  source={{ uri: image[1] }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ width: '100%', height: '100%', backgroundColor: theme.tertiaryBackground }} />
              )}
            </View>
            <View style={{ height: '48%', backgroundColor: theme.tertiaryBackground, borderRadius: 8, overflow: 'hidden' }}>
              {image[2] ? (
                <ExpoImage
                  source={{ uri: image[2] }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ width: '100%', height: '100%', backgroundColor: theme.tertiaryBackground }} />
              )}
            </View>
          </View>
        </View>

        {/* Footer Text */}
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: theme.primaryText }}>{cardName || "Cookbook"}</Text>
          <Text style={{ fontSize: 12, color: theme.secondaryText }}>{text || "0 Recipes"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Default Export
export default FoodCards;

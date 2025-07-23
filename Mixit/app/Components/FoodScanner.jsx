import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import foodList from '../FoodData';
import foodRecognitionService from '../services/foodRecognition';
import { useTheme } from '../theme.jsx';

const FoodScanner = ({ visible, onClose, onFoodDetected, capturedImageUri }) => {
  
  const [scanning, setScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [detectedFood, setDetectedFood] = useState(null);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  // Debug current state
  // console.log('📊 FoodScanner state:', { scanning, capturedImage, detectedFood, error });

  // Animation values
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // Set captured image when component opens with an image
  useEffect(() => {
    
    if (visible && capturedImageUri) {
      setCapturedImage(capturedImageUri);
      // Start analysis immediately
      // Ensure scanning state is set before calling analyzeFood
      setScanning(true);
      setTimeout(() => {
        analyzeFood(capturedImageUri);
      }, 100); // Small delay to ensure state is set
    } else if (visible) {
      // Reset state when opening without image
      setCapturedImage(null);
      setDetectedFood(null);
      setError(null);
      setScanning(false);
    } else {
    }
  }, [visible, capturedImageUri]);

  // Reset state when modal closes
  useEffect(() => {
    if (!visible) {
      setCapturedImage(null);
      setDetectedFood(null);
      setError(null);
      setScanning(false);
    }
  }, [visible]);

  // Start scanning animations when scanning begins
  useEffect(() => {
    if (scanning) {
      startScanningAnimations();
    } else {
      stopScanningAnimations();
    }
  }, [scanning]);

  const startScanningAnimations = () => {
    // Scanning line animation (moves up and down)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotate animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Scale animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const stopScanningAnimations = () => {
    scanLineAnim.stopAnimation();
    pulseAnim.stopAnimation();
    rotateAnim.stopAnimation();
    
    // Reset values
    scanLineAnim.setValue(0);
    pulseAnim.setValue(1);
    rotateAnim.setValue(0);
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.8);
  };

  const requestCameraPermission = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Please allow camera access in your device settings to scan food items.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => {
              // This would open device settings in a real app
            }}
          ]
        );
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to request camera permission. Please try again.');
      return false;
    }
  };

  const captureImage = async () => {
    try {
      setScanning(true);
      setError(null);
      
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        setScanning(false);
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
        setCapturedImage(result.assets[0].uri);
        await analyzeFood(result.assets[0].uri);
      } else {
        setScanning(false);
      }
    } catch (error) {
      setError('Failed to capture image. Please try again.');
      setScanning(false);
    }
  };

  const analyzeFood = async (imageUri) => {
    try {
      setError(null);
      setDetectedFood(null);
      
      // Use the food recognition service
      const detectedFoodName = await foodRecognitionService.recognizeFood(imageUri);
      
      if (detectedFoodName) {
        // Find matching recipe in our database
        const matchingRecipe = findMatchingRecipe(detectedFoodName);
        
        if (matchingRecipe) {
          setDetectedFood(matchingRecipe);
        } else {
          setError(`Detected "${detectedFoodName}" but no matching recipe found. Try manual input.`);
        }
      } else {
        setError('Could not recognize the food. Please try again or use manual input.');
      }
    } catch (error) {
      setError('Failed to analyze food. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const findMatchingRecipe = (foodName) => {
    if (!foodName) {
      return null;
    }
    
    // Enhanced smart matching algorithm
    const searchTerm = foodName.toLowerCase().trim();
    
    // First, try exact match
    let match = foodList.find(food => 
      food.name.toLowerCase().includes(searchTerm) ||
      searchTerm.includes(food.name.toLowerCase())
    );
    
    if (match) {
      return match;
    }
    
    // Then try partial matching with word splitting
    match = foodList.find(food => {
      const foodWords = food.name.toLowerCase().split(' ');
      const searchWords = searchTerm.split(' ');
      
      return foodWords.some(word => 
        searchWords.some(searchWord => 
          word.includes(searchWord) || searchWord.includes(word)
        )
      );
    });
    
    if (match) {
      return match;
    }
    
    // Try ingredient-based matching
    match = foodList.find(food => {
      if (food.ingredients && Array.isArray(food.ingredients)) {
        return food.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm)
        );
      }
      return false;
    });
    
    if (match) {
      return match;
    }
    
    // Try category-based matching with more specific mappings
    const categoryMatches = {
      'pancake': 'breakfast',
      'waffle': 'breakfast', 
      'french toast': 'breakfast',
      'omelette': 'breakfast',
      'eggs': 'breakfast',
      'bacon': 'breakfast',
      'sausage': 'breakfast',
      'cereal': 'breakfast',
      'oatmeal': 'breakfast',
      'toast': 'breakfast',
      'bagel': 'breakfast',
      'muffin': 'breakfast',
      'salad': 'lunch',
      'sandwich': 'lunch',
      'burger': 'lunch',
      'pizza': 'dinner',
      'pasta': 'dinner',
      'lasagna': 'dinner',
      'spaghetti': 'dinner',
      'chicken': 'dinner',
      'beef': 'dinner',
      'steak': 'dinner',
      'salmon': 'dinner',
      'fish': 'dinner',
      'pork': 'dinner',
      'rice': 'dinner',
      'noodles': 'dinner',
      'soup': 'dinner',
      'stew': 'dinner',
      'curry': 'dinner',
      'stir fry': 'dinner',
      'cake': 'dessert',
      'cookie': 'dessert',
      'ice cream': 'dessert',
      'pie': 'dessert',
      'brownie': 'dessert',
      'chocolate': 'dessert',
      'pudding': 'dessert',
      'cheesecake': 'dessert',
      'tiramisu': 'dessert',
      'donut': 'dessert',
      'cupcake': 'dessert'
    };
    
    const category = categoryMatches[searchTerm];
    if (category) {
      match = foodList.find(food => food.id.toLowerCase().startsWith(category));
      if (match) {
        return match;
      }
    }
    
    // Try fuzzy matching for similar words
    const similarWords = {
      'pancakes': 'pancake',
      'waffles': 'waffle',
      'toasts': 'toast',
      'salads': 'salad',
      'sandwiches': 'sandwich',
      'burgers': 'burger',
      'pizzas': 'pizza',
      'pastas': 'pasta',
      'cakes': 'cake',
      'cookies': 'cookie',
      'chickens': 'chicken',
      'fishes': 'fish',
      'soups': 'soup'
    };
    
    const similarWord = similarWords[searchTerm];
    if (similarWord) {
      match = foodList.find(food => 
        food.name.toLowerCase().includes(similarWord)
      );
      if (match) {
        return match;
      }
    }
    
    return null;
  };

  const handleRetry = () => {
    setCapturedImage(null);
    setDetectedFood(null);
    setError(null);
  };

  const handleUseRecipe = () => {
    if (detectedFood) {
      onFoodDetected(detectedFood);
      onClose();
    }
  };

  const handleManualInput = () => {
    onClose();
    // This will trigger the paste text modal in ImportPopUp
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 60,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: theme.secondaryBackground,
          borderBottomWidth: 1,
          borderBottomColor: theme.borderLight,
        }}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color={theme.primaryText} />
          </TouchableOpacity>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.primaryText,
          }}>
            Food Scanner
          </Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Content */}
        <View style={{ flex: 1, padding: 20 }}>
          {!capturedImage ? (
            // Camera Interface
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{
                width: 280,
                height: 280,
                borderRadius: 140,
                backgroundColor: theme.lightGreen,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 4,
                borderColor: theme.primaryGreen,
                marginBottom: 40,
              }}>
                <Ionicons name="camera" size={80} color={theme.primaryGreen} />
              </View>
              
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.primaryText,
                textAlign: 'center',
                marginBottom: 20,
              }}>
                Point your camera at a food item
              </Text>
              
              <Text style={{
                fontSize: 14,
                color: theme.secondaryText,
                textAlign: 'center',
                marginBottom: 40,
                lineHeight: 20,
              }}>
                We'll identify the food and find matching recipes in our database
              </Text>

              <TouchableOpacity
                onPress={captureImage}
                disabled={scanning}
                style={{
                  backgroundColor: theme.primaryGreen,
                  paddingHorizontal: 40,
                  paddingVertical: 16,
                  borderRadius: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: theme.shadow,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                  marginBottom: 12,
                }}
              >
                {scanning ? (
                  <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
                ) : (
                  <Ionicons name="camera" size={24} color="white" style={{ marginRight: 10 }} />
                )}
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                  {scanning ? 'Opening Camera...' : 'Scan Food'}
                </Text>
              </TouchableOpacity>

              {/* Test Button for Debugging */}
              <TouchableOpacity
                onPress={() => {
                  // Simulate a captured image
                  const testImageUri = 'test-image-uri';
                  setCapturedImage(testImageUri);
                  analyzeFood(testImageUri);
                }}
                disabled={scanning}
                style={{
                  backgroundColor: theme.tertiaryBackground,
                  paddingHorizontal: 40,
                  paddingVertical: 16,
                  borderRadius: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: theme.border,
                  marginTop: 12,
                }}
              >
                <Ionicons name="flask" size={24} color={theme.primaryGreen} style={{ marginRight: 10 }} />
                <Text style={{
                  color: theme.primaryGreen,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                  Test Scanner
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Results Interface
            <View style={{ flex: 1 }}>
              {/* Captured Image with Scanning Overlay */}
              <View style={{
                height: 300,
                borderRadius: 20,
                overflow: 'hidden',
                marginBottom: 20,
                shadowColor: theme.shadow,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
                position: 'relative',
              }}>
                <Image
                  source={{ uri: capturedImage }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
                
                {/* Scanning Overlay */}
                {scanning && (
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  }}>
                    {/* Scanning Line */}
                    <Animated.View
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: 2,
                        backgroundColor: theme.primaryGreen,
                        transform: [{
                          translateY: scanLineAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 280], // Move from top to bottom
                          })
                        }],
                        shadowColor: theme.primaryGreen,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 4,
                        elevation: 8,
                      }}
                    />
                    
                    {/* Corner Scanning Indicators */}
                    <Animated.View
                      style={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        width: 40,
                        height: 40,
                        borderTopWidth: 3,
                        borderLeftWidth: 3,
                        borderColor: theme.primaryGreen,
                        transform: [{
                          rotate: rotateAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg'],
                          })
                        }],
                      }}
                    />
                    <Animated.View
                      style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        width: 40,
                        height: 40,
                        borderTopWidth: 3,
                        borderRightWidth: 3,
                        borderColor: theme.primaryGreen,
                        transform: [{
                          rotate: rotateAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '-360deg'],
                          })
                        }],
                      }}
                    />
                    <Animated.View
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        width: 40,
                        height: 40,
                        borderBottomWidth: 3,
                        borderLeftWidth: 3,
                        borderColor: theme.primaryGreen,
                        transform: [{
                          rotate: rotateAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '-360deg'],
                          })
                        }],
                      }}
                    />
                    <Animated.View
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        width: 40,
                        height: 40,
                        borderBottomWidth: 3,
                        borderRightWidth: 3,
                        borderColor: theme.primaryGreen,
                        transform: [{
                          rotate: rotateAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg'],
                          })
                        }],
                      }}
                    />
                    
                    {/* Pulsing Center Circle */}
                    <Animated.View
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: 'rgba(0, 128, 0, 0.2)',
                        borderWidth: 2,
                        borderColor: theme.primaryGreen,
                        transform: [
                          { translateX: -30 },
                          { translateY: -30 },
                          { scale: pulseAnim }
                        ],
                      }}
                    />
                    
                    {/* Scanning Text */}
                    <Animated.View
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                      }}
                    >
                      <Text style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textShadowColor: 'rgba(0, 0, 0, 0.8)',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 2,
                      }}>
                        Scanning...
                      </Text>
                    </Animated.View>
                  </View>
                )}
              </View>

              {scanning ? (
                // Enhanced Loading State with Animations
                <View style={{ alignItems: 'center', padding: 20 }}>
                  <Animated.View
                    style={{
                      opacity: fadeAnim,
                      transform: [{ scale: scaleAnim }],
                    }}
                  >
                    <View style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      backgroundColor: theme.lightGreen,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 3,
                      borderColor: theme.primaryGreen,
                      marginBottom: 20,
                    }}>
                      <Animated.View
                        style={{
                          transform: [{
                            rotate: rotateAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0deg', '360deg'],
                            })
                          }],
                        }}
                      >
                        <Ionicons name="scan" size={40} color={theme.primaryGreen} />
                      </Animated.View>
                    </View>
                  </Animated.View>
                  
                  <Animated.Text
                    style={{
                      fontSize: 18,
                      color: theme.primaryText,
                      marginBottom: 12,
                      textAlign: 'center',
                      opacity: fadeAnim,
                    }}
                  >
                    Analyzing your food...
                  </Animated.Text>
                  
                  <Animated.Text
                    style={{
                      fontSize: 14,
                      color: theme.secondaryText,
                      textAlign: 'center',
                      opacity: fadeAnim,
                    }}
                  >
                    This may take a few seconds
                  </Animated.Text>
                  
                  {/* Progress Dots */}
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    {[0, 1, 2].map((index) => (
                      <Animated.View
                        key={index}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: theme.primaryGreen,
                          marginHorizontal: 4,
                          opacity: pulseAnim,
                          transform: [{
                            scale: pulseAnim.interpolate({
                              inputRange: [1, 1.2],
                              outputRange: [0.8, 1.2],
                            })
                          }]
                        }}
                      />
                    ))}
                  </View>
                </View>
              ) : error ? (
                // Error State
                <View style={{ alignItems: 'center', padding: 20 }}>
                  <Ionicons name="alert-circle" size={60} color={theme.error} />
                  <Text style={{
                    fontSize: 16,
                    color: theme.primaryText,
                    marginTop: 16,
                    textAlign: 'center',
                    marginBottom: 20,
                  }}>
                    {error}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity
                      onPress={handleRetry}
                      style={{
                        backgroundColor: theme.primaryGreen,
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Try Again</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={handleManualInput}
                      style={{
                        backgroundColor: theme.tertiaryBackground,
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: theme.border,
                      }}
                    >
                      <Text style={{ color: theme.primaryText, fontWeight: 'bold' }}>Manual Input</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : detectedFood ? (
                // Success State with Animation
                <View style={{ alignItems: 'center', padding: 20 }}>
                  <Animated.View
                    style={{
                      opacity: fadeAnim,
                      transform: [{ scale: scaleAnim }],
                    }}
                  >
                    <View style={{
                      backgroundColor: theme.lightGreen,
                      padding: 16,
                      borderRadius: 16,
                      alignItems: 'center',
                      marginBottom: 20,
                      borderWidth: 2,
                      borderColor: theme.primaryGreen,
                    }}>
                      <Ionicons name="checkmark-circle" size={40} color={theme.primaryGreen} />
                      <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: theme.primaryText,
                        marginTop: 8,
                        textAlign: 'center',
                      }}>
                        Food Detected!
                      </Text>
                    </View>
                  </Animated.View>
                  
                  <View style={{
                    backgroundColor: theme.cardBackground,
                    padding: 20,
                    borderRadius: 16,
                    width: '100%',
                    marginBottom: 20,
                    borderWidth: 1,
                    borderColor: theme.border,
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: theme.primaryText,
                      marginBottom: 8,
                    }}>
                      {detectedFood.name}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: theme.secondaryText,
                      marginBottom: 12,
                    }}>
                      ⭐ {detectedFood.rating} • {detectedFood.ingredients?.length || 0} ingredients
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: theme.tertiaryText,
                    }}>
                      We found a matching recipe in our database!
                    </Text>
                  </View>
                  
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity
                      onPress={handleUseRecipe}
                      style={{
                        backgroundColor: theme.primaryGreen,
                        paddingHorizontal: 32,
                        paddingVertical: 16,
                        borderRadius: 25,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Ionicons name="restaurant" size={20} color="white" style={{ marginRight: 8 }} />
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                        View Recipe
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={handleRetry}
                      style={{
                        backgroundColor: theme.tertiaryBackground,
                        paddingHorizontal: 24,
                        paddingVertical: 16,
                        borderRadius: 25,
                        borderWidth: 1,
                        borderColor: theme.border,
                      }}
                    >
                      <Text style={{ color: theme.primaryText, fontWeight: 'bold' }}>Scan Again</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default FoodScanner; 
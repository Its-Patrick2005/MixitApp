import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useTheme } from '../theme.jsx';

const GroceryMap = ({ visible, onClose, recipeName }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [showDirections, setShowDirections] = useState(false);
  const mapRef = useRef(null);
  const { theme } = useTheme();

  // Helper to determine if a store is open based on its hours
  function isStoreOpen(hours) {
    if (!hours) return false;
    // Example: "7:00 AM - 10:00 PM"
    const now = new Date();
    let [openStr, closeStr] = hours.split(' - ');
    if (!openStr || !closeStr) return false;
    // Parse times
    const parseTime = (str) => {
      const [time, meridian] = str.trim().split(' ');
      let [h, m] = time.split(':').map(Number);
      if (meridian.toUpperCase() === 'PM' && h !== 12) h += 12;
      if (meridian.toUpperCase() === 'AM' && h === 12) h = 0;
      return { h, m };
    };
    const { h: openH, m: openM } = parseTime(openStr);
    const { h: closeH, m: closeM } = parseTime(closeStr);
    const openDate = new Date(now);
    openDate.setHours(openH, openM, 0, 0);
    const closeDate = new Date(now);
    closeDate.setHours(closeH, closeM, 0, 0);
    // Handle overnight (close < open)
    if (closeDate <= openDate) closeDate.setDate(closeDate.getDate() + 1);
    if (now >= openDate && now <= closeDate) return true;
    return false;
  }

  // Sample grocery store data (in a real app, you'd use Google Places API)
  const sampleStores = [
    {
      id: 1,
      name: "KNUST Junction Mall",
      type: "Mall",
      distance: "1.5 km",
      rating: 4.6,
      address: "KNUST Junction, Kumasi, Ghana",
      coordinates: { latitude: 6.6915, longitude: -1.5655 },
      hours: "9:00 AM - 9:00 PM"
    },
    {
      id: 2,
      name: "Ayeduase Market",
      type: "Open Market",
      distance: "0.8 km",
      rating: 4.4,
      address: "Ayeduase, Kumasi, Ghana",
      coordinates: { latitude: 6.6781, longitude: -1.5617 },
      hours: "6:00 AM - 7:00 PM"
    },
    {
      id: 3,
      name: "Tech Supermart",
      type: "Supermarket",
      distance: "2.2 km",
      rating: 4.7,
      address: "Tech Junction, Kumasi, Ghana",
      coordinates: { latitude: 6.6935, longitude: -1.5731 },
      hours: "8:00 AM - 10:00 PM"
    },
    {
      id: 4,
      name: "Fresh Market",
      type: "Supermarket",
      distance: "1.0 km",
      rating: 4.5,
      address: "Ayeduase Road, Kumasi, Ghana",
      coordinates: { latitude: 6.6802, longitude: -1.5599 },
      hours: "7:00 AM - 10:00 PM"
    },
    {
      id: 5,
      name: "Sunset Plaza",
      type: "Mall",
      distance: "2.8 km",
      rating: 4.3,
      address: "Oduom, Kumasi, Ghana",
      coordinates: { latitude: 6.6742, longitude: -1.5610 },
      hours: "9:00 AM - 8:00 PM"
    },
    {
      id: 6,
      name: "Harbor Food Hall",
      type: "Food Hall",
      distance: "2.5 km",
      rating: 4.9,
      address: "Bomso, Kumasi, Ghana",
      coordinates: { latitude: 6.6862, longitude: -1.5618 },
      hours: "11:00 AM - 11:00 PM"
    },
    // --- Additional real locations ---
    {
      id: 7,
      name: "MaxMart Supermarket",
      type: "Supermarket",
      distance: "2.3 km",
      rating: 4.8,
      address: "MaxMart, Tech Junction, Kumasi, Ghana",
      coordinates: { latitude: 6.6939, longitude: -1.5737 },
      hours: "8:00 AM - 10:00 PM"
    },
    {
      id: 8,
      name: "Melcom Plus Kumasi",
      type: "Department Store",
      distance: "5.5 km",
      rating: 4.5,
      address: "Melcom Plus, Ahodwo Roundabout, Kumasi, Ghana",
      coordinates: { latitude: 6.6666, longitude: -1.6242 },
      hours: "8:00 AM - 9:00 PM"
    },
    {
      id: 9,
      name: "Kumasi City Mall",
      type: "Mall",
      distance: "4.2 km",
      rating: 4.7,
      address: "Asokwa, Kumasi, Ghana",
      coordinates: { latitude: 6.6786, longitude: -1.6163 },
      hours: "9:00 AM - 10:00 PM"
    },
    {
      id: 10,
      name: "Anloga Market",
      type: "Open Market",
      distance: "6.0 km",
      rating: 4.2,
      address: "Anloga Junction, Kumasi, Ghana",
      coordinates: { latitude: 6.7012, longitude: -1.6015 },
      hours: "6:00 AM - 7:00 PM"
    },
    {
      id: 11,
      name: "A-Life Supermarket",
      type: "Supermarket",
      distance: "1.2 km",
      rating: 4.6,
      address: "A-Life, Ayeduase, Kumasi, Ghana",
      coordinates: { latitude: 6.6795, longitude: -1.5605 },
      hours: "7:30 AM - 9:30 PM"
    }
  ];

  // Add dynamic open/closed status based on hours
  const storesWithOpenStatus = sampleStores.map(store => ({
    ...store,
    open: isStoreOpen(store.hours)
  }));

  useEffect(() => {
    if (visible) {
      // Set stores immediately with default coordinates
      setNearbyStores(storesWithOpenStatus);
      // Get location in background (non-blocking)
      getCurrentLocation();
    }
  }, [visible]);

  const getCurrentLocation = async () => {
    try {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Update current region to focus on user location
      const newRegion = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setCurrentRegion(newRegion);

      // Animate map to user location
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }

      // Update store coordinates based on user location
      const storesWithCoordinates = storesWithOpenStatus.map((store, index) => ({
        ...store,
        coordinates: {
          latitude: currentLocation.coords.latitude + (Math.random() - 0.5) * 0.01,
          longitude: currentLocation.coords.longitude + (Math.random() - 0.5) * 0.01,
        }
      }));

      setNearbyStores(storesWithCoordinates);
    } catch (error) {
      console.log('Error getting location:', error);
      setErrorMsg('Could not get your location');
    }
  };

  const handleStorePress = (store) => {
    setSelectedStore(store);
  };

  const getDirections = (store) => {
    if (!location) {
      Alert.alert("Location Required", "Please allow location access to get directions.");
      return;
    }

    // Generate route coordinates (in a real app, you'd use Google Directions API)
    const startPoint = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    
    const endPoint = store.coordinates;
    
    // Create a simple route with waypoints (in real app, this would come from Directions API)
    const routePoints = [
      startPoint,
      {
        latitude: (startPoint.latitude + endPoint.latitude) / 2 + 0.001,
        longitude: (startPoint.longitude + endPoint.longitude) / 2 + 0.001,
      },
      {
        latitude: (startPoint.latitude + endPoint.latitude) / 2 - 0.001,
        longitude: (startPoint.longitude + endPoint.longitude) / 2 - 0.001,
      },
      endPoint
    ];
    
    setRouteCoordinates(routePoints);
    setSelectedStore(store);
    setShowDirections(true);
    
    // Fit map to show entire route
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(routePoints, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
    
    Alert.alert(
      "Directions Active",
      `Showing route to ${store.name}. Tap 'Clear Route' to remove directions.`,
      [{ text: "OK" }]
    );
  };

  const clearDirections = () => {
    setRouteCoordinates([]);
    setSelectedStore(null);
    setShowDirections(false);
  };

  const getStoreIcon = (storeType) => {
    switch (storeType) {
      case 'Supermarket':
        return 'storefront';
      case 'Organic Store':
        return 'leaf';
      case 'Convenience Store':
        return 'basket';
      case 'Farmers Market':
        return 'flower';
      default:
        return 'storefront';
    }
  };

  const focusOnUserLocation = () => {
    if (location) {
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setCurrentRegion(newRegion);
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    } else {
      // If no location yet, try to get it
      getCurrentLocation();
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.secondaryBackground, borderBottomColor: theme.borderLight }]}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.primaryGreen} />
            <Text style={[styles.backText, { color: theme.primaryGreen }]}>Back</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.primaryText }]}>Nearby Stores</Text>
          <TouchableOpacity onPress={getCurrentLocation} style={styles.refreshButton}>
            <Ionicons name="refresh" size={24} color={theme.primaryGreen} />
          </TouchableOpacity>
        </View>

        {errorMsg ? (
          <View style={styles.errorContainer}>
            <Ionicons name="location-off" size={48} color={theme.error} />
            <Text style={[styles.errorText, { color: theme.secondaryText }]}>{errorMsg}</Text>
            <TouchableOpacity onPress={getCurrentLocation} style={[styles.retryButton, { backgroundColor: theme.primaryGreen }]}>
              <Text style={[styles.retryText, { color: theme.inverseText }]}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Map */}
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={currentRegion}
              region={currentRegion}
              showsUserLocation={true}
              showsMyLocationButton={false}
              onRegionChangeComplete={setCurrentRegion}
            >
              {/* User location marker */}
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="Your Location"
                  description="You are here"
                  pinColor={theme.primaryGreen}
                />
              )}

              {/* Store markers */}
              {nearbyStores.map((store) => (
                <Marker
                  key={store.id}
                  coordinate={store.coordinates}
                  title={store.name}
                  description={`${store.type} • ${store.distance}`}
                  onPress={() => handleStorePress(store)}
                >
                  <View style={styles.markerContainer}>
                    <View style={[styles.marker, { backgroundColor: store.open ? theme.primaryGreen : theme.error }]}>
                      <Ionicons 
                        name={getStoreIcon(store.type)} 
                        size={16} 
                        color="white" 
                      />
                    </View>
                  </View>
                </Marker>
              ))}

              {/* Route polyline */}
              {routeCoordinates.length > 0 && (
                <Polyline
                  coordinates={routeCoordinates}
                  strokeColor={theme.routeColor}
                  strokeWidth={4}
                  lineDashPattern={[1]}
                />
              )}
            </MapView>

            {/* Location Focus Button */}
            <TouchableOpacity
              style={[styles.locationButton, { backgroundColor: theme.secondaryBackground, shadowColor: theme.shadow }]}
              onPress={focusOnUserLocation}
            >
              <Ionicons name="locate" size={24} color={theme.primaryGreen} />
            </TouchableOpacity>

            {/* Store List with Scroll */}
            <View style={[styles.storeList, { backgroundColor: theme.secondaryBackground }]}> 
              <Text style={[styles.listTitle, { color: theme.primaryText }]}>Stores near you</Text>
              <ScrollView style={{ maxHeight: 220 }} showsVerticalScrollIndicator={true}>
                {nearbyStores.map((store) => (
                  <TouchableOpacity
                    key={store.id}
                    style={[
                      styles.storeItem, 
                      { 
                        backgroundColor: selectedStore?.id === store.id ? theme.lightGreen : theme.tertiaryBackground,
                        borderColor: selectedStore?.id === store.id ? theme.primaryGreen : theme.borderLight,
                      }
                    ]}
                    onPress={() => handleStorePress(store)}
                  >
                    <View style={styles.storeInfo}>
                      <View style={styles.storeHeader}>
                        <Text style={[styles.storeName, { color: theme.primaryText }]}>{store.name}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: store.open ? theme.lightGreen : '#ffe6e6' }]}> 
                          <Text style={[styles.statusText, { color: store.open ? theme.primaryGreen : theme.error }]}> 
                            {store.open ? 'Open' : 'Closed'}
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.storeType, { color: theme.secondaryText }]}>{store.type}</Text>
                      <View style={styles.storeDetails}>
                        <Text style={[styles.storeDistance, { color: theme.primaryGreen }]}>{store.distance}</Text>
                        <Text style={[styles.storeRating, { color: theme.secondaryText }]}>⭐ {store.rating}</Text>
                      </View>
                      <Text style={[styles.storeAddress, { color: theme.tertiaryText }]}>{store.address}</Text>
                      <Text style={[styles.storeHours, { color: theme.tertiaryText }]}>{store.hours}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.directionsButton, 
                        { 
                          backgroundColor: showDirections && selectedStore?.id === store.id ? '#ffe6e6' : theme.lightGreen,
                          borderColor: showDirections && selectedStore?.id === store.id ? theme.error : theme.primaryGreen,
                        }
                      ]}
                      onPress={() => showDirections && selectedStore?.id === store.id ? clearDirections() : getDirections(store)}
                    >
                      <Ionicons 
                        name={showDirections && selectedStore?.id === store.id ? "close-circle" : "navigate"} 
                        size={20} 
                        color={showDirections && selectedStore?.id === store.id ? theme.error : theme.primaryGreen} 
                      />
                      <Text style={[
                        styles.directionsText, 
                        { color: showDirections && selectedStore?.id === store.id ? theme.error : theme.primaryGreen }
                      ]}>
                        {showDirections && selectedStore?.id === store.id ? "Clear Route" : "Directions"}
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9ECD9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#008000',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003A00',
  },
  refreshButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: '#008000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  map: {
    flex: 1,
    height: Dimensions.get('window').height * 0.4,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  storeList: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
    maxHeight: Dimensions.get('window').height * 0.5,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003A00',
    marginBottom: 16,
  },
  storeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedStore: {
    backgroundColor: '#e8f5e8',
    borderColor: '#008000',
  },
  storeInfo: {
    flex: 1,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003A00',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  storeType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  storeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeDistance: {
    fontSize: 14,
    color: '#008000',
    fontWeight: 'bold',
    marginRight: 12,
  },
  storeRating: {
    fontSize: 14,
    color: '#666',
  },
  storeAddress: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  storeHours: {
    fontSize: 12,
    color: '#888',
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#008000',
  },
  directionsText: {
    color: '#008000',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  clearRouteButton: {
    backgroundColor: '#ffe6e6',
    borderColor: '#ff6b6b',
  },
  clearRouteText: {
    color: '#ff6b6b',
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default GroceryMap; 

import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const HomeMap = ({ location, defaultLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(location || defaultLocation);
  const [loading, setLoading] = useState(!location); // Set loading based on location availability

  useEffect(() => {
    if (location) {
      setCurrentLocation(location);
      setLoading(false);
    } else {
      setLoading(false); // If no location, stop loading
    }
  }, [location]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!currentLocation) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Unable to retrieve location.</Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}
    >
      <Marker coordinate={currentLocation} title="You are here" />
    </MapView>
  );
};

export default HomeMap;

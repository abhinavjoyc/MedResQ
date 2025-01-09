import React, { useEffect, useState } from "react";
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'; // Import geolocation

const HomeMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Get the current location when the component mounts
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Update the location and region to the current location
        setCurrentLocation({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,  // Zoom level
          longitudeDelta: 0.01, // Zoom level
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }, []);

  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      showsUserLocation={true} // Show the blue dot for user's location
      region={currentLocation ? region : undefined} // Update region once the location is obtained
      onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Optional: Update region on user interaction
    >
      {/* Marker removed */}
    </MapView>
  );
};

export default HomeMap;

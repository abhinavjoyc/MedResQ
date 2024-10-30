import React from "react";
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyC2UTgVYWcirXvwstn9wNrZrmw0t8HRU1s';

// Predefined origin and destination locations
const PRESET_ORIGIN = {
  latitude: 37.78825, // Example coordinates
  longitude: -122.4324,
};

const PRESET_DESTINATION = {
  latitude: 37.79425, // Example coordinates
  longitude: -122.4264,
};

const RouteMap = ({ origin = PRESET_ORIGIN, destination = PRESET_DESTINATION }) => {
  // Safe checking for nested properties
  const originLoc = origin?.details?.geometry?.location ? {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  } : {
    latitude: PRESET_ORIGIN.latitude,
    longitude: PRESET_ORIGIN.longitude,
  };

  const destinationLoc = destination?.details?.geometry?.location ? {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  } : {
    latitude: PRESET_DESTINATION.latitude,
    longitude: PRESET_DESTINATION.longitude,
  };

  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: originLoc.latitude,
        longitude: originLoc.longitude,
        latitudeDelta: 0.005,  // Smaller delta for closer focus
        longitudeDelta: 0.005,
      }}
    >
      {/* Render route directions only if destination is available */}
      {destinationLoc && (
        <MapViewDirections
          origin={originLoc}
          destination={destinationLoc}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="black"
        />
      )}

      {/* Marker for origin */}
      <Marker
        coordinate={originLoc}
        title={'Origin'}
      />

      {/* Marker for destination, if available */}
      <Marker
        coordinate={destinationLoc}
        title={"Destination"}
      />
    </MapView>
  );
};

export default RouteMap;
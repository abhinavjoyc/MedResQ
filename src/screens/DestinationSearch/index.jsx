import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import PlaceRow from './PlaceRow';
import Footer from '../../components/HomeFooter'; // Import the Footer component

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};

const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const DestinationSearch = (props) => {
  const [originPlace, setOriginPlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);

  const navigation = useNavigation();

  const checkNavigation = () => {
    if (originPlace && destinationPlace) {
      console.log('Origin:', originPlace); // Log origin place
      console.log('Destination:', destinationPlace); // Log destination place
      navigation.navigate('results', {
        originPlace,
        destinationPlace,
      });
    }
  };

  useEffect(() => {
    checkNavigation();
  }, [originPlace, destinationPlace]);

  return (
    <SafeAreaView style={localStyles.container}>
      <View style={localStyles.content}>
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            setOriginPlace({ data, details });
            console.log('Origin Place Selected:', { data, details }); // Log the origin place as soon as it is selected
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel="Current location"
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyC2UTgVYWcirXvwstn9wNrZrmw0t8HRU1s', // Your API Key
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        />

        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDestinationPlace({ data, details });
            console.log('Destination Place Selected:', { data, details }); // Log the destination place as soon as it is selected
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          styles={{
            textInput: styles.textInput,
            container: {
              ...styles.autocompleteContainer,
              top: 55,
            },
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyC2UTgVYWcirXvwstn9wNrZrmw0t8HRU1s', // Your API Key
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
        />

        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
        <View style={styles.line} />

        {/* Square near Destination input */}
        <View style={styles.square} />
      </View>

      {/* Footer stays at the bottom */}
      <Footer />
    </SafeAreaView>
  );
};

export default DestinationSearch;

// Add styles if not already in './styles.js'
const localStyles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
  },
  content: {
    flex: 1, // Content takes up all available space
    justifyContent: 'flex-start', // Push content to the top
  },
});

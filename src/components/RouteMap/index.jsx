import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase/supabaseClient'; // Adjust the import based on your project structure

const GOOGLE_MAPS_APIKEY = 'AIzaSyC2UTgVYWcirXvwstn9wNrZrmw0t8HRU1s';

const RouteMap = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true); // Set loading to true before the fetch
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw new Error('Error fetching session: ' + sessionError.message);
        if (!session) throw new Error('No active session found.');

        const userId = session.user.id;

        const { data: driverData, error: driverError } = await supabase
          .from('drivers')
          .select('latitude, longitude, accidentid')
          .eq('user_id', userId)
          .single();

        if (driverError) throw new Error('Error fetching driver data: ' + driverError.message);
        if (!driverData) throw new Error('No driver data found.');

        const { latitude, longitude, accidentid } = driverData;

        const { data: accidentData, error: accidentError } = await supabase
          .from('accidents')
          .select('lattitude, longtitude')
          .eq('accidentid', accidentid)
          .single();

        if (accidentError) throw new Error('Error fetching accident data: ' + accidentError.message);
        if (!accidentData) throw new Error('No accident data found.');

        const { lattitude, longtitude } = accidentData;

        setOrigin({ latitude, longitude });
        setDestination({ latitude: lattitude, longitude: longtitude });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchLocations();
  }, []);

  const handleNavigation = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session.user.id;

      const { error: updateError } = await supabase
        .from('drivers')
        .update({ accidentid: null })
        .eq('user_id', userId);

      if (updateError) throw new Error('Error updating driver data: ' + updateError.message);

      navigation.navigate('Home');
    } catch (err) {
      console.error(err.message);
    }
  };

  if (error) return <View><Text>Error: {error}</Text></View>;
  if (loading) return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="blue"
        />

        <Marker coordinate={origin} title={'Origin'} />
        <Marker coordinate={destination} title={"Destination"} />
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title="End Navigation" onPress={handleNavigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RouteMap;

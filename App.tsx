import React, { useEffect, useState, useRef } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { supabase } from './src/supabase/supabaseClient';
import AuthScreen from './Authscreen';
import RootNavigator from './src/navigation/root'; // No NavigationContainer here
import { NavigationContainer } from '@react-navigation/native';

function App() {
  const [session, setSession] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationInterval, setLocationInterval] = useState(null);
  const [accidentCheckInterval, setAccidentCheckInterval] = useState(null);
  const navigationRef = useRef(null); // Create a ref for navigation

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        console.log('Session fetched successfully:', data.session);
        setSession(data.session);
      }
    };

    fetchSession();

    // Setup authentication listener
    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session);
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe(); // Call unsubscribe correctly
    };
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          startLocationUpdates();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      Geolocation.requestAuthorization();
      startLocationUpdates();
    }
  };

  const startLocationUpdates = () => {
    if (locationInterval) clearInterval(locationInterval);

    const intervalId = setInterval(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('Current location:', position.coords);
          setCurrentLocation(position.coords);
          saveLocationToDatabase(position.coords);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
      );
    }, 1000);

    setLocationInterval(intervalId);
  };

  const saveLocationToDatabase = async (coords) => {
    const { latitude, longitude } = coords;

    if (session?.user) {
      const { error } = await supabase
        .from('drivers')
        .upsert({ user_id: session.user.id, latitude, longitude }, { onConflict: ['user_id'] });

      if (error) {
        console.error('Error saving location:', error);
      } else {
        console.log('Location updated in database');
      }
    }
  };

  const checkAccidentStatus = async () => {
    if (session?.user) {
      const { data, error } = await supabase
        .from('drivers')
        .select('accidentid')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching accident status:', error);
      } else if (data?.accidentid) {
        console.log('Accident detected, navigating to Settings');
        navigationRef.current?.navigate('Settings'); // Use the ref to navigate
      } else {
        console.log('No accident detected');
      }
    }
  };

  useEffect(() => {
    if (session) {
      requestLocationPermission();

      const intervalId = setInterval(() => {
        checkAccidentStatus();
      }, 5000); // Check every 5 seconds

      setAccidentCheckInterval(intervalId);
    } else {
      if (locationInterval) {
        clearInterval(locationInterval);
      }
      if (accidentCheckInterval) {
        clearInterval(accidentCheckInterval);
      }
    }

    return () => {
      if (locationInterval) clearInterval(locationInterval);
      if (accidentCheckInterval) clearInterval(accidentCheckInterval);
    };
  }, [session]);

  return (
    <NavigationContainer ref={navigationRef}>
      {session ? <RootNavigator userId={session.user.id} /> : <AuthScreen />}
    </NavigationContainer>
  );
}

export default App;

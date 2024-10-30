import React, { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import { supabase } from './src/supabase/supabaseClient';
import AuthScreen from './Authscreen';
import RootNavigator from './src/navigation/root';
import { Session } from '@supabase/supabase-js';

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setSession(data.session);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const fetchLocation = async () => {
    const permissionGranted = await requestLocationPermission();
    if (permissionGranted) {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false);
        },
        error => {
          console.error("Error getting location: ", error);
          Alert.alert("Location Error", "Could not retrieve your location.");
          setLocation(null);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        }
      );
    } else {
      Alert.alert(
        "Location Permission Required",
        "This app needs access to your location. Please grant permission.",
        [{ text: "OK", onPress: () => requestLocationPermission() }]
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  return session ? <RootNavigator location={location} /> : <AuthScreen />;
};

export default App;

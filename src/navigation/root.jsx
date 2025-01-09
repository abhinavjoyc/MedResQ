import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DestinationSearch from '../screens/DestinationSearch';
import SearchResults from '../screens/SearchResults';
import Profile from '../screens/Profile';
import Messages from '../screens/Messsages';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome" // Set Welcome as the initial screen
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Destination" component={DestinationSearch} />
      <Stack.Screen name="Results" component={SearchResults} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

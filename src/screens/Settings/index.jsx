import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeFooter from '../../components/HomeFooter';
import RouteMap from '../../components/RouteMap';

export default function Settings() {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <RouteMap />
      </View>
      <View style={styles.footerContainer}>
        <HomeFooter />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  footerContainer: {
    // Add any specific styles for the footer container if needed
  },
});
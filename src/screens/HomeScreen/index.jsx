import React, { Component } from 'react';
import { Dimensions, SafeAreaView, View, StyleSheet } from 'react-native';
import HomeMap from '../../components/HomeMap';
import CovidMessage from '../../components/CovidMessage'; // Assuming this is used somewhere
import HomeSearch from '../../components/HomeSearch';
import Footer from '../../components/HomeFooter';

export default class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <HomeMap />
        </View>
        <View>
          <Footer />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1, // Takes up remaining space
  },
  searchContainer: {
    paddingBottom: 30, // Adds space below the search component
  },
});
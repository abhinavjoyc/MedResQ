import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React from 'react';
import HomeFooter from '../../components/HomeFooter';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              style={styles.avatar}
              source={{ uri: 'https://via.placeholder.com/150' }} // Replace with an actual image URL
            />
          </View>
          <Text style={styles.userName}>Vadim Savin</Text>
          <Text style={styles.userRating}>5.00 ★</Text>
        </View>
        <View style={styles.menuItem}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.menuItemText}>Do more with your account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuItem}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.menuItemText}>Make money driving</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuItem}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.menuItemText}>Your trips</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuItem}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.menuItemText}>Help</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuItem}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.menuItemText}>Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>
      <HomeFooter/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,  // Ensures that content uses all available space, pushing footer to the bottom
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007AFF', // Bright blue header background
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // White text color for better visibility on blue background
  },
  userRating: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)', // Lighter white for the rating to add some distinction
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Light grey color for item separators
    backgroundColor: '#F9F9F9', // Light background color for each item
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333', // Dark grey text for better readability
  }
});

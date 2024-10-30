import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you're using the correct icon library
import { useNavigation } from '@react-navigation/native';

export default function HomeFooter() {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
        <Icon name="home-outline" size={30} color="#000" />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Settings')}>
        <Icon name="settings-outline" size={30} color="#000" />
        <Text>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Profile')}>
        <Icon name="person-outline" size={30} color="#000" />
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Messages')}>
        <Icon name="chatbubble-outline" size={30} color="#000" />
        <Text>Messages</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  iconContainer: {
    alignItems: 'center',
  },
});

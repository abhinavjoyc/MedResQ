import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from './styles.jsx';
import UberTypeRow from '../UberTypeRow';

import typesData from '../../assets/data/types';

const UberTypes = (props) => {
  const confirm = () => {
    console.warn('confirm');
  };

  return (
    <View>
      {typesData.map((type) => (
        <UberTypeRow 
          key={type.id || type.type}  // Use a unique identifier or combination for the key
          type={type} 
        />
      ))}

      <Pressable onPress={confirm} style={{
        backgroundColor: 'black',
        padding: 10,
        margin: 10,
        alignItems: 'center',
      }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          Confirm Uber
        </Text>
      </Pressable>
    </View>
  );
};

export default UberTypes;

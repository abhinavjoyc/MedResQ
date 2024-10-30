import React from 'react';
import {View, Dimensions} from 'react-native';
import RouteMap from "../../components/RouteMap";
import UberTypes from "../../components/UberTypes";

import { useRoute } from '@react-navigation/native';
import HomeFooter from '../../components/HomeFooter';

const SearchResults = () => {
  const route = useRoute();
  const { originPlace, destinationPlace } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>
      <View style={{ height: 400 }}>
        <UberTypes />
      </View>
      <HomeFooter/>
    </View>
  );
};

export default SearchResults;
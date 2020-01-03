import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Loading = ({color, size}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export {Loading};

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './Button.style';
import {Loading} from '../Loading';
import {colors} from '../../styles';

const Button = ({onPress, loading, text}) => {
  return (
    <View>
      {loading ? (
        <TouchableOpacity
          style={[
            styles.buttonArea,
            {backgroundColor: colors.gympointInactive},
          ]}
          onPress={() => onPress()}>
          <Loading size={30} color={colors.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonArea} onPress={() => onPress()}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export {Button};

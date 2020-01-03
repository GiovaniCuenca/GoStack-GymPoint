import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './BottomNav.style';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../styles/colors';

const BottomNav = () => {
  const [activeScene, setActiveScene] = useState(null);

  useEffect(() => {
    setActiveScene(Actions.currentScene);
  }, [Actions.currentScene]);

  return (
    <View style={styles.bottomnNavContainer}>
      <TouchableOpacity
        style={styles.bottomNavButtom}
        onPress={() => Actions.push('home')}>
        <Icon
          name="home"
          size={22}
          color={activeScene == 'home' ? colors.gympoint : colors.grayInactive}
        />
        <Text
          style={
            activeScene == 'home'
              ? styles.bottomNavTextActive
              : styles.bottomNavTextInactive
          }>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomNavButtom}
        onPress={() => Actions.push('checkins')}>
        <Icon
          name="user-check"
          size={22}
          color={
            activeScene == 'homeCheckins'
              ? colors.gympoint
              : colors.grayInactive
          }
        />
        <Text
          style={
            activeScene == 'homeCheckins'
              ? styles.bottomNavTextActive
              : styles.bottomNavTextInactive
          }>
          Check-Ins
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomNavButtom}
        onPress={() => Actions.push('helporders')}>
        <Icon
          name="help-circle"
          size={22}
          color={
            activeScene == 'homeHelporders'
              ? colors.gympoint
              : colors.grayInactive
          }
        />
        <Text
          style={
            activeScene == 'homeHelporders'
              ? styles.bottomNavTextActive
              : styles.bottomNavTextInactive
          }>
          Auxílios
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export {BottomNav};

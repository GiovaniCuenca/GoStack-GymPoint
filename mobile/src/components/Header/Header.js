import React from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import {styles} from './Header.style';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/Feather';
import {Actions} from 'react-native-router-flux';

import {StorageService} from '../../services/storage.service';

const Header = ({backable}) => {
  function confirmLogout() {
    Alert.alert(
      'Você tem certeza?',
      'Deseja desconectar seu usuário do aplicativo?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => logout()},
      ],
      {cancelable: true},
    );
  }

  async function logout() {
    await StorageService.delete('gympointStudentId');

    Actions.replace('auth');
  }

  return (
    <View style={styles.headerContainer}>
      {backable ? (
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Icon name="arrow-left" size={20} color={colors.gympoint} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      <TouchableOpacity>
        <Image source={require('../../assets/images/logoHeader.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={confirmLogout}>
        <Icon name="log-out" size={20} color={colors.gympoint} />
      </TouchableOpacity>
    </View>
  );
};

export {Header};

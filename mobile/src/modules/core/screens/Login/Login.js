import React, {useState} from 'react';
import {View, Image, TextInput, Text, Alert} from 'react-native';
import {Button} from '../../../../components/Button';
import {styles} from './Login.style';
import {contentWrapper} from '../../../../styles/reusable';
import {CustomStatusBar} from '../../../../components/CustomStatusBar';

import {StorageService} from '../../../../services/storage.service';

import {Actions} from 'react-native-router-flux';

import api from '../../../../services/api';

const Login = () => {
  const [getId, setGetId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async getId => {
    setIsLoading(true);

    try {
      await api.get(`/students/${getId}`);

      await StorageService.set('gympointStudentId', getId);

      Actions.replace('home');
    } catch (err) {
      Alert.alert(
        'Aviso',
        'ID não cadastrado, por gentileza verifique o número corretamente',
      );
    }

    setIsLoading(false);
  };

  return (
    <>
      <CustomStatusBar />
      <View style={styles.content}>
        <View style={contentWrapper}>
          <Image
            style={styles.logoLogin}
            source={require('../../../../assets/images/logo.png')}
          />

          <Text style={{marginVertical: 40}}></Text>

          <TextInput
            style={styles.inputID}
            value={getId}
            onChangeText={e => setGetId(e)}
            placeholder="Informe seu ID de cadastro"
            keyboardType="numeric"
          />
          <Button
            onPress={() => login(getId)}
            text="Entrar no sistema"
            loading={isLoading}
          />
        </View>
      </View>
    </>
  );
};

export {Login};

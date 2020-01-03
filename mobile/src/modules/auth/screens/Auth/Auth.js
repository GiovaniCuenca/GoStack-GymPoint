import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';

import {colors} from '../../../../styles';
import {styles} from './Auth.style';
import {contentWrapper} from '../../../../styles/reusable';
import {CustomStatusBar} from '../../../../components/CustomStatusBar';

import {StorageService} from '../../../../services/storage.service';

import * as Animatable from 'react-native-animatable';

import {Actions} from 'react-native-router-flux';

const Auth = () => {
  const [getStudentId, setGetStudentId] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function retrieveStudentId() {
      const _studentId = await StorageService.get('gympointStudentId');

      if (await _studentId) {
        setGetStudentId(_studentId);
        setIsLogged(true);

        Actions.replace('home', {getStudentId});
      }

      setIsLogged(true);
    }

    retrieveStudentId();
  }, [getStudentId]);

  return (
    <>
      <CustomStatusBar />
      <View style={styles.content}>
        {!isLogged ? (
          <View style={contentWrapper}>
            <View>
              <Animatable.Image
                animation="bounceInDown"
                style={styles.logoLogin}
                source={require('../../../../assets/images/logo.png')}
              />
              <Animatable.Text
                animation="flipInY"
                style={{
                  color: colors.grayBorder,
                  alignItems: 'flex-start',
                  textAlign: 'center',
                }}>
                carregando
              </Animatable.Text>
              <Animatable.Text
                animation="lightSpeedOut"
                iterationCount="infinite"
                duration={3000}
                style={{
                  color: colors.gympoint,
                  textAlign: 'center',
                  fontSize: 50,
                  marginLeft: -150,
                  marginTop: -40,
                  fontWeight: 'bold',
                }}>
                ...
              </Animatable.Text>
            </View>
          </View>
        ) : (
          Actions.replace('core')
        )}
      </View>
    </>
  );
};

export {Auth};

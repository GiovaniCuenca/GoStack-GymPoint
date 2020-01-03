import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './Home.style';
import {colors} from '../../../../styles';
import {contentWrapper} from '../../../../styles/reusable';
import {CustomStatusBar} from '../../../../components/CustomStatusBar';
import {Header, BottomNav, Loading} from '../../../../components';
import {Actions} from 'react-native-router-flux';

import api from '../../../../services/api';
import {StorageService} from '../../../../services/storage.service';

const Home = () => {
  const [student, setStudent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function loadStudent() {
    try {
      const _studentID = await StorageService.get('gympointStudentId');

      const response = await api.get(`/students/${_studentID}`);

      setStudent(response.data);
      setIsLoading(false);
    } catch (error) {
      Actions.replace('login');
    }
  }

  useEffect(() => {
    setIsLoading(true);
    loadStudent();
  }, []);

  return (
    <>
      <CustomStatusBar />

      <Header />

      <View style={styles.content}>
        <View style={contentWrapper}>
          {isLoading ? (
            <Loading size={30} color={colors.gympoint} />
          ) : (
            <View style={styles.homeWrapper}>
              <Text style={styles.textHome}>Olá, {student.name}</Text>
            </View>
          )}
        </View>
      </View>

      <BottomNav />
    </>
  );
};

export {Home};

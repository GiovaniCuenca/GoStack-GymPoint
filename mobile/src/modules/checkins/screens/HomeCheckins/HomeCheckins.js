import React, {useState, useEffect} from 'react';
import {View, FlatList, Alert} from 'react-native';

import {colors} from '../../../../styles';
import {styles} from './HomeCheckins.style.';
import {ListCheckin} from '../../components';
import {contentWrapper} from '../../../../styles/reusable';
import {
  CustomStatusBar,
  BottomNav,
  Header,
  Button,
  Loading,
} from '../../../../components';

import {parseISO, formatRelative} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../../../../services/api';
import {StorageService} from '../../../../services/storage.service';

const HomeCheckins = () => {
  const [checkIns, setCheckIns] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState();

  async function loadCheckins(selectedPage = 1) {
    const _studentId = await StorageService.get('gympointStudentId');
    const response = await api.get(`/students/${_studentId}/checkins`, {
      params: {page: selectedPage},
    });

    setCheckIns(
      selectedPage > 1
        ? [
            ...checkIns,
            ...response.data.map(checkin => {
              return {
                ...checkin,
                formattedDate: formatRelative(
                  parseISO(checkin.created_at),
                  new Date(),
                  {
                    locale: ptBR,
                    addSuffix: true,
                  },
                ),
              };
            }),
          ]
        : response.data.map(checkin => {
            return {
              ...checkin,
              formattedDate: formatRelative(
                parseISO(checkin.created_at),
                new Date(),
                {
                  locale: ptBR,
                  addSuffix: true,
                },
              ),
            };
          }),
    );
    setPage(selectedPage);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    loadCheckins();
  }, []);

  async function newCheckIn() {
    setIsLoading(true);
    try {
      await api.post(`/students/39/checkins`);
    } catch (err) {
      Alert.alert('Aviso', 'Número de Check-Ins atingidos no máximo período');
    }

    setIsLoading(false);
    loadCheckins();
  }

  async function handleSubmitCheckin() {
    Alert.alert(
      'Você tem certeza?',
      'Confirmar Check-In?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => newCheckIn()},
      ],
      {cancelable: true},
    );
  }

  return (
    <>
      <CustomStatusBar />

      <Header backable />

      <View style={styles.content}>
        <View style={contentWrapper}>
          {isLoading ? (
            <Loading size={30} color={colors.gympoint} />
          ) : (
            <>
              <Button
                text="Novo Check-In"
                loading={isLoading}
                onPress={handleSubmitCheckin}
              />

              <FlatList
                style={{marginVertical: 20, paddingRight: 10}}
                data={checkIns}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <ListCheckin id={item.id} date={item.formattedDate} />
                )}
                onRefresh={loadCheckins}
                refreshing={refreshing}
                onEndReached={() => loadCheckins(page + 1)}
                onEndReachedThreshold={0.2}
              />
            </>
          )}
        </View>
      </View>
      <BottomNav />
    </>
  );
};

export {HomeCheckins};

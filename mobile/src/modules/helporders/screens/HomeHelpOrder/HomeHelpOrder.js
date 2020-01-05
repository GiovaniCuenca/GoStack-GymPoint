import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';

import {colors} from '../../../../styles/colors';
import {styles} from './HomeHelpOrder.style';
import {ListHelpOrder} from '../../components';
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

import {Actions} from 'react-native-router-flux';
import api from '../../../../services/api';
import {StorageService} from '../../../../services/storage.service';

const HomeHelpOrder = () => {
  const [studentId, setStudentId] = useState('');
  const [helpOrders, setHelpOrders] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState();

  async function loadHelpOrders(selectedPage = 1) {
    const _studentId = await StorageService.get('gympointStudentId');

    try {
      const response = await api.get(`/students/${_studentId}/help-orders`, {
        params: {page: selectedPage},
      });

      setHelpOrders(
        selectedPage > 1
          ? [
              ...helpOrders,
              ...response.data.map(helporder => {
                return {
                  ...helporder,
                  answered: helporder.answer === null ? false : true,
                  formattedDate: formatRelative(
                    parseISO(helporder.createdAt),
                    new Date(),
                    {
                      locale: ptBR,
                      addSuffix: true,
                    },
                  ),
                };
              }),
            ]
          : response.data.map(helporder => {
              return {
                ...helporder,
                answered: helporder.answer === null ? false : true,
                formattedDate: formatRelative(
                  parseISO(helporder.createdAt),
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
    } catch (error) {}
    setStudentId(_studentId);
    setIsLoading(false);
  }

  function handleNewHelpOrder() {
    setIsLoading(true);

    Actions.push('newHelporders', {studentId});

    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    loadHelpOrders();
  }, []);

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
                text="Novo pedido de auxílio"
                loading={isLoading}
                onPress={handleNewHelpOrder}
              />

              <FlatList
                style={{marginVertical: 20, paddingRight: 10}}
                data={helpOrders}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <ListHelpOrder
                    id={item.id}
                    question={item.question}
                    date={item.formattedDate}
                    answered={item.answered}
                    answer={item.answer}
                    answeredDate={
                      item.answer_at === null
                        ? null
                        : formatRelative(parseISO(item.answer_at), new Date(), {
                            locale: ptBR,
                            addSuffix: true,
                          })
                    }
                  />
                )}
                onRefresh={loadHelpOrders}
                refreshing={refreshing}
                onEndReached={() => loadHelpOrders(page + 1)}
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

export {HomeHelpOrder};

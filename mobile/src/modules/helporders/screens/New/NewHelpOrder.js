import React, {useState} from 'react';
import {View, TextInput, Dimensions, Alert} from 'react-native';
import {colors} from '../../../../styles';
import {styles} from './NewHelpOrder.style';
import {contentWrapper} from '../../../../styles/reusable';
import {
  CustomStatusBar,
  BottomNav,
  Header,
  Button,
} from '../../../../components';

import api from '../../../../services/api';
import {Actions} from 'react-native-router-flux';

const NewHelpOrder = ({studentId}) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const textArea = Dimensions.get('window').height / 3;

  function confirmSubmit() {
    Alert.alert(
      'Você tem certeza?',
      'Deseja enviar a pergunta?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => handleSubmit()},
      ],
      {cancelable: true},
    );
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {
      await api.post(`students/${studentId}/help-orders`, {question});

      Alert.alert('Sucesso!', 'Pergunta enviada com sucesso!');

      Actions.pop();
      Actions.refresh({key: Math.random});
    } catch (error) {
      Alert.alert('Erro', 'Favor tentar novamente');
    }
    setIsLoading(false);
  }

  return (
    <>
      <CustomStatusBar />

      <Header backable />

      <View style={styles.content}>
        <View style={contentWrapper}>
          <View style={styles.helporderCheckinWrapper}>
            <TextInput
              blurOnSubmit
              maxLength={255}
              onChangeText={text => setQuestion(text)}
              textAlignVertical="top"
              multiline
              placeholder="Inclua seu pedido de auxílio..."
              style={{height: textArea}}
            />
          </View>
          <Button
            text="Enviar Pedido"
            onPress={confirmSubmit}
            loading={isLoading}
          />
        </View>
      </View>

      <BottomNav />
    </>
  );
};

export {NewHelpOrder};

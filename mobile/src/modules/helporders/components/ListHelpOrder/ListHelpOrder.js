import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './ListHelpOrder.style';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../../../styles';

import {Actions} from 'react-native-router-flux';

const ListHelpOrder = ({
  id,
  question,
  date,
  answered,
  answeredDate,
  answer,
}) => {
  async function handleSubmit() {
    Actions.push('questionviewHelporders', {
      question,
      date,
      answered,
      answeredDate,
      answer,
    });
  }

  return (
    <>
      <TouchableOpacity
        style={styles.helporderCheckinWrapper}
        onPress={handleSubmit}>
        <View style={styles.helporderViewTitle}>
          <View style={styles.helporderViewAnswer}>
            <Icon
              name={answered ? 'check-square' : 'square'}
              size={15}
              color={answered ? colors.greenActive : colors.grayInactive}
            />

            {answered ? (
              <Text style={styles.helporderTextStatusAnswered}>Respondido</Text>
            ) : (
              <Text style={styles.helporderTextStatus}>Sem resposta</Text>
            )}
          </View>

          <Text style={styles.textHour}>{date}</Text>
        </View>

        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={styles.helporderTextAnswer}>
          {question}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export {ListHelpOrder};

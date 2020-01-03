import React from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../../../styles';
import {styles} from './QuestionView.style';
import {contentWrapper} from '../../../../styles/reusable';
import {CustomStatusBar, BottomNav, Header} from '../../../../components';

const QuestionView = ({question, date, answered, answeredDate, answer}) => {
  return (
    <>
      <CustomStatusBar />

      <Header backable />

      <View style={styles.content}>
        <View style={contentWrapper}>
          <View style={styles.helporderCheckinWrapper}>
            <View style={styles.helporderViewTitle}>
              <Text style={styles.helporderTextStatus}>PERGUNTA</Text>

              <Text style={styles.textHour}>{date}</Text>
            </View>

            <Text style={styles.helporderTextAnswer}>{question}</Text>

            {answered ? (
              <>
                <View
                  style={[
                    styles.helporderViewTitle,
                    {
                      marginTop: 15,
                      paddingTop: 15,
                      borderTopWidth: 1,
                      borderTopColor: colors.grayBorder,
                    },
                  ]}>
                  <Text style={styles.helporderTextStatusAnswered}>
                    RESPOSTA
                  </Text>

                  <Text style={styles.textHour}>{answeredDate}</Text>
                </View>

                <Text style={styles.helporderTextAnswer}>{answer}</Text>
              </>
            ) : (
              <>
                <View
                  style={[
                    styles.helporderViewTitle,
                    {
                      marginTop: 15,
                      paddingTop: 15,
                      borderTopWidth: 1,
                      borderTopColor: colors.grayBorder,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.helporderTextStatus,
                      {color: colors.grayBorder},
                    ]}>
                    aguardando resposta...
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </View>

      <BottomNav />
    </>
  );
};

export {QuestionView};

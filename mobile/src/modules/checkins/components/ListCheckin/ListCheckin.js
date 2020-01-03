import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './ListCheckin.style';

const ListCheckin = ({id, date}) => {
  return (
    <>
      <TouchableOpacity style={styles.checkinWrapper}>
        <Text style={styles.textCheckin}>Check-In # {id} </Text>
        <Text style={styles.textHour}>{date}</Text>
      </TouchableOpacity>
    </>
  );
};

export {ListCheckin};

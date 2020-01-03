import {StyleSheet} from 'react-native';
import {colors} from '../../../../styles/colors';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  homeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,

    marginBottom: 10,

    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 4,
  },
  textHome: {
    fontSize: 14,
    color: colors.grayStrong,
    fontWeight: 'bold',
  },
  textHour: {
    fontSize: 14,
    color: colors.grayText,
  },
});

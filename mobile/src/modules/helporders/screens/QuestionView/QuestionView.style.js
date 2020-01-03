import {StyleSheet} from 'react-native';
import {colors} from '../../../../styles/colors';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  helporderCheckinWrapper: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,

    marginBottom: 10,

    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 4,
  },
  helporderViewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  helporderViewAnswer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helporderTextStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.grayStrong,
  },
  helporderTextStatusAnswered: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.greenActive,
  },
  textHour: {
    fontSize: 14,
    color: colors.grayText,
  },
  helporderTextAnswer: {
    fontSize: 14,
    color: colors.grayText,
  },
});

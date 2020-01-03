import {StyleSheet} from 'react-native';
import {colors} from '../../../../styles/colors';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,

    justifyContent: 'center',
  },
  logoLogin: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputID: {
    textAlign: 'center',

    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    marginBottom: 20,
  },
});

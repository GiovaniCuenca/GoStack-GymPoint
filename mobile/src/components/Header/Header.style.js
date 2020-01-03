import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: colors.grayBorder,

    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

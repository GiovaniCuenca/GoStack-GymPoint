import { StyleSheet } from 'react-native'
import { colors } from '../../../../styles'

export default StyleSheet.create({
    checkinWrapper: {
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
    textCheckin: {
        fontSize: 14,
        color: colors.grayStrong,
        fontWeight: 'bold',
    },
    textHour: {
        fontSize: 14,
        color: colors.grayText,
    },
})
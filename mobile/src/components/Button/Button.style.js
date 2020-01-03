import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'

export const styles = StyleSheet.create({
    buttonArea: {
        height: 45,
        width: 'auto',
        backgroundColor: colors.gympoint,
        borderRadius: 4,

        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.white,
        letterSpacing: 1,
        textTransform: 'uppercase',
    }
})
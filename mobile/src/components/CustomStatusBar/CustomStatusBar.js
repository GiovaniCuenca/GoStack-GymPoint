import React from 'react'
import { View, StatusBar } from 'react-native'
import styles from './CustomStatusBar.style'
import { colors } from '../../styles/colors'

const CustomStatusBar = () => {
    return (
        <View style={styles.statusBar}>
            <StatusBar
                translucent
                backgroundColor={colors.white}
                barStyle="dark-content"
            />
        </View>
    )

}

export { CustomStatusBar }
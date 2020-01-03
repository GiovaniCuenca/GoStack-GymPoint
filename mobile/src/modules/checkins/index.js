import React from 'react'
import { Scene, Stack } from 'react-native-router-flux'
import { HomeCheckins } from './screens'

module.exports = (
    <Stack key="checkins" hideNavBar>
        <Scene key="homeCheckins" component={HomeCheckins} title="HomeCheckins" />
    </Stack>
);
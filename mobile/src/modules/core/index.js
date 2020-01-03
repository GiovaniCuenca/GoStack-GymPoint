import React from 'react'
import { Scene, Stack } from 'react-native-router-flux'
import { Login } from './screens'

module.exports = (
    <Stack key="core" hideNavBar>
        <Scene key="login" component={Login} title="Login" />
    </Stack>
);
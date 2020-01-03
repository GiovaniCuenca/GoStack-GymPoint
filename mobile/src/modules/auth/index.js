import React from 'react';
import {Scene, Stack} from 'react-native-router-flux';
import {Auth} from './screens';

module.exports = (
  <Stack key="auth" hideNavBar>
    <Scene key="auth" component={Auth} title="Auth" />
  </Stack>
);

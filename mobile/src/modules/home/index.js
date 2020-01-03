import React from 'react';
import {Scene, Stack} from 'react-native-router-flux';
import {Home} from './screens';

module.exports = (
  <Stack key="home" hideNavBar>
    <Scene key="home" component={Home} title="Home" />
  </Stack>
);

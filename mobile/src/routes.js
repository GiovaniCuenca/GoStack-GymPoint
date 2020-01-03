import React from 'react';
import {Router, Stack} from 'react-native-router-flux';

const Routes = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar>
        {require('./modules/auth')}
        {require('./modules/core')}
        {require('./modules/home')}
        {require('./modules/checkins')}
        {require('./modules/helporders')}
      </Stack>
    </Router>
  );
};

export {Routes};

import React from 'react';
import {Scene, Stack} from 'react-native-router-flux';
import {HomeHelpOrder, QuestionView, NewHelpOrder} from './screens';

module.exports = (
  <Stack key="helporders" hideNavBar>
    <Scene
      key="homeHelporders"
      component={HomeHelpOrder}
      title="HomeHelpOrder"
    />
    <Scene
      key="questionviewHelporders"
      component={QuestionView}
      title="QuestionView"
    />
    <Scene key="newHelporders" component={NewHelpOrder} title="NewHelpOrder" />
  </Stack>
);

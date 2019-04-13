import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from './pages/login';
import Home from './pages/home';
import metrics from './styles/metrics';

const createNavigator = (isLogged = false) => StackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: Home },
  },
  {
    initialRouteName: isLogged ? 'Login' : 'Login',
    navigationOptions: () => ({
      headerStyle: {
        paddingHorizontal: metrics.basePadding,
      },
    }),
  },
);

export default createNavigator;

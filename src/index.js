import './config/ReactotronConfig';

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import createNavigator from './routes';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    const apiKey = 'teste';
    this.appLoaded(apiKey);
  }

  appLoaded = (apiKey) => {
    this.setState({
      userChecked: true,
      userLogged: !!apiKey,
    });
  };

  render() {
    if (!this.state.userChecked) return null;
    const Routes = createNavigator(this.state.userLogged);
    return <Routes />;
  }
}

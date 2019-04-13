import React, { Component } from 'react';
import api from '~/services/api';

import {
  View,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
// import console = require('console');

export default class Home extends Component {
  state = {
    data: [],
    resgate: '',
    bonus: '666.66',
    refreshing: false,
  };


  resgatar = async () => {
    if (!this.state.resgate) {
      const hash = '4F68TY';
      // const sendToApi = await api.post(`/hash/${hash}`);
      this.setState({ resgate: hash });
      this.setState({ bonus: '0.00' });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Ola Fulano</Text>
        <Text style={styles.text}>
          $
          {this.state.bonus}
          {' '}
          H-Coins
        </Text>
        <View style={styles.form}>
          <TouchableOpacity style={styles.button} onPress={this.resgatar}>
            {this.state.resgate ? (
              <Text style={styles.buttonText}>{this.state.resgate}</Text>
            ) : (
              <Text style={styles.buttonText}>Resgatar</Text>
            )}
          </TouchableOpacity>
          {!!this.state.resgate && (
            <Text>Apresente este numero em um caixa para retirar o seu desconto de: R${this.state.desconto} </Text>
          )}
        </View>
      </View>
    );
  }
}

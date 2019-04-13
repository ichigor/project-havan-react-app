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

export default class Home extends Component {
  state = {
    user: '',
    resgate: '',
    bonus: '',
    refreshing: false,
  };

  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    const user = await AsyncStorage.getItem('@appHavan:user');
    const obj = JSON.parse(user);
    this.setState({user:obj[0].name});
    const cpf = await AsyncStorage.getItem('@appHavan:cpf');
    const pointsRequest = await api.get(`/point/${cpf}`);
    const points = pointsRequest.request._response
    const obj2 = JSON.parse(points);
    this.setState({bonus:obj2[0].current_points});
  };

  // "code": "CITY50",
  // "value": "50",
  // "cpf": "123"

  resgatar = async () => {
    if (!this.state.resgate) {
      const hash = 'APPI55';
      const userCpf = await AsyncStorage.getItem('@appHavan:cpf');
      
      await api.post('/coupon/', {
        code: hash,
        value: this.state.bonus,
        cpf: userCpf
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      this.setState({ resgate: hash });
      this.setState({ bonus: '0.00' });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>
          Ola {this.state.user}
        </Text>
        <Text style={styles.text}>
Voce possui $
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
            <Text>
              Apresente este numero em um caixa para retirar o seu desconto
              {this.state.desconto}
              {' '}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

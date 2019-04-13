import React, { Component } from 'react';
import api from '~/services/api';

import {
  View,
  AsyncStorage,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    user: '',
    resgate: '',
    bonus: '',
  };

  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    const user = await AsyncStorage.getItem('@appHavan:user');
    const userObj = JSON.parse(user);
    this.setState({user:userObj[0].name});
    const cpf = await AsyncStorage.getItem('@appHavan:cpf');
    const pointsRequest = await api.get(`/point/${cpf}`);
    const points = pointsRequest.request._response
    const pointsObj = JSON.parse(points);
    this.setState({bonus:pointsObj[0].current_points});
  };


  resgatar = async () => {
    if (!this.state.resgate) {
      const hash = 'APPI0' + Math.floor(Math.random() * (99 - 1) + 1);
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
      // this.setState({ bonus: '0.00' });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>
            Olá {this.state.user}
        </Text>
        <Text style={styles.text}>
          Você possui $
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
              Apresente este código em um caixa para retirar o seu desconto
              {this.state.desconto}
              {' '}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

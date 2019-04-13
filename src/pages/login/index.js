import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import api from '~/services/api';
import styles from './styles';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    cpf: '',
    loading: false,
    errorMessage: null,
  };

  checkUserExists = async (cpf) => {
    const user = await api.get(`/users/${cpf}`);

    return user;
  };

  saveUser = async (cpf) => {
    await AsyncStorage.setItem('@appHavan:cpf', cpf);
  };

  signIn = async () => {
    const { cpf } = this.state;

    if (cpf.length === 0) return;

    this.setState({ loading: true });

    try {
      // await this.checkUserExists(cpf);

      // await this.saveUser(cpf);

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      });
      this.props.navigation.dispatch(resetAction);
    } catch (err) {
      this.setState({ loading: false, errorMessage: 'Usuário invalido.' });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>Bem-vindo</Text>

        <Text style={styles.text}>Para continuar, precisamos que você informe seu CPF.</Text>

        {!!this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu cpf"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.cpf}
            onChangeText={cpf => this.setState({ cpf })}
          />

          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Prosseguir</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

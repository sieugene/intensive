import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native';


type stateType = {
    email: string,
    password: string
}

export default class Authform extends Component<{}, stateType> {
  state = {
    email: '',
    password: '',
  };
  handleEmailChange = (email) => {
    this.setState({
      email,
    });
  };
  handlePasswordChange = (password) => {
    this.setState({
      password,
    });
  };
  render() {
    return (
      <View>
        <Text>email:</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={this.handleEmailChange}
        />
        <Text>password:</Text>
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          secureTextEntry
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});

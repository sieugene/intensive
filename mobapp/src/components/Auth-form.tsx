import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native';
import {observable} from 'mobx'
import { observer } from 'mobx-react';



type stateType = {
    email: string,
    password: string
}
@observer
export default class Authform extends Component<{}, stateType> {
  @observable email = ''
  @observable password = ''

  handleEmailChange = (email: string) => this.email = email

  handlePasswordChange = (password: string) => this.password = password

  render() {
    return (
      <View>
        <Text>email:</Text>
        <TextInput
          style={styles.input}
          value={this.email}
          onChangeText={this.handleEmailChange}
        />
        <Text>password:</Text>
        <TextInput
          style={styles.input}
          value={this.password}
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

import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native';
import authStore from './../stores/auth';
import {observer} from 'mobx-react';

type stateType = {
  email: string;
  password: string;
};
@observer
export default class Authform extends Component<{}, stateType> {
  render() {
    return (
      <View>
        <Text>email:</Text>
        <TextInput
          style={styles.input}
          value={authStore.email}
          onChangeText={authStore.setEmailChange}
        />
        <Text>password:</Text>
        <TextInput
          style={styles.input}
          value={authStore.password}
          onChangeText={authStore.setPasswordChange}
          secureTextEntry
        />
        <Text>Here: {authStore.isValidPassword ? "true" : "false"}</Text>
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

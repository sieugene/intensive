import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
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
        {authStore.user === null && (
          <>
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
            <Text>Here: {authStore.isValidPassword ? 'true' : 'false'}</Text>
          </>
        )}
        {authStore.user === null && (
          <>
            <Button
              onPress={authStore.signUp}
              title="регистрация"
              color="#841584"
              //accessibilityLabel="Learn more about this purple button"
            />
            <Button
              onPress={authStore.signIn}
              title="войти"
              color="#841584"
              //accessibilityLabel="Learn more about this purple button"
            />
          </>
        )}
        <Text>User: {authStore.user === null ? 'ещё нет' : 'что-то есть'}</Text>
        {authStore.user !== null && (
          <Button
            onPress={authStore.signOut}
            title="выйти"
            color="#841584"
            //accessibilityLabel="Learn more about this purple button"
          />
        )}
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

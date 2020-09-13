import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import EventList from './src/components/Event-list';
import Authform from './src/components/Auth-form';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
      {/* <EventList /> */}
      <Authform/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

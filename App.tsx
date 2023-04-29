import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';

import SwipeableDelete from './SwipeableDelete.component';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  item: {
    height: 120,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  const onPress = () => {
    console.log('DELETED');
  };

  return (
    <SafeAreaView style={s.container}>
      <SwipeableDelete style={s.item} onPress={onPress}>
        <Text>SWIPE ME to DELETE</Text>
      </SwipeableDelete>
    </SafeAreaView>
  );
};

export default App;

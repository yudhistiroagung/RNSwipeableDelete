import React, {useMemo} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';

import SwipeableDelete from './SwipeableDelete.component';
import {FlatList} from 'react-native-gesture-handler';

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

  const list = useMemo(() => {
    return (
      <FlatList
        data={Array(10)}
        ItemSeparatorComponent={() => <View style={{height: 2}} />}
        renderItem={() => {
          return (
            <SwipeableDelete style={s.item} onPress={onPress}>
              <Text>SWIPE ME to DELETE</Text>
            </SwipeableDelete>
          );
        }}
      />
    );
  }, []);

  return <SafeAreaView style={s.container}>{list}</SafeAreaView>;
};

export default App;

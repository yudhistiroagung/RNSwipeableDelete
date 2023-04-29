import React, {useMemo} from 'react';
import {View, StyleSheet, Text, SafeAreaView, FlatList} from 'react-native';
import Animated from 'react-native-reanimated';

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

  const list = useMemo(() => {
    return (
      <Animated.FlatList
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

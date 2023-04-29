import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

interface Props {
  children: ReactNode;
  backViewOffset?: number;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

type PanGestureContext = {
  translationX: number;
};

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: 'yellow',
    width: '100%',
    height: '100%',
  },
  backViewContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 24,
    ...StyleSheet.absoluteFillObject,
  },
});

const SwipeableDelete: React.FC<Props> = ({
  backViewOffset = 120,
  onPress,
  children,
  style,
}) => {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >({
    onStart(event, context) {
      context.translationX = event.translationX;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translationX;
    },
    onEnd: (_, context) => {
      const dragValue = -translateX.value;
      if (dragValue < backViewOffset) {
        translateX.value = 0;
        return;
      }

      translateX.value = -(backViewOffset + context.translationX);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(translateX.value)}],
    };
  });

  return (
    <Animated.View style={[style]}>
      <Animated.View style={[s.backViewContainer]}>
        <TouchableOpacity onPressIn={onPress}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
      {/*  set min distanve to tell pan gesture cacthes the gesture event after a given distance */}
      <PanGestureHandler onGestureEvent={gestureHandler} minDist={20}>
        <Animated.View style={[style, s.wrapper, rStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default SwipeableDelete;

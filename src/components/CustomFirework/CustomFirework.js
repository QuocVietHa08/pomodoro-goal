import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const DEFAULT_PARTICLE_COLOR = 'black';
const DEFAULT_DURATION = 500;
const DEFAULT_RADIUS = 200;

const getRandom = array => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomPosition = range => {
  return Math.random() * range;
};

const CustomFirework = (props, ref) => {
  const [isStart, setStart] = useState(
    props.autoStart == undefined ? false : props.autoStart,
  );
  const fadeValue = useSharedValue(1);
  const expValueX = useSharedValue(0);
  const expValueY = useSharedValue(0);

  useImperativeHandle(ref, () => ({
    start() {
      setStart(true);
    },

    stop() {
      setStart(false);
    },
  }));

  const index = props.index;
  const particleRadius =
    props.radius == undefined ? DEFAULT_RADIUS : props.radius;

  const duration =
    props.animationDuration == undefined
      ? DEFAULT_DURATION
      : props.animationDuration;

  const getColor = () => {
    if (props.particleColors == undefined) {
      return DEFAULT_PARTICLE_COLOR;
    }
    const color = getRandom(props.particleColors);
    return color;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withTiming(
        fadeValue.value,
        { duration: duration },
        (finished, current) => {},
      ),
      props.iteration,
      false,
      (finished, current) => {
        const state = finished ? 'finished' : 'cancelled';
        runOnJS(props.listener)(index, 'Fade.Repeat', state);
      },
    ),

    transform: [
      {
        translateX: withRepeat(
          withTiming(
            expValueX.value,
            { duration: duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
            (finished, current) => {},
          ),
          props.iteration,
          false,
          (finished, current) => {
            const state = finished ? 'finished' : 'cancelled';
            runOnJS(props.listener)(index, 'PosX.Repeat', state);
          },
        ),
      },
      {
        translateY: withRepeat(
          withTiming(
            expValueY.value,
            { duration: duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
            (finished, current) => {},
          ),
          props.iteration,
          false,
          (finished, current) => {
            const state = finished ? 'finished' : 'cancelled';
            runOnJS(props.listener)(index, 'PosY.Repeat', state);
          },
        ),
      },
    ],
  }));

  const imageView = () => {
    const color = getColor();
    const imageSize = {
      width: props.particleSizeX,
      height: props.particleSizeY,
    };
    const tintColor =
      props.particleColors == undefined ? {} : { tintColor: color };
    return (
      <Animated.Image
        source={props.particleSource}
        style={[animatedStyles, imageSize, tintColor]}
        resizeMode={'contain'}
      />
    );
  };

  const view = props => {
    if (props?.isStart) {
      fadeValue.value = 0;

      const noise =
        props.radiusNoise == 0 ? 0 : getRandomPosition(props.radiusNoise);
      expValueX.value = (particleRadius + noise) * Math.cos(props.angle);
      expValueY.value = (particleRadius + noise) * Math.sin(props.angle);
    } else {
      cancelAnimation(fadeValue);
      cancelAnimation(expValueX);
      cancelAnimation(expValueY);
    }

    let donutPos = {};
    if (props?.innerRadius != undefined) {
      let _x = props.innerRadius * Math.cos(props.angle);
      let _y = props.innerRadius * Math.sin(props.angle);

      donutPos = { left: _x, top: _y };
    }

    return (
      <View style={[{ position: 'absolute' }, donutPos]}>{imageView()}</View>
    );
  };
  return view();
};

export default forwardRef(CustomFirework);

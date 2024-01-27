import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { View, Image, Dimensions } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import {
  ImageRequireSource,
  ImageURISource,
} from 'react-native/Libraries/Image/ImageSource';

const ANGLE_TYPE_EQUAL = 'equal';
const ANGLE_TYPE_RANDOM = 'random';

const DEFAULT_RADIUS = 200;
const DEFAULT_PARTICLE_SIZE = 30;
const DEFAULT_ITERATION = 1;
const DEFAULT_DURATION = 500;
const DEFAULT_NUM_PARTICLES = 20;
const DEFAULT_RADIUS_NOISE = 0;
const DEFAULT_PARTICLE_COLOR = 'black';
const DEFAULT_ANGLE_TYPE = ANGLE_TYPE_RANDOM;

const getRandomPosition = range => {
  return Math.random() * range;
};

const getRandom = array => {
  return array[Math.floor(Math.random() * array.length)];
};

const getImageSize = uri => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => {
        resolve({ width, height });
      },
      reject,
    );
  });
};

const SLLParticles = props => {
  const particleRadius =
    props.radius === undefined ? DEFAULT_RADIUS : props.radius;
  const index = props.index;

  const fadeValue = useSharedValue(1);
  const expValueX = useSharedValue(0);
  const expValueY = useSharedValue(0);

  const duration =
    props.animationDuration === undefined
      ? DEFAULT_DURATION
      : props.animationDuration;

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

  const getColor = () => {
    if (props.particleColors === undefined) {
      return DEFAULT_PARTICLE_COLOR;
    }
    const color = getRandom(props.particleColors);
    return color;
  };

  const imageView = () => {
    const color = getColor();
    const imageSize = {
      width: props.particleSizeX,
      height: props.particleSizeY,
    };
    const tintColor =
      props.particleColors === undefined ? {} : { tintColor: color };
    return (
      <Animated.Image
        source={props.particleSource}
        style={[animatedStyles, imageSize, tintColor]}
        resizeMode={'contain'}
      />
    );
  };

  const circleShapeView = () => {
    const colorStyle = getColor();
    const imageSize = {
      width: props.particleSizeX,
      height: props.particleSizeY,
    };
    return (
      <Animated.View
        style={[
          animatedStyles,
          imageSize,
          { backgroundColor: colorStyle },
          { borderRadius: props.particleSizeX },
        ]}
      />
    );
  };

  const particleView = () => {
    if (props.particleSource !== undefined) {
      return imageView();
    } else {
      return circleShapeView();
    }
  };

  const view = () => {
    if (props.isStart) {
      fadeValue.value = 0;

      const noise =
        props.radiusNoise === 0 ? 0 : getRandomPosition(props.radiusNoise);
      expValueX.value = (particleRadius + noise) * Math.cos(props.angle);
      expValueY.value = (particleRadius + noise) * Math.sin(props.angle);
    } else {
      cancelAnimation(fadeValue);
      cancelAnimation(expValueX);
      cancelAnimation(expValueY);
    }

    let donutPos = {};
    if (props.innerRadius !== undefined) {
      let _x = props.innerRadius * Math.cos(props.angle);
      let _y = props.innerRadius * Math.sin(props.angle);

      donutPos = { left: _x, top: _y };
    }

    return (
      <View style={[{ position: 'absolute' }, donutPos]}>{particleView()}</View>
    );
  };

  return view();
};

const SLLFireworks = forwardRef((props, ref) => {
  const { width: WIN_WIDTH, height: WIN_HEIGHT } = Dimensions.get('window');
  const [isStart, setStart] = useState(
    props.autoStart === undefined ? false : props.autoStart,
  );
  const [particleSources, setParticleSources] = useState([]);

  const iteration =
    props.iteration === undefined ? DEFAULT_ITERATION : props.iteration;
  const duration =
    props.animationDuration === undefined
      ? DEFAULT_DURATION
      : props.animationDuration;
  const numberOfParticles =
    props.numberOfParticle === undefined
      ? DEFAULT_NUM_PARTICLES
      : props.numberOfParticle;
  const radiusNoise =
    props.radiusNoise === undefined ? DEFAULT_RADIUS_NOISE : props.radiusNoise;
  const angleType =
    props.angleType === undefined ? DEFAULT_ANGLE_TYPE : props.angleType;

  let animationStatusCheck = 0;

  useImperativeHandle(ref, () => ({
    start() {
      setStart(true);
    },

    stop() {
      setStart(false);
    },
  }));

  console.log('start-------------->', isStart);

  const getImageSize = uri => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => {
          resolve({ width, height });
        },
        reject,
      );
    });
  };

  const imageSourceFetch = async particleSources => {
    let _particleSources = [];

    for (let value of particleSources) {
      const isSource = typeof value === 'number';
      if (isSource) {
        const { width, height } = Image.resolveAssetSource(value);
        _particleSources.push({ src: value, width: width, height: height });
      } else {
        const uri = value.uri;
        const { width, height } = await getImageSize(uri);
        _particleSources.push({ src: value, width: width, height: height });
      }
    }
    setParticleSources(_particleSources);
  };

  useEffect(() => {
    if (props.particleSources !== null) {
      imageSourceFetch(props.particleSources).then();
    } else {
      setParticleSources([
        { width: DEFAULT_PARTICLE_SIZE, height: DEFAULT_PARTICLE_SIZE },
      ]);
    }
  }, []);

  const onParticleAnimationListener = (index, type, state) => {
    if (props.onAnimationDone !== undefined) {
      if (state === 'finished') {
        animationStatusCheck++;
        let _state =
          animationStatusCheck >= numberOfParticles * 3
            ? 'finished'
            : 'progress';
        props.onAnimationDone(_state);
      }
    }
  };

  const particlesView = () => {
    if (particleSources.length === 0) {
      return;
    }

    let particles = [];
    for (let i = 0; i < numberOfParticles; i++) {
      let angle;
      if (angleType === ANGLE_TYPE_EQUAL) {
        let per =
          numberOfParticles < 360
            ? 360 / numberOfParticles
            : numberOfParticles / 360;
        angle = (i * per * Math.PI) / 180;
      } else {
        angle = getRandomPosition(360) * (Math.PI / 180);
      }

      const imageInfo = getRandom(particleSources);
      const imageSrc = imageInfo.src === undefined ? null : imageInfo.src;

      let particleSizeX, particleSizeY;
      if (props.particleSize !== undefined) {
        particleSizeX = props.particleSize;
        particleSizeY = props.particleSize;
      } else {
        particleSizeX = imageInfo.width;
        particleSizeY = imageInfo.height;
      }

      particles.push(
        <SLLParticles
          index={i}
          key={i}
          radius={props.radius}
          innerRadius={props.innerRadius}
          radiusNoise={radiusNoise}
          angle={angle}
          iteration={iteration}
          particleSource={imageSrc}
          particleSizeX={particleSizeX}
          particleSizeY={particleSizeY}
          particleColors={props.particleColors}
          animationDuration={duration}
          listener={onParticleAnimationListener}
          isStart={isStart}
        />,
      );
    }

    return particles;
  };

  const fireworksView = () => {
    let left =
      props.positionX === undefined
        ? getRandomPosition(WIN_WIDTH)
        : props.positionX;
    let top =
      props.positionY === undefined
        ? getRandomPosition(WIN_HEIGHT)
        : props.positionY;

    let imageSizeX = 0,
      imageSizeY = 0;
    if (props.particleSize === undefined) {
      particleSources.forEach(value => {
        imageSizeX += value.width;
        imageSizeY += value.height;
      });

      imageSizeX = imageSizeX / particleSources.length;
      imageSizeY = imageSizeY / particleSources.length;
    } else {
      imageSizeX = props.particleSize;
      imageSizeY = props.particleSize;
    }

    left -= imageSizeX / 2;
    top -= imageSizeY / 2;

    let zIndexStyle =
      props.zIndex !== undefined ? { zIndex: props.zIndex } : {};
    return (
      <View
        style={[
          {
            position: 'absolute',
            top: top,
            left: left,
            backgroundColor: 'red',
          },
          zIndexStyle,
        ]}
      >
        {particlesView()}
      </View>
    );
  };

  return fireworksView();
});

export default SLLFireworks;

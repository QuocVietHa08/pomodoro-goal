import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import { AppTheme, Dimens } from 'src/utils/appConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextView, TouchableDebounce } from 'src/components';
// import IconsSVG from 'src/assets/icons/IconsSVG';
// import Icon from 'src/assets/icons';
import LinearGradient from 'react-native-linear-gradient';
import RouteName from '../RouteName';
import { routesBottomBar, BOTTOM_TAB_TITLE } from '../constants';
import { includes } from 'lodash';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const ADD_ICON_SIZE = Dimens.width / 5.5;
const CustomAppTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { title, tabBarAccessibilityLabel, tabBarTestID } = options;

        const isFocused = state.index === index;

        const onPress = () => {
          // const event = navigation.emit({
          //   type: 'tabPress',
          //   target: route.key,
          //   canPreventDefault: true,
          // });
          // if (!isFocused && !event.defaultPrevented) {
          //   navigation.navigate(route.name, route.params);
          // }
        };

        const onLongPress = () => {
          // navigation.emit({
          //   type: 'tabLongPress',
          //   target: route.key,
          // });
        };

        return (
          // <TouchableDebounce
          //   key={index}
          //   accessibilityRole="button"
          //   accessibilityState={isFocused ? { selected: true } : {}}
          //   accessibilityLabel={tabBarAccessibilityLabel}
          //   testID={tabBarTestID}
          //   onPress={onPress}
          //   style={[styles.tabStyle, { paddingBottom: insets.bottom / 2.5 }]}
          // >
          // <View>
          //   <Icon
          //     source={icon}
          //     size={28}
          //     color={
          //       isFocused
          //         ? AppTheme.colors.primary_1
          //         : AppTheme.colors.neutral_30
          //     }
          //   />
          // </View>
          <TextView
            fontSize={AppTheme.fontSize.s10}
            style={{
              marginTop: 6,
              lineHeight: 1.5 * AppTheme.fontSize.s11,
              color: isFocused
                ? AppTheme.colors.primary_1
                : AppTheme.colors.neutral_30,
              fontWeight: '400',
            }}
          >
            {title}
          </TextView>
          // </TouchableDebounce>
        );
      })}
    </View>
  );
};

export default memo(CustomAppTabBar);

const styles = StyleSheet.create({
  vCenter: {
    width: ADD_ICON_SIZE,
    height: ADD_ICON_SIZE,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  btnCenter: {
    backgroundColor: 'red',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: -((28 * ADD_ICON_SIZE) / 100),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  vDot: {
    width: AppTheme.dotSize,
    height: AppTheme.dotSize,
    borderRadius: AppTheme.dotSize / 2,
    backgroundColor: AppTheme.colors.red,
    position: 'absolute',
    right: -2,
    top: -2,
  },
  img1: {
    position: 'absolute',
    top: -12,
    left: 0,
    width: Dimens.width,
    height: AppTheme.bottomTabHeight + 12,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    bottom: 0,
    width: '100%',
    zIndex: 0,
  },
  tabStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: Dimens.width / 5,
  },
});

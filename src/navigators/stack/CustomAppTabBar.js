import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppTheme, Dimens } from 'src/utils/appConstant';
import RouteName from '../RouteName';
import TouchableDebounce from 'src/components/TouchableDebounce';
import TextView from 'src/components/TextView';
import { BOTTOM_TAB_TITLE } from '../constants';
import HomeImage from 'src/assets/images/bottomTab/home.png';
import HomeActiveImage from 'src/assets/images/bottomTab/home_active.png';
import TaskImage from 'src/assets/images/bottomTab/task.png';
import TaskActiveImage from 'src/assets/images/bottomTab/task_active.png';
import StatisticsImage from 'src/assets/images/bottomTab/statistics.png';
import StatisticsActiveImage from 'src/assets/images/bottomTab/statistics_active.png';
import ProfileImage from 'src/assets/images/bottomTab/profile.png';
import ProfileActiveImage from 'src/assets/images/bottomTab/profile_active.png';
import newScope from 'src/assets/images/bottomTab/newScope.png';
import FastImage from 'react-native-fast-image';

const ADD_ICON_SIZE = Dimens.width / 5.5;
const CustomAppTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  console.log('state ------>', state);
  console.log('description----->:', descriptors);
  return (
    <View
      style={[
        styles.container,
        { height: AppTheme.bottomTabHeight + insets.bottom / 1.5 },
      ]}
    >
      {state?.routes?.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const { title, tabBarAccessibilityLabel, tabBarTestID } = options;
        let image;
        switch (title) {
          case BOTTOM_TAB_TITLE.Home:
            image = isFocused ? HomeActiveImage : HomeImage;
            break;
          case BOTTOM_TAB_TITLE.Task:
            image = isFocused ? TaskActiveImage : TaskImage;
            break;
          case BOTTOM_TAB_TITLE.Statistics:
            image = isFocused ? StatisticsActiveImage : StatisticsImage;
            break;
          case BOTTOM_TAB_TITLE.Profile:
            image = isFocused ? ProfileActiveImage : ProfileImage;
            break;
        }

        if (route.name === RouteName.NewScope) {
          return (
            <TouchableDebounce style={styles.vCenter}>
              <FastImage source={newScope} style={{ height: 50, width: 50 }} />
            </TouchableDebounce>
          );
        }

        const onPress = () => {
          console.log('hello onpresss');
        };

        return (
          <TouchableDebounce
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={tabBarAccessibilityLabel}
            testID={tabBarTestID}
            onPress={onPress}
            style={[styles.tabStyle]}
          >
            <View>
              <FastImage
                source={image}
                resizeMode="contain"
                style={{ height: 35, width: 35 }}
              />
            </View>
            <TextView
              fontSize={AppTheme.fontSize.s10}
              style={{
                marginTop: 6,
                lineHeight: 1.5 * AppTheme.fontSize.s11,
                color: isFocused ? '#ff575d' : AppTheme.colors.neutral_30,
                fontWeight: isFocused ? 'bold' : 'normal',
              }}
            >
              {title}
            </TextView>
          </TouchableDebounce>
        );
      })}
    </View>
  );
};

export default CustomAppTabBar;

const styles = StyleSheet.create({
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
  vCenter: {
    width: ADD_ICON_SIZE,
    height: ADD_ICON_SIZE,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

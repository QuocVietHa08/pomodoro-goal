import React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import FastImage from 'react-native-fast-image';
import TextView from 'src/components/TextView';
import TouchableDebounce from 'src/components/TouchableDebounce';
import { navigate } from 'src/navigators/NavigationServices';
import { AppTheme } from 'src/utils/appConstant';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'src/store/app/appReducer';

const ScreenItem = ({ item, onLogout }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const { theme } = useSelector(state => state.appReducer);
  const dispatch = useDispatch();
  const onPress = () => {
    if (item?.label === 'Logout') {
      onLogout();
      return;
    }
    navigate(item.screen);
  };

  const onToggleSwitch = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
    setIsDarkTheme(!isDarkTheme);
  };

  console.log('helloo checking --->', theme);

  return (
    <TouchableDebounce onPress={onPress}>
      <View style={styles.itemWrap}>
        <FastImage source={item.icon} style={styles.iconStyle} />
        <TextView
          style={[
            styles.textStyle,
            {
              color:
                item.label === 'Logout' ? AppTheme.colors.primary_1 : 'black',
            },
          ]}
        >
          {item.label}
        </TextView>
        {item.label === 'Dark Theme' && (
          <Switch
            trackColor={{ false: 'blue', true: AppTheme.colors.primary_1 }}
            thumbColor={isDarkTheme ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onToggleSwitch}
            value={isDarkTheme}
            style={styles.switchWrap}
          />
        )}
      </View>
    </TouchableDebounce>
  );
};

export default ScreenItem;
const styles = StyleSheet.create({
  itemWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 25,
    padding: 10,
    marginVertical: 5,
    position: 'relative',
  },
  switchWrap: {
    position: 'absolute',
    right: 0,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
});

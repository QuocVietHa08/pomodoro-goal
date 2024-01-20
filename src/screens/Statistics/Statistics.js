import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './Statistics.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import LogoImage from 'src/assets/images/logo.png';
import BellImage from 'src/assets/images/bell.png';
import { navigate } from 'src/navigators/NavigationServices';
import RouteName from 'src/navigators/RouteName';
import TextView from 'src/components/TextView';
import { AppTheme } from 'src/utils/appConstant';
import DropDownPicker from 'react-native-dropdown-picker';

const data = [
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'This Week',
    value: 'thisWeek',
  },
  {
    label: 'This Month',
    value: 'thisMonth',
  },
  {
    label: 'This Year',
    value: 'thisYear',
  },
  {
    label: 'All Time',
    value: 'allTime',
  },
];
const Statistics = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(data);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  }, [refreshing]);

  const handleHeaderRightPress = () => {
    navigate(RouteName.Notification);
  };

  return (
    <View style={styles.container}>
      <HeaderWrap
        rightIcons={BellImage}
        rightIconStyle={styles.headerIconRight}
        leftTitle="Statistics"
        leftIcon={LogoImage}
        leftIconStyle={styles.headerIconLeft}
        onRightPress={handleHeaderRightPress}
      />
      <View style={styles.statisticsTitleWrap}>
        <TextView
          style={{
            fontSize: AppTheme.fontSize.s20,
          }}
        >
          Your Statistics Graph
        </TextView>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          style={styles.dropdown}
          containerStyle={styles.dropContainerStyle}
        />
      </View>
    </View>
  );
};

export default Statistics;

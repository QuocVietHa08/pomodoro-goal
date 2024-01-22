import React from 'react';
import styles from './Profile.styles';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import HeaderWrap from 'src/components/HeaderWrap';
import BellImage from 'src/assets/images/bell.png';
import LogoImage from 'src/assets/images/logo.png';
import { navigate } from 'src/navigators/NavigationServices';
import RouteName from 'src/navigators/RouteName';

const Profile = () => {
  const handleHeaderRightPress = () => {
    navigate(RouteName.Notification);
  };

  return (
    <View style={styles.container}>
      <HeaderWrap
        rightIcons={BellImage}
        rightIconStyle={styles.headerIconRight}
        leftTitle="Goal"
        leftIcon={LogoImage}
        leftIconStyle={styles.headerIconLeft}
        onRightPress={handleHeaderRightPress}
      />
    </View>
  );
};

export default Profile;

import React from 'react';
import styles from './Profile.styles';
import { FlatList, ScrollView, View } from 'react-native';
import TextView from 'src/components/TextView';
import HeaderWrap from 'src/components/HeaderWrap';
import MoreImage from 'src/assets/images/more.png';
import LogoImage from 'src/assets/images/logo.png';
import { navigate } from 'src/navigators/NavigationServices';
import RouteName from 'src/navigators/RouteName';
import ProfileAvatar from '../FillProfile/ProfileAvatar';
import NextImage from 'src/assets/images/profile/next.png';
import FastImage from 'react-native-fast-image';
import ProfileImage from 'src/assets/images/profile/profile.png';
import BellImage from 'src/assets/images/bell.png';
import StarImage from 'src/assets/images/profile/star.png';
import ProtectImage from 'src/assets/images/profile/protect.png';
import HelpImage from 'src/assets/images/profile/help.png';
import SunImage from 'src/assets/images/profile/sun.png';
import LogOutImage from 'src/assets/images/profile/logout.png';
import ScreenItem from './ScreenItem';

const PROFILE_CONFIG_SCREE_LIST = [
  {
    label: 'Edit Profile',
    icon: ProfileImage,
  },
  {
    label: 'App Settings',
    icon: StarImage,
  },
  {
    label: 'Notifications',
    icon: BellImage,
  },
  {
    label: 'Security',
    icon: ProtectImage,
  },
  {
    label: 'Help',
    icon: HelpImage,
  },
  {
    label: 'Dark Theme',
    icon: SunImage,
  },
  {
    label: 'Logout',
    icon: LogOutImage,
  },
];
const Profile = () => {
  const info = {
    name: 'Edward Ha',
    email: 'quocvietha08@gmail.com',
  };
  const handleHeaderRightPress = () => {
    navigate(RouteName.Notification);
  };

  const handleEditAvatar = () => {
    console.log('handle');
  };

  return (
    <View style={styles.container}>
      <HeaderWrap
        rightIcons={MoreImage}
        rightIconStyle={styles.headerIconRight}
        leftTitle="Goal"
        leftIcon={LogoImage}
        leftIconStyle={styles.headerIconLeft}
        onRightPress={handleHeaderRightPress}
      />
      <View style={styles.contentWrap}>
        <ProfileAvatar onEditAvatar={handleEditAvatar} info={info} />
        <View style={styles.upgradeToPremiumWrap}>
          <View style={styles.premiumFirstLine}>
            <View style={styles.proIcon}>
              <TextView style={{ color: 'white', fontWeight: 'bold' }}>
                PRO
              </TextView>
            </View>
            <TextView
              style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}
            >
              Upgrade to Premium
            </TextView>
            <View style={styles.nextIconWrap}>
              <FastImage source={NextImage} style={styles.nextIcon} />
            </View>
          </View>
          <TextView style={{ color: 'white', fontSize: 14 }}>
            Enjoy full access app without ads and restrictions
          </TextView>
        </View>
        <View style={styles.screenWrap}>
          <FlatList
            data={PROFILE_CONFIG_SCREE_LIST}
            renderItem={({ item, index }) => <ScreenItem item={item} />}
          ></FlatList>
        </View>
      </View>
    </View>
  );
};

export default Profile;

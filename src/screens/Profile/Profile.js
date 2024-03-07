import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './Profile.styles';
import { ScrollView, View } from 'react-native';
import TextView from 'src/components/TextView';
import HeaderWrap from 'src/components/HeaderWrap';
// import MoreImage from 'src/assets/images/more.png';
// import LogoImage from 'src/assets/images/logo.png';
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
import ModalLogout from './ModalLogout';
import TouchableDebounce from 'src/components/TouchableDebounce';
import { setAccessToken } from 'src/store/auth/authReducer';
import { useDispatch } from 'react-redux';
import AppwriteContext from 'src/utils/appwrite/AppwriteContext';
import { useToast } from 'react-native-toast-notifications';

const PROFILE_CONFIG_SCREE_LIST = [
  {
    label: 'Edit Profile',
    icon: ProfileImage,
    screen: RouteName.EditProfile,
  },
  {
    label: 'App Settings',
    icon: StarImage,
    screen: RouteName.AppSetting,
  },
  {
    label: 'Notifications',
    icon: BellImage,
    screen: RouteName.NotificationSetting,
  },
  {
    label: 'Security',
    icon: ProtectImage,
    screen: RouteName.Security,
  },
  {
    label: 'Help',
    icon: HelpImage,
    screen: RouteName.EditProfile,
  },
  {
    label: 'Dark Theme',
    icon: SunImage,
    screen: RouteName.EditProfile,
  },
  {
    label: 'Logout',
    icon: LogOutImage,
    screen: RouteName.EditProfile,
  },
];
const Profile = () => {
  const toast = useToast();
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(loading);
  const { appwrite } = useContext(AppwriteContext);
  const [openModalLogout, setOpenModalLogout] = useState(false);
  const dispatch = useDispatch();

  // const info = {
  //   name: 'Edward Ha',
  //   email: 'quocvietha08@gmail.com',
  // };
  // const handleHeaderRightPress = () => {
  //   navigate(RouteName.Notification);
  // };

  const handleGetPrefs = useCallback(async () => {
    setLoading(true);
    await appwrite
      .getCurrentUser()
      .then(res => {
        setUserDetail(res);
      })
      .catch(err => {
        console.log('err--->', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [appwrite]);

  useEffect(() => {
    handleGetPrefs();
  }, [handleGetPrefs]);

  const handleEditAvatar = () => {
    console.log('handle');
  };

  const handleShowModalLogout = () => {
    setOpenModalLogout(true);
  };

  const handleLogout = () => {
    appwrite
      .logout()
      .then(res => {
        dispatch(setAccessToken(''));
        setOpenModalLogout(false);
        toast.show('Logout successful', { type: 'success' });
      })
      .catch(() => {
        toast.show('Logout failed', { type: 'error' });
      });
  };

  const handleRedirectToUpgradeApp = () => {
    navigate(RouteName.UpgradeApp);
  };

  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Profile" isShowAvatar={false} />
      <View style={styles.contentWrap}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: '100%', paddingBottoms: 70 }}
          contentContainerStyle={styles.contentWrap}
        >
          <ProfileAvatar onEditAvatar={handleEditAvatar} info={userDetail} />
          <TouchableDebounce
            onPress={handleRedirectToUpgradeApp}
            style={{ width: '100%' }}
          >
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
          </TouchableDebounce>
          <View style={styles.screenWrap}>
            {PROFILE_CONFIG_SCREE_LIST.map((item, index) => {
              return (
                <ScreenItem
                  onLogout={handleShowModalLogout}
                  item={item}
                  key={index}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <ModalLogout open={openModalLogout} handleClose={handleLogout} />
    </View>
  );
};

export default Profile;

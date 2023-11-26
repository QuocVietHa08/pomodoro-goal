import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from '../../components/TextView';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './LoginStyles.styles';
import { ScrollView } from 'react-native-gesture-handler';
import IconFacebook from '../../assets/icons/login/ic_facebook.svg';
import IconGoogle from '../../assets/icons/login/ic_google.svg';
import IconApple from '../../assets/icons/login/ic_apple.svg';
import Button from '../../components/Button';
import { navigate } from '../../navigators/NavigationServices';
import RouteName from '../../navigators/RouteName';
import HeaderWrap from '../../components/HeaderWrap';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginWithPass = () => {
  const handleRedirectToSignInScreen = () => {
    console.log('redirect to sign in screen');
  };

  const handleRedirectSignInWithPass = () => {
    navigate(RouteName.LoginWithPass);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={[styles.containerScrollView, { alignItems: 'flex-start' }]}>
        <HeaderWrap isBackMode containerStyle={styles.headerWrapper} />
       
      </View> */}
      <KeyboardAwareScrollView
        extraScrollHeight={32}
        contentContainerStyle={styles.keywordScrollView}
        showsVerticalScrollIndicator={false}
        resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        <View
          style={[styles.containerScrollView, { alignItems: 'flex-start' }]}
        >
          <HeaderWrap isBackMode containerStyle={styles.headerWrapper} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default memo(LoginWithPass);

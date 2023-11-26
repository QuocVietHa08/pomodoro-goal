import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from '../../components/TextView';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './LoginStyles.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { navigate } from '../../navigators/NavigationServices';
import RouteName from '../../navigators/RouteName';
import HeaderWrap from '../../components/HeaderWrap';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomeTextInput from '../../components/CustomTextInput';
import IconEmail from 'src/assets/images/login/ic_email.png';
import IconPass from 'src/assets/images/login/ic_password.png';
import IconEyeShow from 'src/assets/images/login/ic_eye_show.png';
import IconEyeHide from 'src/assets/images/login/ic_eye_hide.png';

const LoginWithPass = () => {
  const [showPass, setShowPass] = useState(false);
  const handleRedirectToSignInScreen = () => {
    console.log('redirect to sign in screen');
  };

  const handleRedirectSignInWithPass = () => {
    navigate(RouteName.LoginWithPass);
  };

  const handleShowPassword = () => {
    setShowPass(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <TextView style={styles.textHeaderPass}>Create your Account</TextView>

          <CustomeTextInput
            leftIco={IconEmail}
            defaultValue=""
            placeholder="Email"
            containerStyle={styles.loginInput}
          />
          <CustomeTextInput
            leftIco={IconPass}
            rightIco={showPass ? IconEyeShow : IconEyeHide}
            defaultValue=""
            placeholder="Password"
            containerStyle={styles.loginInput}
            onRightIconPressIn={handleShowPassword}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default memo(LoginWithPass);

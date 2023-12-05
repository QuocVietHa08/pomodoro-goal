import React, { memo } from 'react';
import { View } from 'react-native';
import TextView from '../../components/TextView';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './LoginStyles.styles';
import IconFacebook from '../../assets/icons/login/ic_facebook.svg';
import IconGoogle from '../../assets/icons/login/ic_google.svg';
import IconApple from '../../assets/icons/login/ic_apple.svg';
import Button from '../../components/Button';
import { navigate } from '../../navigators/NavigationServices';
import RouteName from '../../navigators/RouteName';
import HeaderWrap from '../../components/HeaderWrap';
import TouchableDebounce from 'src/components/TouchableDebounce';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { supabase } from 'src/utils/supabase';

const Login = () => {
  const handleRedirectSignInWithPass = () => {
    navigate(RouteName.LoginWithPass);
  };

  const handleRedirectSignUp = () => {
    navigate(RouteName.SignUp);
  };

  const handleLoginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.idToken,
        });
        console.log(error, data);
      } else {
        throw new Error('no ID token present!');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerScrollView}>
        <HeaderWrap isBackMode containerStyle={styles.headerWrapper} />
        <TextView style={styles.textHeader}>Let's you in</TextView>

        <View style={styles.loginSocial}>
          <IconFacebook width={20} height={20} />
          <TextView>Continue with Facebook</TextView>
        </View>

        <TouchableDebounce
          onPress={handleLoginGoogle}
          style={styles.loginSocial}
        >
          <IconGoogle width={20} height={20} />
          <TextView>Continue with Google</TextView>
        </TouchableDebounce>

        <TouchableDebounce
          onPress={handleLoginGoogle}
          style={styles.loginSocial}
        >
          <IconApple width={20} height={20} />
          <TextView>Continue with Apple</TextView>
        </TouchableDebounce>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}
        >
          <View style={styles.dividerLine} />
          <View>
            <TextView style={{ width: 50, textAlign: 'center' }}>Or</TextView>
          </View>
          <View style={styles.dividerLine} />
        </View>

        <Button
          onPress={handleRedirectSignInWithPass}
          style={styles.buttonNext}
          textStyle={styles.buttonTextStyle}
          text="Sign in with password"
        />
        <TextView style={styles.bottomText}>
          Don't have an account?
          <TouchableDebounce onPress={handleRedirectSignUp}>
            <TextView style={styles.signInText}> Sign up</TextView>
          </TouchableDebounce>
        </TextView>
      </View>
    </SafeAreaView>
  );
};

export default memo(Login);

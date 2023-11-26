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

const Login = () => {
  const handleRedirectToSignInScreen = () => {
    console.log('redirect to sign in screen');
  };

  const handleRedirectSignInWithPass = () => {
    navigate(RouteName.LoginWithPass);
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

        <View style={styles.loginSocial}>
          <IconGoogle width={20} height={20} />
          <TextView>Continue with Google</TextView>
        </View>

        <View style={styles.loginSocial}>
          <IconApple width={20} height={20} />
          <TextView>Continue with Apple</TextView>
        </View>

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
          <TextView
            onPress={handleRedirectToSignInScreen}
            style={styles.signInText}
          >
            {' '}
            Sign up
          </TextView>
        </TextView>
      </View>
    </SafeAreaView>
  );
};

export default memo(Login);

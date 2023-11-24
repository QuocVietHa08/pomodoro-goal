import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from '../../components/TextView';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './LoginStyles.styles';
import { ScrollView } from 'react-native-gesture-handler';
import IconFacebook from '../../assets/icons/login/ic_facebook.svg';
import IconGoogle from '../../assets/icons/login/ic_google.svg';
import IconApple from '../../assets/icons/login/ic_apple.svg';

const Login = () => {
  return (
    <SafeAreaView edges={['right']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
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

        {/* <View style={styles.divider}>
          <TextView>or</TextView>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(Login);

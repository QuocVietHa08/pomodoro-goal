import React, { memo, useContext, useState } from 'react';
import { View } from 'react-native';
import TextView from '../../components/TextView';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './LoginStyles.styles';
// import { ScrollView } from 'react-native-gesture-handler';
import { navigate } from '../../navigators/NavigationServices';
import RouteName from '../../navigators/RouteName';
import HeaderWrap from '../../components/HeaderWrap';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomeTextInput from '../../components/CustomTextInput';
import IconEmail from 'src/assets/images/login/ic_email.png';
import IconPass from 'src/assets/images/login/ic_password.png';
import IconEyeShow from 'src/assets/images/login/ic_eye_show.png';
import IconEyeHide from 'src/assets/images/login/ic_eye_hide.png';
import Button from '../../components/Button';
// import { AppTheme } from 'src/utils/appConstant';
// import IconFacebook from '../../assets/icons/login/ic_facebook.svg';
// import IconGoogle from '../../assets/icons/login/ic_google.svg';
// import IconApple from '../../assets/icons/login/ic_apple.svg';
// import TouchableDebounce from 'src/components/TouchableDebounce';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { setAccessToken } from 'src/store/auth/authReducer';
import AppwriteContext from 'src/utils/appwrite/AppwriteContext';
import { useToast } from 'react-native-toast-notifications';

const validateSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  remember: yup.boolean(),
});

const LoginWithPass = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    // watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    resolver: yupResolver(validateSchema),
  });

  const [showPass, setShowPass] = useState(false);
  const handleRedirectToSignInScreen = () => {
    navigate(RouteName.SignUp);
  };

  const handleSignIn = () => {
    setLoading(true);
    const value = getValues();
    const { email, password } = value;

    appwrite
      .login({ email, password })
      .then(res => {
        toast.show('Login successful', {
          type: 'success',
        });
        dispatch(setAccessToken(res?.jwt));
        navigate(RouteName.Home);
      })
      .catch(err => {
        console.log('erro', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShowPassword = () => {
    setShowPass(prev => !prev);
  };

  // const handleSignUpBySocial = type => {
  //   console.log('type:', type);
  // };
  const handleRedirectToForgotPass = () => {
    navigate(RouteName.ForgotPass);
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
          <HeaderWrap
            isBackMode
            isShowAvatar={false}
            containerStyle={styles.headerWrapper}
          />
          <TextView style={styles.textHeaderPass}>
            Login to your Account
          </TextView>

          <CustomeTextInput
            leftIco={IconEmail}
            defaultValue="admin@gmail.com"
            placeholder="Email"
            control={control}
            fieldName={'email'}
            errorMessage={errors?.email?.message}
            containerStyle={styles.loginInput}
          />
          <CustomeTextInput
            leftIco={IconPass}
            rightIco={showPass ? IconEyeShow : IconEyeHide}
            defaultValue="12345678"
            secureTextEntry={!showPass}
            placeholder="Password"
            fieldName={'password'}
            control={control}
            errorMessage={errors?.password?.message}
            containerStyle={styles.loginInput}
            onRightIconPressIn={handleShowPassword}
          />
          {/* <View style={styles.rememberCheckboxWrapper}>
            <CheckBox
              title="Remember me"
              defaultValue={rememberField}
              onChange={value => setValue('remember', value)}
              checkBoxStyle={{ borderColor: 'red', borderRadius: 5 }}
            />
          </View> */}
          <Button
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(handleSignIn)}
            style={[styles.buttonNext, { marginTop: 10 }]}
            textStyle={styles.buttonTextStyle}
            text="Sign up"
          />

          <TextView
            onPress={handleRedirectToForgotPass}
            style={styles.forgotPassTextStyle}
          >
            Forgot the password?.
          </TextView>

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
            }}
          >
            <View style={styles.dividerLine} />
            <View>
              <TextView
                style={{
                  width: 130,
                  textAlign: 'center',
                  color: AppTheme.colors.neutral_40,
                }}
              >
                or continue with{' '}
              </TextView>
            </View>
            <View style={styles.dividerLine} />
          </View> */}

          {/* <View style={styles.signUnBySocialWrapper}>
            <TouchableDebounce
              style={styles.signUpBySocialItem}
              onPress={() => handleSignUpBySocial('facebook')}
            >
              <IconFacebook width={30} height={30} />
            </TouchableDebounce>

            <TouchableDebounce
              style={styles.signUpBySocialItem}
              onPress={() => handleSignUpBySocial('google')}
            >
              <IconGoogle width={30} height={30} />
            </TouchableDebounce>

            <TouchableDebounce
              style={styles.signUpBySocialItem}
              onPress={() => handleSignUpBySocial('apple')}
            >
              <IconApple width={30} height={30} />
            </TouchableDebounce>
          </View> */}

          <TextView
            style={[styles.bottomText, { width: '100%', textAlign: 'center' }]}
          >
            Already have an account?{' '}
            <TextView
              onPress={handleRedirectToSignInScreen}
              style={styles.signInText}
            >
              Sign in
            </TextView>
          </TextView>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default memo(LoginWithPass);

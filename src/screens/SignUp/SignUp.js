import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from '../../components/TextView';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './SignUp.styles';
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
import CheckBox from 'src/components/CheckBox';
import Button from '../../components/Button';
import { AppTheme } from 'src/utils/appConstant';
import IconFacebook from '../../assets/icons/login/ic_facebook.svg';
import IconGoogle from '../../assets/icons/login/ic_google.svg';
import IconApple from '../../assets/icons/login/ic_apple.svg';
import TouchableDebounce from 'src/components/TouchableDebounce';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validateSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      emai: '',
      password: '',
      remember: false,
    },
    resolver: yupResolver(validateSchema),
  });
  const rememberField = watch('remember');
  const [showPass, setShowPass] = useState(false);
  const handleRedirectToSignInScreen = () => {
    navigate(RouteName.Login);
  };

  const handleRedirectSignInWithPass = () => {
    navigate(RouteName.LoginWithPass);
  };

  const handleShowPassword = () => {
    setShowPass(prev => !prev);
  };

  const handleSignUpBySocial = type => {
    console.log('type:', type);
  };

  const handleCreateAccount = () => {
    const values = getValues();
    console.log('value --->', values);
    navigate(RouteName.FillProfile);
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
            fieldName={'email'}
            control={control}
            errorMessage={errors?.email?.message}
            containerStyle={styles.loginInput}
          />
          <CustomeTextInput
            leftIco={IconPass}
            secureTextEntry={!showPass}
            rightIco={showPass ? IconEyeShow : IconEyeHide}
            defaultValue=""
            placeholder="Password"
            control={control}
            fieldName={'password'}
            errorMessage={errors?.password?.message}
            containerStyle={styles.loginInput}
            onRightIconPressIn={handleShowPassword}
          />
          <View style={styles.rememberCheckboxWrapper}>
            <CheckBox
              title="Remember me"
              defaultValue={rememberField}
              onChange={value => setValue('remember', value)}
              checkBoxStyle={{
                borderColor: 'red',
                borderRadius: 5,
              }}
              isCheckedStyle={{
                backgroundColor: 'red',
              }}
            />
          </View>
          <Button
            onPress={handleSubmit(handleCreateAccount)}
            style={[styles.buttonNext, { marginTop: 10 }]}
            textStyle={styles.buttonTextStyle}
            text="Sign up"
          />

          <View
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
          </View>

          <View style={styles.signUnBySocialWrapper}>
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
          </View>

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

export default memo(SignUp);

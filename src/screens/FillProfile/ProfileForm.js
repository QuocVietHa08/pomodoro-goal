import React, { memo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomeTextInput from '../../components/CustomTextInput';
import IconEmail from 'src/assets/images/login/ic_email.png';
import Button from '../../components/Button';
import { AppTheme } from 'src/utils/appConstant';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const { width } = Dimensions.get('window');

const validateSchema = yup.object().shape({
  fullName: yup.string().required('FullName is required'),
  name: yup.string().required('Nick name is required'),
  email: yup.string().email().required('Email is required'),
  phoneNumber: yup.number().required('Phone Number is required'),
});

const ProfileForm = () => {
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
  const [showPass, setShowPass] = useState(false);

  const handleShowPassword = () => {
    setShowPass(prev => !prev);
  };

  const handleCreateAccount = () => {
    const values = getValues();
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        edges={{
          top: 0,
        }}
      >
        <KeyboardAwareScrollView
          extraScrollHeight={32}
          contentContainerStyle={styles.keywordScrollView}
          showsVerticalScrollIndicator={false}
          resetScrollToCoords={{ x: 0, y: 0 }}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
        >
          <View style={styles.containerScrollView}>
            <CustomeTextInput
              defaultValue=""
              placeholder="Full Name"
              fieldName={'fullName'}
              control={control}
              errorMessage={errors?.fullName?.message}
              containerStyle={styles.loginInput}
            />
            <CustomeTextInput
              defaultValue=""
              rightIco={null}
              placeholder="Nickname"
              fieldName={'name'}
              control={control}
              errorMessage={errors?.name?.message}
              containerStyle={styles.loginInput}
            />
            <CustomeTextInput
              defaultValue=""
              rightIco={IconEmail}
              placeholder="Email"
              control={control}
              fieldName={'email'}
              errorMessage={errors?.email?.message}
              containerStyle={styles.loginInput}
            />
            <View>
              <Button
                onPress={handleSubmit(handleCreateAccount)}
                style={[styles.buttonNext]}
                textStyle={styles.buttonTextStyle}
                text="Sign up"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default memo(ProfileForm);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  containerScrollView: {
    width: '90%',
    height: '100%',
  },
  textHeader: {
    fontSize: AppTheme.fontSize.s40,
    fontWeight: 700,
    color: AppTheme.colors.black,
    marginBottom: 100,
  },
  buttonTextStyle: {
    color: 'white',
  },
  buttonNext: {
    marginTop: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#ff585d',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomText: {
    position: 'absolute',
    bottom: 0,
    color: AppTheme.colors.neutral_40,
  },

  keywordScrollView: {
    width,
    backgroundColor: 'transparent',
  },

  loginInput: {
    marginBottom: 20,
    borderRadius: 10,
  },
});

import React, { memo, useRef, useState } from 'react';
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
import PhoneInput from 'react-native-phone-number-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextView from 'src/components/TextView';
import { ScrollView } from 'react-native-reanimated/mock';
import { navigate } from 'src/navigators/NavigationServices';
import RouteName from 'src/navigators/RouteName';

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
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowPassword = () => {
    setShowPass(prev => !prev);
  };

  const handleCheckValidPhoneNumber = () => {
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
    setShowMessage(!checkValid);
  };

  const handleUpdateProfile = () => {
    const values = getValues();
  };

  const handleSkipAccount = () => {
    navigate(RouteName.Home);
  };

  return (
    <ScrollView>
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
              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode="DM"
                layout="first"
                onChangeText={text => {
                  setValue(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                withDarkTheme
                withShadow
                autoFocus
                containerStyle={styles.phoneInputStyle}
                textContainerStyle={{ borderRadius: 10 }}
              />
              {showMessage && (
                <View style={styles.message}>
                  <TextView style={styles.errorMessage}>
                    Please input valid phone number
                  </TextView>
                </View>
              )}
              <View style={styles.buttonWrapper}>
                <Button
                  onPress={handleSkipAccount}
                  style={[styles.buttonSkip]}
                  textStyle={[styles.buttonTextStyle, { color: '#ff585d' }]}
                  text="Skip"
                />

                <Button
                  onPress={() => {
                    handleCheckValidPhoneNumber();
                    handleSubmit(handleUpdateProfile);
                  }}
                  style={[styles.buttonNext]}
                  textStyle={styles.buttonTextStyle}
                  text="Start"
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    </ScrollView>
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
  buttonWrapper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonTextStyle: {
    color: 'white',
  },
  buttonNext: {
    marginTop: 10,
    width: '48%',
    height: 50,
    backgroundColor: '#ff585d',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSkip: {
    marginTop: 10,
    width: '48%',
    height: 50,
    backgroundColor: '#ffeeef',
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
  phoneInputStyle: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#fff',
  },
  errorMessage: {
    fontStyle: 'italic',
    color: '#660000',
  },
});

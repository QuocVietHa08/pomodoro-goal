import React, { useEffect, useState } from 'react';
import { View } from 'react-native-reanimated/mock';
import TextView from 'src/components/TextView';
import styles from './ForgotPass.style';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWrap from 'src/components/HeaderWrap';
import TouchableDebounce from 'src/components/TouchableDebounce';
import FastImage from 'react-native-fast-image';
import ForgotPassImage from 'src/assets/images/forgotPass/forgotPass.png';
import IconEmail from 'src/assets/images/login/ic_email.png';
import IconMessage from 'src/assets/images/forgotPass/ic_message.png';
import IconComponent from 'src/components/IconComponent';
import { AppTheme } from 'src/utils/appConstant';
import OTPInput from 'src/components/OTPInput';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ForgotPass = () => {
  const MAX_TIME = 60;
  const [receiveType, setReceiveType] = useState('sms');
  const [isSendCode, setIsSendCode] = useState(false);
  const [countDown, setCountDown] = useState(MAX_TIME);
  const [isError, setIsError] = useState(false);

  const { control, handleSubmit, watch } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
  }, [countDown]);
  const handleChooseReceiveType = type => {
    setReceiveType(type);
  };

  const handleSendCode = () => {
    setIsSendCode(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerScrollView}>
        <HeaderWrap
          titleBack="Forgot Password"
          isBackMode
          containerStyle={styles.headerWrapper}
        />
        {!isSendCode ? (
          <View style={styles.screenContent}>
            <FastImage
              source={ForgotPassImage}
              style={{
                width: 350,
                height: 300,
              }}
            />
            <TextView>
              Select which contact details should we use to reset your password
            </TextView>

            <View style={styles.optionResetPassWrapper}>
              <TouchableDebounce
                onPress={() => handleChooseReceiveType('sms')}
                style={[
                  styles.optionResetWrapper,
                  {
                    borderColor:
                      receiveType === 'sms'
                        ? 'red'
                        : AppTheme.colors.neutral_40,
                    borderWidth: receiveType === 'sms' ? 2 : 1,
                  },
                ]}
              >
                <View style={styles.optionResetImage}>
                  <FastImage
                    source={IconMessage}
                    style={{ width: 25, height: 25 }}
                  />
                </View>
                <View>
                  <TextView style={{ color: AppTheme.colors.neutral_50 }}>
                    via SMS
                  </TextView>
                  <TextView style={{ fontWeight: 700 }}>+1 111*****99</TextView>
                </View>
              </TouchableDebounce>

              <TouchableDebounce
                onPress={() => handleChooseReceiveType('email')}
                style={[
                  styles.optionResetWrapper,
                  {
                    borderColor:
                      receiveType === 'email'
                        ? 'red'
                        : AppTheme.colors.neutral_40,
                    borderWidth: receiveType === 'email' ? 2 : 1,
                  },
                ]}
              >
                <View style={styles.optionResetImage}>
                  <FastImage
                    source={IconEmail}
                    style={{ width: 25, height: 25 }}
                  />
                </View>
                <View>
                  <TextView style={{ color: AppTheme.colors.neutral_50 }}>
                    via Email
                  </TextView>
                  <TextView style={{ fontWeight: 700 }}>
                    har**@gmail.com
                  </TextView>
                </View>
              </TouchableDebounce>
              <Button
                onPress={handleSendCode}
                style={[styles.buttonNext, { marginTop: 10 }]}
                textStyle={styles.buttonTextStyle}
                text="Continue"
              />
            </View>
          </View>
        ) : (
          <View style={styles.screenContent}>
            <KeyboardAwareScrollView
              extraScrollHeight={0}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.enterCodeKeyboardScrollView}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.enterCodeWrapper}>
                <TextView>Code has been sent to +1 11***99</TextView>
                <OTPInput
                  control={control}
                  fieldName="otp"
                  autoFocus
                  errorMessage={
                    isError
                      ? 'The code you entered is incorrect. Please try again'
                      : ''
                  }
                />
                <TextView>
                  Resend code it{' '}
                  <TextView style={{ color: 'red' }}>{countDown}</TextView> s
                </TextView>
              </View>
              <Button
                onPress={handleSendCode}
                style={[styles.buttonNext, { marginTop: 10 }]}
                textStyle={styles.buttonTextStyle}
                text="Verify"
              />
            </KeyboardAwareScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPass;

import React from 'react';
import styles from './EditProfile.styles';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import HeaderWrap from 'src/components/HeaderWrap';
import CustomeTextInput from 'src/components/CustomTextInput';
import Button from 'src/components/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validateSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dob: yup.string().required('Date of birth is required'),
  email: yup.string().email().required('Email is required'),
  country: yup.string().required('Country is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  gender: yup.string().required('Gender is required'),
});
const EditProfile = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const updateProfile = data => {
    console.log('hello ', data);
  };

  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Edit Profile" isShowAvatar={false} />
      <View style={styles.formWrap}>
        <CustomeTextInput
          control={control}
          name="firstName"
          placeholder="First name"
          containerStyle={styles.input}
          errorMessage={errors?.firstName?.message}
        />
        <CustomeTextInput
          control={control}
          name="lastName"
          containerStyle={styles.input}
          placeholder="Last name"
          errorMessage={errors?.lastName?.message}
        />
        <CustomeTextInput
          control={control}
          name="dob"
          containerStyle={styles.input}
          placeholder="Date of birth"
          errorMessage={errors?.dob?.message}
        />
        <CustomeTextInput
          control={control}
          name="email"
          containerStyle={styles.input}
          placeholder="Email"
          errorMessage={errors?.email?.message}
        />
        <CustomeTextInput
          control={control}
          name="country"
          containerStyle={styles.input}
          placeholder="Country"
          errorMessage={errors?.country?.message}
        />
        <CustomeTextInput
          control={control}
          name="phoneNumber"
          containerStyle={styles.input}
          placeholder="Phone Number"
          errorMessage={errors?.phoneNumber?.message}
        />
        <CustomeTextInput
          control={control}
          name="gender"
          containerStyle={styles.input}
          placeholder="Gender"
          errorMessage={errors?.gender?.message}
        />
        <Button
          style={[styles.buttonNext, { marginTop: 10 }]}
          textStyle={styles.buttonTextStyle}
          onPress={handleSubmit(updateProfile)}
          text="Save"
        />
      </View>
    </View>
  );
};

export default EditProfile;

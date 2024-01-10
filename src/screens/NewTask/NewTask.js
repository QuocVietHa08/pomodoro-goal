import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './NewTask.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import { useForm } from 'react-hook-form';
import TextInputWithTitleBasic from 'src/components/TextInputWithTitleBasic';
import DatePickerModal from 'src/components/DatePickerModal';
import moment from 'moment';
import { DATE_FORMAT } from 'src/utils/appConstant';
import CalendarImage from 'src/assets/images/calendar.png';
import ClockImage from 'src/assets/images/clock.png';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DropdownComp from 'src/components/DropdownComp';
import SliderComp from 'src/components/SliderComp';
import Button from '../../components/Button';
import { setStatusBottomTab } from 'src/store/app/appReducer';
import { useDispatch } from 'react-redux';

const validateSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
  category: yup.string().required('Category is required'),
  sessions: yup.number().required('Sessions is required').min(1),
  longBreak: yup.number().required('Long Break is required').min(0),
  shortBreak: yup.number().required('Short Break is required').min(0),
});

const NewTask = () => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(0);
  const datePickerRef = useRef();
  const timePickerRef = useRef();
  const [categories, setCategories] = useState([
    { label: 'Work', value: 'work' },
    { label: 'Study', value: 'study' },
    { label: 'Sport', value: 'sport' },
    { label: 'Relax', value: 'relax' },
  ]);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title: '',
      date: '',
      time: '',
      category: '',
      sessions: 0,
      longBreak: 0,
      shortBreak: 0,
    },
    resolver: yupResolver(validateSchema),
  });

  const onDateSelected = date => {
    setValue('date', moment(date).format(DATE_FORMAT.YYYYmmdd));
    setTrigger(prev => prev + 1);
  };

  const onTimeSelected = date => {
    setValue('time', moment(date).format(DATE_FORMAT.HHMM));
    setTrigger(prev => prev + 1);
  };

  const showDatePicker = () => {
    datePickerRef.current?.show(onDateSelected);
  };

  const showTimePicker = () => {
    timePickerRef.current?.show(onTimeSelected);
  };

  const handleCreateNewTask = () => {
    const values = getValues();
    console.log('value ---->', values);
  };

  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Create New Task" />
      <View style={styles.formCreateNewTask}>
        <TextInputWithTitleBasic
          title="Title"
          placeholder="Enter title"
          titleStyle={styles.titleTextInput}
          control={control}
          defaultValue={getValues('title')}
          fieldName="title"
          errorMessage={errors?.title?.message}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <TextInputWithTitleBasic
            title="Date"
            containerStyle={{ width: '47%' }}
            onRightIconPressIn={showDatePicker}
            placeholder="Enter Date"
            rightIco={CalendarImage}
            titleStyle={styles.titleTextInput}
            control={control}
            fieldName="date"
            defaultValue={getValues('date')}
            errorMessage={errors?.date?.message}
          />

          <TextInputWithTitleBasic
            title="Time"
            containerStyle={{ width: '47%' }}
            rightIco={ClockImage}
            onRightIconPressIn={showTimePicker}
            control={control}
            defaultValue={getValues('time')}
            fieldName="time"
            placeholder="Enter Time"
            titleStyle={styles.titleTextInput}
            errorMessage={errors?.time?.message}
          />
        </View>
        <View style={[styles.formCreateNewTask, { marginTop: 20 }]}>
          <TextView style={styles.titleTextInput}>Select Category</TextView>
          <DropdownComp
            data={categories}
            control={control}
            fieldName="category"
            errorMessage={errors?.category?.message}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            height: 40,
          }}
        >
          <SliderComp
            title="Working Sessions"
            minimumValue={0}
            maximumValue={8}
            fieldName="sessions"
            value={getValues('sessions')}
            control={control}
            onChange={value => {
              setValue('sessions', value);
              setTrigger(prev => prev + 1);
            }}
            errorMessage={errors?.sessions?.message}
          />
        </View>
        <View
          style={{
            marginTop: 40,
            marginBottom: 20,
            height: 40,
          }}
        >
          <SliderComp
            title="Long Break"
            minimumValue={10}
            maximumValue={30}
            step={5}
            fieldName="longBreak"
            value={getValues('longBreak')}
            control={control}
            onChange={value => {
              setValue('longBreak', value);
              setTrigger(prev => prev + 1);
            }}
            errorMessage={errors?.longBreak?.message}
          />
        </View>
        <View
          style={{
            marginTop: 40,
            marginBottom: 20,
            height: 40,
          }}
        >
          <SliderComp
            title="Short Break"
            minimumValue={1}
            maximumValue={10}
            step={1}
            fieldName="shortBreak"
            value={getValues('shortBreak')}
            control={control}
            onChange={value => {
              setValue('shortBreak', value);
              setTrigger(prev => prev + 1);
            }}
            errorMessage={errors?.shortBreak?.message}
          />
        </View>
        <View style={{ marginTop: 40 }}>
          <Button
            style={[styles.buttonNext, { marginTop: 10 }]}
            textStyle={styles.buttonTextStyle}
            onPress={handleSubmit(handleCreateNewTask)}
            text="Create New Task"
          />
        </View>

        <DatePickerModal
          defaultDate={moment(new Date(), DATE_FORMAT.YYYYmmdd).toDate()}
          ref={datePickerRef}
        />

        <DatePickerModal
          defaultDate={moment(new Date(), DATE_FORMAT.HHMM).toDate()}
          mode="time"
          ref={timePickerRef}
        />
      </View>
    </View>
  );
};

export default NewTask;

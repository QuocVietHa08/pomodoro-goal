import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import AppwriteContext from 'src/utils/appwrite/AppwriteContext';
import { useToast } from 'react-native-toast-notifications';
import { navigate } from 'src/navigators/NavigationServices';
import RouteName from 'src/navigators/RouteName';
import Config from 'react-native-config';

const TASK_COLLECTION_ID = Config.TASK_COLLECTION_ID;
const CATEGORY_COLLECTION_ID = Config.CATEGORY_COLLECTION_ID;
const DATABASE_ID = Config.DATABASE_ID;

const validateSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  category_id: yup.string().required('Category is required'),
  duration: yup.number().required('Duration is required').min(0),
});

const NewTask = () => {
  const { appwrite } = useContext(AppwriteContext);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryChoose, setCategoryChoose] = useState(null);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      category_id: '',
      duration: 0,
    },
    resolver: yupResolver(validateSchema),
  });

  const handleGetCategories = useCallback(() => {
    appwrite
      .getListDocument(DATABASE_ID, CATEGORY_COLLECTION_ID)
      .then(res => {
        const data = res?.documents.map(item => ({
          label: item.name,
          value: item?.$id,
        }));
        setCategories(data);
      })
      .catch(() => {
        toast.show('Connection error', { type: 'error' });
      });
  }, [appwrite]);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  const handleCreateNewTask = () => {
    const values = { ...getValues() };
    values.category_id = categoryChoose;
    values.create_date = new Date();
    setLoading(true);
    appwrite
      .createDocument(DATABASE_ID, TASK_COLLECTION_ID, values)
      .then(res => {
        navigate(RouteName.Home);
      })
      .catch(() => {
        toast.show('Connection error', { type: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Create New Task" isShowAvatar={false} />
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
        {/* <View
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
        </View> */}
        <View style={[styles.formCreateNewTask, { marginTop: 30 }]}>
          <TextView style={styles.titleTextInput}>Select Category</TextView>
          <DropdownComp
            data={categories}
            control={control}
            onSelectedItem={item => {
              console.log('item ---->', item);
              setCategoryChoose(item);
              setValue('category_id', item);
              setTrigger(prev => prev + 1);
            }}
            fieldName="category_id"
            errorMessage={errors?.category_id?.message}
          />
        </View>
        <View
          style={{
            marginTop: 30,
            marginBottom: 20,
            height: 40,
          }}
        >
          <SliderComp
            title="Duration"
            minimumValue={0}
            maximumValue={120}
            fieldName="duration"
            value={getValues('duration')}
            control={control}
            onChange={value => {
              setValue('duration', value);
              setTrigger(prev => prev + 1);
            }}
            errorMessage={errors?.sessions?.message}
          />
        </View>
        {/* <View
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
        </View> */}
        {/* <View
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
        </View> */}
      </View>
      <View style={styles.buttonNextWrap}>
        <Button
          loading={loading}
          disabled={loading}
          style={styles.buttonNext}
          textStyle={styles.buttonTextStyle}
          onPress={handleSubmit(handleCreateNewTask)}
          text="Create New Task"
        />
      </View>

      {/* <DatePickerModal
        defaultDate={moment(new Date(), DATE_FORMAT.YYYYmmdd).toDate()}
        ref={datePickerRef}
      />

      <DatePickerModal
        defaultDate={moment(new Date(), DATE_FORMAT.HHMM).toDate()}
        mode="time"
        ref={timePickerRef}
      /> */}
    </View>
  );
};

export default NewTask;

import React from 'react';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import styles from './NewTask.styles';
import HeaderWrap from 'src/components/HeaderWrap';
import { useForm } from 'react-hook-form';
import TextInputWithTitleBasic from 'src/components/TextInputWithTitleBasic';

const NewTask = () => {
  const { control, handleSubmit, getValues } = useForm({
    mode: 'all',
    defaultValues: {
      title: '',
      date: '',
      time: '',
      category: '',
      sessions: 0,
      longBreak: 0,
      shortBreak: 0,
    },
  });
  return (
    <View style={styles.container}>
      <HeaderWrap isBackMode titleBack="Create New Task" />
      <View style={styles.formCreateNewTask}>
        <TextInputWithTitleBasic
          title="Title"
          placeholder="Enter title"
          titleStyle={styles.titleTextInput}
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
            placeholder="Enter title"
            titleStyle={styles.titleTextInput}
          />
          <TextInputWithTitleBasic
            title="Time"
            containerStyle={{ width: '47%' }}
            placeholder="Enter title"
            titleStyle={styles.titleTextInput}
          />
        </View>
      </View>
    </View>
  );
};

export default NewTask;

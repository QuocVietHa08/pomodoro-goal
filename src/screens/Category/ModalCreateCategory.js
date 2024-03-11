import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
// import HeaderWrap from 'src/components/HeaderWrap';
import styles from './Category.styles';
import { LIST_COLOR } from './mockData';
import TextView from 'src/components/TextView';
// import newScope from 'src/assets/images/bottomTab/newScope.png';
// import CategoryItem from './CategoryItem';
import ReactNativeModal from 'react-native-modal';
import TouchableDebounce from 'src/components/TouchableDebounce';
import { AppTheme } from 'src/utils/appConstant';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AppwriteContext from 'src/utils/appwrite/AppwriteContext';
import { useToast } from 'react-native-toast-notifications';
import { useContext } from 'react';
import Config from 'react-native-config';

const validateSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  color: yup.string().required('Color is required'),
});

const DATABASE_ID = Config.DATABASE_ID;
const CATEGORY_COLLECTION_ID = Config.CATEGORY_COLLECTION_ID;

const ModalCreateCategory = ({ openModalAdd, setOpenModalAdd, onFetch }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      color: '',
    },
    resolver: yupResolver(validateSchema),
  });
  const { appwrite } = useContext(AppwriteContext);
  const toast = useToast();
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChooseCategoryColor = colorPick => {
    setColor(colorPick);
    setValue('color', colorPick);
  };

  const handleCloseModal = () => {
    setOpenModalAdd(false);
    setTimeout(() => {
      reset();
      setName('');
      setColor('');
    }, 500);
  };

  const handleAddCategory = data => {
    setLoading(true);
    appwrite
      .createDocument(DATABASE_ID, CATEGORY_COLLECTION_ID, data)
      .then(res => {
        console.log('toast', res);
        handleCloseModal();
        onFetch();
      })
      .catch(() => {
        toast.show('Create category fail', { type: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <ReactNativeModal isVisible={openModalAdd}>
        <View style={styles.modalAddCategory}>
          <TextView>Add Category</TextView>
          <View style={styles.modalInputWrapper}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, valueName } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={valueName}
                  style={styles.inputStyle}
                />
              )}
              name="name"
              rules={{ required: true }}
            />
          </View>
          <TextView style={{ color: 'red' }}>{errors?.name?.message}</TextView>
          <View style={styles.modalColorPickWrapper}>
            {LIST_COLOR.map(colorItem => (
              <TouchableDebounce
                key={colorItem}
                style={{
                  borderWidth: 3,
                  borderRadius: 0,
                  borderColor:
                    color === colorItem ? AppTheme.colors.primary_1 : colorItem,
                }}
                onPress={() => handleChooseCategoryColor(colorItem)}
              >
                <View
                  style={[
                    styles.colorPickerItem,
                    { backgroundColor: colorItem },
                  ]}
                />
              </TouchableDebounce>
            ))}
            <TextView style={{ color: 'red' }}>
              {errors?.color?.message}
            </TextView>
          </View>
          <View style={styles.modalButtonWrapper}>
            <TouchableDebounce
              style={styles.buttonCancel}
              disabled={loading}
              onPress={handleCloseModal}
            >
              <TextView style={{ color: 'white', fontWeight: 600 }}>
                Cancel
              </TextView>
            </TouchableDebounce>

            <TouchableDebounce
              style={styles.buttonSave}
              loading={loading}
              disabled={loading}
              onPress={handleSubmit(handleAddCategory)}
            >
              <TextView style={{ color: 'white', fontWeight: 600 }}>
                Save
              </TextView>
            </TouchableDebounce>
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default ModalCreateCategory;

import React, { useContext, useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import styles from './Category.styles';
import { LIST_COLOR } from './mockData';
import TextView from 'src/components/TextView';
import ReactNativeModal from 'react-native-modal';
import TouchableDebounce from 'src/components/TouchableDebounce';
import { AppTheme } from 'src/utils/appConstant';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AppwriteContext from 'src/utils/appwrite/AppwriteContext';
import { useToast } from 'react-native-toast-notifications';
import TrashIcon from 'src/assets/images/completedTask/trash.png';
import FastImage from 'react-native-fast-image';

const validateSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  color: yup.string().required('Color is required'),
});

const ModalEditCategory = ({
  openModalAdd,
  setOpenModalAdd,
  item,
  onFetch,
}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { appwrite } = useContext(AppwriteContext);
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
  const [color, setColor] = useState(item?.color);

  useEffect(() => {
    if (item) {
      setValue('name', item?.name);
      setValue('color', item?.color);
      setColor(item?.color);
    }
  }, [item]);

  const handleChooseCategoryColor = colorPick => {
    setColor(colorPick);
    setValue('color', colorPick);
  };

  const handleCloseModal = () => {
    setOpenModalAdd(null);
    setTimeout(() => {
      reset();
      setColor('');
    }, 500);
  };

  const handleAddCategory = data => {
    setLoading(true);
    appwrite
      .updateDocument(item?.$databaseId, item?.$collectionId, item?.$id, data)
      .then(() => {
        handleCloseModal();
        onFetch();
      })
      .catch(() => {
        toast.show('Update category fail', { type: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteCategory = () => {
    appwrite
      .deleteDocument(item?.$databaseId, item?.$collectionId, item?.$id)
      .then(() => {
        handleCloseModal();
        onFetch();
      })
      .catch(() => {
        toast.show('Delete category fail', { type: 'error' });
      });
  };

  return (
    <>
      <ReactNativeModal isVisible={openModalAdd}>
        <View style={styles.modalAddCategory}>
          <View style={styles.modalCategoryTitle}>
            <TextView>Edit Category</TextView>
            <TouchableDebounce
              onPress={handleDeleteCategory}
              style={styles.trashIcon}
            >
              <FastImage source={TrashIcon} style={styles.trashIcon} />
            </TouchableDebounce>
          </View>
          <View style={styles.modalInputWrapper}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={valueChange => onChange(valueChange)}
                    value={value}
                    style={styles.inputStyle}
                  />
                );
              }}
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
              disabled={loading}
              style={styles.buttonCancel}
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

export default ModalEditCategory;

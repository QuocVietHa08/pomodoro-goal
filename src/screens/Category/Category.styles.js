import { includes } from 'lodash';
import { StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
  },
  headerIconRight: {
    width: 30,
    height: 30,
  },
  categoryItemWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  categoryTitle: {
    fontSize: AppTheme.fontSize.s16,
  },
  categoryColor: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  modalAddCategory: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
  },
  modalInputWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputStyle: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  modalColorPickWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  colorPickerItem: {
    width: 27,
    height: 27,
  },
  modalButtonWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonSave: {
    width: '45%',
    backgroundColor: AppTheme.colors.primary_1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonCancel: {
    width: '45%',
    backgroundColor: AppTheme.colors.neutral_50,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalCategoryStyle: {
    width: '50%',
    height: '50%',
  },
  modalCategoryTitle: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  trashIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 0,
  },
});

export default styles;

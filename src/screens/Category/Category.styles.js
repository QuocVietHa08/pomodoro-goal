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
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
  },
  buttonSave: {
    backgroundColor: AppTheme.colors.primary_1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default styles;

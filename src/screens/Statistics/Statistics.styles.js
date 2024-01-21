import { StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
  },
  headerIconLeft: {
    width: 60,
    height: 60,
  },
  headerIconRight: {
    width: 30,
    height: 30,
  },
  statisticsTitleWrap: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    width: '100%',
    minHeight: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: AppTheme.colors.primary_1,
  },
  dropDownContainerStyle: {
    width: '100%',
    maxHeight: 200,
    borderWidth: 1,
    borderColor: AppTheme.colors.primary_1,
    marginTop: 6,
    borderRadius: 8,
    zIndex: 9999,
    top: 0,
    paddingLeft: AppTheme.gapSize.s10,
    color: AppTheme.colors.primary_1,
  },
  dropContainerStyle: {
    width: '35%',
    color: AppTheme.colors.primary_1,
    borderColor: AppTheme.colors.primary_1,
    zIndex: 9999,
  },
  lineGraphWrap: {
    width: '100%',
    height: 220,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    position: 'relative',
    zIndex: -1,
  },
  lineGraphStyle: {
    width: '100%',
    height: '100%',
  },
  taskTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default styles;

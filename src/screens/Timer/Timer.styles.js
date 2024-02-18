import { StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
    position: 'relative',
  },
  rightIconStyles: {
    width: 30,
    height: 30,
    color: 'red',
  },
  timerWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  circularWrap: {
    marginTop: 50,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 50,
    display: 'flex',
  },
  buttonStartStyle: {},
  buttonCancelStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: AppTheme.colors.primary_1,
  },
  buttonCancelTextStyle: {
    color: AppTheme.colors.primary_1,
  },
});
export default styles;

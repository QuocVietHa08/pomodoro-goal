import { StyleSheet, Dimensions } from 'react-native';
import { AppTheme, Dimens, scaleSize } from '../../utils/appConstant';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: AppTheme.colors.white,
  },
  titleHeader: {
    fontSize: AppTheme.fontSize.s30,
    color: AppTheme.colors.black,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: AppTheme.fontSize.s16,
    color: AppTheme.colors.black,
    fontWeight: 400,
    textAlign: 'center',
  },
});

import { StyleSheet, Dimensions } from 'react-native';
import { AppTheme, Dimens, scaleSize } from '../../utils/appConstant';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.colors.primary_10,
  },
  textHeader: {
    fontSize: AppTheme.fontSize.s40,
    fontWeight: 700,
    color: AppTheme.colors.neutral_100,
    marginBottom: 50,
  },
  loginSocial: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: AppTheme.colors.neutral_20,
    borderRadius: 10,
    marginBottom: 15,
  },
  divider: {
    marginTop: 30,
    backgroundColor: 'red',
  },
});

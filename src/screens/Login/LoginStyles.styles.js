import { StyleSheet, Dimensions } from 'react-native';
import { AppTheme, Dimens, scaleSize } from '../../utils/appConstant';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  headerWrapper: {
    position: 'absolute',
    top: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    backgroundColor: AppTheme.colors.white,
  },
  containerScrollView: {
    width: '90%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: AppTheme.fontSize.s40,
    fontWeight: 700,
    color: AppTheme.colors.black,
    marginBottom: 100,
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
  dividerLine: {
    backgroundColor: AppTheme.colors.neutral_20,
    height: 1,
    flex: 1,
  },
  buttonTextStyle: {
    color: 'white',
  },
  buttonNext: {
    marginTop: 50,
    width: '100%',
    height: 50,
    backgroundColor: '#ff585d',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomText: {
    position: 'absolute',
    bottom: 0,
    color: AppTheme.colors.neutral_40,
  },
  signInText: {
    color: '#ff585d',
    fontWeight: 700,
  },

  // login with pass
  textHeaderPass: {
    fontSize: AppTheme.fontSize.s40,
    fontWeight: 700,
    color: AppTheme.colors.black,
    marginBottom: 50,
  },
  keywordScrollView: {
    width,
    backgroundColor: 'transparent',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginInput: {
    marginBottom: 20,
    // backgroundColor: AppTheme.colors.neutral_10,
    borderRadius: 10,
  },

  rememberCheckboxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },

  signUnBySocialWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  signUpBySocialItem: {
    borderColor: AppTheme.colors.neutral_30,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

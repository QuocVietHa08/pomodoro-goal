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
  screenWrap: {
    flex: 1,
    height: '9%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  mainTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    color: AppTheme.colors.primary_1,
  },
  subTitle: {
    fontSize: 18,
  },
  imageWrapper: {
    width: '100%',
    height: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyImage: {
    width: '70%',
    height: '50%',
    position: 'absolute',
  },
  upgradeOptionsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
  },
  buttonNext: {
    marginTop: 20,
    width: '100%',
    height: 50,
    backgroundColor: '#ff585d',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonTextStyle: {
    color: 'white',
  },
});

export default styles;

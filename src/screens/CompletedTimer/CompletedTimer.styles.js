import { StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
  },
  screenWrap: {
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
  trophyImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  simpleButton: {
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  fireworkStyle: {
    backgroundColor: 'red',
  },
  upgradeOptionsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
    // backgroundColor: 'red',
    width: '100%',
  },
  upgradeOption: {
    display: 'flex',
    backgroundColor: 'white',
    borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
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
  },
  buttonTextStyle: {
    color: 'white',
  },
});

export default styles;

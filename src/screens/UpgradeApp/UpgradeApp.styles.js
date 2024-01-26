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
    marginTop: 30,
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
});

export default styles;

import { StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
  },
  contentWrap: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 30
  },
  upgradeToPremiumWrap: {
    marginTop: 20 ,
    width: '100%',
    backgroundColor: AppTheme.colors.primary_1,
    borderRadius: 15,
    padding: 20,
  },
  premiumFirstLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  proIcon: {
     backgroundColor: '#fed301',
     borderRadius: 15,
     paddingHorizontal: 10,
     paddingVertical: 5,
  },
  nextIconWrap: {
    width: 25,
    height: 25, 
    backgroundColor: 'white',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextIcon: {
    width: 30,
    height: 30,
    borderRadius: 50, 
  },
  screenWrap: {
    width: '100%',
    marginTop: 20,
  }
});

export default styles;

import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
  },
  deteleIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    width: 50,
    height: 100,
  },
  deleteIconWrap: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '80%',
    backgroundColor: '#fee8eb',
    borderRadius: 10,
  },

  deleteIcon: {
    width: 25,
    height: 25,
  },
});

export default styles;

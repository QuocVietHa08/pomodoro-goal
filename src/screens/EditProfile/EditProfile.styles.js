const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
  },
  formWrap: {
    flex: 1,
    position: 'relative',
  },
  input: {
    marginVertical: 10,
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
    position: 'absolute',
    bottom: 50,
  },
})

export default styles;
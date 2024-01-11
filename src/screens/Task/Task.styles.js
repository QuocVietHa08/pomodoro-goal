import { StyleSheet } from 'react-native';
import { AppTheme } from 'src/utils/appConstant';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fcfcfc',
  },
  headerIconLeft: {
    width: 60,
    height: 60,
  },
  iconCalendar: {
    width: 20,
    height: 20,
  },
  calendarStyle: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDayStyle: {
    backgroundColor: AppTheme.colors.primary_1,
    borderRadius: 15,
    width: 40,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    color: 'white',
  },
  calendarWrapper: {
    flex: 1,
    width: '100%',
    marginTop: 25,
  },
  emptyTask: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

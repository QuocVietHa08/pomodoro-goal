import { StyleSheet } from 'react-native';
export default function ({ Colors, Gutters, Layout }) {
  const base = {
    ...Layout.center,
    ...Gutters.regularHPadding,
    height: 40,
    backgroundColor: Colors.primary,
  };
  const rounded = {
    ...base,
    borderRadius: 10,
  };
  const circle = {
    ...Layout.center,
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: Colors.circleButtonBackground,
    color: Colors.circleButtonColor,
    fill: Colors.circleButtonColor,
  };
  return StyleSheet.create({
    base,
    rounded,
    circle,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
  });
}

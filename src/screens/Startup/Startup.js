import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { setDefaultTheme } from '../../store/theme';
const Startup = ({ navigation }) => {
  const { Layout, Gutters } = useTheme();
  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    await setDefaultTheme({ theme: 'default', darkMode: null });
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <View style={[styles.startupWrapper, Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  );
};

const styles = StyleSheet.create({
  startupWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});
export default Startup;

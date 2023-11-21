import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import {
  Common,
  Fonts,
  Gutters,
  Images,
  Layout,
  themes,
  DefaultVariables,
} from '../theme';
export default function () {
  // Get the scheme device
  const colorScheme = useColorScheme();
  // Get current theme from the store
  const currentTheme = useSelector(state => state.theme.theme);
  const isDark = useSelector(state => state.theme.darkMode);
  const darkMode = isDark === null ? colorScheme === 'dark' : isDark;
  let variables = {};
  let partialTheme = {};
  let darkVariables = {};
  let partialDarkTheme = {};
  if (currentTheme !== 'default') {
    const {
      Variables,
      // @ts-ignore to prevent multiple themes handling
      ...themeConfig
    } = themes[currentTheme] || {};
    variables = Variables;
    partialTheme = themeConfig || {};
  }
  if (darkMode) {
    const { Variables, ...darkThemeConfig } =
      themes[`${currentTheme}_dark`] || {};
    darkVariables = Variables;
    partialDarkTheme = darkThemeConfig;
  }
  const themeVariables = mergeVariables(variables, darkVariables);
  const fonts = Fonts(themeVariables);
  const gutters = Gutters(themeVariables);
  const images = Images(themeVariables);
  const layout = Layout(themeVariables);
  const common = Common({
    ...themeVariables,
    Layout: Layout(themeVariables),
    Gutters: Gutters(themeVariables),
    Fonts: Fonts(themeVariables),
    Images: Images(themeVariables),
  });
  // Build the default theme
  const baseTheme = {
    Fonts: fonts,
    Gutters: gutters,
    Images: images,
    Layout: layout,
    Common: common,
    ...themeVariables,
  };
  // Merge and return the current Theme
  return buildTheme(
    darkMode,
    baseTheme,
    formatTheme(themeVariables, partialTheme || {}),
    formatTheme(themeVariables, partialDarkTheme || {}),
  );
}
/**
 * Generate Theme with theme variables
 */
const formatTheme = (variables, theme) => {
  return Object.entries(theme).reduce((acc, [name, generate]) => {
    return {
      ...acc,
      [name]: generate(variables),
    };
  }, theme);
};
/**
 * Merge all variables for building the theme
 * baseTheme <- currentTheme <- currentDarkTheme
 */
const mergeVariables = (themeConfig, darkThemeConfig) => {
  return Object.entries(DefaultVariables).reduce((acc, [group, vars]) => {
    const theme = themeConfig[group];
    const darkTheme = darkThemeConfig[group];
    return {
      ...acc,
      [group]: {
        ...vars,
        ...(theme || {}),
        ...(darkTheme || {}),
      },
    };
  }, DefaultVariables);
};
/**
 * Provide all the theme exposed with useTheme()
 */
const buildTheme = (darkMode, baseTheme, themeConfig, darkThemeConfig) => {
  return {
    ...mergeTheme(baseTheme, themeConfig, darkThemeConfig),
    darkMode,
    NavigationTheme: mergeNavigationTheme(
      darkMode ? DarkTheme : DefaultTheme,
      baseTheme.NavigationColors,
    ),
  };
};
/**
 * Merge theme from baseTheme <- currentTheme <- currentDarkTheme
 */
const mergeTheme = (baseTheme, theme, darkTheme) =>
  Object.entries(baseTheme).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...(value || {}),
        ...(theme[key] || {}),
        ...(darkTheme[key] || {}),
      },
    }),
    baseTheme,
  );
/**
 * Merge the React Navigation Theme
 *
 * @param reactNavigationTheme
 * @param overrideColors
 * @return {{colors}}
 */
const mergeNavigationTheme = (reactNavigationTheme, overrideColors) => ({
  ...reactNavigationTheme,
  colors: {
    ...reactNavigationTheme.colors,
    ...overrideColors,
  },
});

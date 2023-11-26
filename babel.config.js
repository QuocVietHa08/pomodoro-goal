module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // [
    //   'module-resolver',
    //   {
    //     root: ['./'],
    //     extensions: ['.js', '.json'],
    //     alias: {
    //       src: './src',
    //     },
    //   },
    // ],
    'inline-dotenv',
    'react-native-reanimated/plugin', // needs to be last
  ],
};

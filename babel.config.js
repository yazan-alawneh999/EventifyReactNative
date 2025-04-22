module.exports = {
  presets: ['module:@react-native/babel-preset'],

};

[
  'react-native-reanimated/plugin',
  {
    globals: ['__scanCodes'],
  },
]

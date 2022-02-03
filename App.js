import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import MainScreen from './src/screens/MainScreen';


const App = () => {
  return (
    <SafeAreaView >
     <MainScreen />
    </SafeAreaView>
  );
};



export default App;

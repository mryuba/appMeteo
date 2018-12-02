import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import homeScreen from './screens/homeScreen';
import searchScreen from './screens/searchScreen';



const AppNavigator = createBottomTabNavigator({
  Home: { screen: homeScreen },
  Search: { screen: searchScreen },
},
{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

const App = createAppContainer(AppNavigator);

export default App;
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import Details from './Screens/Details';
import { useFonts } from "@use-expo/font";


export default function App() {
  const Stack = createStackNavigator()
  const customFonts = {
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterExtraBold: require("./assets/fonts/Inter-ExtraBold.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf")
  };
  useFonts(customFonts);
  
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Details" component={Details} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

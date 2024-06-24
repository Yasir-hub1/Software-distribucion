// HomeStack.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { config } from '../../Config';

import { Platform, StyleSheet } from 'react-native';
import EditCompany from '../Screens/Profile/EditCompany';
import Home from '../Screens/Home/Home';
import Nexts from '../Screens/Nexts/Nexts';
import Previous from '../Screens/Previous/Previous';
import Map from '../Screens/Maps/Map';
// import "./BackGround";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (

    <Stack.Navigator>
      {/* SCREENS HOME */}
      <Stack.Group
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Next" component={Nexts} />
        <Stack.Screen name="Previous" component={Previous} />
        <Stack.Screen name="Map" component={Map} />


      </Stack.Group>

   

    </Stack.Navigator>

  );
}

export default HomeStack;
const styles = StyleSheet.create({
  header: {
    backgroundColor: config.COLOR_WHITE,

    borderBottomColor: "blue"

  }
})

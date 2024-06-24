// HomeStack.js

import React from 'react';

import { config } from '../../Config';

import { StyleSheet, View } from 'react-native';


// import "./BackGround";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Pendiente from '../Screens/Pendiente/Pendiente';
import Progreso from '../Screens/Progreso/Progreso';
import Completado from '../Screens/Completado/Completado';
import { Button } from 'react-native-elements';
import { authAdapter } from '../../Adapters/AuthAdapter';
// const Stack = createNativeStackNavigator();
import { useDispatch } from "react-redux";
import StackProgress from './StackProgress';
import StackPendiente from './StackPendiente';

const Tab=createMaterialTopTabNavigator()

function HomeStack() {
  const dispatch = useDispatch();

  
  return (
    <View style={{ flex: 1, top: 30 }}>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.indicator,
          tabBarLabelStyle: styles.label,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',

        }}
      >
        <Tab.Group>
        <Tab.Screen name="Homeprogreso" component={StackProgress} options={{ tabBarLabel: "En Progreso" }} />
        

        </Tab.Group>
        <Tab.Group>
        <Tab.Screen name="Homependiente" component={StackPendiente} options={{ tabBarLabel: "Pendiente" }} />

        </Tab.Group>
        <Tab.Group>
        <Tab.Screen name="completado" component={Completado} options={{ tabBarLabel: "Completado" }} />

        </Tab.Group>

      </Tab.Navigator>
      <View style={{ bottom: 30 }}>

      

      </View>
    </View>
  );


}

export default HomeStack;
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ff7f50", // Fondo de la barra de pestañas
    maxHeight: 50
  },
  indicator: {
    backgroundColor: 'white', // Color del indicador
  },
  label: {
    fontSize: 12, // Tamaño de la fuente de las etiquetas
    fontWeight: 'bold',
    bottom:7
  },

});

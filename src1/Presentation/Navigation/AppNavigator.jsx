// src/navigation/AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/Auth/Login';
import Home from '../Screens/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
const AppNavigator = createNativeStackNavigator(
  {
    Login: Login,
    Home: Home,
    
  },
  {
    initialRouteName: 'Login',
  }
);

export default NavigationContainer(AppNavigator);

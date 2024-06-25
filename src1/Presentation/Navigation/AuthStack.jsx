

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, SignUp } from "../Screens/Auth/index";
import { config } from '../../Config';
import TerminosYCondiones from '../Screens/Auth/Terminos';

const authStack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <authStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"terminos"}
    >

     
      <authStack.Screen name={"terminos"} component={TerminosYCondiones} />
      <authStack.Screen name={config.routes.Login} component={Login} />
      <authStack.Screen name={config.routes.Sign_up} component={SignUp} />
    


    </authStack.Navigator>
  );
};

export default AuthStack;


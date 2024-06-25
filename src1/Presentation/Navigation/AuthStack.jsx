

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, Onboarding, SignUp } from "../Screens/Auth/index";
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
      {/* <authStack.Screen name={config.routes.Onboarding} component={Onboarding} /> */}
    <authStack.Screen name={"terminos"} component={TerminosYCondiones} />
      <authStack.Screen name={config.routes.Login} component={Login} />
    


    </authStack.Navigator>
  );
};

export default AuthStack;


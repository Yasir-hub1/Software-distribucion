

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, Onboarding, SignUp } from "../Screens/Auth/index";
import { config } from '../../Config';

const authStack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <authStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={config.routes.Login}
    >

      <authStack.Screen name={config.routes.Onboarding} component={Onboarding} />
      <authStack.Screen name={config.routes.Login} component={Login} />
    


    </authStack.Navigator>
  );
};

export default AuthStack;


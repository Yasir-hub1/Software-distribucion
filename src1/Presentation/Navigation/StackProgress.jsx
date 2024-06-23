

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Progreso from '../Screens/Progreso/Progreso';
import Map from '../Screens/Progreso/Map/Map';

const Stack = createNativeStackNavigator();
const StackProgress = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    
    >

      <Stack.Screen name="progreso" component={Progreso} />
      <Stack.Screen name="map" component={Map} />
    


    </Stack.Navigator>
  );
};

export default StackProgress;


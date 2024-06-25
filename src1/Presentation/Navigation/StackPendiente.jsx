

import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Pendiente from '../Screens/Pendiente/Pendiente';
import DetallePendiente from '../Screens/Pendiente/DetallePendiente';

const Stack = createNativeStackNavigator();
const StackPendiente = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    
    >

      <Stack.Screen name="pendiente" component={Pendiente} />
      <Stack.Screen name="detallePendiente" component={DetallePendiente} />
    


    </Stack.Navigator>
  );
};

export default StackPendiente;


import { Image, Text, TouchableOpacity, View, FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { config } from '../../../Config';
import { Image as img } from '../../Assets/Image/path';
import HomeStyles from './Styles';
import { Button } from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants"
import { authAdapter } from '../../../Adapters/AuthAdapter';
import { orderAdapter } from '../../../Adapters/OrderAdapter';
import { formatDate2 } from '../../../Helper/Helpers';


const Home = ({ navigation }) => {
  const [listOrderInPendiente, setlistOrderInPendiente] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const driver = useSelector((state) => state.driver.driver);
  // const {name}=JSON.stringify(driver)
  const [optionSelected, setOptionSelected] = useState(0);
  // console.log("navigations ", driver)

  const NavigationsScreens = (screens, params) => {
    navigation.navigate(screens, params ? params : undefined);
  }

/*   useEffect(() => {
    // Función asincrónica para solicitar permisos
    const registerForPushNotifications = async () => {
      // Solicitar permisos de notificación
      const { granted } = await Notifications.getPermissionsAsync();
      if (!granted) {
        // Si el permiso no está otorgado, solicitar permiso al usuario
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          // Manejar el caso en que el usuario no otorga permisos
          alert('Debes otorgar permisos de notificación para recibir notificaciones push.');
          return;
        }
      }

      // Obtener el token de notificación push
      const expoPushToken = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log('Token de notificación:', expoPushToken);
      // Aquí puedes guardar el token en el estado, enviarlo al servidor, etc.
    };

    registerForPushNotifications(); // Llamar a la función para iniciar el proceso
  }, []); */


  const CerrarSesion = async () => {
    //console.log("Vista login", data);
    try {
      await authAdapter.logoutAdapter(dispatch);
    } catch (error) {
      setError(error.message);

      //console.log("fron login ", error.message);
    }
  }

  useEffect(() => {
    getOrderInPendiente();
  }, [])
  async function getOrderInPendiente() {
    try {
      setIsLoading(true);
      const orderInPendiente = await orderAdapter.orderInPendiente();
      // console.log("ORDER PENDIENTE ", orderInPendiente)
      setlistOrderInPendiente(orderInPendiente);
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }



  const renderClassItem = ({ item }) => (
    <View style={HomeStyles.classItem}>
      <View style={HomeStyles.timelineContainer}>
        <View style={HomeStyles.timelineDot} />
        <View style={HomeStyles.timelineLine} />
      </View>
      <TouchableOpacity style={{ flex: 1, borderColor: "red" }} onPress={() => NavigationsScreens("Map", { item })}>
        <View style={HomeStyles.classContent} >
          <View style={HomeStyles.classHours}>
            <Text style={HomeStyles.startTime}>{item.state}</Text>
          
          </View>

          <View style={[HomeStyles.card, { backgroundColor: "#E0FFFF" }]}>
            <Text style={HomeStyles.cardTitle}>{item.customer_name}</Text>
            <Text style={HomeStyles.cardDate}>{formatDate2(item.date)}</Text>

          </View>
        </View>

      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={HomeStyles.card}>

      <View style={HomeStyles.body}>
        <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} style={HomeStyles.avatar} />
        <View style={HomeStyles.userInfo}>
          <Text style={HomeStyles.userName}>{driver.name}</Text>
          <Text style={HomeStyles.userRole}>Conductor</Text>
        </View>
      </View>
    </View>
  );

  // console.log("STATE RECENTE ", optionSelected);

  return (
    <View style={HomeStyles.container}>
      <View style={HomeStyles.topButtonsContainer}>
        <TouchableOpacity onPress={() => NavigationsScreens("Previous")} style={HomeStyles.topButton}>
          <Text style={HomeStyles.topButtonText}>Historial de entrega</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationsScreens("Next")} style={HomeStyles.topButton}>
          <Text style={HomeStyles.topButtonText}>Proximas entregas</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={listOrderInPendiente}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getOrderInPendiente} />
        }
        renderItem={renderClassItem}
        keyExtractor={(item, index) => index.toString()}
      />


      <Button title={"SALIR"}
        onPress={() => CerrarSesion()}
        buttonStyle={{ backgroundColor: "#ff7f50" }}
      />
    </View>
  );
};

export default Home;

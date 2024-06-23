import { Image, Text, TouchableOpacity, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { config } from '../../../Config';
import { Image as img } from '../../Assets/Image/path';
import Styles from './Style';
import { Button } from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants"
import { orderAdapter } from '../../../Adapters/OrderAdapter';
import { formatDate } from '../../../Helper/Helpers';
import { authAdapter } from '../../../Adapters/AuthAdapter';
const Progreso = ({ navigation }) => {
  const dispatch = useDispatch();
  console.log("navigations ",)
  // const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [optionSelected, setOptionSelected] = useState(0);
  const [listOrderInProgress, setlistOrderInProgress] = useState([])
  const [isLoading, setIsLoading] = useState(false)


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
  useEffect(() => {
    getOrderInProgress();
  }, [])
  async function getOrderInProgress() {
    try {
      setIsLoading(true);
      const orderInProgress = await orderAdapter.orderInProgreso();
      setlistOrderInProgress(orderInProgress);
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  const CerrarSesion = async () => {
    //console.log("Vista login", data);
    try {
      await authAdapter.logoutAdapter(dispatch);
    } catch (error) {
      setError(error.message);
    
      //console.log("fron login ", error.message);
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, marginHorizontal: 20, top: 300 }}>
        <ActivityIndicator size={"large"} color={config.COLOR_RED} />
      </View>
    );
  }
  
  const renderClassItem = ({ item }) => (
    <View style={Styles.classItem}>
      <View style={Styles.timelineContainer}>
        <View style={Styles.timelineDot} />
        <View style={Styles.timelineLine} />
      </View>
      <TouchableOpacity style={{ flex: 1, borderColor: "red" }} onPress={() => NavigationsScreens("map", { item })}>
        <View style={Styles.classContent} >
          <View style={Styles.classHours}>
            <Text style={Styles.startTime}>{formatDate(item.date)}</Text>
            {/* <Text style={Styles.endTime}>{item.endTime}</Text> */}
          </View>

          <View style={[Styles.card, { backgroundColor: "#E0FFFF" }]}>
            <Text style={Styles.cardTitle}>{item.driver.driver_name}</Text>
            <Text style={Styles.cardDate}>total: {item.order_total} Bs</Text>

          </View>
        </View>

      </TouchableOpacity>
    </View>
  );



  console.log("STATE RECENTE ", optionSelected);

  return (
    <View style={Styles.container}>
      <View style={Styles.topButtonsContainer}>
        {/*  <TouchableOpacity onPress={() => NavigationsScreens("Previous")} style={Styles.topButton}>
          <Text style={Styles.topButtonText}>Historial de entrega</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationsScreens("Next", { classes })} style={Styles.topButton}>
          <Text style={Styles.topButtonText}>Proximas entregas</Text>
        </TouchableOpacity> */}
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={listOrderInProgress}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getOrderInProgress} />
        }
        renderItem={renderClassItem}
        keyExtractor={(item, index) => index.toString()}
      />

     <View style={{bottom:10}}>
      <Button
        title={"SALIR"}
        onPress={() => CerrarSesion()}
        buttonStyle={{ backgroundColor: "#ff7f50" }}
      />

     </View>
    </View>
  );
};

export default Progreso;

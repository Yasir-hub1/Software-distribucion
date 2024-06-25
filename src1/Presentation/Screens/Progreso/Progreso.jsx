import { Text, TouchableOpacity, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import {  useDispatch } from 'react-redux';

import { config } from '../../../Config';

import Styles from './Style';
import { Button } from 'react-native-elements';

import { orderAdapter } from '../../../Adapters/OrderAdapter';
import { formatDate } from '../../../Helper/Helpers';
import { authAdapter } from '../../../Adapters/AuthAdapter';
const Progreso = ({ navigation }) => {
  const dispatch = useDispatch();
 

  

  const [listOrderInProgress, setlistOrderInProgress] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const NavigationsScreens = (screens, params) => {
    navigation.navigate(screens, params ? params : undefined);
  }

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



 

  return (
    <View style={Styles.container}>
      <View style={Styles.topButtonsContainer}>
       
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

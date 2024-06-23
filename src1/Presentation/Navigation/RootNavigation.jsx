import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { useDispatch, useSelector } from 'react-redux';
import { getItemAsync } from 'expo-secure-store';
import { localStorage } from '../../Adapters/LocalStorageAdapter';
import { authAdapter } from '../../Adapters/AuthAdapter';
import { restoreToken } from '../Redux/Reducers/userReducer';
import { Loading } from '../../Helper/Helpers';

import { createCustomer } from '../Redux/Reducers/Customer';

const RootNavigation = () => {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await localStorage.loadUserData();
        const {customer}= await localStorage.loadUserCustomerData();
        console.log("customer inicio ",customer)
        //console.log("root navigation 0 ", resp, "redux", user,"company ",company);
         if (resp.user) {
          // await authAdapter.loginAdapter(dispatch, resp);
          console.log("ÜSER LOGIN ",resp)
        
          dispatch(createCustomer(customer));
          dispatch(restoreToken(resp));
          // //console.log("root navigation ", resp.user);
        }
        setLoading(false);
      } catch (error) {
        //console.log("err RootNavigation  ", error);
        setLoading(false);
      }

    })()
  }, [])

  console.log("ÜSER user ",user)

  return (
    <NavigationContainer>
      {/* <InicioStack/> */}
      {<Loading isVisible={loading} text="cargando..." />}
      {!user ? <AuthStack />  : <HomeStack />}

      {/* <ButtonTab/> */}
    </NavigationContainer>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})
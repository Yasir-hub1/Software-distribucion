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
import { createCompany } from '../Redux/Reducers/userComapanyReducer';
import { createCity } from '../Redux/Reducers/userCityReducer';
import { createDriver } from '../Redux/Reducers/Driver';

const RootNavigation = () => {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await localStorage.loadUserData();
        const {userDriver}= await localStorage.loadUserDriverData();
        // console.log("root navigation driver ",userDriver);
         if (resp.user) {
          // await authAdapter.loginAdapter(dispatch, resp);
        
          dispatch(createDriver(userDriver));
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



  return (
    <NavigationContainer>
      {/* <InicioStack/> */}
      {<Loading isVisible={loading} text="cargando..." />}
      {!user ?  <AuthStack /> : <HomeStack />}

      {/* <ButtonTab/> */}
    </NavigationContainer>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})
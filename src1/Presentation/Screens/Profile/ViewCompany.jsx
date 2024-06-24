import React, { useState } from 'react';
import { View, Text, Image,ScrollView, KeyboardAvoidingView } from 'react-native';

import { useSelector } from 'react-redux';
import { Image as img } from '../../Assets/Image/path'; 
import { config } from '../../../Config';
import CustomButton from '../../Components/Button/CustomButton';



export default ViewCompany = ({navigation}) => {
  // const companyUser = useSelector((state) => state.user.user);
  const companyUser = useSelector((state) => state.company.userCompany.userCompany);
  const cityUser = useSelector((state) => state.city.userCity.userCity);

    //console.log("companyUser ",companyUser," cityUser ",cityUser);
  
    const navigationScreensEditCompany=(screen,infoCompany)=>{
      navigation.navigate(screen,{infoCompany});
    }
 
  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
  
      >

      <View style={styles.logoContainer}>
        <Image
          source={ companyUser.urlImage  ? {   uri:companyUser.urlImage }: img.logoWorkCorp  }
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Mi Empresa</Text>
        <View style={styles.card}>
       
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Nombre:</Text>
          <Text style={styles.infoValue}>{companyUser.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>NIT:</Text>
          <Text style={styles.infoValue}>{companyUser.nit}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Dirección:</Text>
          <Text style={styles.infoValue}>{companyUser.address}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Telefono:</Text>
          <Text style={styles.infoValue}>{companyUser.phone}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Ciudad:</Text>
          <Text style={styles.infoValue}>{cityUser.name}</Text>
        </View>
        <View style={{ marginBottom:15 }}/>

        <CustomButton
            label={'Editar'}
            color={config.COLOR_RED}
            onPress={()=>navigationScreensEditCompany(config.routes.EditViewCompany,{...companyUser,nameCity:cityUser.name})}
            padding={15}
          />

        

        </View>
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: config.COLOR_RED,
   
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logoContainer: {
    alignItems: 'center',
   
    marginTop: 40,

  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'contain',
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    width: '80%',
    backgroundColor: config.COLOR_WHITE,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 20,

  },
  inputContainer: {
    // marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
    paddingLeft: 10,
  },


  errorValidacion: {
    color: "#dd3333",
    fontSize: 15,
    top: -10,
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",

  },
 
  infoContainer: {
    marginTop: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize:18
  },
  infoValue: {
    marginTop: 5,
    fontSize:15,
  },
};
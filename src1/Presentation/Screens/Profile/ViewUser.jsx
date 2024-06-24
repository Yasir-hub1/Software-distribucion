import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Image, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { config } from '../../../Config';
import { Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Image as img } from '../../Assets/Image/path';
import { userAdapter } from '../../../Adapters/UserAdapter';
import { Loading, showToast } from '../../../Helper/Helpers';
import { KeyboardAvoidingView } from 'react-native';
import { localStorage } from '../../../Adapters/LocalStorageAdapter';
import { restoreToken } from '../../Redux/Reducers/userReducer';

const ViewUser = ({ navigation }) => {
  const dispatch = useDispatch();

  const companyUser = useSelector((state) => state.company.userCompany.userCompany);
  const user = useSelector((state) => state.user.user);
 // console.log("company ", companyUser.urlImage);

  //console.log("UPDATE USER ", user);

  const [userName, setUserName] = useState(user.name_user);
  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [Error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const updateUser = async (userName, newPassword) => {
    let sendData = {
      name_user: userName,
      new_password: newPassword,
      old_password: currentPassword// contrasenia actual
    }
    if (currentPassword != '' || newPassword != '') {
      try {
        setIsLoading(true)
        let resp = await userAdapter.updateUser(user.id, sendData);
        //console.log("front resp upUser ", resp);
        const updateUser = await localStorage.loadUserData();
        if (resp.status === "Success") {

          dispatch(restoreToken(updateUser))
          navigation.goBack();

          showToast(resp.message, config.COLOR_SUCCESS)
        }
      } catch (error) {
        //console.log("front error upUser ", error);
        setError(error.message)
      }finally{
        setIsLoading(false)
      }

    } else {
      setError("*Rellena los campos vacíos")
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage}>
        <ScrollView showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
          >
             {isLoading ? <Loading isVisible={isLoading} text="ACTUALIZANDO..." /> : null}
            <View style={styles.logoContainer}>

              <View style={{ alignItems: 'center' }}>
                {/* portada */}
                <View style={styles.logoContainer}>
                  <Image
                    source={companyUser.urlImage ? { uri:  companyUser.urlImage } : img.logoWorkCorp}
                    style={styles.logo}
                  />
                </View>


                <Text style={{ textAlign: "center", color: config.COLOR_WHITE, fontSize: 18, fontWeight: "600" }}>Actualizar usuario</Text>
                <Text style={{ textAlign: "center", color: config.COLOR_WHITE, fontSize: 18, fontWeight: "900", borderRadius: 10 }}>{Error}</Text>

              </View>
            </View>

            <View style={styles.formContainer}>
              <Text style={{ fontSize: 18, fontWeight: "900", color: config.COLOR_WHITE }}>Usuario</Text>
              <View style={styles.card}>

                <TextInput
                  placeholder='Nombre de usuario'
                  maxLength={10}
                  style={styles.input}
                  value={userName}
                  onChangeText={setUserName}
                  autoCapitalize='none'
                />
              </View>
              <Text style={{ fontSize: 18, fontWeight: "900", color: config.COLOR_WHITE }}>Contraseña actual</Text>

              <View style={styles.card}>
                <TextInput
                  placeholder='Ingresa la contraseña actual'
                  secureTextEntry={true}
                  style={styles.input}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  autoCapitalize='none'
                />
              </View>
              <Text style={{ fontSize: 18, fontWeight: "900", color: config.COLOR_WHITE }}>Nueva contraseña</Text>

              <View style={styles.card}>
                <TextInput
                  placeholder='Ingresa una nueva contraseña'
                  secureTextEntry={true}
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  autoCapitalize='none'
                />
              </View>
              <TouchableOpacity style={styles.loginButton} onPress={() => updateUser(userName, newPassword)}>
                <Text style={styles.loginButtonText}>Actualizar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: config.COLOR_RED
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    padding: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B0C4DE'
  },
  loginButton: {
    backgroundColor: config.COLOR_RED,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ViewUser;
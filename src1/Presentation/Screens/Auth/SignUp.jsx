import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

import { config } from "../../../Config";
import CustomButton from '../../Components/Button/CustomButton';
import { Ionicons } from '@expo/vector-icons';

import { authAdapter } from "../../../Adapters/AuthAdapter";
import { Avatar } from "react-native-elements";
import TextInputField from "../../Components/Inputs/TextInputField";
import { useForm } from "react-hook-form";
import { Image as img } from "../../Assets/Image/path";
import PassInputField from "../../Components/Inputs/PassInputField";
import { ErrorText, Loading, showToast } from "../../../Helper/Helpers";
import { useDispatch } from "react-redux";
import CustomSelect1 from "../../Components/Select/CustomSelect";

import { citys } from "../../Components/dataStatic";
const SignUp = ({ navigation }) => {

    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const [Error, setError] = useState(null);

    const [selectedValueCity, setSelectedValueCity] = useState();
    const [Isloading, setIsLoading] = useState(false)

    // proteccion de contraseña
    const [secureEntry, setSecureEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureEntry(!secureEntry);
    };


    /* Errores de formulario */
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const signUp = async (data) => {
        //console.log("Vista  registro", selectedImage);
        try {
            setIsLoading(true);
            if (selectedImage && selectedValueCity !== null) {

                await authAdapter.SingUpdapter(dispatch, { ...data, city_id: selectedValueCity }, selectedImage);
            } else {
                showToast("Todos los campos son obligatiorios", config.COLOR_ERROR);
                setIsLoading(false);
            }

        } catch (error) {
            setError('*EL usuario o empresa ya existe');
            setIsLoading(false);
            //console.log("fron login ", error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        ImagePicker.requestMediaLibraryPermissionsAsync().then((response) => {
            //console.log("PERMISO ", response);
            if (!response.status === "granted") {
                showToast("Por favor acepta los permisos", config.COLOR_ERROR);
            } else {
                // El usuario negó el permiso
                // Vuelve a preguntar al usuario
                ImagePicker.requestMediaLibraryPermissionsAsync().then((response) => {
                    if (response.status === "granted") {
                        // showToast("Permiso aceptado",config.COLOR_SUCCESS);
                    }
                });
            }
        });
    }, []);


    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            // base64: true,

        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };





    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: config.COLOR_WHITE }} >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}

            >
                 {Isloading ?  <Loading isVisible={Isloading} text="cargando..." /> : null}
                <ScrollView style={{ paddingHorizontal: 25, top: 5 }}>

                    <View style={{ alignItems: 'center' }}>
                        {/* portada */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginBottom: 20,
                            }}
                        >
                            <Avatar
                                size={150}
                                rounded
                                source={selectedImage ? { uri: selectedImage } : img.iconAddPhoto}
                                title="WorkCorp"
                                containerStyle={{ backgroundColor: config.COLOR_WHITE, width: 150, alignSelf: "center" }}
                                onPress={() => pickImageAsync()}
                                avatarStyle={{ width: 150, height: 150 }}
                            >
                                <Avatar.Accessory size={30} style={{ backgroundColor: config.COLOR_RED }} onPress={() => pickImageAsync()} />
                            </Avatar>


                        </View>
                        {selectedImage === null ? <ErrorText error="*El logo es obligatorio" /> : null}
                    </View>


                    <Text
                        style={{
                            // fontFamily: 'roboto-medium',
                            fontSize: 28,
                            fontWeight: '500',
                            color: '#333',
                            marginBottom: 30,
                            color: config.COLOR_RED,
                            marginBottom: 20,
                            justifyContent: "flex-start",
                            alignSelf: "flex-start"
                        }}
                    >
                        Registra tu Empresa
                    </Text>


                    <ErrorText error={Error} />
                    <TextInputField
                        label={'Nombre de la Empresa'}
                        name="nameCompany"
                        required={true}
                        control={control}
                        errors={errors}
                        minLength={2}
                        maxLength={100}
                        keyboardType="default"
                        styleErrorValidate={styles.errorValidacion}
                        icon={
                            <MaterialIcons
                                name="business"
                                size={20}
                                color={"red"}
                                style={{ marginRight: 5 }}
                            />
                        }

                    />



                    <TextInputField
                        label={'Direccion'}
                        customStyle={styles.customStyles}
                        name="address"
                        required={true}
                        control={control}
                        errors={errors}
                        minLength={2}
                        maxLength={500}
                        keyboardType="default"
                        styleErrorValidate={[styles.errorValidacion]}
                        icon={
                            <MaterialIcons
                                name="roofing"
                                size={20}
                                color={"red"}
                                style={{ marginRight: 5 }}
                            />
                        }

                    />


                    <CustomSelect1 items={citys} stylePiker={styles.stylePiker} setSelectedValueCity={setSelectedValueCity} tittle="Elige una Ciudad" />

                    {selectedValueCity === null && <Text style={{ color: "#dd3333", fontSize: 14, textAlign: "center", left: 10, bottom: 20 }}>Compo requerido</Text>}

                    <TextInputField
                        label={'NIT'}
                        name="nit"
                        required={true}
                        control={control}
                        errors={errors}
                        minLength={2}
                        maxLength={20}
                        keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                        styleErrorValidate={styles.errorValidacion}
                        icon={
                            <MaterialIcons
                                name="dialpad"
                                size={20}
                                color={"red"}
                                style={{ marginRight: 5 }}
                            />
                        }

                    />
                    <TextInputField
                        label={'Telefono'}
                        name="phone"
                        required={true}
                        keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                        control={control}
                        errors={errors}
                        minLength={2}
                        maxLength={20}
                        styleErrorValidate={styles.errorValidacion}
                        icon={
                            <MaterialIcons
                                name="phonelink-ring"
                                size={20}
                                color={"red"}
                                style={{ marginRight: 5 }}
                            />
                        }

                    />


                    <TextInputField
                        label={'Usuario'}
                        name="user"
                        required={true}
                        control={control}
                        errors={errors}
                        minLength={2}
                        maxLength={12}
                        styleErrorValidate={styles.errorValidacion}
                        icon={
                            <MaterialIcons
                                name="person"
                                size={20}
                                color={"red"}
                                style={{ marginRight: 5 }}
                            />
                        }

                    />

                    <PassInputField
                        label='Contraseña'
                        name="password"
                        control={control}
                        errors={errors}
                        minLength={2}
                        maxLength={20}

                        secureEntry={secureEntry}
                        toggleSecureEntry={toggleSecureEntry}
                        styleErrorValidate={styles.errorValidacion}

                        icon={
                            <Ionicons
                                name="ios-lock-closed-outline"
                                size={20}
                                color={"red"}
                                style={{ marginRight: 5 }}
                            />
                        }


                    />


                    <CustomButton
                        label={'Iniciar'}
                        color={config.COLOR_RED}
                        onPress={handleSubmit(signUp)}
                        padding={15}
                    />





                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 30,
                        }}
                    >
                        <Text>Ya tienes una cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(config.routes.Login)}>
                            <View style={{ marginLeft: 40 }} />
                            <Text style={{ color: '#fe5000', fontWeight: '700' }}>
                                {' '}
                                Iniciar sesion
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {

        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        textAlign: "center",
        top: -30,
    },
    buttons: {
        flexDirection: "row",
        margin: 10,
        alignSelf: "center"
    },
    button: {
        borderRadius: 8,
        width: 100,
        height: 40,
        justifyContent: "center",
        right: 10


    },
    textBtn: {
        textAlign: "center",
        color: config.COLOR_WHITE,
        fontSize: 17,
        fontWeight: "bold",


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
    customStyles: {
        width: "100%"
    },
    stylePiker: {
        width: "100%",
        bottom: 20,
        /* right: 10, */

    }
});
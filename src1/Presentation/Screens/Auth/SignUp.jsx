import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { config } from "../../../Config";
import CustomButton from '../../Components/Button/CustomButton';
import { Ionicons } from '@expo/vector-icons';

import { authAdapter } from "../../../Adapters/AuthAdapter";
import TextInputField from "../../Components/Inputs/TextInputField";
import { useForm } from "react-hook-form";
import PassInputField from "../../Components/Inputs/PassInputField";
import { ErrorText, Loading, showToast } from "../../../Helper/Helpers";
import { useDispatch } from "react-redux";

const SignUp = ({ navigation }) => {

    const dispatch = useDispatch();
  
    const [Error, setError] = useState(null);

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

            await authAdapter.SingUpdapter(dispatch, data);

            setIsLoading(false);


        } catch (error) {
            setError('*EL usuario  ya existe');
            setIsLoading(false);
            //console.log("fron login ", error);
        } finally {
            setIsLoading(false);
        }
    }








    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: config.COLOR_WHITE }} >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}

            >
                {Isloading ? <Loading isVisible={Isloading} text="cargando..." /> : null}
                <ScrollView style={{ paddingHorizontal: 25, top: 5 }}>




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
                        Registrate
                    </Text>


                    <ErrorText error={Error} />
                    <TextInputField
                        label={'Usuario'}
                        name="username"
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

                    <TextInputField
                        label={'Correo'}
                        name="email"
                        required={true}
                       
                        control={control}
                        errors={errors}
                        minLength={2}
                        maxLength={40}
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
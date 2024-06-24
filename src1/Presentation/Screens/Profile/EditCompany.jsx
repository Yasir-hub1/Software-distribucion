import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, KeyboardAvoidingView } from 'react-native';



import { useDispatch, useSelector } from 'react-redux';
import { Image as img } from '../../Assets/Image/path';
import { companyAdapter } from '../../../Adapters/CompanyAdapter';

import { Avatar, Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import { config } from '../../../Config';
import { ErrorText, Loading, showToast } from '../../../Helper/Helpers';
import CustomButton from '../../Components/Button/CustomButton';
import CustomSelect1 from '../../Components/Select/CustomSelect';
import { citys } from '../../Components/dataStatic';
import { clearCompany, updateCompany } from '../../Redux/Reducers/userComapanyReducer';
import { localStorage } from '../../../Adapters/LocalStorageAdapter';
import { updateCity } from '../../Redux/Reducers/userCityReducer';


export default EditCompany = ({ navigation, route }) => {
    // const companyUser = useSelector((state) => state.user.user);
    /*  const companyUser = useSelector((state) => state.company.userCompany.userCompany);
     //console.log(""); */
    const dispatch = useDispatch();
    const { infoCompany } = route.params;
    //console.log("infoCompany+ ", route.params);
    const [IdCompany, setIDCompany] = useState(infoCompany.id)// id de company
    const [name, setName] = useState(infoCompany.name)// nombre de company
    const [phone, setPhone] = useState(infoCompany.phone)

    const [address, setAddress] = useState(infoCompany.address)
    const [nit, setNit] = useState(infoCompany.nit)
    const [urlImage, setUrlImage] = useState(infoCompany.urlImage)
    const [selectedImage, setSelectedImage] = useState(null);
    const [Error, setError] = useState();
    const [selectedValueCity, setSelectedValueCity] = useState();
    const [current_city_selected_id, setcurrent_city_selected_id] = useState(infoCompany.city_id);
    const [NameCity, setNameCity] = useState(infoCompany.nameCity)
    const [isLoading, setIsLoading] = useState(false)
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
            aspect: [4, 3],
            quality: 1,
            // base64: true,

        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    async function EditCompany(IdCompany, name, phone, address, nit, urlImage, selectedImage) {
        //console.log("idComny ", IdCompany, "name ", name, "phone ", phone, "address ", address, "nit ", nit, "urlImage ", urlImage, "selectedImage ", selectedImage, "selectedValueCity", selectedValueCity);
        if (selectedImage != null) { /// por si tiene imagen
            let UpdateCompany = {
                id_company: parseInt(IdCompany),
                name,
                phone,
                address,
                nit,

                city_id: selectedValueCity ? selectedValueCity : current_city_selected_id,// si el usuario no selecciona una nueva ciudad , se enviará con la que se registro

            }
            try {
                setIsLoading(true)
                let resp = await companyAdapter.editCompanyWithImage(UpdateCompany.id_company, UpdateCompany, selectedImage);

                let companyUpdate = await localStorage.loadUserCompanyData(config.USER_COMPANY);
                let cityUpdate = await localStorage.loadUserCityData(config.USER_CITY);
                //console.log("front ",resp.status);
                // dispatch(clearCompany());
                if (resp.status === "Success") {



                    dispatch(updateCompany(companyUpdate));
                    dispatch(updateCity(cityUpdate));
                    navigation.goBack();
                    showToast(resp.message, config.COLOR_SUCCESS);

                } else {
                    showToast("Error al registrar el cliente", config.COLOR_ERROR);
                }
            } catch (error) {
                setError(error.message);
                //console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        //// por si no se modifica la imagen
        if (selectedImage === null) {
            try {
               
                //console.log("SIN IMAGEN", "idComny ", IdCompany, "name ", name, "phone ", phone, "address ", address, "nit ", nit, "urlImage ", urlImage, "selectedImage ", selectedImage, "", "");
                let UpdateCompany = {
                    id_company: parseInt(IdCompany),
                    name,
                    phone,
                    address,
                    nit,
                    city_id: selectedValueCity ? selectedValueCity : current_city_selected_id,// si el usuario no selecciona una nueva ciudad , se enviará con la que se registro


                }
                try {
                    setIsLoading(true)
                    let resp = await companyAdapter.editCompany(UpdateCompany.id_company, UpdateCompany);

                    let companyUpdate = await localStorage.loadUserCompanyData(config.USER_COMPANY);
                    let cityUpdate = await localStorage.loadUserCityData(config.USER_CITY);
                    //console.log("front ",resp.data);
                    // dispatch(clearCompany());
                    if (resp.status === "Success") {

                        dispatch(updateCompany(companyUpdate));
                        dispatch(updateCity(cityUpdate));
                        navigation.goBack();
                        showToast(resp.message, config.COLOR_SUCCESS);

                    } else {
                        showToast("Error al registrar el cliente", config.COLOR_ERROR);
                    }

                } catch (error) {
                    setError(error.message);
                    //console.log(error)
                }
                finally{
                    setIsLoading(false)
                }

            } catch (error) {
                setError(error.message);
            }
            finally{
                setIsLoading(false)
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}

            >
                {isLoading ? <Loading isVisible={isLoading} text="ACTUALIZANDO..." /> : null}
                <View style={styles.logoContainer}>

                  
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
                                source={selectedImage ? { uri: selectedImage } : { uri: urlImage }}
                                title="WorkCorp"
                                containerStyle={{ backgroundColor: config.COLOR_WHITE, width: 150, alignSelf: "center" }}
                                onPress={() => pickImageAsync()}
                                avatarStyle={{ width: 150, height: 150 }}
                            >
                                <Avatar.Accessory size={30} style={{ backgroundColor: config.COLOR_RED, borderColor: "white" }} onPress={() => pickImageAsync()} />
                            </Avatar>


                        </View>

                    </View>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Actualizar datos de mi Empresa</Text>




                    <View style={styles.card}>

                        <ErrorText error={Error} />

                        <View style={styles.inputContainer}>

                            <Text style={styles.label}>Nombre</Text>


                            <Input

                                value={name}
                                editable={true}
                                leftIcon={{ type: "ionicon", name: "create-outline" }}
                                onChangeText={value => setName(value)}
                                maxLength={50}
                                keyboardType="default"
                            />
                            {name == "" ? <ErrorText error={"Campo oligatorio"} /> : null}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Telefono</Text>
                            <Input

                                value={phone}
                                leftIcon={{ type: "ionicon", name: "create-outline" }}
                                onChangeText={value => setPhone(value)}
                                maxLength={10}
                                keyboardType="numeric"
                            />
                            {phone == "" ? <ErrorText error={"Campo oligatorio"} /> : null}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Dirección</Text>
                            <Input

                                value={address}
                                leftIcon={{ type: "ionicon", name: "create-outline" }}
                                onChangeText={value => setAddress(value)}
                                minLength={2}
                                 maxLength={500}
                                keyboardType="default"
                            />
                            {address == "" ? <ErrorText error={"Campo oligatorio"} /> : null}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Ciudad</Text>
                            <CustomSelect1
                                items={citys}
                                stylePiker={styles.stylePiker}
                                setSelectedValueCity={setSelectedValueCity}
                                tittle="Elige una ciudad"
                                NameCity={NameCity}
                                current_city_selected_id={current_city_selected_id}
                            />
                            {selectedValueCity === null && <Text style={{ color: "#dd3333", fontSize: 14, textAlign: "center", left: 10, bottom: 20 }}>Compo requerido</Text>}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>NIT</Text>
                            <Input

                                value={nit}
                                leftIcon={{ type: "ionicon", name: "create-outline" }}
                                onChangeText={value => setNit(value)}
                                maxLength={10}
                                keyboardType="numeric"
                            />
                        </View>


                        <CustomButton
                            label={'Actualizar'}
                            color={config.COLOR_RED}
                            onPress={() => EditCompany(IdCompany,
                                name,
                                phone,
                                address,
                                nit,
                                urlImage,
                                selectedImage,
                                selectedValueCity)}
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
        top: 0.2,
        bottom: 25
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
        marginBottom: -5,
        top: -25
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
};
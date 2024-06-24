import { StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Image } from 'react-native'
import React from 'react'
import { Avatar, Icon } from 'react-native-elements'
import { Image as img } from '../../Assets/Image/path'
import { config } from '../../../Config'
import CustomListItem from '../../Components/Profile/CustomListItem'
import CustomButton from '../../Components/Button/CustomButton'
import { authAdapter } from '../../../Adapters/AuthAdapter'
import { useDispatch, useSelector } from 'react-redux'

const ViewProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const companyUser = useSelector((state) => state.company.userCompany.userCompany);


    const handleLogout = async () => {
        await authAdapter.logoutAdapter(dispatch);
    };
    return (
        <SafeAreaView style={styles.SafeContainer} >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}

            >
                <View style={{ paddingHorizontal: 25,bottom:15 }}>
                    <View style={{ alignItems: 'center' }}>
                        {/* portada */}
                        <View style={styles.logoContainer}>
                            <Image
                                source={companyUser.urlImage ? { uri:companyUser.urlImage } : img.logoWorkCorp}
                                style={styles.logo}
                            />
                        </View>

                        <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "600" }}>Perfil</Text>

                    </View>



                    <CustomListItem navigation={navigation} />


                    <View style={{ marginBottom: 15 }} />

                    <CustomButton
                        label={'Cerrar sesion'}
                        color={config.COLOR_RED}
                        onPress={() => handleLogout()}
                        padding={15}
                    />


                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ViewProfile

const styles = StyleSheet.create({
    SafeContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: config.COLOR_WHITE
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
})
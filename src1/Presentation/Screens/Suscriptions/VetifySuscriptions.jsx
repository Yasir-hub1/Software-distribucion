import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Image as img } from "../../Assets/Image/path";
import { config } from "../../../Config";
import CustomButton from "../../Components/Button/CustomButton";
import { sendWhatsapp } from "../../../Helper/Helpers";
import { useSelector } from "react-redux";

const VetifySuscriptions = ({ typeSuscripcions }) => {
    const user = useSelector((state) => state.user.user);
    //console.log("----****LOCAL COMPO- ---- ", typeSuscripcions);
    let TypeSuscripcion;

    const NotHavePlan = () => (
        <View style={styles.container}>
            <Image
                source={img.iconSuscripcions} // Ruta de la imagen
                style={styles.image}
            />
            <Text style={styles.description}>
                Uups!, parece que hay un problema, {"\n"}No cuentas con un plan de suscripción, por favor contácta al área de soporte técnico {"\n"}
            </Text>
            <CustomButton
                label={"Contactar"}
                onPress={() => sendWhatsapp(config.NUM_PAYMENT_SUSCRIPCION, `Hola!, quiero una suscripción para la aplicación de CotiFacil :Mi dentificación de usuario es ${user.id} - ${user.name_user}`)}
                color={config.COLOR_RED}
                padding={15}
            />
        </View>
    );

    const FinalySuscriptions = () => (
        <View style={styles.container}>
            <Image
                source={img.iconSuscripcions} // Ruta de la imagen
                style={styles.image}
            />
            <Text style={styles.description}>
                Uups!, parece que hay un problema, {"\n"}Tu suscripción ha terminado, por favor contácta al área de soporte técnico {"\n"}
            </Text>
            <CustomButton
                label={"Contactar"}
                onPress={() => sendWhatsapp(config.NUM_PAYMENT_SUSCRIPCION, `Hola!, quiero renovar mi suscripción para la aplicación de CotiFacil Identificación de usuario: ${user.id} - ${user.name_user}`)}
                color={config.COLOR_RED}
                padding={15}
            />
        </View>
    );

    switch (typeSuscripcions) {
        case config.NO_TIENE_PLAN_ASOCIADO:
            TypeSuscripcion = <NotHavePlan />;
            break;

        case config.TIENE_DIAS_RESTANTES:
            TypeSuscripcion = <FinalySuscriptions />;
            break;

           
        default:
            break;
    }

    return TypeSuscripcion;
};

export default VetifySuscriptions;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain",
    },
    description: {
        marginTop: 20,
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
})
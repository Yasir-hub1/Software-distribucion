
import { ActivityIndicator, Alert, Linking, View, Text, StyleSheet } from "react-native";
import { Overlay } from 'react-native-elements';// modal
import { config } from "../Config";
import Toast from "react-native-root-toast";
import { quotationAdapter } from "../Adapters/QuotationAdapter";
// import * as Print from 'expo-print';
import { carpentryAdapter } from "../Adapters/CarpentryAdapter";


export async function sendWhatsapp(number, text) {
    const supported = await Linking.openURL(`https://wa.me/${number}?text=${text}`);

    if (supported) {
        // Opening the link with some app, if the URL scheme is `http` the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(`https://wa.me/${number}?text=${text}`);
    } else {
        Alert.alert(`Don't know how to open this URL: ${`https://wa.me/+591${number}?text=${text}`}`);
    }
}

export async function sendEmailQuote(id_quote) {
    showToast("Enviando correo", config.COLOR_WARNING);
    try {
        let resp = await quotationAdapter.sendEmailQuotation(id_quote);
        // //console.log("RESP  FRONT ",resp);
        if (resp.status = "Success") {
            showToast(resp.message, config.COLOR_SUCCESS);
        }
    } catch (error) {
        showToast(error.message, config.COLOR_RED)
        //console.log("ERROR DE ENVIO ", error);
    }
}

export async function sendEmailQuotesCarpentry(id_quote_carpentry) {
    showToast("Enviando correo", config.COLOR_WARNING);
    try {
        let resp = await carpentryAdapter.sendEmailCarpentry(id_quote_carpentry);
        // //console.log("RESP  FRONT ",resp);
        if (resp.status = "Success") {
            showToast(resp.message, config.COLOR_SUCCESS);
        }
    } catch (error) {
        showToast(error.message, config.COLOR_RED)
        //console.log("ERROR DE ENVIO ", error);
    }
}


export const ErrorText = ({ error }) => {
    return <Text style={styles.errorText}>{error}</Text>;
};




export const Loading = ({ isVisible, text }) => {


    //console.log("visible Loading ", isVisible);
    return ( //diseño de todo el loading
        <>
            <Overlay isVisible={isVisible}
                windowBackgroundColor="rgba(0,0,0,0.5)"
                overlayBackgroundColor="tansparent"
                overlayStyle={styles.Overlay}
                backdropStyle={{ backgroundColor: config.COLOR_WHITE }}

            >

                <View style={styles.View}>
                    <ActivityIndicator size="large" color="#f53b57" />
                    {text && <Text style={styles.texto}>{text}</Text>}
                </View>
            </Overlay>
        </>
    );
};


export function showToast(titulo, bgColor) {
    Toast.show(titulo, {
        duration: Toast.durations.SHORT,
        position: 70,
        backgroundColor: bgColor,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
};

export const converFeetToMTR = (feet) => {
    // return feet * 0.3048;
    const meters = feet * 0.3048;
    return meters.toFixed(2); // Devuelve el valor con 4 decimales
}

export const converPulgToCM = (pulg) => {
    // return pulg * 2.54;
    const pulgs = pulg * 2.54;

    return pulgs.toFixed(2);
}

export const rounding = (value, decimal) => {
    if (String(value)) {
        let number = parseFloat(value);
        return number.toFixed(decimal);
    }
    return value.toFixed(decimal);
}

export const getValueForID = (id, arrayValue) => {
    //console.log("ARRAY DE PONER NOMBRE ESPECIE ",arrayValue);
    // Buscar el objeto que coincide con el ID
    const value = arrayValue.find((data) => data.id === id);

    // Verificar si se encontró la especie
    if (value) {
        return value.name; // Retorna el nombre de la especie
    } else {
        return 'Nombre no encontrado'; // Manejar el caso en que no se encuentre la especie
    }
}

export const validateInput = (value) => {
    // Expresión regular que verifica si la cadena contiene solo números y con decimales

    // return /^-?\d+(\.\d*)?$/.test(value);
    const regex = /^(?!0\d)(?!.*-[^0].*)(?!.* -.*)(?!.*_\d*)(?!.*-0\d)(\d+(\.\d+)?)?$/;
    return regex.test(value);

}

export const validateInputInteger = (value) => {
    // Expresión regular que verifica si la cadena contiene solo números entero
    const regex = /^(?!0\d)\d+$/;
    return regex.test(value);


}

// format dd/mm/yy
export const converDate = (date) => {
    // Separar la fecha y la hora si es necesario
    const partes = date.split(' ');

    // Obtener la parte de la fecha
    const fechaParte = partes[0];

    // Separar el año, mes y día
    const [anio, mes, dia] = fechaParte.split('-');

    // Crear la nueva fecha con el formato deseado: dd/mm/yy
    const nuevaFecha = `${dia}/${mes}/${anio.slice(-2)}`;

    return nuevaFecha;
}

export function acortarTexto(texto, limite) {
    if (texto !== null) {

        if (texto.length <= limite) {
            return texto;
        } else {
            return texto.substring(0, limite) + '...';
        }
    } else {
        return "Particular"
    }
}

export const printPDF = async (uri) => {
        try {

          /*   await Print.printAsync({
                uri: uri,
                orientation: 'portrait', // Establecer la orientación vertical
            }); */
        } catch (error) {
            Alert.alert(`No se pudo leer la Proforma, por favor intente más tarde`);
        }
    };

    // utils/dateFormatter.js
export const formatDate = (dateString) => {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${day} ${month} \n ${year}`;
};

export const formatDate2 = (dateString) => {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${day} ${month}  ${year}`;
};

/* configuracion del componente calendario a espaniol */
export const Weekdays = ["L", "M", "Mier", "J", "V", "S", "D"];
export const Months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const styles = StyleSheet.create({
    errorText: {
        marginBottom: 8,
        color: "#dd3333",
        // fontFamily: "$400Regular",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center"
    },
    Overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#f53b57",
        borderWidth: 2,
        borderRadius: 10,
    },

    View: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    texto: {
        color: "#f53b57",
        textTransform: "uppercase",
        marginTop: 10,
    },


});

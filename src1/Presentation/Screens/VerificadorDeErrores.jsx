import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Image as img } from "../Assets/Image/path";
export class ErrorBoundary extends React.Component {
	constructor() {
		super();
		this.state = {
			error: false,
		};
	}
	static getDerivedStateFromError(error) {
		return { error: true };
	}

	render() {
		if (this.state.error) {
			return (
				<View style={styles.container}>
					<Image
						source={img.iconWifi} // Ruta de la imagen
						style={styles.image}
					/>
					<Text style={styles.description}>
						"Uups!, parece que hay un problema "{"\n"} Para solucionarlo, por favor asegúrate de tener
						una conexión a Internet activa y estable. Luego, cierra la
						aplicación y vuelve a abrirla. Si el problema persiste contáctanos.
						Gracias.
					</Text>
				</View>
			);
		}
		return this.props.children;
	}
}
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
});

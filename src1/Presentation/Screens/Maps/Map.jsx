import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Alert,StyleSheet,TouchableOpacity,Text, SafeAreaView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import io from 'socket.io-client';
import * as Notifications from 'expo-notifications';
import { Loading, showToast } from '../../../Helper/Helpers';
import { orderAdapter } from '../../../Adapters/OrderAdapter';

const Map = ({ route ,navigation}) => {
    // console.log("ROUTE ", route);
    const { item } = route.params;
    console.log("item  ", item);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState({
        latitude: parseFloat(item.latitud),
        longitude: parseFloat(item.longitud)
    });
    const [isStarted, setIsStarted] = useState(false);
    const [routes, setRoute] = useState([]);
    const [trafficConditions, setTrafficConditions] = useState(null);
    const mapRef = useRef(null);
    const socketRef = useRef(null);
    const locationSubscriptionRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [estimatedTime, setEstimatedTime] = useState(null);
    useEffect(() => {
        const connectSocket = () => {
            // Conectar con el servidor socket.io
            socketRef.current = io('https://socketbellman-zgaud6cq5q-uc.a.run.app');
            socketRef.current.on('connect', () => {
                console.log('Connected to socket server');
            });

            // Emitir la posición inicial si ya se obtuvo
            if (origin) {
                socketRef.current.emit('position', {
                    orderId: item.id,///add
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                });
            }
        };

        const requestPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setOrigin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            // Emitir la posición inicial
            if (socketRef.current) {
                socketRef.current.emit('position', {
                    orderId: item.id,//add
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            }

            startWatchingPosition();
        };

        const startWatchingPosition = async () => {
            locationSubscriptionRef.current = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 3000,
                    distanceInterval: 1,
                },
                (location) => {
                    if (socketRef.current) {
                        socketRef.current.emit('position', {
                            orderId: item.id,//add
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        });
                    }
                    setOrigin({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
                }
            );
        };

        requestPermissions();
        connectSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log('Disconnected from socket server');
            }
            if (locationSubscriptionRef.current) {
                locationSubscriptionRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (origin && mapRef.current) {
            mapRef.current.animateCamera({
                center: origin,
                pitch: 30,
                heading: -100,
                zoom: 16,
                altitude: 2000,
            }, { duration: 1000 });
        

            // Enviar notificación cuando se carga el mapa por primera vez

        }
    }, [origin]);

    /*     const sendNotification = async () => {
            // Construir el mensaje de la notificación
            const message = {
                to: 'ExponentPushToken[MlCtZLOkp2r0NH3nFc-Dr1]', // Aquí va el token del dispositivo destinatario (debes obtenerlo previamente)
                sound: 'default',
                title: 'Tu pedido está en camino',
                body: '¡Tu pedido ya está en ruta hacia ti!',
            };
    
            try {
                await Notifications.scheduleNotificationAsync({
                    content: message,
                    trigger: null, // Enviar inmediatamente cuando se carga el mapa
                });
                console.log('Notificación enviada exitosamente');
            } catch (error) {
                console.error('Error al enviar la notificación:', error);
            }
        }; */

    const findRoute = async () => {
      
        if (!origin || !destination) {
            alert("Active su ubicacion");
            return;
        }

        try {
            setLoading(true)
            const response = await axios.post('http://3.86.44.143:3000/findRoute/', {
                origin: { latitude: origin.latitude, longitude: origin.longitude },
                destination: { latitude: destination.latitude, longitude: destination.longitude }
            });

            const routeCoordinates = response.data.route;
            setRoute(routeCoordinates);
            await getTrafficInfo();
            await getEstimatedTime(); // Obtener el tiempo estimado de recorrido
            // sendNotification();
        } catch (error) {
            // console.error(error);
            alert('Error al obtener la ruta optima.Servidor inestable');
        }finally{
            setLoading(false)
        }
    };

    const iniciar = async() => {
        setIsStarted(true);
      
       try {
         let start= await orderAdapter.orderStart(item.id);
         showToast(start.message,"#2ed573");
       } catch (error) {
        console.log(error)
       }finally{
       
       }
    };

    const terminar = async() => {
        setIsStarted(false);
      
        try {
            let data={
                id_order:item.id,
                destino:JSON.stringify(destination)
            }
            let start= await orderAdapter.orderComplet(data);
            showToast(start.message,"#2ed573");
            navigation.pop();
          } catch (error) {
           console.log(error)
          }finally{
           
          }
        // Logic for the Terminar button
    };

    const getTrafficInfo = async () => {
        const googleApiKey = 'AIzaSyABHJaLOgaxiB3mVzOaJpMd8VDDgxfCBHE';
        const trafficUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${googleApiKey}&departure_time=now`;

        try {
            const response = await axios.get(trafficUrl);
            const route = response.data.routes[0];
            if (!route) {
                console.log('No routes found');
                return;
            }

            const trafficData = route.legs.map(step => {
                const duration = step.duration.value;
                const durationInTraffic = step.duration_in_traffic ? step.duration_in_traffic.value : null;

                const trafficLevel = durationInTraffic && durationInTraffic > duration
                    ? 'heavy'
                    : 'normal';

                return {
                    distance: step.distance.value,
                    duration: duration,
                    duration_in_traffic: durationInTraffic,
                    trafficLevel: trafficLevel
                };
            });

            const totalDuration = route.legs[0].duration.value;
            const totalDurationInTraffic = route.legs[0].duration_in_traffic.value;
            const totalTrafficTime = totalDurationInTraffic - totalDuration;

            /*   console.log(`Tiempo total sin tráfico: ${totalDuration} segundos`);
              console.log(`Tiempo total con tráfico: ${totalDurationInTraffic} segundos`);
              console.log(`Tiempo adicional debido al tráfico: ${totalTrafficTime} segundos`); */

            if (totalTrafficTime > 0) {
                alert(`Hay tráfico en la ruta. Tiempo adicional debido al tráfico: ${totalTrafficTime} segundos`);
            } else {
                alert('No hay tráfico en la ruta.');
            }

            setTrafficConditions(trafficData);

        } catch (error) {
            alert('Error al obtener el tráfico de la ruta.');
        }
    };

    const getEstimatedTime = async () => {
        const googleApiKey = 'AIzaSyABHJaLOgaxiB3mVzOaJpMd8VDDgxfCBHE';
        const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${googleApiKey}`;

        try {
            const response = await axios.get(directionsUrl);
            const route = response.data.routes[0];
            if (!route) {
                console.log('No routes found');
                return;
            }

            const duration = route.legs[0].duration.text;
            setEstimatedTime(duration);
            alert(`Tiempo estimado de recorrido: ${duration}`);
        } catch (error) {
            alert('Error al obtener el tiempo de recorrido.');
        }
    };

   /*  console.log("DESTINO ", destination)
    console.log("ORIGEN  ", origin)
    console.log("estimatedTime  ", estimatedTime) */

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loading isVisible={loading} text="Optimizando ruta..." />
            <View style={{ flex: 1 }}>
                <View style={styles.topCard}>
                    <Text style={styles.estimatedTimeText}>
                        Tiempo estimado: {estimatedTime ? estimatedTime : '...'}
                    </Text>
                </View>
                {destination && destination.latitude ?
                    <MapView
                        ref={mapRef}
                        onMapLoaded={() =>
                            mapRef.current.animateCamera({
                                center: { destination },
                                pitch: 10,
                                heading: 0,
                                altitude: 2000,
                                zoom: 16,
                            })
                        }
                        style={{ flex: 1 }}
                        showsTraffic={true}
                        loadingEnabled={true}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: -17.7848,
                            longitude: -63.1805,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    >
                        {origin && (
                            <Marker
                                coordinate={origin}
                                draggable
                                description='Origen'
                                title='origen'
                            />
                        )}
                        {destination && (
                            <Marker
                                coordinate={destination}
                                description='Destino'
                                title='destino'
                            />
                        )}
                        {routes.length > 0 && (
                            <Polyline
                                coordinates={routes}
                                strokeColor="#000"
                                strokeWidth={6}
                            />
                        )}
                    </MapView>
                    : null
                }
                <View style={styles.buttonContainer}>
                    {isStarted ? (
                        <TouchableOpacity style={styles.button} onPress={terminar}>
                            <Text style={styles.buttonText}>Terminar</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={iniciar}>
                            <Text style={styles.buttonText}>Iniciar</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.button} onPress={findRoute}>
                        <Text style={styles.buttonText}>Calcular</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    topCard: {
        position: 'absolute',
        top: 60,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 1,
    },
    estimatedTimeText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    }
});
export default Map;

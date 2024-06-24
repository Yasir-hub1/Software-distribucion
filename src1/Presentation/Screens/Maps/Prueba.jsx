import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { decode } from 'polyline-encoded';

const Map = ({route}) => {
    console.log("ROUTE ",route );
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [routes, setRoute] = useState([]);
    const [TrafficConditions, setTrafficConditions] = useState(null)

    const findRoute = async () => {
        if (!origin || !destination) {
            alert("Please select both origin and destination");
            return;
        }

        try {
            const response = await axios.post('http://192.168.100.211:3000/findRoute/', {
                origin: { latitude: origin.latitude, longitude: origin.longitude },
                destination: { latitude: destination.latitude, longitude: destination.longitude }
            });

            const routeCoordinates = response.data.route;
            setRoute(routeCoordinates);
            await getTrafficInfo();
        } catch (error) {
            console.error(error);
        }
    };

    const getTrafficInfo = async () => {
        const googleApiKey = 'AIzaSyABHJaLOgaxiB3mVzOaJpMd8VDDgxfCBHE';
        const trafficUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${googleApiKey}&departure_time=now`;
    
        try {
            const response = await axios.get(trafficUrl);
            const route = response.data.routes[0];
            console.log("route: " + JSON.stringify(route));
            if (!route) {
                console.error('No routes found');
                return;
            }
    
            // const overviewPolyline = decodePolyline(route.overview_polyline.points);
    
            const trafficData = route.legs.map(step => {
                const duration = step.duration.value; // Tiempo sin tráfico
                const durationInTraffic = step.duration_in_traffic ? step.duration_in_traffic.value : null; // Tiempo con tráfico, si existe
    
                const trafficLevel = durationInTraffic && durationInTraffic > duration
                    ? 'heavy'
                    : 'normal';
    
                return {
                    distance: step.distance.value,
                    duration: duration,
                    duration_in_traffic: durationInTraffic,
                    // polyline: decodePolyline(step.polyline.points),
                    trafficLevel: trafficLevel
                };
            });
    
            console.log("route.legs[0].steps: " + JSON.stringify(route.legs[0].steps));
    
            // Aquí se guardan los tiempos del tráfico en variables
            const totalDuration = route.legs[0].duration.value;
            const totalDurationInTraffic = route.legs[0].duration_in_traffic.value;
            const totalTrafficTime = totalDurationInTraffic - totalDuration;
    
            console.log(`Tiempo total sin tráfico: ${totalDuration} segundos`);
            console.log(`Tiempo total con tráfico: ${totalDurationInTraffic} segundos`);
            console.log(`Tiempo adicional debido al tráfico: ${totalTrafficTime} segundos`);
    
            if (totalTrafficTime > 0) {
                alert(`Hay tráfico en la ruta. Tiempo adicional debido al tráfico: ${totalTrafficTime} segundos`);
            } else {
                alert('No hay tráfico en la ruta.');
            }
    
            // setRoute(overviewPolyline);
            setTrafficConditions(trafficData);
    
        } catch (error) {
            console.error('Error fetching traffic info:', error);
        }
    };
    
    const decodePolyline = (encoded) => {
        return decode(encoded).map(([latitude, longitude]) => ({ latitude, longitude }));
    };
    

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                showsTraffic={true}
                showsUserLocation={true}
                initialRegion={{
                    latitude: -17.7848,
                    longitude: -63.1805,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onPress={(e) => {
                    const coordinate = e.nativeEvent.coordinate;
                    if (!origin) {
                        setOrigin(coordinate);
                    } else if (!destination) {
                        setDestination(coordinate);
                    }
                }}
            >
                {origin && (
                    <Marker
                        coordinate={origin}
                        draggable
                        description='Origen'
                        title='origen'
                        onDragEnd={(e) => setOrigin(e.nativeEvent.coordinate)}
                    />
                )}
                {destination && (
                    <Marker
                        coordinate={destination}
                        draggable
                        description='Destino'
                        title='destino'
                        onDragEnd={(e) => setDestination(e.nativeEvent.coordinate)}
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
            <Button title="Find Route" onPress={findRoute} />
        </View>
    );
};

export default Map;

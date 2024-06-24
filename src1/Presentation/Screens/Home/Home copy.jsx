import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import openMap from 'react-native-open-maps';

const Home = () => {
  const [origin, setOrigin] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  
  // Coordenadas de ciudades en Bolivia
  const destination = {
    latitude: -17.7833,
    longitude: -63.1821, // Santa Cruz
  };

  const waypoints = [
    { latitude: -17.7863461268, longitude: -63.1086757239 },
    { latitude: -17.7859565939, longitude: -63.1085569943 },
    { latitude: -17.7855670609, longitude: -63.1084382653 },
    { latitude: -17.7851775278, longitude: -63.1083195369 },
    { latitude: -17.7847879946, longitude: -63.1082008089 },
    { latitude: -17.7843935051, longitude: -63.1081127973 },
    { latitude: -17.7839880553, longitude: -63.1080963784 },
    { latitude: -17.7835823209, longitude: -63.1080887388 },
    { latitude: -17.7831765864, longitude: -63.1080810993 },
    { latitude: -17.7827708519, longitude: -63.1080734598 },
    { latitude: -17.7823651483, longitude: -63.1080645474 },
    { latitude: -17.7819595631, longitude: -63.1080507509 },
    { latitude: -17.7815539779, longitude: -63.1080369545 },
    { latitude: -17.7811483926, longitude: -63.1080231581 },
    { latitude: -17.7807428074, longitude: -63.1080093619 },
    { latitude: -17.780337623, longitude: -63.1079873749 },
    { latitude: -17.7799328022, longitude: -63.1079579589 },
    { latitude: -17.7795284572, longitude: -63.1079223805 },
    { latitude: -17.7791243484, longitude: -63.1078837429 },
    { latitude: -17.7787202396, longitude: -63.1078451055 },
    { latitude: -17.7783162765, longitude: -63.1078048865 },
    { latitude: -17.7779125143, longitude: -63.1077624842 },
    { latitude: -17.7775087521, longitude: -63.1077200821 },
    { latitude: -17.7771317031, longitude: -63.1078032154 },
    { latitude: -17.7771145083, longitude: -63.1082256271 },
    { latitude: -17.7772090169, longitude: -63.108633677 },
    { latitude: -17.7773702082, longitude: -63.1090223391 },
    { latitude: -17.7775323756, longitude: -63.1094106078 },
    { latitude: -17.7776892521, longitude: -63.1098012389 },
    { latitude: -17.7778461277, longitude: -63.1101918707 },
    { latitude: -17.7779951576, longitude: -63.1105858319 },
    { latitude: -17.7781439139, longitude: -63.1109799096 },
    { latitude: -17.7782926912, longitude: -63.111373979 },
    { latitude: -17.7784414692, longitude: -63.1117680483 },
    { latitude: -17.7785902611, longitude: -63.1121621123 },
    { latitude: -17.7787390596, longitude: -63.1125561739 },
    { latitude: -17.7788890657, longitude: -63.1129497309 },
    { latitude: -17.7790420682, longitude: -63.1133420353 },
    { latitude: -17.7791950698, longitude: -63.1137343404 },
    { latitude: -17.7793480706, longitude: -63.1141266462 },
    { latitude: -17.7795010707, longitude: -63.1145189527 },
    { latitude: -17.77965407, longitude: -63.1149112598 },
    { latitude: -17.7798070684, longitude: -63.1153035676 },
    { latitude: -17.7799541203, longitude: -63.1156981796 },
    { latitude: -17.7800834065, longitude: -63.1160996748 },
    { latitude: -17.7802126918, longitude: -63.1165011706 },
    { latitude: -17.7799326058, longitude: -63.1167494589 },
    { latitude: -17.7796027028, longitude: -63.1169961049 },
    { latitude: -17.7792651171, longitude: -63.1172310842 },
    { latitude: -17.7789269967, longitude: -63.1174652766 },
    { latitude: -17.7785918709, longitude: -63.1177041269 },
    { latitude: -17.7782615468, longitude: -63.117866223 },
    { latitude: -17.7780669656, longitude: -63.1175005468 },
    { latitude: -17.7778339332, longitude: -63.1173055844 },
    { latitude: -17.7774591066, longitude: -63.1174672661 },
    { latitude: -17.7772215188, longitude: -63.1176883251 },
    { latitude: -17.7773595896, longitude: -63.1180866056 },
    { latitude: -17.7775013376, longitude: -63.118483486 },
    { latitude: -17.7776450132, longitude: -63.1188796108 },
    { latitude: -17.7775827534, longitude: -63.1191686966 },
    { latitude: -17.7771933155, longitude: -63.1192877604 },
    { latitude: -17.7768038776, longitude: -63.1194068237 },
    { latitude: -17.7764144396, longitude: -63.1195258865 },
    { latitude: -17.7760242471, longitude: -63.1196422111 },
    { latitude: -17.7756336805, longitude: -63.1197571748 },
    { latitude: -17.7752428481, longitude: -63.1198711507 },
    { latitude: -17.7749694428, longitude: -63.1197820847 },
    { latitude: -17.7748659574, longitude: -63.1193726172 },
    { latitude: -17.7747591928, longitude: -63.1189639845 },
    { latitude: -17.7746536485, longitude: -63.1185550088 },
    { latitude: -17.7745468234, longitude: -63.1181464019 },
    { latitude: -17.7743655649, longitude: -63.1178732511 },
    { latitude: -17.7739755652, longitude: -63.1179902928 },
    { latitude: -17.7735851747, longitude: -63.1181058992 },
    { latitude: -17.7731945066, longitude: -63.1182204861 },
    { latitude: -17.7732818783, longitude: -63.1186264481 },
    { latitude: -17.7730613218, longitude: -63.1187966542 },
    { latitude: -17.7726565384, longitude: -63.1188266274 },
    { latitude: -17.7722508866, longitude: -63.118837432 },
    { latitude: -17.7718452293, longitude: -63.118848231 },
    { latitude: -17.7714400803, longitude: -63.1188722264 },
    { latitude: -17.7710349312, longitude: -63.1188962217 },
    { latitude: -17.7709050846, longitude: -63.1191422435 },
    { latitude: -17.7709850584, longitude: -63.1195574826 },
    { latitude: -17.7708761008, longitude: -63.1198719362 },
    { latitude: -17.77050977, longitude: -63.1200537683 },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setOrigin({ latitude, longitude });
      setRouteCoordinates([{ latitude, longitude }, ...waypoints, destination]);
    })();
  }, []);

  const handleNavigate = () => {
    if (origin) {
      const waypointCoords = waypoints.map(point => `${point.latitude},${point.longitude}`).join('|');
      
      openMap({
        start: `${origin.latitude},${origin.longitude}`,
        end: `${destination.latitude},${destination.longitude}`,
        waypoints: waypointCoords,
        travelType: 'drive',
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -17.7833,
          longitude: -63.1821,
          latitudeDelta: 15.0,
          longitudeDelta: 15.0,
        }}
        showsUserLocation={true}
      >
        {origin && (
          <>
            <Marker coordinate={origin} title="Current Location" />
            <Marker coordinate={destination} title="Santa Cruz" />
            {waypoints.map((point, index) => (
              <Marker key={index} coordinate={point} title={`Waypoint ${index + 1}`} />
            ))}
            <Polyline coordinates={routeCoordinates} strokeWidth={4} />
          </>
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Navigate" onPress={handleNavigate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -75,
    width: 150,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default Home;

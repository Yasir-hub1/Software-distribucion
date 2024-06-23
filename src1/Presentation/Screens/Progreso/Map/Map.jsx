import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const { width } = Dimensions.get('window');

const Map = ({ route }) => {
  const { item } = route.params; // Obtener detalles desde las rutas

  const renderDetailCard = ({ item }) => (
    <View style={styles.card}>

      <View style={styles.row}>
        <View style={styles.column}>

          <Text style={styles.cardText}><Text style={{ fontWeight: "600" }}>Cantidad:</Text> {item.count}</Text>
          <Text style={styles.cardText}><Text style={{ fontWeight: "600" }}>Producto: </Text>{item.product_name}</Text>

        </View>
        <View style={styles.column}>
          {/* <Text style={styles.cardText}>Origin: {item.origin}</Text> */}
          <Text style={styles.cardText}><Text style={{ fontWeight: "600" }}>Price:</Text> {item.unit_price}</Text>
          <Text style={styles.cardText}><Text style={{ fontWeight: "600" }}>Destino: </Text>{item.destination}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>

          <Text style={styles.cardText}><Text style={{ fontWeight: "600" }}>Total:</Text> {item.detail_total}</Text>
        </View>
        <View style={styles.column}>

        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -17.7848,
          longitude: -63.1805,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
      <View style={styles.topCard}>

        <View style={styles.row}>
          <View style={styles.column}>

            <Text style={styles.topCardText}><Text style={{ fontWeight: "600" }}>Conductor:</Text> {item.driver.driver_name}</Text>
            <Text style={styles.topCardText}><Text style={{ fontWeight: "600" }}>Telefono: </Text>{item.driver.driver_phone}</Text>

          </View>

        </View>

      </View>


      <View style={styles.detailsContainer}>
        <Text style={{ alignSelf: "center" ,backgroundColor:"#fff", borderRadius: 2,bottom:5}}>DETALLE DEL PEDIDO </Text>
        <FlatList
          data={item.details}
          renderItem={renderDetailCard}
          keyExtractor={item => item.order_detail_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  detailsContainer: {
    position: 'absolute',
    // bottom: 0,
    width: '100%',
    paddingVertical: 20,
    bottom:25
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    width: width * 0.8,
    
  },
  cardText: {
    color: '#747d8c',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topCard: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    padding: 15,
    zIndex: 1,
},
topCardText: {
    color: 'white',
    marginBottom: 5,
},
});

export default Map;

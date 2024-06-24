import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Image as img } from '../../Assets/Image/path';
import { config } from '../../../Config';
import { sendWhatsapp } from '../../../Helper/Helpers';


const ViewInfoWK = () => {


  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>

        <View style={styles.coverPhoto} />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={img.logoWorkCorp}
          />
          <Text style={styles.nameText}>Empresa de Desarrollo de Software</Text>
        </View>
      </View>

      {/*  <View style={styles.section}>
        <Text style={styles.statCount}>100+</Text>
        <Text style={styles.statLabel}>Clientes</Text>
      </View> */}


      {/* <View style={styles.section}>
        <Text style={styles.bioText}>
          Tu satisfacción es nuestra prioridad. Trabajaremos duro para resolver cualquier problema que tengas.
        </Text>
      </View> */}
      <View style={{ marginBottom: 15 }} />
      <View style={styles.section}>
        <TouchableOpacity style={[styles.button, { flexDirection: "row" }]} onPress={() => sendWhatsapp(config.NUM_SOPORTE, "Hola")} >
          <Image source={img.logoWhatsapp} style={{ width: 20, height: 20, right: 5, top: 3 }} />
          <Text style={styles.buttonText}>Contáctanos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 180,
    backgroundColor: config.COLOR_RED
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -70,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  bioText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#A9A9A9'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  statCount: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
    marginLeft: 4
  },
  button: {
    backgroundColor: '#05c46b',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },

};

export default ViewInfoWK;

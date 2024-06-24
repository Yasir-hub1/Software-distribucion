import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function CustomButton({ label, onPress, padding,color,sizeText }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { padding: padding ,backgroundColor:color}]}
    >
      <Text style={[styles.text,{fontSize:sizeText? sizeText:16}]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
   /*  backgroundColor: '#fe5000', */
    padding: 20,
    borderRadius: 10,
    // marginBottom: 30,// comentado por que abarca por debajo del boton
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
   
    color: '#fff',
  },
});
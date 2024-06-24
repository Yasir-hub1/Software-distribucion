import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  
} from 'react-native';
import CustomButton from '../Button/CustomButton';
import { config } from '../../Config';

const ModalPointSale = ({ visible, onClose, data }) => {
  const SelectableText = ({ id, text, selectedId, onSelect }) => {
    const isSelected = selectedId === id;

    return (
      <TouchableOpacity
        style={[
          styles.textContainer,
          isSelected ? { backgroundColor: config.COLOR_YELOW } : null,
        ]}
        onPress={() => onSelect(id)}
      >
        <Text style={[styles.text,{color:config.COLOR_BLACK}]}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const [selectedId, setSelectedId] = useState(null);



  const handleTextSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Contenido del modal */}

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.modalTitle,{color:config.COLOR_BLACK}]}>Seleccionar Punto de Venta</Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.closeButton, { color: config.COLOR_RED }]}>Cerrar</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.modalContent}>
            {data.map((item) => (
              <SelectableText
                key={item.id}
                id={item.id}
                text={item.nombre}
                selectedId={selectedId}
                onSelect={handleTextSelect}
              />
            ))}



          </View>
          <View style={styles.footerModal}>
            <CustomButton
              label={"Iniciar"}
              padding={15}
              color={config.COLOR_RED}
            />
          </View>


        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro con efecto de desenfoque
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight:"bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 18,
    textAlign: 'center',

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,
    elevation: 2,
    marginBottom: 20,
    marginHorizontal: 2,

    padding: 10,
  },
  text: {
    fontSize: 18,
    
  },
});

export default ModalPointSale;

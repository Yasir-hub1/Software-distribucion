import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';

import CustomButton from '../Button/CustomButton';
import { config } from '../../../Config';

const SelectSearchCustomer = ({ data, isVisible, onCloseModal, onSelectItem }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    // Actualizar los datos filtrados cuando cambie 'data' o 'searchText'
    const filterData = () => {
      const filtered = data.filter((item) =>
        (item.name && item.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.ci && item.ci.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.phone && item.phone.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.nit && item.nit.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredData(filtered);
    };

    filterData();
  }, [data, searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleSelectItem = (item) => {
    onSelectItem(item);
    onCloseModal();
  };

  const renderItem = ({ item ,index}) => (
    <TouchableOpacity onPress={() => handleSelectItem(item)} style={{ paddingHorizontal:10,paddingVertical:2 }}>
      <Text style={styles.textItem}>{index+1}.- {item.name || item.ci || item.phone ||  item.nit || 'Particular'}</Text>
    </TouchableOpacity>
  );

  return (
    <View></View>
   /*  <Modal isVisible={isVisible} onBackdropPress={onCloseModal} animationIn="bounceIn" animationInTiming={50} animationOut="bounceOutRight" animationOutTiming={100}>
      <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 185 }}>
            <TextInput
              placeholder="Buscar cliente:"
              value={searchText}
              style={styles.searchBox}
              onChangeText={handleSearch}
            />
          </View>
          <View style={{ margin: 10 }} />
          <View>
            <CustomButton
              label={'X'}
              color={config.COLOR_RED}
              onPress={() => onCloseModal()}
              padding={15}
            />
          </View>
        </View>
        <View style={{ marginBottom: 15 }} />
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </Modal> */
  );
}

export default SelectSearchCustomer;

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "rgba(189, 195, 199,0.4)"
  },
  textItem: {
    marginBottom: 10,
  },
});

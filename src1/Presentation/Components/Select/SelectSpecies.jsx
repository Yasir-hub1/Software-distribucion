import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Picker, PickerItem } from "@react-native-picker/picker";

import { config } from "../../../Config";

const SelectSpecies = ({ items, stylePiker, setSelectedValueSpecie, tittle, NameCity, current_selected_id }) => {
  const [selectedValue, setSelectedValue] = useState(null);
 
  // //console.log("selectedValue ", selectedValue, setSelectedValueSpecie);

  return (
    <>
    <View style={{ flexDirection:"row" }}>
      <Text style={{ fontWeight:"900",color:config.COLOR_RED,fontSize:26,textAlign:"center",bottom:20,borderColor:config.COLOR_RED, padding: 5,
    borderRadius: 10, }}>+</Text>
    
     {/*  <Picker
        selectedValue={selectedValue}
        onValueChange={(value) => { setSelectedValue(value); setSelectedValueSpecie(value) }}
        style={stylePiker}
        mode="dropdown"
        selectionColor={{ color: config.COLOR_RED }}
        dropdownIconColor={config.COLOR_RED}
        dropdownIconRippleColor={config.COLOR_RED}

        
      >
       

          {/* <Picker.Item label={tittle} value={0} style={{ fontSize: 18, fontWeight: "900",color:config.COLOR_RED }} /> 

        
        {items.map((item) => (
          <Picker.Item key={item.id} label={item.name} value={item.id} />
        ))}
      </Picker> */}
      </View>
    </>
  );
};
export default SelectSpecies;


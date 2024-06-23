import React, { useState } from "react";
import { Text, View } from "react-native";
// import { Picker, PickerItem } from "@react-native-picker/picker";

import { config } from "../../../Config";

const CustomSelect1 = ({ items, stylePiker, setSelectedValueCity, tittle, NameCity, current_city_selected_id }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [city, setCity] = useState(String(NameCity));
  //console.log("selectedValue ", selectedValue, current_city_selected_id);

  return (
    <>
    {/*   <Picker
        selectedValue={selectedValue}
        onValueChange={(value) => { setSelectedValue(value); setSelectedValueCity(value) }}
        style={stylePiker}
        mode="dropdown"
        selectionColor={{ color: config.COLOR_RED }}
      >
        {current_city_selected_id ?


          <Picker.Item label={NameCity} value={current_city_selected_id} style={{ fontSize: 20, fontWeight: "900", }} />

          :

          <Picker.Item label={tittle} value={null} style={{ fontSize: 18, fontWeight: "900" }} />

        }

        {items.map((item) => (
          <Picker.Item key={item.id} label={item.name} value={item.id} />
        ))}
      </Picker> */}
    </>
  );
};
export default CustomSelect1;


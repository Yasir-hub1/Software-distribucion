import React from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TextInputField({
  label,
  icon,
  required,
  keyboardType,

  editable,
  showSoftInputOnFocus,
  // placeholderTextColor,
  control,
  errors,
  minLength,
  maxLength,
  name,// propiedad que se envia a la API
  styleErrorValidate,
  secureEntry,
  toggleSecureEntry,
  customStyle,
  // verifyValueInputs
}) {

  return (

    <>
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 25,
        }}
      >

        {icon}


        <Controller
          control={control}
          rules={{
            required: required,
            minLength,
            maxLength,

          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              {customStyle ? <>
              
                <TextInput
                placeholder={label}
                keyboardType={keyboardType}
                style={customStyle ? customStyle :null}
                secureTextEntry={secureEntry}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                editable={editable}
                // onChange={verifyValueInputs}
                showSoftInputOnFocus={showSoftInputOnFocus}
                autoCapitalize='none'
              

              />
              </> : <>
              
              <TextInput
                placeholder={label}
                keyboardType={keyboardType}
                style={{ width:"80%" }}
                secureTextEntry={secureEntry}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                editable={editable}
                // onChange={verifyValueInputs}
                showSoftInputOnFocus={showSoftInputOnFocus}
                autoCapitalize='none'

              />
              </>}


            </>
          )}
          name={name}

        />

      </View>
      {errors[name] ?.type ==="required" && <Text style={styleErrorValidate}>Campo requerido</Text>}
    {errors[name] ?.type ==="minLength" && <Text style={styleErrorValidate}>Longitud demasiada corta</Text>}
    {errors[name] ?.type ==="maxLength" && <Text style={styleErrorValidate}>Longitud demasiada larga</Text>}
    </>
  );
}

import React from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PassInputField({
    label,
    icon,
    rightIcon,
    keyboardType,
    value,
    onChangeText,
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
    toggleSecureEntry
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
                        required: true,
                        minLength,
                        maxLength,

                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                placeholder={label}
                                keyboardType={keyboardType}
                                style={{ width: "80%" }}
                                secureTextEntry={secureEntry}
                                onBlur={onBlur}
                                value={value}
                                onChangeText={onChange}
                                editable={editable}
                                showSoftInputOnFocus={showSoftInputOnFocus}
                                autoCapitalize='none'

                            />

                            <Ionicons
                                name="eye"
                                size={20}
                                color={"red"}
                                // style={{ marginRight: 5 }}
                                onPress={toggleSecureEntry}
                            />
                        </>
                    )}
                    name={name}

                />







            </View>
            {errors[name]?.type === "required" && <Text style={styleErrorValidate}>Campo requerido</Text>}
            {errors[name]?.type === "minLength" && <Text style={styleErrorValidate}>Contraseña demasiada corta</Text>}
            {errors[name]?.type === "maxLength" && <Text style={styleErrorValidate}>Contraseña demasiada larga</Text>}
        </>
    );
}

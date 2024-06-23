import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomInput = () => {
    return (
        <>
            <Input
                placeholder="[pie]"
                // value={LargoInput}
                leftIcon={{ type: "ionicon", name: "create-outline" }}
                // onChangeText={value => setLargoInput(value)}
                maxLength={3}
                keyboardType="numeric"
            />
        </>
    )
}

export default CustomInput

const styles = StyleSheet.create({})
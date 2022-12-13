import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"
import { Card } from "../components"
import { COLORS, SIZES, FONTS, SHADOW } from "../constants"

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: SIZES.padding
    },
    textBoxWrapper: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: SIZES.padding
    },
    textInput: {
        ...SHADOW,
        borderRadius: SIZES.textBoxRadius,
        backgroundColor: COLORS.secondary,
        height: 42,
        paddingLeft: 15,
        width: "90%",
        color: COLORS.primary,
        marginRight: 15,
        ...FONTS.h2_semiBold,
    },
    btn: {
        ...SHADOW,
        backgroundColor: COLORS.accent,
        height: 42,
        width: 42,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default function Homepage() {

   
    const [list, setList] = useState([])
    const [value, setValue] = useState("")

    function addText(text) {
        if (value !== "") {
            setList(prev => {
                return [
                    ...prev,
                    { text: text, isSelected: false } 
                ]
            })
            setValue("")
        } else {
            alert("Please type in something!")
        }
    }

    function setIsSelected(index, value) {
        let data = []

        for (let i = 0; i < list.length; i++) {
            if (index === i) {
                data.push({ ...list[i], isSelected: value })
            } else {
                data.push(list[i])
            }
        }

        setList(data) 
    }
    function deleteItem(idx) {
        Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        const data = list.filter((item, index) => index !== idx)
                        setList(data)
                    }
                }
            ])
    }


    return <View style={styles.container}>
        <Text style={{ ...FONTS.h1_semiBold, color: COLORS.secondary, marginBottom: 15 }}>What need to be done.</Text>
        <FlatList style={{ flex: 1 }}
            data={list}
            renderItem={({ item, index }) => <Card data={item} index={index} setIsSelected={setIsSelected} deleteItem={deleteItem} />}
            keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.textBoxWrapper}>
            <TextInput
                style={styles.textInput}
                placeholder="New Task"
                placeholderTextColor={COLORS.primary}
                onChangeText={text => setValue(text)}
                value={value} />
            <TouchableOpacity
                style={styles.btn}
                onPress={() => addText(value)}>
                <Text style={{ fontSize: 34, color: COLORS.secondary }}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
}

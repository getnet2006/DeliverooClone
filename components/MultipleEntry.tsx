import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const MultipleEntry = (props: any) => {
    const { children } = props;

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 16,
                backgroundColor: "#fff",
                gap: 15,
            }}
        >
            {children}
        </View>
    );
};

export default MultipleEntry;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightblue",
        padding: 20,
        borderRadius: 10,
    },
});

import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { categories } from "@/assets/data/home";

const Categories = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 15 }}
        >
            {categories.map((item, index) => (
                <View style={styles.categoryCard} key={index}>
                    <Image source={item.img} />
                    <Text style={styles.categoryText}>{item.text}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    categoryCard: {
        width: 100,
        height: 100,
        backgroundColor: "#fff",
        marginEnd: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.006,
        borderRadius: 4,
    },
    categoryText: {
        padding: 6,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default Categories;

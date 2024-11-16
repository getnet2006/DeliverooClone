import React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { restaurants } from "@/assets/data/home";
import { TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Resturants = (props: any) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 15 }}
        >
            {restaurants.map((item, index) => (
                <Link href={"/details"} key={index} asChild>
                    <TouchableOpacity>
                        <View style={styles.categoryCard} key={index}>
                            <Text style={styles.offerText}>
                                From 15% off selected items
                            </Text>
                            <Image source={item.img} style={styles.image} />
                            <View style={styles.categoryBox}>
                                <Text style={styles.categoryText}>
                                    {item.name}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingLeft: 5,
                                    }}
                                >
                                    <Ionicons
                                        name="star"
                                        color={Colors.green}
                                    />
                                    <Text
                                        style={{
                                            color: Colors.green,
                                            paddingLeft: 6,
                                            paddingHorizontal: 6,
                                        }}
                                    >
                                        {item.rating} {item.ratings}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        color: Colors.medium,
                                        paddingLeft: 6,
                                    }}
                                >
                                    {item.distance}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    categoryCard: {
        width: 300,
        height: 250,
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

    categoryBox: {
        flex: 2,
        padding: 5,
        paddingBottom: 25,
    },

    categoryText: {
        padding: 6,
        fontSize: 14,
        fontWeight: "bold",
    },

    image: {
        flex: 5,
        width: undefined,
        height: undefined,
    },

    offerText: {
        position: "absolute",
        top: 5,
        backgroundColor: Colors.primary,
        color: "#fff",
        zIndex: 1,
        marginLeft: 5,
        padding: 5,
    },
});

export default Resturants;

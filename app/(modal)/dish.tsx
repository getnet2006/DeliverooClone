import { Image, Linking, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { restaurant, getDishById } from "@/assets/data/restaurant";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import useBasketStore from "@/store/basketStore";

export default function Dish() {
    const [count, setCount] = useState(1);
    const { id } = useLocalSearchParams();
    const item: any = getDishById(Number(id));
    const navigation = useNavigation();
    const { addProduct } = useBasketStore();

    const addToCart = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        addProduct(item);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Animated.Image
                entering={FadeIn.duration(500).delay(200)}
                source={item?.img}
                style={{ height: 300, width: "100%" }}
            />
            <View
                style={{
                    paddingHorizontal: 16,
                }}
            >
                <View
                    style={{
                        paddingVertical: 25,
                        borderBottomColor: Colors.grey,
                        borderBottomWidth: 1,
                    }}
                >
                    <Animated.Text
                        entering={FadeInLeft.duration(400).delay(200)}
                        style={{ fontSize: 35, fontWeight: "bold" }}
                    >
                        {item?.name}
                    </Animated.Text>
                    <Animated.Text
                        entering={FadeInLeft.duration(400).delay(400)}
                    >
                        {item?.info}
                    </Animated.Text>
                </View>
                <Text style={{ marginTop: 15 }}>
                    Questions about allergens, ingredients or cooking methods?
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        Linking.openURL("https://example.com/contact")
                    }
                >
                    <Text style={{ color: "blue" }}>
                        Please contact us here
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.addToCart}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 45,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setCount(() => count - 1)}
                        disabled={count === 1}
                    >
                        <Ionicons
                            name="add-circle-outline"
                            size={30}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {count}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setCount(count + 1)}
                        disabled={count === 5}
                    >
                        <Ionicons
                            name="add-circle-outline"
                            size={30}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.primary,
                        paddingVertical: 16,
                        marginVertical: 10,
                        borderRadius: 10,
                    }}
                    onPress={() => addToCart()}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#fff",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        Add for ${item?.price * count}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    addToCart: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        paddingVertical: 10,

        elevation: 35,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
});

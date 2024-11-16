import React from "react";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Categories from "@/components/Categories";
import Resturants from "@/components/Resturants";
import { SafeAreaView } from "react-native-safe-area-context";
import { restaurant } from "@/assets/data/restaurant";
import Animated from "react-native-reanimated";

const Page = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                <Categories />
                <Text style={styles.header}>Top picks in your area</Text>
                <Resturants id={1} />
                <Text style={styles.header}>Offer near you</Text>
                <Resturants id={2} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 55,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
});

export default Page;

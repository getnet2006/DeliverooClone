import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useRef } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { Link } from "expo-router";
import BottomSheetLocation from "./BottomSheetLocation";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

//  <Link href={"/(modal)/filter"} asChild></Link>

const SearchBar = () => (
    <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
            <View style={styles.searchField}>
                <Ionicons
                    name="search-outline"
                    size={20}
                    color={Colors.medium}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Resturant, groceries, dishes"
                />
            </View>
            <Link href="/(modal)/filter" asChild>
                <TouchableOpacity style={styles.optionButton}>
                    <Ionicons
                        name="options-outline"
                        size={20}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            </Link>
        </View>
    </View>
);

const CustomHeader = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const openModal = () => {
        bottomSheetRef.current?.present();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <BottomSheetLocation ref={bottomSheetRef} />

            <View style={styles.container}>
                <TouchableOpacity onPress={openModal}>
                    <Image
                        style={styles.bike}
                        source={require("../assets/images/bike.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.titlesContainer}
                    onPress={openModal}
                >
                    <Text style={styles.title}>Delivery . Now</Text>
                    <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>Selected location</Text>
                        <Ionicons
                            name="chevron-down"
                            size={20}
                            color={Colors.primary}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons
                        name="person-outline"
                        size={20}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            </View>
            <SearchBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },

    container: {
        height: 60,
        backgroundColor: "#fff",
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    bike: {
        width: 30,
        height: 30,
    },

    titlesContainer: {
        flex: 1,
    },

    title: {
        fontSize: 14,
        color: Colors.medium,
    },

    profileButton: {
        backgroundColor: Colors.lightGrey,
        padding: 10,
        borderRadius: 50,
    },

    subtitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
    },

    // For search bar
    searchContainer: {
        height: 60,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },

    searchSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
    },

    searchField: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.lightGrey,
        borderRadius: 8,
        gap: 5,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
    },

    input: {
        color: Colors.mediumDark,
    },

    optionButton: {
        borderRadius: 50,
        padding: 10,
    },
});

export default CustomHeader;

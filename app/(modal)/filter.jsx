import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Colors from "../../constants/Colors";
import categories from "../../assets/data/filter.json"


const ItemBox = () => (
    <View style={styles.itemContainer}>

        <TouchableOpacity style={styles.items}>
            <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
            <View style={{ flex: 1 }}>
                <Text>Sort</Text>
                <Text style={{ color: Colors.mediumDark }}>Recommened</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.items}>
            <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
            <View style={{ flex: 1 }}>
                <Text>Hygiene rating</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.items}>
            <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
            <View style={{ flex: 1 }}>
                <Text>Offers</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.items}>
            <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
            <View style={{ flex: 1 }}>
                <Text>Dietary</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>

        <Text style={styles.titleText}>Categories</Text>
    </View>
);

const FilterScreen = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState(categories);
    const [selectedItems, setSelectedItems] = useState([]);
    const flexWidth = useSharedValue(0);
    const scale = useSharedValue(0);

    useEffect(() => {
        const hasSelected = selectedItems.length > 0;
        const selected = items.filter((item) => item.checked)
        const newSelected = selected.length > 0;

        if (hasSelected !== newSelected) {
            flexWidth.value = withTiming(newSelected ? 150 : 0);
            scale.value = withTiming(newSelected ? 1 : 0);
        }
        setSelectedItems(selected);
    }, [items])

    const animateStyles = useAnimatedStyle(() => {
        return {
            width: flexWidth.value,
            opacity: flexWidth.value > 0 ? 1 : 0,
        }
    });

    const animateText = () => {
        return {
            transform: [{ scale: scale.value }]
        }
    }

    const handleClear = () => {
        const updateItems = items.map((item) => {
            item.checked = false
            return item
        })
        setItems(updateItems);
    };

    const handleDone = () => navigation.goBack()

    const renderItems = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <View style={styles.catItem}>
                <Text>{item.name} ({item.count})</Text>
                <BouncyCheckbox
                    fillColor={Colors.primary}
                    isChecked={items[index].checked}
                    disableBuiltInState
                    iconStyle={{
                        borderColor: Colors.primary,
                        borderRadius: 4,
                        borderWidth: 2,
                    }}
                    innerIconStyle={{
                        borderColor: Colors.primary,
                        borderRadius: 4,
                    }}
                    onPress={() => {
                        const isChecked = item.checked;
                        const updateItems = items.map((item) => {
                            if (item.name === items[index].name) {
                                item.checked = !isChecked
                            }
                            return item
                        })
                        setItems(updateItems)
                    }}
                />
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderItems}
                ListHeaderComponent={<ItemBox />}
                contentContainerStyle={{ paddingBottom: 90, }}
            />
            <View style={styles.footer}>
                <View style={styles.btnContainer}>
                    <Animated.View style={[animateStyles, styles.outlineButton]}>
                        <TouchableOpacity onPress={handleClear}>
                            <Animated.Text style={[animateText, styles.outlineButtonText]}>Clear all</Animated.Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <TouchableOpacity style={styles.fullBtn} onPress={() => handleDone()}>
                        <Text style={styles.fullBtnText}>Done</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        backgroundColor: Colors.lightGrey,
    },

    itemContainer: {
        paddingHorizontal: 15,
    },

    catItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: Colors.grey,
        borderBottomWidth: 1,
    },

    items: {
        flexDirection: "row",
        backgroundColor: "#fff",
        gap: 20,
        alignItems: "center",
        borderColor: Colors.grey,
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: "#fff",
        padding: 10,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: -10,
        }
    },

    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10
    },

    fullBtn: {
        flex: 1,
        backgroundColor: Colors.primary,
        padding: 16,
        alignItems: "center",
        borderRadius: 8,
        height: 56,
    },

    outlineButton: {
        borderColor: Colors.primary,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 56,
    },

    outlineButtonText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },

    fullBtnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },

    titleText: {
        fontWeight: "bold",
        fontSize: 18,
        paddingVertical: 20,
        marginTop: 15,
    },
});

export default FilterScreen;

import {
    BottomSheetBackdrop,
    BottomSheetModal,
    useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Modal } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import LocationSearch from "../app/(modal)/location-search";

export type Ref = BottomSheetModal;

const BottomSheetLocation = forwardRef<Ref>((props, ref) => {
    const [toggle, setToggle]: any = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const snapPoints = useMemo(() => ["50%"], []);
    const { dismiss } = useBottomSheetModal();
    const navigation = useNavigation();

    const toggleValue = () => {
        toggle ? setToggle(false) : setToggle(true);
    };
    // By wrapping the renderBackdrop function in a useCallback hook,
    // it ensure that the function is only created once, or when its dependencies change.
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                opacity={0.7} // Custom opacity for the backdrop
                appearsOnIndex={0} // Index at which the backdrop will appear
                disappearsOnIndex={-1} // Index at which the backdrop will disappear
            />
        ),
        [] // No dependencies, so this will only be created once
    );

    return (
        <BottomSheetModal
            backgroundStyle={{
                borderRadius: 0,
                backgroundColor: Colors.lightGrey,
            }}
            handleIndicatorStyle={{ display: "none" }}
            ref={ref}
            overDragResistanceFactor={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
        >
            <View style={styles.contentContainer}>
                <View style={styles.toggle}>
                    <TouchableOpacity
                        style={styles.toggleActive}
                        onPress={() => toggleValue()}
                    >
                        <Text style={styles.activeText}>Delivery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toggleInActive}
                        onPress={() => toggleValue()}
                    >
                        <Text style={styles.inactiveText}>Pickup</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.labelTxt}>Your location</Text>
                    {/* <Link href={"/(modal)/location-search"} asChild> */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.inputItems}>
                            <Ionicons
                                name="location-outline"
                                size={20}
                                color={Colors.mediumDark}
                            />
                            <Text style={styles.inputName}>
                                Current location
                            </Text>
                            <Ionicons
                                name="chevron-forward-outline"
                                size={30}
                                color={Colors.primary}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* </Link> */}

                    <Text style={styles.labelTxt}>Arrival time</Text>
                    {/* <Link href={"/(modal)/filter"} asChild> */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.inputItems}>
                            <Ionicons
                                name="stopwatch-outline"
                                size={20}
                                color={Colors.mediumDark}
                            />
                            <Text style={styles.inputName}>Now</Text>
                            <Ionicons
                                name="chevron-forward-outline"
                                size={30}
                                color={Colors.primary}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* </Link> */}
                </View>
                {modalVisible && (
                    <LocationSearch
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                )}
                <TouchableOpacity style={styles.btn} onPress={() => dismiss()}>
                    <Text style={styles.btnText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        // paddingHorizontal: 10,
    },
    toggle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        marginBottom: 32,
    },
    toggleActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 40,
        padding: 8,
        borderRadius: 32,
    },
    toggleInActive: {
        paddingHorizontal: 40,
        padding: 8,
        borderRadius: 32,
    },
    activeText: {
        color: "#ffffff",
    },
    inactiveText: {
        color: Colors.primary,
        fontWeight: "600",
    },
    btn: {
        backgroundColor: Colors.primary,
        padding: 16,
        margin: 16,
        borderRadius: 4,
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
    },
    inputItems: {
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        marginTop: 10,
        padding: 15,
        borderColor: Colors.grey,
        borderWidth: 1,
    },
    inputName: {
        flex: 1,
    },
    labelTxt: {
        paddingHorizontal: 15,
        marginTop: 20,
        fontWeight: "600",
        fontSize: 16,
    },
});

export default BottomSheetLocation;

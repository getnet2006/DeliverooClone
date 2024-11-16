import React from "react";
import "react-native-get-random-values";
import { Stack, useNavigation } from "expo-router";
import CustomHeader from "../components/CustomHeader";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "index",
};

export default function RootLayoutNav() {
    const navigation = useNavigation();
    return (
        <BottomSheetModalProvider>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        header: () => <CustomHeader />,
                    }}
                />
                <Stack.Screen
                    name="(modal)/filter"
                    options={{
                        presentation: "modal",
                        headerTitle: "Filter",
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons
                                    name="close-outline"
                                    size={28}
                                    color={Colors.primary}
                                />
                            </TouchableOpacity>
                        ),
                        headerStyle: {
                            backgroundColor: Colors.lightGrey,
                        },
                        headerTitleAlign: "center",
                    }}
                />
                <Stack.Screen
                    name="(modal)/location-search"
                    options={{
                        presentation: "fullScreenModal",
                        headerTitle: "Select location",
                        headerTitleAlign: "center",
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <Ionicons
                                    name="close-outline"
                                    size={28}
                                    color={Colors.primary}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Stack.Screen
                    name="details"
                    options={{
                        headerTitle: "Details",
                    }}
                />
                <Stack.Screen
                    name="yodaparrelel"
                    options={{
                        headerTitle: "Details",
                        headerShown: false,
                    }}
                />

                {/* New OrderList Screen */}
                <Stack.Screen
                    name="orderlist"
                    options={{
                        headerTitle: "Order List",
                        headerShadowVisible: false,
                        // headerLeft: () => (
                        //     <TouchableOpacity
                        //         onPress={() => navigation.goBack()}
                        //     >
                        //         <Ionicons
                        //             name="arrow-back"
                        //             size={28}
                        //             color={Colors.primary}
                        //         />
                        //     </TouchableOpacity>
                        // ),
                        headerStyle: {
                            backgroundColor: Colors.lightGrey,
                        },
                        headerTitleAlign: "center",
                    }}
                />
            </Stack>
        </BottomSheetModalProvider>
    );
}

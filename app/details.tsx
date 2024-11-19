import {
    Image,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { createRef, useLayoutEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { restaurant } from "@/assets/data/restaurant";
import { Link, useNavigation } from "expo-router";
import HeaderLeft from "@/components/HeaderLeft";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import useBasketStore from "@/store/basketStore";

const CardItem = ({ item, index }: any) => (
    <>
        <TouchableOpacity style={styles.menuDetail}>
            <View
                style={{
                    // marginRight: 20,
                    flex: 1,
                }}
            >
                <Text
                    style={{
                        paddingBottom: 10,
                        fontWeight: "bold",
                        fontSize: 16,
                    }}
                >
                    {item.name}
                </Text>
                <Text>{item.info}</Text>
                <Text>${item.price}</Text>
            </View>
            <Image
                source={item.img}
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 4,
                }}
            />
        </TouchableOpacity>
    </>
);

const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
}));

const Detail = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigation = useNavigation();

    const opacity = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<TouchableOpacity[]>([]);

    const sectionListRef = useRef<SectionList<any>>(null);
    const { items, total } = useBasketStore();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true, // Make header transparent
            headerTitle: "", // Optionally, hide the title or you can keep it
            headerTintColor: Colors.primary, // Set the text color
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.roundButton}
                >
                    <Ionicons
                        name="chevron-back"
                        size={25}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <HeaderLeft navigation={navigation} />
                // <View style={styles.headerRight}>
                //     <TouchableOpacity
                //         onPress={() => navigation.goBack()}
                //         style={styles.roundButton}
                //     >
                //         <Ionicons
                //             name="share-outline"
                //             size={25}
                //             color={Colors.primary}
                //         />
                //     </TouchableOpacity>
                //     <TouchableOpacity
                //         onPress={() => navigation.goBack()}
                //         style={styles.roundButton}
                //     >
                //         <Ionicons
                //             name="search-outline"
                //             size={25}
                //             color={Colors.primary}
                //         />
                //     </TouchableOpacity>
                // </View>
            ),
        });
    }, []);

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        if (selected) {
            setActiveIndex(index);
            requestAnimationFrame(() => {
                selected.measure(
                    (
                        x: number,
                        y: number,
                        width: number,
                        height: number,
                        pageX: number,
                        pageY: number
                    ) => {
                        scrollRef.current?.scrollTo({
                            x: pageX + 16, // Use pageX for accurate positioning
                            y: 0,
                            animated: true,
                        });
                    }
                );
            });
        }
    };

    // Function to scroll to the selected section
    const scrollToSection = (sectionIndex: number) => {
        // Using the sectionListRef to scroll to the desired section
        sectionListRef.current?.scrollToLocation({
            sectionIndex,
            itemIndex: 0, // You can adjust this to scroll to a specific item within the section
        });
    };

    const onScroll = (event: any) => {
        const y = event.nativeEvent.contentOffset.y;
        if (y > 350) {
            opacity.value = withTiming(1);
        } else {
            opacity.value = withTiming(0);
        }
    };

    const renderItem = ({ item, index }: any) => (
        <Link
            href={{ pathname: "/(modal)/dish", params: { id: item.id } }}
            asChild
            id={index}
        >
            <TouchableOpacity style={styles.item}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dish}>{item.name}</Text>
                    <Text style={styles.dishText}>{item.info}</Text>
                    <Text style={styles.dishText}>${item.price}</Text>
                </View>
                <Image source={item.img} style={styles.dishImage} />
            </TouchableOpacity>
        </Link>
    );

    return (
        <>
            <ParallaxScrollView
                style={{ flex: 1 }}
                scrollEvent={onScroll}
                backgroundColor={"#fff"}
                contentBackgroundColor={Colors.lightGrey}
                parallaxHeaderHeight={350}
                stickyHeaderHeight={105}
                renderBackground={() => <Image source={restaurant.img} />}
                renderStickyHeader={() => (
                    <View style={styles.stickySection} key="sticky-header">
                        <Text style={styles.stickySectionText}>
                            {restaurant.name}
                        </Text>
                    </View>
                )}
            >
                <View style={styles.detailsContainer}>
                    <Text style={styles.resturantName}>{restaurant.name}</Text>
                    <Text style={styles.resturantDescription}>
                        {restaurant.delivery}·{restaurant.tags.join(" · ")}
                    </Text>
                    <Text style={styles.resturantDescription}>
                        {restaurant.about}
                    </Text>
                    <Text style={styles.resturantDescription}>
                        {restaurant.distance}
                    </Text>

                    {restaurant.rating ? (
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 10,
                                marginHorizontal: 16,
                                marginVertical: 10,
                            }}
                        >
                            <Ionicons name="star" size={20} color={"green"} />
                            <View style={{ flex: 1 }}>
                                <Text>{restaurant.rating} Excellent</Text>
                                <Text>
                                    See all {restaurant.ratings} reviews
                                </Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={Colors.primary}
                            />
                        </TouchableOpacity>
                    ) : null}

                    <SectionList
                        ref={sectionListRef}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        keyExtractor={(item, index) => `${item.id + index}`}
                        scrollEnabled={false}
                        sections={DATA}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    marginHorizontal: 16,
                                    height: 1,
                                    backgroundColor: Colors.grey,
                                }}
                            />
                        )}
                        SectionSeparatorComponent={() => (
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: Colors.grey,
                                }}
                            />
                        )}
                        renderSectionHeader={({
                            section: { title, index },
                        }) => <Text style={styles.sectionHeader}>{title}</Text>}
                    />
                </View>
            </ParallaxScrollView>
            <Animated.View style={[styles.stickySegment, animatedStyles]}>
                <View style={styles.stickySegmentShadow}>
                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.segmentScrollview}
                    >
                        {DATA.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                ref={(ref) => (itemsRef.current[index] = ref!)}
                                // ! check if ref is null
                                style={
                                    activeIndex === index
                                        ? styles.activeCatSelectorTab
                                        : styles.catSelectorTab
                                }
                                onPress={() => selectCategory(index)}
                            >
                                <Text
                                    style={
                                        activeIndex === index
                                            ? styles.activeCatText
                                            : styles.catText
                                    }
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Animated.View>
            {/* Footer Basket */}
            {items > 0 && (
                <View style={styles.footer}>
                    <SafeAreaView
                        edges={["bottom"]}
                        style={{ backgroundColor: "#fff" }}
                    >
                        <Link href="/basket" asChild>
                            <TouchableOpacity style={styles.fullButton}>
                                <Text style={styles.basket}>{items}</Text>
                                <Text style={styles.footerText}>
                                    View Basket
                                </Text>
                                <Text style={styles.basketTotal}>${total}</Text>
                            </TouchableOpacity>
                        </Link>
                    </SafeAreaView>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: Colors.lightGrey,
    },

    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    headerRight: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    stickySection: {
        backgroundColor: "#fff",
        marginLeft: 50,
        height: 100,
        justifyContent: "flex-end",
    },

    stickySectionText: {
        fontSize: 18,
        margin: 10,
        paddingLeft: 15,
    },

    resturantName: {
        fontSize: 30,
        marginVertical: 5,
        marginHorizontal: 16,
    },

    resturantDescription: {
        fontSize: 16,
        lineHeight: 22,
        color: Colors.medium,
        marginVertical: 5,
        marginHorizontal: 16,
    },

    item: {
        backgroundColor: "#fff",
        padding: 16,
        flexDirection: "row",
    },

    dishImage: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },

    dish: {
        fontSize: 16,
        fontWeight: "bold",
    },

    dishText: {
        fontSize: 14,
        color: Colors.mediumDark,
        paddingVertical: 4,
    },

    sectionHeader: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 40,
        margin: 16,
    },

    stickySegment: {
        backgroundColor: "#fff",
        position: "absolute",
        height: 50,
        left: 0,
        right: 0,
        top: 105,
        overflow: "hidden",
        paddingBottom: 4,
        // justifyContent: "center",
    },

    stickySegmentShadow: {
        backgroundColor: "#fff",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        height: "100%",
    },

    segmentScrollview: {
        paddingHorizontal: 16,
        paddingBottom: 4,
        alignItems: "center",
        gap: 20,
    },

    catSelectorTab: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },

    activeCatSelectorTab: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },

    catText: {
        color: Colors.primary,
        fontSize: 16,
    },
    activeCatText: {
        fontWeight: "bold",
    },

    footer: {
        position: "absolute",
        backgroundColor: "#fff",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: 10,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingTop: 20,
    },
    fullButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        height: 50,
    },
    footerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    basket: {
        color: "#fff",
        backgroundColor: "#19AA86",
        fontWeight: "bold",
        padding: 8,
        borderRadius: 2,
    },
    basketTotal: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    // section list
    menuDetail: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
});

export default Detail;

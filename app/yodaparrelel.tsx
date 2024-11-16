import { useNavigation } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
    Image,
    StatusBar,
    useColorScheme,
} from "react-native";
import type { NativeScrollEvent } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    Extrapolate,
    interpolate,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabbedHeaderPager } from "react-native-sticky-parallax-header";
import { restaurant } from "@/assets/data/restaurant";

const yodaScreenTestIDs = Object.freeze({
    headerBarBackButton: "YodaHeaderBarBackButtonTestID",
    headerBarText: "YodaHeaderBarTextTestID",
    headerTitle: "YodaHeaderTitleTestID",
    tabBiography: "YodaTabBiographyTestID",
    contentBiography: "YodaContentBiographyTestID",
    tabPowers: "YodaTabPowersTestID",
    contentPowers: "YodaContentPowersTestID",
    tabAppearances: "YodaTabAppearancesTestID",
    contentAppearances: "YodaContentAppearancesTestID",
});

const colors = {
    blue: "blue",
    black: "black",
    primaryGreen: "#1ca75d",
    secondaryGreen: "rgb(61,179,106)",
    darkMint: "rgb(72,189,126)",
    white: "white",
    shadowColor: "rgb(35,35,35)",
    transparent: "transparent",
    semitransparentBlack: "rgba(0,0,0,0.6)",
    purplishBlue: "rgb(78, 15, 255)",
    purpleishBlue: "rgb(89,80,249)",
    paleGrey: "rgb(246,245,248)",
    greyishBrown: "rgb(71,71,71)",
    coralPink: "rgb(255,94,107)",
    jade: "rgb(29,167,93)",
    backBlue: "#2488FF",
    detailsBlue: "#3479F6",
    activeOrange: "#FFC106",
};

const text = {
    biography: `The bounty hunter known as "the Mandalorian" was dispatched by "the Client" and Imperial Dr. Pershing to capture the Child alive, however the Client would allow the Mandalorian to return the Child dead for a lower price.
                The assassin droid IG-11 was also dispatched to terminate him. After working together to storm the encampment the infant was being held in, the Mandalorian and IG-11 found the Child. IG-11 then attempted to terminate the Child. The Mandalorian shot the droid before the he was able to assassinate the Child.
                Shortly after, the Mandalorian took the Child back to his ship. On the way they were attacked by a trio of Trandoshan bounty hunters, who attempted to kill the Child. After the Mandalorian defeated them, he and the Child camped out in the desert for the night. While the Mandalorian sat by the fire, the Child ate one of the creatures moving around nearby. He then approached the bounty hunter and attempted to use the Force to heal one of the Mandalorian's wounds. The Mandalorian stopped him and placed him back into his pod. The next day, the pair made it to the Razor Crest only to find it being scavenged by Jawas. The Mandalorian attacked their sandcrawler for the scavenged parts and attempted to climb it while the Child followed in his pod. However, the Mandalorian was knocked down to the ground`,
    powers: "Grogu was able to harness the mystical energies of the Force on account of being Force-sensitive. One notable display of his power was when he telekinetically lifted a giant mudhorn into the air for a brief time to save Djarin from the charging beast. However, performing this feat was very strenuous for Grogu as he subsequently fell unconscious for several hours afterward. He could also use the Force when he became angry, such as when he telekinetically strangled Cara Dune because he believed she was harming Djarin while they were arm-wrestling. He later revealed the ability to heal serious injuries and even cure poisoning by touching the injury and then using the Force, though the act, much like levitating the mudhorn, was incredibly draining. In another notable display of telekinesis, Grogu created a strong barrier using the Force to protect his companions by both blocking and redirecting a stream of fire from an attacking Incinerator trooper.",
    appearances: `
                Star Wars: Galaxy of Heroes
                Star Wars: Squadrons (as toy) (DLC)
                The-Mandalorian-logo.png The Mandalorian - "Chapter 1: The Mandalorian" (First appearance)
                The Mandalorian: Season 1: Volume 1
                Star Wars: The Mandalorian Junior Novel
                The Mandalorian 1
                The-Mandalorian-logo.png The Mandalorian - "Chapter 2: The Child"
                The Mandalorian 2
                The-Mandalorian-logo.png The Mandalorian - "Chapter 3: The Sin"
                The-Mandalorian-logo.png The Mandalorian - "Chapter 4: Sanctuary"
                The-Mandalorian-logo.png The Mandalorian - "Chapter 5: The Gunslinger"
                The-Mandalorian-logo.png The Mandalorian - "Chapter 6: The Prisoner"
                The-Mandalorian-logo.png The Mandalorian - "Chapter 7: The Reckoning"
                The-Mandalorian-logo.png The Mandalorian - "Chapter 8: Redemption"
                The Mandalorian: A Clan of Two
                The Mandalorian: Magnetic Fun
                The Mandalorian: This is the Way
                The-Mandalorian-logo.png The Mandalorian - "Chapter 9: The Marshal"
                Star Wars: The Mandalorian Season 2 Junior Novel
                The Mandalorian: The Path of the Force
                The-Mandalorian-logo.png The Mandalorian - "Chapter 10: The Passenger"
                The-Mandalorian-logo.png The Mandalorian - "Chapter 11: The Heiress"
                The-Mandalorian-logo.png The Mandalorian - "Chapter 12: The Siege"
                The-Mandalorian-logo.png The Mandalorian - "Chapter 13: The Jedi" (First identified as Grogu)
                The-Mandalorian-logo.png The Mandalorian - "Chapter 14: The Tragedy"
                The-Mandalorian-logo.png The Mandalorian - "Chapter 15: The Believer" (Mentioned only)
                The-Mandalorian-logo.png The Mandalorian - "Chapter 16: The Rescue"
                The Book of Boba Fett logo.png The Book of Boba Fett - "Chapter 5: Return of the Mandalorian" (Mentioned only)
                The Book of Boba Fett logo.png The Book of Boba Fett - "Chapter 6: From the Desert Comes a Stranger"
                The Book of Boba Fett logo.png The Book of Boba Fett - "Chapter 7: In the Name of Honor"
                `.trim(),
};

const TABS = [
    {
        title: "Biography",
        description: text.biography,
        testID: yodaScreenTestIDs.contentBiography,
        contentTestID: yodaScreenTestIDs.contentBiography,
    },
    {
        title: "Powers and Abilities",
        description: text.powers,
        testID: yodaScreenTestIDs.contentPowers,
        contentTestID: yodaScreenTestIDs.contentPowers,
    },
    {
        title: "Appearances",
        description: text.appearances,
        testID: yodaScreenTestIDs.contentAppearances,
        contentTestID: yodaScreenTestIDs.contentAppearances,
    },
];

const screenStyles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: "center",
        marginBottom: 25,
    },
    contentText: {
        alignSelf: "flex-start",
        color: colors.black,
        fontSize: 24,
        letterSpacing: -0.2,
        lineHeight: 28,
        paddingBottom: 20,
        paddingTop: 40,
    },
    darkBackground: {
        backgroundColor: colors.black,
    },
    lightBackground: {
        backgroundColor: colors.white,
    },
    screenContainer: {
        alignItems: "center",
        alignSelf: "stretch",
        flex: 1,
        justifyContent: "center",
    },
    stretch: {
        alignSelf: "stretch",
    },
    stretchContainer: {
        alignSelf: "stretch",
        flex: 1,
    },
    text: {},
});

interface HeaderBarProps {
    scrollValue: Animated.SharedValue<number>;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ scrollValue }) => {
    const navigation = useNavigation();
    const goBack = React.useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollValue.value,
                [0, 60, 90],
                [0, 0, 1],
                Extrapolate.CLAMP
            ),
        };
    }, [scrollValue]);

    return (
        <SafeAreaView
            edges={["top", "left", "right"]}
            style={styles.headerContainer}
        >
            <View style={styles.headerWrapper}>
                <TouchableOpacity
                    onPress={goBack}
                    testID={yodaScreenTestIDs.headerBarBackButton}
                >
                    <Image
                        style={styles.headerImage}
                        resizeMode="contain"
                        source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VisualEditor_-_Icon_-_Close_-_white.svg/1200px-VisualEditor_-_Icon_-_Close_-_white.svg.png",
                        }}
                    />
                </TouchableOpacity>
                <Animated.View style={animatedStyle}>
                    <Text
                        style={styles.headerText}
                        testID={yodaScreenTestIDs.headerBarText}
                    >
                        Baby Yoda
                    </Text>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

export default function YodaParrelel() {
    const { height: windowHeight } = useWindowDimensions();
    const scrollValue = useSharedValue(0);

    function onScroll(e: NativeScrollEvent) {
        "worklet";
        scrollValue.value = e.contentOffset.y;
    }

    return (
        <>
            <TabbedHeaderPager
                containerStyle={screenStyles.stretchContainer}
                // backgroundImage={{
                //     uri: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
                // }}
                // foregroundImage={{
                //     uri: "https://cdn.iconscout.com/icon/free/png-256/starwars-6-569425.png",
                // }}
                title={restaurant.name}
                titleStyle={styles.titleStyle}
                titleTestID={yodaScreenTestIDs.headerTitle}
                tabsContainerBackgroundColor={colors.black}
                tabTextContainerStyle={styles.tabTextContainerStyle}
                tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
                tabTextStyle={styles.tabText}
                tabTextActiveStyle={styles.tabTextActiveStyle}
                tabWrapperStyle={styles.tabWrapperStyle}
                tabsContainerStyle={styles.tabsContainerStyle}
                onScroll={onScroll}
                tabs={TABS}
                renderHeaderBar={() => <HeaderBar scrollValue={scrollValue} />}
                showsVerticalScrollIndicator={false}
            >
                {TABS.map((tab, i) => (
                    <View
                        key={i}
                        style={[
                            styles.contentContainer,
                            { height: windowHeight },
                        ]}
                    >
                        <Text
                            style={[screenStyles.text, styles.contentText]}
                            testID={tab.contentTestID}
                        >
                            {tab.description}
                        </Text>
                    </View>
                ))}
            </TabbedHeaderPager>
            <StatusBar
                barStyle="light-content"
                backgroundColor="grey"
                translucent
            />
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        alignItems: "center",
        flex: 1,
        paddingHorizontal: 24,
    },
    titleStyle: {
        backgroundColor: colors.semitransparentBlack,
        color: colors.white,
        fontSize: 40,
        padding: 10,
    },
    tabTextContainerStyle: {
        backgroundColor: colors.transparent,
        borderRadius: 18,
    },
    tabTextContainerActiveStyle: {
        backgroundColor: colors.activeOrange,
    },
    tabText: {
        color: colors.white,
        fontSize: 16,
        lineHeight: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    tabTextActiveStyle: {
        color: colors.black,
        fontSize: 16,
        lineHeight: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    tabWrapperStyle: {
        paddingVertical: 10,
    },
    tabsContainerStyle: {
        paddingHorizontal: 10,
    },
    contentContainer: {
        backgroundColor: colors.white,
        padding: 10,
    },
    contentText: {
        fontSize: 16,
    },

    headerContainer: {
        width: "100%",
        paddingHorizontal: 24,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.black,
    },
    headerWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerImage: {
        width: 20,
        height: 20,
    },
    headerText: {
        color: colors.white,
        fontSize: 20,
        paddingLeft: 20,
    },
});

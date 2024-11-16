import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Colors from '@/constants/Colors'; // Assuming you have a Colors.js for your color palette

const HeaderRight = ({ navigation }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const inputWidth = useSharedValue(0); // Initial width is 0 (collapsed)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(inputWidth.value, { duration: 300 }), // Animate the width change
        };
    });

    const handleSearchPress = () => {
        if (isExpanded) {
            inputWidth.value = 0; // Collapse the input when closing
        } else {
            inputWidth.value = 250; // Expand to a width of 150 (you can adjust this)
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.headerRight}>
            {!isExpanded ?
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.roundButton}
                >
                    <Ionicons
                        name="share-outline"
                        size={25}
                        color={Colors.primary}
                    />
                </TouchableOpacity> : null
            }
            <Animated.View style={[styles.animatedContainer, animatedStyle]}>
                {isExpanded ? (
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search"
                        autoFocus={true} // Automatically focus the input when expanded
                    />
                ) : null}
            </Animated.View>

            <TouchableOpacity
                onPress={handleSearchPress}
                style={styles.roundButton}
            >
                <Ionicons
                    name="search-outline"
                    size={25}
                    color={Colors.primary}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingRight: 10, // Adjust spacing to fit your design
    },
    roundButton: {
        marginHorizontal: 8, // Spacing between icons
        padding: 10,
        borderRadius: 30, // For circular shape
        backgroundColor: '#f1f1f1',
    },
    animatedContainer: {
        overflow: 'hidden', // Hide the TextInput when collapsed
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 15,
        marginRight: 8,
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
    },
});

export default HeaderRight;

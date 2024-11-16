import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, Modal } from 'react-native';
import Colors from "../../constants/Colors";
import MapView from 'react-native-maps';
import { TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationSearch = ({ modalVisible, setModalVisible }) => {
    const [location, setLocation] = useState();
    return (
        <Modal
            animationType="slide" // Modal animation
            transparent={false} // Full-screen modal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)} // Close modal on back button press (for Android)
        >
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => setModalVisible(false)}>
                        <Ionicons name='close' size={24} color={Colors.dark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Select Location</Text>
                </View>
                <GooglePlacesAutocomplete
                    placeholder='Search Location'
                    fetchDetails={true}
                    query={{
                        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                        language: 'en'
                    }}
                    renderLeftButton={() => (
                        <TouchableOpacity style={styles.boxIcon}>
                            <Ionicons name='search-outline' size={24} color={Colors.medium} />
                        </TouchableOpacity>
                    )}
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInputContainer: {
                            backgroundColor: "#fff",
                            padding: 8,
                        },
                        textInput: {
                            backgroundColor: Colors.grey,
                            paddingLeft: 35,
                            fontSize: 16,
                            borderRadius: 10,
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        }
                    }}
                    currentLocation={false}
                />

                <MapView
                    style={styles.map} initialRegion={{
                        latitude: 9.005401,
                        longitude: 38.763611,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                <TouchableOpacity style={styles.btnConfirm} onPress={() => setModalVisible(false)}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    map: {
        flex: 1,
    },

    btnConfirm: {
        backgroundColor: Colors.primary,
        padding: 16,
        margin: 16,
        borderRadius: 4,
        alignItems: "center",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    boxIcon: {
        position: 'absolute',
        top: 18,
        left: 15,
        zIndex: 1
    },

    header: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        gap: 10,
    },

    headerTitle: {
        position: 'absolute',
        left: 40,
        right: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    }
})
export default LocationSearch;
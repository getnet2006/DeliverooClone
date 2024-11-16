// src/components/ProductCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import icons

const OrderCard = ({ order }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
                <Icon name={order.type} size={50} color="#555" />
            </View>

            <View style={styles.detailsContainer}>

                <View style={styles.statusContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.orderInfo}>Stock: {order.name}</Text>
                        <Text style={styles.orderInfo}>Category: {order.category}</Text>
                        <Text style={styles.statusBadge}>{order.status}</Text>
                    </View>
                    <TouchableOpacity style={styles.detailsButton}>
                        <Icon name="chevron-right" size={20} color="#00796b" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },

    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },

    detailsContainer: {
        flex: 1,
        // marginLeft: 16,
        paddingHorizontal: 10
    },

    orderInfo: {
        color: '#333',
        marginVertical: 4,
    },

    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    statusBadge: {
        backgroundColor: '#e0f7fa',
        color: '#00796b',
        marginVertical: 5,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        maxWidth: '100%',
        alignSelf: 'flex-start'
    },

    detailsButton: {
        padding: 6,
    },
});

export default OrderCard;

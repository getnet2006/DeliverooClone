import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import OrderCard from '../components/OrderCard';
import { restaurant } from "@/assets/data/restaurant";


const orders = [
    {
        id: 1,
        name: 'Back Future Back Future Back Future Back Future Back Future',
        category: 'T-shirts',
        status: 'Pending',
        type: 'car',
    },
    {
        id: 2,
        name: 'T-Shirt Black',
        category: 'T-shirts',
        status: 'Pending',
        type: 'car',
    },
    {
        id: 3,
        name: 'Green Badge',
        category: 'T-shirts',
        status: 'Pending',
        type: 'car',
    },
    {
        id: 4,
        name: 'Jacket Unisex',
        category: 'T-shirts',
        status: 'Pending',
        type: 'car',
    },
    {
        id: 5,
        name: 'Blue Trouser',
        category: 'T-shirts',
        status: 'Pending',
        type: 'car',
    },
    {
        id: 6,
        name: 'Yellow Black',
        category: 'T-shirts',
        status: 'Pending',
        type: 'car',
    },
    {
        id: 7,
        name: 'Add Black',
        category: 'T-shirts',
        status: 'Completed',
        type: 'car',
    },
    {
        id: 8,
        name: 'Black T-Shirt',
        category: 'T-shirts',
        status: 'Completed',
        type: 'car',
    },
    {
        id: 9,
        name: 'Unisex Pant',
        category: 'T-shirts',
        status: 'Completed',
        type: 'car',
    },
    {
        id: 10,
        name: 'T-Shirt Black',
        category: 'T-shirts',
        status: 'Completed',
        type: 'car',
    },
];


export default function OrderList() {
    const [selectedTab, setSelectedTab] = useState('All')
    const [allList, setAllList] = useState(orders)
    const [pendingList, setPendingList] = useState([])
    const [completedList, setCompletedList] = useState([])

    const handleTab = (tabName) => {
        setSelectedTab(tabName)
    }

    useEffect(() => {
        setPendingList(orders.filter((item, index) => (item.status === 'Pending')))
        setCompletedList(orders.filter((item, index) => (item.status === 'Completed')))
    }, [])

    const renderOrderCard = ({ item }) => (
        <OrderCard order={item} />
    )

    return (
        <View style={styles.container}>
            <View style={styles.tabbedView}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'All' && styles.selectedTab]}
                    onPress={() => handleTab('All')}>
                    <Text style={selectedTab === 'All' && styles.selectedText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Completed' && styles.selectedTab]}
                    onPress={() => handleTab('Completed')}>
                    <Text style={selectedTab === 'Completed' && styles.selectedText}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Pending' && styles.selectedTab]}
                    onPress={() => handleTab('Pending')}>
                    <Text style={selectedTab === 'Pending' && styles.selectedText}>Pending</Text>
                </TouchableOpacity>
            </View>
            <View>
                {
                    selectedTab === 'All' && (
                        <FlatList
                            data={allList}
                            renderItem={renderOrderCard}
                            keyExtractor={item => item.id}
                            style={styles.transactionList}
                            contentContainerStyle={styles.flatListContent}
                        />
                    )}
                {
                    selectedTab === 'Pending' && (
                        <FlatList
                            data={pendingList}
                            renderItem={renderOrderCard}
                            keyExtractor={item => item.id}
                            style={styles.transactionList}
                            contentContainerStyle={styles.flatListContent}
                        />
                    )
                }
                {
                    selectedTab === 'Completed' && (
                        <FlatList
                            data={completedList}
                            renderItem={renderOrderCard}
                            keyExtractor={item => item.id}
                            style={styles.transactionList}
                            contentContainerStyle={styles.flatListContent}
                        />
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbedView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        backgroundColor: "#fff",
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    selectedTab: {
        borderBottomColor: 'blue',
        borderBottomWidth: 2,
    },
    selectedText: {
        color: 'blue',
    },
    flatListContent: {
        paddingBottom: 60,
    },
});
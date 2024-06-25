import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { orderAdapter } from '../../../Adapters/OrderAdapter';
import { config } from '../../../Config';
import { formatDate, formatDate2 } from '../../../Helper/Helpers';

const Pendiente = () => {
    const [listOrderInPendiente, setlistOrderInPendiente] = useState([])
    const [isLoading, setIsLoading] = useState(false)
  
  
    useEffect(() => {
        getOrderInPendiente();
      }, [])
      async function getOrderInPendiente() {
        try {
          setIsLoading(true);
          const orderInPendiente = await orderAdapter.orderInPendiente();
          setlistOrderInPendiente(orderInPendiente);
        } catch (error) {
          console.error(error.message)
        } finally {
          setIsLoading(false);
        }
      }

      if (isLoading) {
        return (
          <View style={{ flex: 1, marginHorizontal: 20, top: 300 }}>
            <ActivityIndicator size={"large"} color={config.COLOR_RED} />
          </View>
        );
      }
  
    

    const renderClassItem = ({ item }) => (
        <>
       
        <View style={styles.classItem}>
            <View style={styles.classContent}>
                <View style={[styles.card, { backgroundColor: "#FAFAD2" }]}>
                    <Text style={styles.cardTitle}>{formatDate2(item.date)}</Text>
                    <Text style={styles.cardDate}>Conductor asignado: {item.driver.driver_name}</Text>
                    
                </View>
            </View>
        </View>

      
        </>
    );

    renderItemSeparator = ({ item }) => (
        <View style={styles.separatorContainer}>
            <View style={styles.timelineLine}></View>
        </View>
    )

    return (
        <View style={styles.container}>


            <FlatList
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ItemSeparatorComponent={renderItemSeparator}
                data={listOrderInPendiente}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={getOrderInPendiente} />
                  }
                renderItem={renderClassItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16
    },
    card: {
        flex: 1,
        backgroundColor: '#ff7f50',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        padding: 16,
    },
    header: {
        marginBottom: 8,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#ffffff',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 8,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    userRole: {
        fontSize: 12,
        color: '#ffffff',
    },
    classItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timelineContainer: {
        width: 30,
        alignItems: 'center',
    },
    separatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    timelineLine: {
        flex: 1,
        width: 8,
        height: 60,
        backgroundColor: "#ff7f50",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,

    },
    classContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },


    cardTitle: {
        fontSize: 16,
        color: '#00008B',
        marginBottom: 4,
    },
    cardDate: {
        fontSize: 12,
        color: '#00008B',
        marginBottom: 8,
    },
    studentListContainer: {
        marginRight: 10,
    },
    studentAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: -3,
        borderWidth: 1,
        borderColor: '#fff'
    },
});

export default Pendiente;
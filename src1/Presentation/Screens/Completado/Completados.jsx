import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import { orderAdapter } from '../../../Adapters/OrderAdapter'
import { config } from '../../../Config'
import { formatDate2 } from '../../../Helper/Helpers'

export default Completado = () => {
  const [listOrderInTerminado, setlistOrderInTerminado] = useState([])
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
      getOrderInTerminado();
    }, [])
    async function getOrderInTerminado() {
      try {
        setIsLoading(true);
        const orderInTerminado = await orderAdapter.orderInTerminado();
        setlistOrderInTerminado(orderInTerminado);
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

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.tasks}
        columnWrapperStyle={styles.listContainer}
        data={listOrderInTerminado}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getOrderInTerminado} />
        }
        keyExtractor={item => {
          return item.order_id
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.card, { borderColor:"red" }]}
             >
              <View style={styles.cardContent}>
              <Text>Conductor </Text>
                <Text style={[styles.description]}>
                  {item.driver.driver_name}
                </Text>
                <Text style={styles.date}>{formatDate2(item.date)}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#eeeeee',
  },
  tasks: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 25,
    height: 25,
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftWidth: 6,
  },

  description: {
    fontSize: 18,
    flex: 1,
    color: '#008080',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    flex: 1,
    color: '#696969',
    marginTop: 5,
  },
})
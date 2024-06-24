import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { orderAdapter } from '../../../Adapters/OrderAdapter';
import { useDispatch } from 'react-redux';
import { formatDate2 } from '../../../Helper/Helpers';

const Nexts = () => {

  const [listOrderNextToday, setlistOrderNextToday] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();


  useEffect(() => {
    getOrderInNextsToday();
  }, [])

  async function getOrderInNextsToday() {
    try {
      setIsLoading(true);
      const orderNextToday = await orderAdapter.orderNextsToday();
      console.log("ORDER Completado ", orderNextToday)
      setlistOrderNextToday(orderNextToday);
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  const renderClassItem = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.classContent}>
        <View style={[styles.card, { backgroundColor: "#ff7f50" }]}>
          <Text style={[styles.cardTitle, { textAlign: "center" }]}>{item.customer_name}</Text>
          <Text style={styles.cardDate}>{formatDate2(item.date)}</Text>
          <Text style={styles.cardDate}>{item.state}</Text>

        </View>
      </View>
    </View>
  );

  renderItemSeparator = ({ item }) => (
    <View style={styles.separatorContainer}>
      <View style={styles.timelineLine}></View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proximas entregas</Text>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={renderItemSeparator}
        data={listOrderNextToday}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getOrderInNextsToday} />
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
    paddingTop: 60,
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
    backgroundColor: '#A9A9A9',

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
    textAlign: "center"
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

export default Nexts;
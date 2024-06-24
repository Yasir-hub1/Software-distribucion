import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { orderAdapter } from '../../../Adapters/OrderAdapter';
import { useDispatch } from 'react-redux';
import { formatDate2 } from '../../../Helper/Helpers';

const Previous = () => {

  const [listOrderInCompletado, setlistOrderInCompletado] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const classes = [
    {
      startTime: '09:00',
      endTime: '10:30',
      title: 'History of Physics',
      bgColor:'#E0FFFF',
      students: [
        { id: '1', name: 'John', avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
        { id: '2', name: 'Emily', avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: '3', name: 'Michael', avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
        { id: '4', name: 'Michael', avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
        { id: '5', name: 'Michael', avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
      ],
    },
    {
      startTime: '10:30',
      endTime: '11:00',
      title: 'History of Physics',
      bgColor:'#E6E6FA',
      students: [
        { id: '6', name: 'Sarah', avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
        { id: '7', name: 'David', avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
        { id: '8', name: 'Sophia', avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
      ],
    },
    {
      startTime: '11:00',
      endTime: '11:30',
      title: 'History of Physics',
      bgColor:'#FAF0E6',
      students: [
        { id: '9', name: 'Sarah', avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
        { id: '10', name: 'David', avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
        { id: '11', name: 'Sophia', avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
      ],
    },
    {
      startTime: '11:30',
      endTime: '12:30',
      title: 'History of Physics',
      bgColor:'#FAFAD2',
      students: [
        { id: '12', name: 'Sarah', avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
        { id: '13', name: 'David', avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
        { id: '14', name: 'Sophia', avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
      ],
    },
  ];





  useEffect(() => {
    getOrderInCompletado();
  }, [])

  async function getOrderInCompletado() {
    try {
      setIsLoading(true);
      const orderInCompletado = await orderAdapter.orderInCompletado();
      console.log("ORDER Completado ", orderInCompletado)
      setlistOrderInCompletado(orderInCompletado);
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  const renderClassItem = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.classContent}>
        <View style={[styles.card,{backgroundColor:'#FAFAD2'}]}>
          <Text style={[styles.cardTitle,{textAlign:"center"}]}>{item.customer_name}</Text>
          <Text style={styles.cardDate}>{formatDate2(item.date)}</Text>
          <Text style={styles.cardDate}>{item.state}</Text>
          
        </View>
      </View>
    </View>
  );

  renderItemSeparator = ({item}) => (
    <View style={styles.separatorContainer}>
      <View style={styles.timelineLine}></View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de entregas</Text>

      <FlatList
        contentContainerStyle={{paddingHorizontal:16}}
        ItemSeparatorComponent={renderItemSeparator}
        data={listOrderInCompletado}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getOrderInCompletado} />
        }
        renderItem={renderClassItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft:16
  },
  card: {
    flex:1,
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
    color:'#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color:'#ffffff',
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
    color:'#ffffff',
  },
  userRole: {
    fontSize: 12,
    color:'#ffffff',
  },
  classItem: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineContainer: {
    width: 30,
    alignItems: 'center',
  },
  separatorContainer:{
    alignItems:'center',
    justifyContent:'center',
  },
  timelineLine: {
    flex: 1,
    width: 8,
    height:60,
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
    textAlign:"center"
  },
  studentListContainer:{
    marginRight:10,
  },
  studentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: -3,
    borderWidth:1,
    borderColor:'#fff'
  },
});

export default Previous;
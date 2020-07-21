// import React, {Component} from 'react';
// import {
//   Modal,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import flatListData from './flatlistData';

// export class Hire extends Component {
//   state = {
//     modalVisible: false,
//     newDestination: '',
//     newPrice: '',
//     newDpTime: '',
//     newPkLocation: '',
//     newPhone: '',
//     data: [],
//   };

//   setModalVisible = (visible) => {
//     this.setState({modalVisible: visible});
//   };

//   render() {
//     const {modalVisible} = this.state;
//     return (
//       <View style={styles.centeredView}>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             this.setModalVisible(!modalVisible);
//           }}>
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               <Text style={styles.modalText}>Add New Travel</Text>
//               <TextInput
//                 style={styles.inputStyle}
//                 onChangeText={(text) => this.setState({newDestination: text})}
//                 placeholder="Enter new destination"
//                 value={this.state.newDestination}
//               />
//               <TextInput
//                 style={styles.inputStyle}
//                 onChangeText={(text) => this.setState({newPrice: text})}
//                 placeholder="Enter price"
//                 value={this.state.newPrice}
//               />
//               <TextInput
//                 style={styles.inputStyle}
//                 onChangeText={(text) => this.setState({newDpTime: text})}
//                 placeholder="Enter departure time"
//                 value={this.state.newDpTime}
//               />
//               <TextInput
//                 style={styles.inputStyle}
//                 onChangeText={(text) => this.setState({newPkLocation: text})}
//                 placeholder="Enter pick up location"
//                 value={this.state.newPkLocation}
//               />
//               <TouchableOpacity
//                 style={{...styles.openButton, backgroundColor: '#2196F3'}}
//                 onPress={() => {
//                   this.setModalVisible(!modalVisible);
//                   this.setState({newDestination: ''});
//                   this.setState({newPrice: ''});
//                   this.setState({newDpTime: ''});
//                   this.setState({newPkLocation: ''});
//                 }}>
//                 <Text style={styles.textStyle}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         {/*<TouchableHighlight*/}
//         {/*  style={styles.openButton}*/}
//         {/*  onPress={() => {*/}
//         {/*    this.setModalVisible(true);*/}
//         {/*  }}>*/}
//         {/*  <Text style={styles.textStyle}>Show Modal</Text>*/}
//         {/*</TouchableHighlight>*/}
//         <View style={styles.container}>
//           <FlatList
//             data={flatListData}
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'flex-start',
//                   backgroundColor: '#4fff60',
//                   margin: 10,
//                   alignContent: 'stretch',
//                 }}
//                 onPress={() => this.props.navigation.navigate('DetailPage')}>
//                 <Text style={styles.item}>{item.name}</Text>
//                 <Text style={styles.item}>{item.price}</Text>
//               </TouchableOpacity>
//             )}
//           />
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               this.setModalVisible(true);
//             }}>
//             <View>
//               <Text style={{fontSize: 25}}>Add Travel</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalView: {
//     backgroundColor: '#b9d5c5',
//     borderRadius: 20,
//     padding: 30,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 20,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 20,
//   },
//   modalText: {
//     marginBottom: 1,
//     textAlign: 'center',
//     fontSize: 30,
//   },
//   inputStyle: {
//     padding: 1,
//     height: 40,
//     borderBottomColor: 'gray',
//     marginLeft: 30,
//     marginRight: 30,
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     fontSize: 20,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: 'pink',
//     paddingHorizontal: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item: {
//     flexDirection: 'row',
//     marginTop: 10,
//     padding: 30,
//     backgroundColor: '#41d7a7',
//     fontSize: 24,
//     marginHorizontal: 10,
//     marginBottom: 10,
//   },
//   button: {
//     fontSize: 50,
//     backgroundColor: '#90b0ea',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 30,
//     height: 50,
//     width: 200,
//     shadowColor: '#56a9c8',
//   },
// });

import * as React from 'react';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {not} from 'react-native-reanimated';
const axios = require('axios'); // A promise-based HTTP client

function HirePage() {
  let [page, updatePage] = useState(0);
  let [hasMore, updateHasMore] = useState(true);
  let [data, updateData] = useState([]);
  const initialDetail = {
    destination: '',
    pickupLocation: '',
    phone: '',
    departureTime: '',
    username: '',
    price: '',
  };
  let [detail, updateDetail] = useState(initialDetail);
  let [modalVisible, updateModalVisible] = useState(0);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  let requestData = async () => {
    if (!hasMore) {
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const axiosConfig = {
      method: 'get',
      baseURL: 'http://10.0.2.2:3000',
      url: `/api/trips/driver?page=${page}`,
    };

    try {
      let response = await axios(axiosConfig);
      updateData(data.concat(response.data.trips));
      if (response.data.has_more) {
        updatePage(page + 1);
      } else {
        updateHasMore(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  let requestDetail = async (tid) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const axiosConfig = {
      method: 'get',
      baseURL: 'http://10.0.2.2:3000',
      url: `/api/trips/driver/${tid}`,
    };

    try {
      let response = await axios(axiosConfig);
      updateDetail(response.data[0]);
      updateModalVisible(1);
    } catch (error) {
      console.log(error.response);
    }
  };

  let _keyExtractor = (item) => {
    return `${item.id}`;
  };

  let _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={styles.titleText}>Trip Detail</Text>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Text style={{color: 'grey'}}>FROM</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={{color: 'grey'}}>TO</Text>
        </View>
      </View>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Text>{detail.pickupLocation}</Text>
        </View>
        <View style={styles.midContainer}>
          <Icon name="forward" />
        </View>
        <View style={styles.rightContainer}>
          <Text>{detail.destination}</Text>
        </View>
      </View>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Text>Departure Time:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>{detail.departureTime}</Text>
        </View>
      </View>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Text>Price:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>{detail.price} RM</Text>
        </View>
      </View>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Text>Driver ID:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>{detail.username}</Text>
        </View>
      </View>
      <View style={styles.navBar}>
        <View style={styles.leftContainer}>
          <Text>Driver Phone:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>{detail.phone}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            updateDetail(initialDetail);
            updateModalVisible(0);
          }}
          style={styles.button}>
          <View>
            <Text>CLOSE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('Calling the driver...');
            updateModalVisible(0);
          }}
          style={styles.button}>
          <View>
            <Text>CALL</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View>
        <Modal isVisible={modalVisible === 1}>{_renderModalContent()}</Modal>

        <FlatList
          data={data}
          keyExtractor={_keyExtractor}
          renderItem={({item}) => (
            <Card>
              <TouchableOpacity
                style={styles.grid}
                onPress={() => requestDetail(item.id)}>
                <View style={styles.navBar}>
                  <View style={styles.leftContainer}>
                    <Text style={{color: 'grey'}}>FROM</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text style={{color: 'grey'}}>TO</Text>
                  </View>
                </View>
                <View style={styles.navBar}>
                  <View style={styles.leftContainer}>
                    <Text>{item.pickupLocation}</Text>
                  </View>
                  <View style={styles.midContainer}>
                    <Icon name="forward" />
                  </View>
                  <View style={styles.rightContainer}>
                    <Text>{item.destination}</Text>
                  </View>
                </View>
                <View style={styles.navBar}>
                  <View style={styles.leftContainer}>
                    <Text>Departure Time:</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text>{item.departureTime}</Text>
                  </View>
                </View>
                <View style={styles.navBar}>
                  <View style={styles.leftContainer}>
                    <Text>Price:</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text>{item.price} RM</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          )}
          onEndReached={() => requestData()}
          onEndReachedThreshold={0.5}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 5,
    padding: 5,
    alignContent: 'stretch',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  midContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HirePage;

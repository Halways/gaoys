import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
const axios = require('axios'); // A promise-based HTTP client
import NewPassTripForm from './NewPassTripForm';

function ChauffeurPage() {
  let page = useRef(0); // Create a mutable but persistent object
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
  let modalVisible = useSelector((state) => state.modalVisible);
  let refresh = useSelector((state) => state.refresh);
  const dispatch = useDispatch();

  /**
   * Request the list data (with pagination).
   */
  let requestData = async () => {
    if (refresh) {
      page.current = 0;
    }

    let axiosConfig = {
      method: 'get',
      baseURL: 'http://10.0.2.2:3000',
      url: `/api/trips/passenger?page=${page.current}`,
    };

    if (!hasMore && !refresh) {
      return;
    }

    try {
      let response = await axios(axiosConfig);

      if (response.data.has_more) {
        page.current++;
      } else {
        updateHasMore(false);
      }

      if (refresh) {
        updateData(response.data.trips);
        dispatch({
          type: 'REFRESH_DONE',
        });
      } else {
        updateData(data.concat(response.data.trips));
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  /**
   * Request the detail data given the trip id.
   */
  let requestDetail = async (tid) => {
    const axiosConfig = {
      method: 'get',
      baseURL: 'http://10.0.2.2:3000',
      url: `/api/trips/passenger/${tid}`,
    };

    try {
      let response = await axios(axiosConfig);
      updateDetail(response.data[0]);
      dispatch({
        type: 'SET_MODAL_VISIBLE',
        payload: 1,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  let _renderDetailModal = () => (
    <View style={styles.modalContent}>
      <Text style={styles.titleText}>Trip Detail</Text>
      <View style={styles.rowContainer}>
        <View style={styles.leftContainer}>
          <Text style={{color: 'grey'}}>FROM</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={{color: 'grey'}}>TO</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
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
      <View style={styles.rowContainer}>
        <View style={styles.leftContainer}>
          <Text>Departure Time:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>{detail.departureTime}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.leftContainer}>
          <Text>Price:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>{detail.price} RM</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.leftContainer}>
          <Text>Driver ID:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text>{detail.username}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
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
            dispatch({
              type: 'SET_MODAL_VISIBLE',
              payload: 0,
            });
          }}
          style={styles.button}>
          <View>
            <Text>CLOSE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('Calling the driver...');
            dispatch({
              type: 'SET_MODAL_VISIBLE',
              payload: 0,
            });
          }}
          style={styles.button}>
          <View>
            <Text>CALL</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  let _renderNewTripModal = () => (
    <View style={styles.modalContent}>
      <Text style={styles.titleText}>Add a New Trip</Text>
      <NewPassTripForm />
    </View>
  );

  useEffect(() => {
    if (refresh) {
      requestData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <>
      <View>
        <Modal
          backdropTransitionOutTiming={0}
          isVisible={modalVisible === 1}
          onBackdropPress={() =>
            dispatch({
              type: 'SET_MODAL_VISIBLE',
              payload: 0,
            })
          }>
          {_renderDetailModal()}
        </Modal>
        <Modal
          backdropTransitionOutTiming={0}
          onBackdropPress={() =>
            dispatch({
              type: 'SET_MODAL_VISIBLE',
              payload: 0,
            })
          }
          isVisible={modalVisible === 2}
          onRequestClose={() =>
            dispatch({
              type: 'SET_MODAL_VISIBLE',
              payload: 0,
            })
          }>
          {_renderNewTripModal()}
        </Modal>

        <FlatList
          style={{paddingBottom: 20, marginBottom: 20}}
          data={data}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item}) => (
            <Card>
              <TouchableOpacity
                style={styles.grid}
                onPress={() => requestDetail(item.id)}>
                <View style={styles.rowContainer}>
                  <View style={styles.leftContainer}>
                    <Text style={{color: 'grey'}}>FROM</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text style={{color: 'grey'}}>TO</Text>
                  </View>
                </View>
                <View style={styles.rowContainer}>
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
                <View style={styles.rowContainer}>
                  <View style={styles.leftContainer}>
                    <Text>Departure Time:</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text>{item.departureTime}</Text>
                  </View>
                </View>
                <View style={styles.rowContainer}>
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

        <ActionButton
          buttonColor="#3498db"
          position="center"
          style={{position: 'absolute'}}
          degrees={0}
          onPress={() =>
            dispatch({
              type: 'SET_MODAL_VISIBLE',
              payload: 2,
            })
          }
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
  rowContainer: {
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

export default ChauffeurPage;

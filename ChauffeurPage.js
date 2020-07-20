import React, {Component} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import flatListData from './flatlistData';

export class Chauffeur extends Component {
  state = {
    modalVisible: false,
    newDestination: '',
    newPrice: '',
    newDpTime: '',
    newPhone: '',
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add New Travel</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => this.setState({newDestination: text})}
                placeholder="Enter new destination"
                value={this.state.newDestination}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => this.setState({newPrice: text})}
                placeholder="Enter price"
                value={this.state.newPrice}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => this.setState({newDpTime: text})}
                placeholder="Enter departure time"
                value={this.state.newDpTime}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => this.setState({newPkLocation: text})}
                placeholder="Enter pick up location"
                value={this.state.newPkLocation}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => this.setState({newPhone: text})}
                placeholder="Enter phone number"
                value={this.state.newPhone}
              />
              <TouchableOpacity
                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                  this.setState({newDestination: ''});
                  this.setState({newPrice: ''});
                  this.setState({newDpTime: ''});
                  this.setState({newPkLocation: ''});
                  this.setState({newPhone: ''});
                }}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/*<TouchableHighlight*/}
        {/*  style={styles.openButton}*/}
        {/*  onPress={() => {*/}
        {/*    this.setModalVisible(true);*/}
        {/*  }}>*/}
        {/*  <Text style={styles.textStyle}>Show Modal</Text>*/}
        {/*</TouchableHighlight>*/}
        <View style={styles.container}>
          <FlatList
            data={flatListData}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  alignContent: 'stretch',
                  margin: 10,
                  backgroundColor: '#ff7575',
                }}
                onPress={() => this.props.navigation.navigate('DetailPage')}>
                <Text style={styles.item}>{item.name}</Text>
                <Text style={styles.item}>{item.price}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <View>
              <Text style={{fontSize: 25}}>Add Travel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 30,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
  },
  modalText: {
    marginBottom: 1,
    textAlign: 'center',
    fontSize: 30,
  },
  inputStyle: {
    padding: 1,
    height: 40,
    borderBottomColor: 'gray',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    borderBottomWidth: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    fontSize: 50,
    backgroundColor: '#90b0ea',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 50,
    width: 200,
    shadowColor: '#56a9c8',
  },
});

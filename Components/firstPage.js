import * as React from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';

import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

export default function FirstPage(props) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../data/original.jpg')}
        style={{width: '100%', height: '100%'}}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            dispatch({type: 'REFRESH'});
            props.navigation.navigate('HirePage');
          }}
          underlayColor="white">
          <View style={styles.button1}>
            <Text style={styles.buttonText}>Hire</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            dispatch({type: 'REFRESH'});
            props.navigation.navigate('ChauffeurPage');
          }}>
          <View style={styles.button2}>
            <Text style={styles.buttonText}>Chauffeur</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 100,
    height: 200,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#f32121',
    justifyContent: 'center',
  },
  button2: {
    borderRadius: 100,
    height: 200,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    justifyContent: 'center',
  },
  touchable: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
    fontSize: 35,
  },
});

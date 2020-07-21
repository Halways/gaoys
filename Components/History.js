import * as React from 'react';
import {View, Text} from 'react-native';
import {Component} from 'react';

export class historyPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Your travel history is below.</Text>
      </View>
    );
  }
}

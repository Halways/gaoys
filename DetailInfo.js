import * as React from 'react';
import {View, Text} from 'react-native';
import {Component} from 'react';

export class detailPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Travel detail information is below.</Text>
      </View>
    );
  }
}

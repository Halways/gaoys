import * as React from 'react';
import {View, Text} from 'react-native';
import {Component} from 'react';

export class InfoPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This is your information</Text>
        <Text>Your name: GAO YONGSHENG</Text>
        <Text>Your credit: 20 </Text>
        <Text>Finished journey: 20</Text>
      </View>
    );
  }
}

import * as React from 'react';
import {View, Text} from 'react-native';
import {Component} from 'react';

export class aboutPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          The XMUM car booking mobile app is aim to help students to save money
          or earn money. This is a free and public service application. Thank you!
        </Text>
      </View>
    );
  }
}

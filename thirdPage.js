// import React, {useState} from 'react';
// import {View, Text, Button} from 'react-native';
// import {FlatList, StyleSheet} from 'react-native';
// import {Component} from 'react';
//
// export class ThirdPage extends Component {
//   constructor(props) {
//     super(props);
//     this.travelList = [];
//   }
//   travelList = [
//     {name: 'XMUM', price: '10RM', key: '1'},
//     {name: 'KIPMALL', price: '5RM', key: '2'},
//     {name: 'KLCC', price: '50RM', key: '3'},
//     {name: 'KLIA', price: '30RM', key: '4'},
//     {name: 'IOI', price: '20RM', key: '5'},
//     {name: 'IOI', price: '25RM', key: '6'},
//     {name: 'Restaurant', price: '10RM', key: '7'},
//   ];
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={this.travelList}
//           renderItem={({item}) => (
//             <Text style={styles.item}>
//               {item.name} {item.price}
//             </Text>
//           )}
//         />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 20,
//     paddingHorizontal: 20,
//   },
//   item: {
//     marginTop: 10,
//     padding: 30,
//     backgroundColor: 'pink',
//     fontSize: 24,
//     marginHorizontal: 10,
//     marginBottom: 10,
//   },
// });
import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {FlatList, StyleSheet} from 'react-native';

export function ThirdPage() {
  const [place] = useState([
    {name: 'XMUM', price: '10RM', key: '1'},
    {name: 'KIPMALL', price: '10RM', key: '2'},
    {name: 'KLCC', price: '50RM', key: '3'},
    {name: 'KLIA', price: '20RM', key: '4'},
    {name: 'IOI', price: '30RM', key: '5'},
    {name: 'IOI', price: '25RM', key: '6'},
    {name: 'Restaurant', price: '10RM', key: '7'},
  ]);
  return (
    <View style={styles.container}>
      <FlatList
        data={place}
        renderItem={({item}) => (
          <Text style={styles.item}>
            {item.name} {item.price}
          </Text>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
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
});

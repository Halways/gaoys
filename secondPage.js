import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {FlatList, StyleSheet} from 'react-native';

export function SecondPage() {
  const [place, setPlace] = useState([
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
// import React, {Component} from 'react';
// import {View, Text, FlatList, ActivityIndicator} from 'react-native';
// import {ListItem, SearchBar} from 'react-native-elements';
//
// class SecondPage extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       loading: false,
//       data: [],
//       error: null,
//     };
//     this.arrayholder = [];
//   }
//   componentDidMount() {
//     this.makeRemoteRequest();
//   }
//
//   makeRemoteRequest = () => {
//     const url = 'https://randomuser.me/api/?&results=20';
//     this.setState({loading: true});
//
//     fetch(url)
//       .then((res) => res.json())
//       .then((res) => {
//         this.setState({
//           data: res.results,
//           error: res.error || null,
//           loading: false,
//         });
//         this.arrayholder = res.results;
//       })
//       .catch((error) => {
//         this.setState({error, loading: false});
//       });
//   };
//   renderSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 1,
//           width: '86%',
//           backgroundColor: '#CED0CE',
//           marginLeft: '14%',
//         }}
//       />
//     );
//   };
//   searchFilterFunc = (text) => {
//     this.setState({
//       value: text,
//     });
//
//     const newData = this.arrayholder.filter((item) => {
//       const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
//       const textData = text.toUpperCase();
//
//       return itemData.indexOf(textData) > -1;
//     });
//     this.setState({
//       data: newData,
//     });
//   };
//   renderHeader = () => {
//     return (
//       <SearchBar
//         placeholder="Type Here..."
//         lightTheme
//         round
//         onChangeText={(text) => this.searchFilterFunc(text)}
//         autoCorrect={false}
//         value={this.state.value}
//       />
//     );
//   };
//   render() {
//     if (this.state.loading) {
//       return (
//         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//           <ActivityIndicator />
//         </View>
//       );
//     }
//     return (
//       <View style={{flex: 1}}>
//         <FlatList
//           data={this.state.data}
//           renderItem={({item}) => (
//             <ListItem
//               leftAvatar={{source: {uri: item.picture.thumbnail}}}
//               title={`${item.name.first} ${item.name.last}`}
//               subtitle={item.email}
//             />
//           )}
//           keyExtractor={(item) => item.email}
//           ItemSeparatorComponent={this.renderSeparator}
//           ListHeaderComponent={this.renderHeader}
//         />
//       </View>
//     );
//   }
// }
// export {SecondPage};

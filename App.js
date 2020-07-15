// import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {SecondPage} from './secondPage';
// import {FirstPage} from './firstPage';
// import {ThirdPage} from './thirdPage';
// import {InfoPage} from './infoPage';
// import {aboutPage} from './About';
// import {historyPage} from './History';
// import {createDrawerNavigator} from '@react-navigation/drawer';
//
// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
//
// function home() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={FirstPage} />
//       <Stack.Screen name="secondPage" component={SecondPage} />
//       <Stack.Screen name="thirdPage" component={ThirdPage} />
//     </Stack.Navigator>
//   );
// }
//
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//         <Drawer.Screen name="Home" component={home} />
//         <Drawer.Screen name="Info" component={InfoPage} />
//         <Drawer.Screen name="About" component={aboutPage} />
//         <Drawer.Screen name="History" component={historyPage} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
//创建导航路由
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

//引入三个界面文件，并设置引入的类
import FirstPage from './firstPage';
import LoginScene from './LoginScene';
import RegisterScene from './RegisterScene';
import {SecondPage} from './secondPage';
import {ThirdPage} from './thirdPage';
import {InfoPage} from './infoPage';
import {aboutPage} from './About';
import {historyPage} from './History';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function insideHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScene} />
      <Stack.Screen name="Register" component={RegisterScene} />
      <Stack.Screen name="Home" component={FirstPage} />
      <Stack.Screen name="secondPage" component={SecondPage} />
      <Stack.Screen name="thirdPage" component={ThirdPage} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={insideHome} />
        <Drawer.Screen name="Info" component={InfoPage} />
        <Drawer.Screen name="About" component={aboutPage} />
        <Drawer.Screen name="History" component={historyPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

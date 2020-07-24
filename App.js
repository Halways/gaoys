import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import store from './utils/store';

import FirstPage from './Components/firstPage';
import LoginScene from './Components/LoginScene';
import RegisterScene from './Components/RegisterScene';
import {InfoPage} from './Components/infoPage';
import {aboutPage} from './Components/About';
import {historyPage} from './Components/History';
import Chauffeur from './Components/ChauffeurPage';
import HirePage from './Components/HirePage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function insideHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScene} />
      <Stack.Screen name="Register" component={RegisterScene} />
      <Stack.Screen name="Home" component={FirstPage} />
      <Stack.Screen name="HirePage" component={HirePage} />
      <Stack.Screen name="ChauffeurPage" component={Chauffeur} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={insideHome} />
          <Drawer.Screen name="Info" component={InfoPage} />
          <Drawer.Screen name="About" component={aboutPage} />
          <Drawer.Screen name="History" component={historyPage} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

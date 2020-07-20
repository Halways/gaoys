import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import store from './store';

import FirstPage from './firstPage';
import LoginScene from './LoginScene';
import RegisterScene from './RegisterScene';
import {InfoPage} from './infoPage';
import {aboutPage} from './About';
import {historyPage} from './History';
import {Chauffeur} from './ChauffeurPage';
import {Hire} from './HirePage';
import {detailPage} from './DetailInfo';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function insideHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScene} />
      <Stack.Screen name="Register" component={RegisterScene} />
      <Stack.Screen name="Home" component={FirstPage} />
      <Stack.Screen name="HirePage" component={Hire} />
      <Stack.Screen name="ChauffeurPage" component={Chauffeur} />
      <Stack.Screen name="DetailPage" component={detailPage} />
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


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen  from './screens/HomeScreen';
import AddScreen  from './screens/AddScreen';



export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
const AppNavigator = createSwitchNavigator({
  Login : {screen:LoginScreen},
  SignUp  :{screen :SignUpScreen},
  Home:{screen:HomeScreen},
  Add:{screen:AddScreen}
})
const AppContainer = createAppContainer(AppNavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

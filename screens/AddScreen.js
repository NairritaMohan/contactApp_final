import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class AddScreen extends React.Component{
  
  state = {
      name: '',
      phone: '',
      //userId : firebase.auth().currentUser.uid
      
    }
  
    
  

  render(){

    return(
      <View style = {styles.container}>
        <TextInput
        style = {styles.loginBox}
        placeholder={'Name'}
        onChangeText = {(text)=>{
          this.setState({
            name: text
          })
          
        }}
        value= {this.state.name}
        
        />
        <TextInput
        style = {styles.loginBox}
        placeholder={'Phone Number'}
        keyboardType = 'phone-pad'
        onChangeText = {(text)=>{
          this.setState  ({
            phone:text
          })
        }}
        value= {this.state.phone}
        
        />

        <TouchableOpacity style= {styles.button}

        onPress = {()=>{
         
          var user = firebase.auth().currentUser.uid
         db.collection('data')
         //console.log(user)
          .doc(user)
          .collection('contacts').add({
            name: this.state.name,
            phone:this.state.phone
          }).then(result=>{
            console.log(result)
          }).catch(error=>{
            console.log(error)
          })
          this.props.navigation.navigate('Home')
        
        }}
      
        
        >
          <Text style = {styles.buttonText}>SAVE</Text>
        </TouchableOpacity>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,TextInput, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends React.Component{
  constructor(){
    super()
    this.state = {
      email : '',
      password :''
    }
  }

  userLogin=(email,password)=>{

    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
      return Alert.alert("SuccessfullyLoggedIn")
    })
    .catch(error=>{
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorMessage)
    })

  }
  render(){
    return(
      <View style = {styles.container}>
        <View >
          <TextInput
          style = {styles.inputBox}
          placeholder = {'Enter Email Id'}
          keyboardType = 'email-address'
          onChangeText = {(text)=>{
            this.setState({
            email: text
            })
          }}
          
          />
          <TextInput
          style = {styles.inputBox}
          placeholder = {'Enter Password'}
          secureTextEntry = {true}
          onChangeText = {(text)=>{
            this.setState({
              password:text
            })
          }}
          
          />
        </View>
        <View style = {{marginBottom:20,marginTop:20}}>
        <TouchableOpacity style = { styles.button}
        onPress = {()=>{
          this.userLogin(this.state.email,this.state.password)
          this.props.navigation.navigate('Home')
          
        }}>

          <Text style = {styles.btnText}>Login</Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity style = { styles.button}
        onPress = {()=>{
          this.props.navigation.navigate('SignUp')
          
        }}>

          <Text style = {styles.btnText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
      flex :1,
      justifyContent:'center',
      alignItems :'center'
  },
  button:{
      backgroundColor: 'blue',
      width : 100,
      height :40,
      borderRadius : 10,
      alignItems : 'center',
      justifyContent:'center'
  },
  btnText:{
  color :'black',
  fontSize: 20,
  fontWeight : 'bold'
  },
  inputBox:{
    borderWidth: 2,
        borderColor:'black',
        width: 200,
        height:40,
        marginVertical:10
  }

})
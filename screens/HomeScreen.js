import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Image,FlatList, ActivityIndicator,Linking} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {MaterialIcons} from '@expo/vector-icons'
import {FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class HomeScreen extends React.Component{
constructor(){
  super()
  this.state = {
    contact : [],
    isLoaded : false
  }
}


  componentDidMount(){
    this.getContacts()
  }

  getContacts(){
    var user = firebase.auth().currentUser
    db.collection('data').doc(user.uid)
    .collection('contacts')
    .get()
    .then(querySnapshot=>{

      const contacts = []
      querySnapshot.forEach(snapshot=>{
        contacts.push({
          id: snapshot.id,
          name:snapshot.data().name,
          phone: snapshot.data().phone
        })
        console.log(snapshot.data())
        console.log(snapshot.data().name)
        console.log(snapshot.data().phone)
      })
      this.setState({
        isLoaded: true,
        contacts : contacts
      })
    })
  }
 
  render(){
    if(this.state.isLoaded){
    return(
      <View style = {styles.container}>
        <FlatList 
        data = {this.state.contacts}
        keyExtractor = {(item,index)=>item.id}
        renderItem={({item})=>{
          return(
            <View style = {{backgroundColor:'grey',marginTop:20,marginHorizontal:20,paddingVertical:10,borderRadius:8,flexDirection:'row',
            justifyContent: 'space-between'
            }}>
          <View>
          <Text style = {{fontSize:18,fontWeight: 'bold'}}>{item.name}</Text>
          <Text style = {{marginTop:5}}>{item.phone}</Text>
          </View>
          <View style = {{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>{
           // alert(item.id)
           var user = firebase.auth().currentUser.uid
         db.collection('data')
         //console.log(user)
          .doc(user)
          .collection('contacts')
          .doc(item.id)
          .delete()

          //remove from state

          var contacts = this.state.contacts
          contacts = contacts.filter(c=>c.id !== item.id)

          this.setState({
            contacts : contacts
          })
          }}>
            <MaterialIcons 
            name = "delete"
            size = {28}
            color = "red"
            />

          </TouchableOpacity>

          <TouchableOpacity style = {{marginEnd:20}} onPress={()=>{
            
          }}>
            <MaterialIcons 
            name = "call"
            size = {28}
            color = "green"
            />

          </TouchableOpacity>
          </View>
          </View>
          
          )
        }}
        
        />
       
        <FAB 
        style = {styles.fab}
        icon ="plus"
        small
        onPress = {()=>{
          this.props.navigation.navigate('Add')
        }}/>
        
        <TouchableOpacity  style = {{position:'absolute', right:10,bottom:800}}
        onPress  = {()=>{
          firebase.auth().signOut()
          this.props.navigation.navigate('Login')
        }}>
          
          <MaterialCommunityIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
        
      </View>
    )
      }
      else{
        return(
          <View style ={styles.container}>
            <ActivityIndicator size = 'large'/>

            <Text>Loading......</Text>
          </View>
        )
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  fab:{
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 16
  }
});

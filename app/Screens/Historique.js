import React from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,ScrollView} from 'react-native';
import CustomInputField from '../components/CustomInputField';
function Historique({Navigation}) {
    return (
        <ScrollView  contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.produit1}> 
               <Image source={require('../assets/produit.png')} style={styles.icon} />
               <Text style={styles.text}>Laptot</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({ 
  container:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop:50,
  },
  produit1:{
    width:334,
    height:160,
    borderRadius:15,
    backgroundColor:'#D5D5D4',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop:25,
  },
  icon:{
    width:100,
    height:100,
    resizeMode:'contain',
    marginTop:30,
  },
  text:{
    position:'absolute',
    top:30,
    left:85,
    fontSize:20,
    fontWeight:'bold',
  }

})
export default Historique;
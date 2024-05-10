import React from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,ScrollView} from 'react-native';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
function PageUser({navigation}) {
    const handleLogout = async () => {
      console.log('Attempting to log out...');
      try {
          await signOut(auth);
          console.log('Logged out successfully');
          navigation.navigate('Welcome');
      } catch (error) {
          console.error('Logout failed:', error);
      }
  }
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.UserInterface1}> 
            <Text style={styles.Shop}>ShopSavvy</Text>
          </View>
          <TouchableOpacity style={styles.UserInterface2}> 
              <Text style={styles.text}>Hello !</Text>
              <Text style={styles.textT}>Discover shopping!</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Options de Reconnaissance</Text>
          <TouchableOpacity style={styles.UserButton} onPress={() => navigation.navigate('TakeImage')}>
              <Image source={require('../assets/barcode.png')} style={styles.icon} /> 
              <Text style={styles.UserButtonText}>Scan Barcode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.UserButton} onPress={() => navigation.navigate('Add')}>
              <Image source={require('../assets/add.png')} style={styles.icon} />  
              <Text style={styles.UserButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.UserButton} onPress={() => navigation.navigate('Panier')}>
              <Image source={require('../assets/Panier.png')} style={styles.icon} />  
              <Text style={styles.UserButtonText}>Panier</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.UserButton} onPress={() => navigation.navigate('Historique')}>
              <Image source={require('../assets/notification.png')} style={styles.icon} />  
              <Text style={styles.UserButtonText}>Historique</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.UserButton} onPress={handleLogout}>
              <Image source={require('../assets/left-arrow.png')} style={styles.icon} />
              <Text style={styles.UserButtonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFFFFF', // Couleur d'arrière-plan de la vue
  },
  UserInterface1:{
    width: '100%',
    padding: 40,
    backgroundColor: '#00ff00',
    borderBottomRightRadius:50,
    flexDirection: 'row',
  },
  Shop:{
    fontSize:26,
    fontWeight:'bold',
    Color:'#FBF9FB',
    alignSelf: 'flex-start',
    marginLeft:-30,
  },
  UserButton:{
    width: '70%',
    padding: 15,
    backgroundColor: '#00ff00', // Exemple de couleur de fond
    borderRadius: 25,
    marginTop: 34, // Ajustez selon l'espacement souhaité
    flexDirection: 'row', // Organise les éléments enfants horizontalement
    alignItems: 'center',
    alignSelf: 'center', // Centre le bouton lui-même dans son conteneur parent
  },
  UserButtonText:{
    color: '#000000', // Couleur du texte
    fontWeight: 'bold',
    fontSize:20,
    marginLeft: 10,
  },
  icon:{
    width:30,
    height:30,
  },
  title:{
    fontSize:16,
    marginTop:73,
    alignSelf: 'center',
  },
  text:{
    fontSize:23,
    fontWeight:'bold',
    color:'#020202',
  },
  textT:{
    fontSize:23,
    color:'#020202', 
    fontStyle:'italic'
  },
  UserInterface2:{
    width: '80%',
    padding: 22,
    backgroundColor: '#DBD3DC',
    borderTopRightRadius:30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    position: 'absolute',
    top:80,
  },
})
export default PageUser;
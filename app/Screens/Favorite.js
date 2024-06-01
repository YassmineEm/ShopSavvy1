import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { getCurrentUserId } from './Signup'; 

const Favorite = ({ navigation, route }) => {
  const { favoriteItems } = route.params ?? { favoriteItems: [] };
  const items=favoriteItems;
  
 

  useEffect(() => {
    const saveFavoriteToFirestore = async () => {
      const userId = getCurrentUserId();
      const db = getFirestore();

      try {
        const userFavoriteRef = doc(db, 'Favorites', userId);
        await setDoc(userFavoriteRef, { items: items });
        console.log('Favorite saved to Firestore successfully.');
      } catch (error) {
        console.error('Error saving Favorite to Firestore:', error);
      }
    };

    saveFavoriteToFirestore();
  }, [items]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite</Text>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.Image }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.Nom}</Text>
            <Text style={styles.itemPrice}>{item.Prix}DH</Text>
           
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:124,
    marginTop:21,
    color:'#04920D',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius:20,
    borderWidth: 1,
    backgroundColor:'',
    borderColor:'white',
    padding: 8,
    backgroundColor: '#ebe7de',
    
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 65,
    height: 65,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  
});
export default Favorite;
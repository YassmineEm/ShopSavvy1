import React, {useState , useEffect}from 'react';
import { ScrollView,View, Text, Image, StyleSheet ,TextInput ,Pressable , Alert} from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import {getDownloadURL } from 'firebase/storage';
function Profile({navigation}) {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);


    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                const userRef = ref(database, `users/${userId}`)
                onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                console.log('Data from Firebase:', data);
                setUser(data);
              });
            }else{
                setUser(null);
            }
        });
    }, []);

    const selectImage = async () => {
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, 
            aspect: [1, 1], 
            quality: 0.5,
        };
        try {
            const pickerResult = await ImagePicker.launchImageLibraryAsync(options);
    
            if (pickerResult.cancelled) {
                console.log('L\'utilisateur a annulé la sélection d\'image');
            } else if (pickerResult.error) {
                console.error('Erreur de sélection d\'image: ', pickerResult.error);
            } else {
                console.log('Image sélectionnée:', pickerResult.uri);
                const storageRef = ref(storage, `images/${user.uid}`);
                const metadata = { contentType: 'image/jpeg' };
            }
        } catch (error) {
            console.error('Erreur lors du lancement de la bibliothèque d\'images: ', error);
        }
    };
    const updateImage = (uri) => {
        const storageRef = ref(storage, `images/${user.uid}`);
        const metadata = { contentType: 'image/jpeg' };
        uploadBytes(storageRef, uri, metadata)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((downloadURL) => {
                        const userDataRef = ref(database, `users/${user.uid}`);
                        update(userDataRef, { ...user, image: downloadURL })
                            .then(() => console.log('Image de l\'utilisateur mise à jour dans Firebase Realtime Database'))
                            .catch((error) => console.error('Erreur lors de la mise à jour de l\'image de l\'utilisateur: ', error));
                    })
                    .catch((error) => console.error('Erreur lors de la récupération de l\'URL de téléchargement: ', error));
            })
            .catch((error) => console.error('Erreur lors de l\'enregistrement de l\'image: ', error));
    };
    const showOptions = () => {
        Alert.alert(
            'Options',
            'Que voulez-vous faire avec l\'image ?',
            [
                { text: 'Importer une image', onPress: selectImage },
                { text: 'Prendre une photo', onPress: takePhoto },
                { text: 'Supprimer l\'image', onPress: () => console.log('Supprimer l\'image'), style: 'destructive' },
                { text: 'Annuler', style: 'cancel' }
            ]
        );
    };
    return (
        <ScrollView style={styles.container}>
            {user && (
                <>
                    <Text style={styles.text}>Your Profile</Text>
                    <Pressable onPress={showOptions}>
                        <Image source={user.image ? { uri: user.image } : require('../assets/user.png')} style={styles.image} />
                    </Pressable>
                    <TextInput
                        style={[styles.input1, styles.label1]}
                        value={user.nom}
                        editable={false}
                    />
                    <TextInput
                        style={[styles.input2, styles.label2]}
                        value={user.email}
                        editable={false}
                    />
                </>
            )}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor: '#fff',
    },
    image: {
        marginTop:60,
        marginLeft:100,
        width: 130,
        height: 130,
        borderRadius: 50,
        marginBottom: 20,
    },
    text :{
      fontSize:20,
      fontWeight: 'bold' ,
      marginTop: 60,
      marginLeft:110,
    },
    input1: {
        width: 250,
        height:40,
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 46,
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#27B76F',
    },
    input2: {
        width: 250,
        height:40,
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 46,
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#26B669',
    },
});
export default Profile;
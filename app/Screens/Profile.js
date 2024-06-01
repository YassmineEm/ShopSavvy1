import React, {useState , useEffect}from 'react';
import { ScrollView,View, Text, Image, StyleSheet ,TextInput ,Pressable , Alert ,Button} from 'react-native';
import { ref, onValue , update , remove} from 'firebase/database';
import { database, storage} from '../../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import {getDownloadURL , uploadBytes ,deleteObject} from 'firebase/storage';
function Profile({navigation}) {
    /*
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [imageSelected, setImageSelected] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState(null);
     //branch1
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
    const uploadImageToFirebaseStorage = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const metadata = { contentType: 'image/jpeg' };
            const storageRef = ref(storage, `images/${user.uid}/${Date.now()}.jpg`);
            await uploadBytes(storageRef, blob, metadata);
            const downloadURL = await getDownloadURL(storageRef);

            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                await update(ref(database, `users/${currentUser.uid}`), {
                    image: downloadURL,
                });
            }

            Alert.alert('Succès', 'L\'image a été envoyée avec succès vers Firebase Storage.');

        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'image vers Firebase Storage : ', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de l\'envoi de l\'image.');
        }
    };
    const handleUploadImage = () => {
        if (imageSelected) {
            uploadImageToFirebaseStorage(selectedImageUri);
        } else {
            Alert.alert('Sélectionnez d\'abord une image');
        }
    };
    const selectImage = async () => {
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, 
            aspect: [1, 1], 
            quality: 0.5,
        };
        try {
            const pickerResult = await ImagePicker.launchImageLibraryAsync(options);
    
            if (!pickerResult.cancelled) {
                setSelectedImageUri(pickerResult.uri);
                setImageSelected(true);
                await uploadImageToFirebaseStorage(pickerResult.uri);
            }
        } catch (error) {
            console.error('Erreur lors de la sélection d\'image: ', error);
        }
    };
    
    const TakeImage = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission refusée', 'Désolé, nous avons besoin de la permission d\'accéder à votre appareil photo pour que cela fonctionne.');
                return;
            }
            const result = await ImagePicker.launchCameraAsync({
               allowsEditing: false,
               aspect: [4, 3],
               quality: 1,
            });
            if (!result.cancelled) {
                console.log('Image capturée:', result.uri);
                await uploadImageToFirebaseStorage(result.uri); 
                setImageSelected(true);
            }
        } catch (error) {
            console.error('Erreur lors de la prise de la photo : ', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la prise de la photo.');
        }
    };
    const RemoveImage = async () =>{
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const storageRef = ref(storage, `images/${user.uid}`);
                await deleteObject(storageRef);
                setImage(null); 
                await update(ref(database, `users/${user.uid}/image`), '');
                Alert.alert('Image supprimée avec succès.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image : ', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la suppression de l\'image.');
        }
    };
    const showOptions = () => {
        Alert.alert(
            'Options',
            'Que voulez-vous faire avec l\'image ?',
            [
                { text: 'Importer une image', onPress: selectImage },
                { text: 'Prendre une photo', onPress:  TakeImage},
                { text: 'Supprimer l\'image', onPress: RemoveImage, style: 'destructive' },
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
                        <Image source={user.image ? { uri: user.image } : require('../assets/profile.png')} style={styles.image} />
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

    );*/
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor: '#fff',
    },
    image: {
        marginTop:58,
        marginLeft:97,
        width: 170,
        height: 170,
        marginBottom: 20,
    },
    text :{
      fontSize:28,
      fontWeight: 'bold' ,
      marginTop: 129,
      marginLeft:115,
      color:  '#42B315',
    },
    input1: {
        width: 250,
        height:40,
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 68,
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#42B315',
        marginTop: 20,
        textAlign: 'center',
        color: 'black',
    },
    input2: {
        width: 250,
        height:40,
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 68,
        padding: 10,
        borderWidth: 1,
        marginTop:10,
        borderRadius: 15,
        borderColor: '#42B315',
        textAlign: 'center',
        color: 'black',
    },
});
export default Profile;
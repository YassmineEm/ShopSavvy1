import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView,ScrollView ,Pressable} from 'react-native';
import CustomInputField from '../components/CustomInputField';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../config/firebase';
import Loading from '../components/loading';
import { setUserLoading } from '../../redux/slices/user';

function Login({navigation}) {
    const [fullName, setFullName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const {userLoading} = useSelector(state =>state.user);
    const dispatch = useDispatch();
    const handleSignup = async () => {
        // Implémentez votre logique d'inscription ici
        let isError = false;
        if (!fullName || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            isError = true;
        }
        if (password.length < 8) {
            setError("Password should be at least 8 characters long.");
            isError = true;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            isError = true;
        }
        // S'il n'ya aucune erreur
        if (!isError) {
            try{
                dispatch(setUserLoading(true));
                await createUserWithEmailAndPassword(auth ,email , password);
                dispatch(setUserLoading(false));
            }catch(e){
                dispatch(setUserLoading(false));
                setError(e.message);
                isError = true;
            }
        }
    }
    return (
        <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../assets/store.png')} style={styles.logo} />
            <Text style={styles.logoname}>ShopSavvy</Text>
            <Text style={styles.title}>Create an account</Text>
            <CustomInputField 
                  iconSource={require('../assets/user.png')} // Mettez ici votre icône de nom d'utilisateur
                  placeholder="FullName"
                  onChangeText={setFullName}
                  value={fullName}
                  error={error}
            />
            <CustomInputField
                  iconSource={require('../assets/mail.png')} // Mettez ici votre icône de l'email
                  placeholder="Email"
                  onChangeText={setEmail}
                  value={email}
                  error={error}
            />
            <CustomInputField
                  iconSource={require('../assets/padlock.png')} // Mettez ici votre icône du mot de passe 
                  placeholder="Password"
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  value={password}
                  error={error}
            />
            <CustomInputField
                  iconSource={require('../assets/padlock.png')} // Mettez ici votre icône de mot de passe 
                  placeholder="ConfirmPassword"
                  onChangeText={setConfirmPassword}
                  secureTextEntry={true}
                  value={confirmPassword}
                  error={error}
            />
            {
                error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
            {
                userLoading? (
                   <Loading />
                ):(
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>  
              )
            }
            <View style={{ flexDirection: 'row', alignItems: 'center' ,marginVerical: 20}}>
                <View 
                 style={{
                    flex: 1,
                    height: 1,
                    backgroundColor:'#696969',
                    marginHorizontal: 10,
                    marginTop:8,
                }}/>
                <Text style={{fontSize: 16 ,marginTop:8}}>Or Sign up with</Text>
                <View 
                 style={{
                    flex: 1,
                    height: 1,
                    backgroundColor:'#696969',
                    marginHorizontal: 10,
                    marginTop:8,
                }}/>
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'center',
                }}>
                </View>
                </View>
                <View style={styles.container1}>
                 <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                 }}>
                   <TouchableOpacity onPress={() => console.log("Pressed")}
                   style={{
                    //flex: 1,
                    width:170,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 30,
                    borderWidth: 1,
                    borderColor:'#696969',
                    marginRight: 4,
                    borderRadius: 10,
                   }}>
                   <Image source={require("../assets/facebook.png")}
                   style={{
                    height: 16,
                    width: 16,
                    marginRight: 8,
                   }}
                   />
                   <Text>Facebook</Text>
                   </TouchableOpacity>
                 </View>
                 <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                 }}>
                   <TouchableOpacity onPress={() => console.log("Pressed") }
                   style={{
                    //flex: 1,
                    width:170,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 30,
                    borderWidth: 1,
                    borderColor:'#696969',
                    marginRight: 4,
                    borderRadius: 10,
                   }}>
                   <Image source={require("../assets/google.png")}
                   style={{
                    height: 16,
                    width: 16,
                    marginRight: 8,
                   }}
                   />
                   <Text>Google</Text>
                   </TouchableOpacity>
                </View>
                </View>
                <View style={{
                    flexDirection :"row",
                    justifyContent: "center",
                    marginVertical: 22,
                }}>
                <Text style={{fontSize:16 ,color:'#000000'}}>Already have an account</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={{
                        fontSize: 16,
                        color:'#00ff00',
                        fontWeight:'bold',
                        fontStyle:'italic',
                        marginLeft:6,
                    }}>Login</Text>
                </Pressable>
                </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF', // Couleur d'arrière-plan de la vue
    },
    logo: {
        marginTop: 20, // Positionne le logo à 20 pixels du haut
        alignSelf: 'flex-start',
        marginLeft: 24,
        width:110,
        height:110,
        resizeMode: 'contain', // Assurez-vous que le logo s'adapte bien sans être déformé
    },
    title: {
        alignSelf: 'flex-start',
        marginLeft: 70,
        marginTop:6,
        fontSize:27,
        fontStyle:'italic',
        fontWeight:'bold',
        color:'#00ff00',
    },
    logoname:{
        alignSelf: 'flex-start',
        marginTop:-40,
        marginLeft:140,
        fontSize:30,
        fontWeight:'bold',
        color:'#228B22',
    },
    signupButton: {
        width: '30%',
        padding: 5,
        backgroundColor: '#00ff00', // Exemple de couleur de fond
        borderRadius: 5,
        marginTop: 6, // Ajustez selon l'espacement souhaité
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 121,
    },
    signupButtonText: {
        color: '#FFFFFF', // Couleur du texte
        fontWeight: 'bold',
        fontSize:20,
    },
    container1: {
        flexDirection: 'row', // Aligner les boutons horizontalement
        justifyContent: 'center', // Centrer les boutons dans le conteneur
        alignItems: 'center', // Centrer les boutons verticalement
        marginTop: 10, 
    },
    errorText:{
        fontSize:17,
        color:'red',
        marginLeft:91,
        marginTop:7,
    }
})
export default Login;
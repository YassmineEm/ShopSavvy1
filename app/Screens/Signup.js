import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,ScrollView} from 'react-native';
import CustomInputField from '../components/CustomInputField';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoading } from '../../redux/slices/user';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Loading from '../components/loading';
function Signup({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userLoading} = useSelector(state =>state.user);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const handleLogin = async () => {
        let isError = false;
        if (!email || !password ) {
            setError("Please fill in all fields.");
            isError = true;
        }
        else{
            try{
                dispatch(setUserLoading(true));
                await signInWithEmailAndPassword(auth ,email , password);
                dispatch(setUserLoading(false));
            }catch(e){
                dispatch(setUserLoading(false));
                setError(e.message);
                isError = true;
            }
        }
    };
    return (
        <KeyboardAvoidingView
        behavior="height" 
        style={{flex: 1}}
        >
        <ScrollView>
            <Image source={require('../assets/store.png')} style={styles.logo} />
            <Text style={styles.logoname}>ShopSavvy</Text>
            <Text style={styles.title}>Welcome !</Text>
            <CustomInputField
                iconSource={require('../assets/user.png')}
                placeholder="Email"
                placeholderTextColor="#000000"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <CustomInputField
                iconSource={require('../assets/padlock.png')}
                placeholder="Password"
                placeholderTextColor="#000000"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            {
                error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
            {
                userLoading? (
                   <Loading />
                ):(
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                      <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>
              )
            }
            <Text style={styles.titre}onPress={() => navigation.navigate('Forgetpassword')}>Forget Password</Text>
            <Text style={styles.titre1} onPress={() => navigation.navigate('Login')}>Don't have an account ?</Text>
        </ScrollView>
    </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    
    logo: {
        marginTop:  30, 
        alignSelf: 'flex-start',
        marginLeft: 24,
        width:110,
        height:110,
        resizeMode: 'contain', 
    },
    title: {
        alignSelf: 'flex-start',
        marginLeft: 55,
        fontSize:55,
        fontStyle:'italic',
        fontWeight:'bold',
        color:'#a279a2',
        marginTop:20,
    },
    logoname:{
        alignSelf: 'flex-start',
        marginLeft:140,
        fontSize:30,
        fontWeight:'bold',
        color:'#565074',
        marginTop:-40,
    },
    input: {
        width: '80%',
        margin: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 5,
        color: '#000',
        alignSelf: 'flex-start',
        marginLeft:24,
    },
    loginButton: {
        width: '30%',
        padding: 5,
        backgroundColor: '#a279a2', // Exemple de couleur de fond
        borderRadius: 5,
        marginTop: 20, // Ajustez selon l'espacement souhaité
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 115,
    },
    loginButtonText: {
        color: '#FFFFFF', // Couleur du texte
        fontWeight: 'bold',
        fontSize:20,
    },
    titre:{
        fontSize: 17,
        alignSelf: 'flex-start',
        marginLeft: 113,
        marginTop:6,
    },
    titre1:{
        fontSize: 17,
        alignSelf: 'flex-start',
        marginLeft: 92,
        marginTop:6,
    },
    errorText:{
        fontSize:17,
        color:'red',
        textAlign: 'center',
        marginTop:7,
    }
})
export default Signup;
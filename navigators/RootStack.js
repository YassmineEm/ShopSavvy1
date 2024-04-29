import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';


import Welcome from '../app/Screens/Welcome';
import login from '../app/Screens/login'
import Signup from '../app/Screens/Signup';
import PageUser from '../app/Screens/PageUser';
import Parametre from '../app/Screens/Parametre';
import Historique from '../app/Screens/Historique';
import TakeImage from '../app/Screens/TakeImage';
import Add from '../app/Screens/Add';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../redux/slices/user';



const Stack = createNativeStackNavigator();


const RootStack = () => {
    const {user} = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    onAuthStateChanged(auth ,u =>{
        console.log('got user :',u);
        dispatch(setUser(u));
    })

    if(user){
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle:{
                        backgroundColor:'transparent'
                    },
                    headerTransparent:true,
                    headerTitle:'',
                    headerLeftContainerStyle:{
                        paddingLeft:20,
                    }     
                }}
                initialRouteName="PageUser"
                >
                    <Stack.Screen name='PageUser' component={PageUser}/>
                    <Stack.Screen name='Parametre' component={Parametre}/>
                    <Stack.Screen name='Historique' component={Historique}/>
                    <Stack.Screen name='TakeImage' component={TakeImage}/>
                    <Stack.Screen name='Add' component={Add}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }else{
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle:{
                        backgroundColor:'transparent'
                    },
                    headerTransparent:true,
                    headerTitle:'',
                    headerLeftContainerStyle:{
                        paddingLeft:20,
                    }     
                }}
                initialRouteName="Welcome"
                >
                    <Stack.Screen name='Welcome'component={Welcome}/>
                    <Stack.Screen name='Signup'component={Signup}/>
                    <Stack.Screen name='Login'component={login}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
    /*return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle:{
                    backgroundColor:'transparent'
                },
                headerTransparent:true,
                headerTitle:'',
                headerLeftContainerStyle:{
                    paddingLeft:20,
                }     
            }}
            initialRouteName="Welcome"
            >
                <Stack.Screen name='Welcome'component={Welcome}/>
                <Stack.Screen name='Signup'component={Signup}/>
                <Stack.Screen name='Login'component={Login}/>
                <Stack.Screen name='PageUser' component={PageUser}/>
                <Stack.Screen name='Parametre' component={Parametre}/>
                <Stack.Screen name='Historique' component={Historique}/>
            </Stack.Navigator>
        </NavigationContainer>
    )*/
}
export default RootStack;
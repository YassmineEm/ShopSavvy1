import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions ,TouchableOpacity} from 'react-native';

function Welcome({navigation}) {
    const handleWelcome = () => {
        // Ici, vous pouvez implémenter votre logique 
        console.log(Welcome); 
        navigation.navigate('Signup')
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.Welcome}>
                <Image source={require('../assets/store.png')} style={styles.logo} />
                <Text style={styles.logoname}>ShopSavvy</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Discover products effortlessly with our smart recognition technology.</Text>
            <TouchableOpacity style={styles.WelcomeButton}>
                    <Text style={styles.WelcomeButtonText} onPress={() => navigation.navigate('Signup')}>Let's start</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#00ff00',
    },
    Welcome:{
       width:360,
       height:350,
       borderBottomRightRadius:200,   
       backgroundColor: '#FFFFFF', 
    },
    logo: {
        marginTop: 40, // Positionne le logo à 20 pixels du haut
        alignSelf: 'center', // Centre le logo dans le conteneur
        width:180,
        height:180,
        resizeMode: 'contain', // Assurez-vous que le logo s'adapte bien sans être déformé
    },
    logoname: {
        fontSize:34,
        fontWeight:'bold',
        marginTop: 20,
        color:'#228B22',
        fontStyle: 'italic',
        alignSelf: 'flex-start',
        marginLeft: 24,
    },
    title :{
        color:'white',
        fontSize:22,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 50,
        fontWeight:'bold',
    },
    WelcomeButton: {
        width: '35%',
        padding: 10,
        backgroundColor: '#FFFFFF', // Exemple de couleur de fond
        borderRadius: 5,
        marginTop: 20, // Ajustez selon l'espacement souhaité
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 115,
    },
    WelcomeButtonText: {
        color: '#00ff00', // Couleur du texte
        fontWeight: 'bold',
        fontSize:20,
    },
})
export default Welcome;
import React, { useState , useEffect }from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,ScrollView,Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
function TakeImage({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');
    const [productData, setProductData] = useState(null); 
    const [showProductModal, setShowProductModal] = useState(false); 
    const askForCameraPermission = () =>{
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }
    useEffect(() => {
        askForCameraPermission();
    }, []);
    const handleBarCodeScanned = async ({type ,data}) => {
        setScanned(true);
        setText(data);
        console.log(`Type: ${type} \nData: ${data}`);
        const docRef = doc(db, "Products", data);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setProductData(docSnap.data());
            setShowProductModal(true);
        } else {
            console.log("No such product!");
            setProductData(null);
            setText("No such product");
        }
    }
    const hideProductModal = () => {
        setShowProductModal(false); 
        setScanned(false); 
    };
    if (hasPermission === null) {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.permission}>Requisting for camera permission</Text>
            </ScrollView>
        )
    }
    if (hasPermission === false){
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.permission}>No access to camera</Text>
                <Button title={'allow camera'} onPress={() => askForCameraPermission()}/>
            </ScrollView>
        )
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.barcodebox}>
              <BarCodeScanner
                 onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                 style={{height: 530 ,width: 530}} />
            </View>
            <Text style={styles.maintext}>{text}</Text>
            {showProductModal && productData && (
                <View style={styles.productModal}>
                   <View style={styles.productContainer}>
                        <View style={styles.row}>
                           <Text style={styles.label}>Product Name:</Text>
                           <Text style={styles.value}>{productData.Nom}.</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.label}>Price:</Text>
                          <Text style={styles.value}>{productData.Prix} DH .</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.label}>Pays:</Text>
                          <Text style={styles.value}>{productData.Pays} .</Text>
                        </View>
                        <View style={styles.row}>
                           <Text style={styles.label}>Constituants:</Text>
                           <Text style={styles.value}>{Array.isArray(productData.Constituants) ? productData.Constituants.join(', ') : productData.Constituants} .</Text>
                        </View>
                   </View>
                   <Button title="Close" onPress={hideProductModal} />
                </View>
            )}
            {scanned && (<TouchableOpacity style={styles.againButton} onPress={() => setScanned(false)}>
                <Text style={styles.buttonText}>Scan again ?</Text>
            </TouchableOpacity>)}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
},
barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#ff6347',
    marginBottom: 20,
},
maintext: {
    fontSize: 20,
    margin: 20,
    color: '#9e749a',
    fontWeight: 'bold',
    textAlign: 'center',
},
permission: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 50,
    textAlign: 'center',
    color: '#9e749a',
},
againButton: {
    position: 'absolute',
    bottom: 40,
    padding: 15,
    backgroundColor: '#727272',
    borderRadius: 10,
},
buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
},
productModal: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
productContainer: {
    marginBottom: 15,
},
row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
},
label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#9e749a',
},
value: {
    fontSize: 16,
    color: '#666',
    flexShrink: 1,
},
button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9e749a',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
},
buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
},
productImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
},
imageContainer: {
    alignItems: 'center',
    position: 'relative',
},
favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
},
favoriteIconImage: {
    width: 30,
    height: 30,
},
});

export default TakeImage;

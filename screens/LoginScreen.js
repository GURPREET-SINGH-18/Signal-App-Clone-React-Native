import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import {Button,Input,Image} from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("Home")
            }
        })

        return unsubscribe;
    }, []);
    const signIn = async ()=> {
        auth.signInWithEmailAndPassword(email, password).catch((error)=>alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'/>
            {/* <View>
                <Text>Welcome to the Signal</Text>
                <Text>Login to Chat</Text>
            </View> */}
            <Image source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/900px-Signal-Logo.svg.png?20201126050550"
            }} 
            style={{width:150,height:150,borderRadius:30,marginBottom:15 }}
            />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autofocus 
                    type="Email" 
                    value={email} 
                    onChangeText={
                        (text) => {setEmail(text)
                    }}
                />
                <Input 
                    placeholder="Password" 
                    type="password" 
                    secureTextEntry
                    value={password} 
                    onChangeText={
                        (text) => {setPassword(text)
                    }}
                    onSubmitEditing={signIn}
                />
            </View>
            
            <Button 
                title="Login"
                containerStyle={
                    styles.button
                }
                onPress={signIn}
                buttonStyle={{backgroundColor:"#2C6BED"}}
            />
            <Button 
                title="Register"
                containerStyle={
                    styles.button
                }
                type="outline"
                buttonStyle={{color:"#2C6BED"}}
                onPress={()=>navigation.navigate("Register")}
            />
            <View style={{height:50}}></View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width:300
    },
    button: {
        width:200,
        marginTop:10
    },
})
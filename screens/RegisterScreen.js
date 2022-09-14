import React,{useState,useLayoutEffect} from 'react';
import {KeyboardAvoidingView,View, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Button,Input,Text} from 'react-native-elements';
import {auth} from '../firebase'

const RegisterScreen = ({navigation}) => {
    const [name,setName]=useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [imageUrl,setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({

        })
    },[navigation])

    const register = ()=> {
        auth.createUserWithEmailAndPassword(email, password).then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://stonegatesl.com/wp-content/uploads/2021/01/avatar.jpg"
            })
        }).catch(error => {
            alert(error.message)
        })
    }
    return (
        <View behavior="padding" style={styles.container}>
            <StatusBar style='light'/>
            <Text h3 style={{marginBottom:50}}>
                Create a Signal Account
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name"
                    autofocus
                    type="text"
                    value={name}
                    onChangeText={text=>setName(text)}
                />
                <Input 
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={text=>setEmail(text)}
                />
                <Input 
                    placeholder="Password"
                    type="password"
                    value={password}
                    secureTextEntry
                    onChangeText={text=>setPassword(text)}
                />
                <Input 
                    placeholder="Profile Picture URL (optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={text=>setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button 
                containerStyle={styles.button}
                title="Register"
                onPress={register}
                raised
                buttonStyle={{backgroundColor:"#2C6BED"}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
        backgroundColor:'white'
    },
    inputContainer: {
        width:300,
    }
    ,
    button: {
        width:200,
        marginTop:10,
    }
})

export default RegisterScreen;

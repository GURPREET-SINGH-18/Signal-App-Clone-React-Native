import React,{useLayoutEffect,useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {db} from '../firebase';

const AddChatScreen = ({navigation}) => {
    const [input,setInput]= useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a New Chat',

        })
    },[navigation])
    const createChat = async () => {
        await db.collection('chats').add({
            chatName:input
        }).then(() => {
            navigation.goBack()
        }).catch(err => alert(err.message));
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter a Chat Name'
                value={input}
                onChangeText={(text) =>setInput(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black"/>
                }
                onSubmitEditing={createChat}
            />
            <Button 
                disabled={!input}
                onPress={createChat} 
                title='Create New Chat'
                raised
                buttonStyle={{backgroundColor:"#2C6BED"}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        padding:30,
        height:'100%'
    }
})

export default AddChatScreen;

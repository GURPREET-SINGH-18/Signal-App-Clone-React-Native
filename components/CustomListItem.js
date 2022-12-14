import React,{useState,useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {db} from '../firebase';
const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages,setChatMessages] = useState([])
    
    useEffect(() => {
        console.log("ch")
        const unsubscribe = db
                        .collection('chats')
                        .doc(id)
                        .collection('messages')
                        .orderBy('timestamp','desc')
                        .onSnapshot((snapshot)=>setChatMessages(snapshot.docs.map((doc) => doc.data())))
                        
        return unsubscribe;
    },[])
    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id,chatName)}>
            <Avatar
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL ||"https://stonegatesl.com/wp-content/uploads/2021/01/avatar.jpg"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}

const styles = StyleSheet.create({})

export default CustomListItem;

import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { db, auth } from '../firebase';
import { serverTimestamp } from "firebase/firestore";


const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        console.log("hh")
        navigation.setOptions({
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: 'center'
                    }}
                >
                    <Avatar
                        rounded
                        source={{ uri: messages[0]?.data.photoURL || "https://stonegatesl.com/wp-content/uploads/2021/01/avatar.jpg" }}
                    />
                    <Text
                        style={{ color: "white", marginLeft: 10, fontWeight: "700", fontSize: 20 }}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )

        })
    }, [navigation,messages])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput('')
    };

    useLayoutEffect(() => {
        console.log('ll')
        const unsubscribe = db
                .collection('chats')
                .doc(route.params.id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                ))

        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <StatusBar style='light' />
            <View
                style={styles.container}
            >
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
                <>
                    <ScrollView>
                        {messages.map(({id,data})=>(
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.receiver}>
                                    <Avatar 
                                        position="absolute"
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom:-15,
                                            right:-5
                                        }}
                                        bottom={-15}
                                        right={-5}
                                        rounded
                                        size={30}
                                        source={{uri: data.photoURL}}
                                    />
                                    <Text style={styles.receiverText}>
                                        {data.message}
                                    </Text>
                                </View>
                            ) : 
                            (
                                <View key={id} style={styles.sender}>
                                    <Avatar 
                                    position="absolute"
                                    containerStyle={{
                                        position: 'absolute',
                                        bottom:-15,
                                        left:-5
                                    }}
                                    bottom={-15}
                                    left={-5}
                                    rounded
                                    size={30}
                                    source={{uri: data.photoURL}}
                                    />
                                    <Text style={styles.senderText}>
                                        {data.message}
                                    </Text>
                                    <Text style={styles.senderName}>
                                        {data.displayName}
                                    </Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            placeholder="Signal Message"
                            style={styles.textInput}
                            value={input}
                            onChangeText={(text) => setInput(text)}
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={sendMessage}
                        >
                            <Ionicons
                                name="send"
                                size={24}
                                color="#2C6BED"
                            />
                        </TouchableOpacity>
                    </View>
                </>
                {/* </TouchableWithoutFeedback> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    footer: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30
    },
    receiver:{
        padding:15,
        backgroundColor: "#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        marginTop:15,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding:15,
        backgroundColor: "#2B68E6",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth: "80%",
        position: "relative"
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color: "white"
    },
    senderText: {
        color:"white",
        fontWeight:"500",
        marginLeft:10, 
        marginBottom:15
    }
})

export default ChatScreen;

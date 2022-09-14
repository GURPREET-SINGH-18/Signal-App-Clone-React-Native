import React, { useLayoutEffect, useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }
    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(
                snapshot.docs.map(
                    doc => ({
                        id: doc.id,
                        data: doc.data()
                    }
                    )
                )
            )
        ))
        return unsubscribe;
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: 'black' },
            headerTitleAlign: 'center',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={signOutUser}
                    >
                        <Avatar
                            rounded
                            source={{
                                uri: auth?.currentUser?.photoURL || "https://stonegatesl.com/wp-content/uploads/2021/01/avatar.jpg"
                            }}
                        />
                    </TouchableOpacity>
                </View>
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
                    <TouchableOpacity
                        activeOpacity={0.5}
                    >
                        <AntDesign
                            name='camerao'
                            size={24}
                            color={"black"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('AddChat')}
                    >
                        <SimpleLineIcons
                            name='pencil'
                            size={21}
                            color={"black"}
                        />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = (id,chatName) => {
        navigation.navigate('Chat',{
            id,
            chatName
        })
    }
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats?.map(({id,data:{chatName}})=>(
                    <CustomListItem 
                        key={id} 
                        id={id} 
                        chatName={chatName}
                        enterChat={enterChat}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})

export default HomeScreen;

import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function Header() {
    const { user } = useUser();
    return (
        <View style={styles.container}>
            <Image source={{ uri: user?.imageUrl }}
                style={{width:35,height:35,borderRadius:99}}
            />
            <Image source={require('./../../../assets/Images/Main-Logo-.png')} 
                style={styles.Logo}
            />
            <Ionicons name="filter" size={23} color="black" />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        marginTop:0,
        // backgroundColor:Colors.White,
    },
    Logo:{
        width:200,
        height:45,
        objectFit:'contain',
    },
})
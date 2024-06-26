import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function Error() {
    return (
        <View style={styles.container}>
            <View style={{
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
            }}>
                <Image source={require("./../../../assets/Images/Error.jpg")}
                    style={{
                        height: 200,
                        width: 150,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                    }}
                />
                <Text style={styles.txt}>No Stations Found In Your Area. Try Searching Another Area!!!</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft:37,
        marginTop:100,
        padding:10,
        backgroundColor: Colors.White,
        borderRadius:50,
    },
    txt: {
        fontSize: 18,
        textAlign: "center",
        fontFamily: "Poppins-SemiBold",

    }
})
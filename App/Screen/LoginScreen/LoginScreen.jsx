import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import Colors from './../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [isLoading, setIsLoading] = React.useState(false);

  const onPress = async () => {
    setIsLoading(true);
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      marginTop:50,
    }}>

      <Image source={require('../../../assets/Images/MainLogo.png')} 
        style={styles.Logo}
      />
      <Image source={require('../../../assets/Images/main-bg.jpg')} 
        style={styles.MainLogo}
      /> 
      <View style={{padding:20}}>
        <Text style={styles.heading}>EV CHARGING STATION FINDER</Text> 
        
        <Text style={styles.dis}>Find the best electric charging stations for your vehicle at your current location</Text>
        

        <TouchableOpacity style={styles.buttons}
          onPress={onPress}
        > 
          {isLoading && <ActivityIndicator size="small" color={Colors.Black} />}
          <AntDesign  name="google" size={24} color="black" />
          <Text style={{
            color: Colors.backgroundColor,
            fontSize: 13,
            textAlign: "center",
            fontFamily: "Poppins-Regular",
          }}>Continue with GOOGLE</Text>
        </TouchableOpacity>
         <View>
            <Text style={{
                fontSize:9,
                marginTop:3,
                opacity:0.4,
                color:Colors.Gray,
                textAlign:'center',
            }}>By signing up you're allowed to <Text style={{textDecorationLine:"underline",color:Colors.Primary}}>TERMS & CONDITIONS</Text> </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
   Logo:{
    marginTop:10,
    width:200,
    height:50,
    objectFit:'contain',
   },
   MainLogo:{
    width:'100%',
    height:300,
    objectFit:'cover',
    marginTop:0,
   },
   heading:{
    fontSize:20,
    fontFamily:'Poppins-Bold',
    textAlign:'center',
    marginTop:0,
   },
   dis:{
    fontSize:17,
    fontFamily:'Poppins-Regular',
    textAlign:'center',
    color:Colors.Gray,
    marginTop:0,
   },
   buttons:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-evenly",
    flexDirection:"row",
    backgroundColor: Colors.White,
    display: "flex",
    padding: 16,
    borderWidth:1,
    borderRadius: 99,
    marginTop: 20,
   }
})
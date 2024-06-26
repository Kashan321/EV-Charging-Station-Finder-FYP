import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Linking, FlatList } from 'react-native'
import React from 'react'
import { useUser, useClerk } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <View style={styles.container}>
      <Text style={styles.profile}>My <Text style={{color:Colors.Primary}}>Profile</Text></Text>
      <Image source={{ uri: user?.imageUrl }} style={styles.image} />
      <Text style={styles.name_email}>Name:</Text>
      <View style={styles.name_f}>
        <Text style={styles.text}>{user?.fullName}</Text>
      </View>

      <Text style={styles.name_email}>Email:</Text>
      <View style={styles.email_f}>
        <Text style={styles.email_t}>{user?.emailAddresses[0]?.emailAddress}</Text>
      </View>

      <Text style={{
        marginRight: 133,
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginTop: 8,
      }}>About Developer:</Text>
      <TouchableOpacity style={styles.dev} onPress={() => Linking.openURL('https://kashan321.github.io/kashansprofile/')}>
        <Text style={{ color: Colors.backgroundColor, fontSize: 17, fontFamily: "Poppins-Regular", fontWeight: "300", fontFamily: 'Poppins-SemiBold', }}>M Kashan Haider</Text>
        <AntDesign style={{ transform: [{ translateX: 13 }] }} name="arrowright" size={24} color={Colors.backgroundColor} />
      </TouchableOpacity>

      <Text style={styles.name_email}>Logout:</Text>
      <TouchableOpacity style={styles.buttons} onPress={handleSignOut}>
        <MaterialIcons name="logout" size={24} color="black" />
        <Text style={{ margin:5,color: Colors.backgroundColor, fontWeight: "600", fontFamily: "Poppins-SemiBold" }}>{isLoading ? "Signing Out..." : "Sign Out"}</Text>
        {isLoading && <ActivityIndicator size="large" color={Colors.Black} />}
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:"center",
    paddingTop: 50,
    backgroundColor: Colors.White,
    height: "100%",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 200,
    marginBottom: 20,
    marginTop: 30,

  },
  buttons: {
    // backgroundColor: Colors.Primary,
    borderWidth:1,
    height: 50,
    width:50,
    width: '90%',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
    color: Colors.Black,
    borderRadius: 99,
    marginTop: 5,
  },
  name_f: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  email_f: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  name_email: {
    marginRight: 240,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 5,
  },
  text: {
    fontSize: 17,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
  },
  email_t: {
    fontSize: 17,
    fontFamily: "Poppins-Regular",
    fontWeight: "300",

  },
  profile: {
    // fontSize: 30,
    // fontFamily: "Poppins-SemiBold",
    // fontWeight: "600",
    padding: 10, 
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    marginTop: -80,
  },
  dev: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: Colors.Primary,

  }
});
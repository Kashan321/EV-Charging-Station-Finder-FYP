import { View, Text, Image } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useUser } from '@clerk/clerk-expo';

export default function SearchBar({ searchedLocation }) {
  const { user } = useUser();
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      // alignItems: "center",
      justifyContent:"center",
      marginTop: 10,
      paddingHorizontal: 5,
      backgroundColor: Colors.White,
      borderRadius: 30
    }}>
      <Ionicons name="location-sharp" size={24}
        color={Colors.Gray} style={{ paddingTop: 10,marginLeft:5 }} />
      
      <GooglePlacesAutocomplete
        placeholder='Search for nearby stations'
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true

          searchedLocation(details?.geometry?.location)
        }}

        query={{
          key: 'AIzaSyBsR-LGYrOR-u6vUlX7CuHUQz2-qZ9ceyE',
          language: 'en',
        }}

      />
      <Image source={{ uri: user?.imageUrl }}
        style={{ width: 35, height: 35, borderRadius: 99, marginTop:6}}
      />
    </View>
  )
}

//AIzaSyBsR-LGYrOR-u6vUlX7CuHUQz2-qZ9ceyE
// key: 'AIzaSyBsR-LGYrOR-u6vUlX7CuHUQz2-qZ9ceyE',
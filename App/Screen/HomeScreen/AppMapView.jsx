import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from './../../Utils/MapViewStyle.json'
import { UserLocationContext } from '../../Context/UserLocationContext'
import Markers from './Markers'
// import MapViewDirections from 'react-native-maps-directions';
// import GlobalApi from '../../Utils/GlobalApi'
import Global_API from '../../Utils/Global_API'


const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};

export default function AppMapView({placeList}) {

  const {location,setLocation}=useContext(UserLocationContext);
//  console.log("--- ",location);
 
  return (
    <View>
        <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        region={{
          latitude:location?.latitude,
          longitude:location?.longitude,
          latitudeDelta:0.0522,
          longitudeDelta:0.0521 
        }}
        >
     
          {/* User Marker  */}
         <Marker
            coordinate={{
              latitude:location?.latitude,
              longitude:location?.longitude
            }}
          >
            <Image source={require('./../../../assets/Images/car-marker.png')} 
              style={{width:60,height:60}}
            />
          </Marker>

            {/* Place Markers  */}
          {placeList&&placeList.map((item,index)=>(
            <Markers key={index}
            index={index}
            place={item}/>
          ))}
        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
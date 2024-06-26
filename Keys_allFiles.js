//HOME SCREEN

// import { View, Text, StyleSheet } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import AppMapView from './AppMapView'
// import Header from './Header'
// import Colors from '../../Utils/Colors'
// import SearchBar from './SearchBar'
// import { UserLocationContext } from '../../Context/UserLocationContext'
// import Global_API from '../../Utils/Global_API'
// import axios from 'axios';
// import PlaceListView from './PlaceListView'

// axios.interceptors.response.use(function (response) {
//   // console.log('Response:', response.data);
//   return response;
// });


// export default function HomeScreen() {

//   const { location, setLocation } = useContext(UserLocationContext); //getting user loc
//   const [placeList, setPlaceList] = useState([]);
//   useEffect(() => {
//     location && GetNearByPlace();
//   }, [location])
//   // "electric_vehicle_charging_station" 
//   const GetNearByPlace = () => {
//     const data = {
//       includedTypes: ["electric_vehicle_charging_station","gas_station"],
//       maxResultCount: 10,
//       locationRestriction: {
//         circle: {
//           center: {
//             latitude: location?.latitude,
//             longitude: location?.longitude,
//           },
//           radius: 15000
//         }
//       }
//     }

//     Global_API.NewNearByPlace(data)
//       .then(res => {
//         // console.log("***K Res", JSON.stringify(res.data));
//         setPlaceList(res.data?.places);
//       })

//   }
//   return (
//     <View>
//       <View style={styles.header}>
//         <Header />
//         <SearchBar searchedLocation={(location) => setLocation({
//           latitude:location.lat,
//           longitude:location.lng,
//         })} />
//       </View>
//       {placeList && <AppMapView placeList={placeList} />}
//       <View style={styles.Place_list_cont}>
//         {placeList && <PlaceListView placeList={placeList} />}
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   header: {
//     position: 'absolute',
//     zIndex: 10,
//     padding: 7,
//     width: "100%",
//     paddingHorizontal: 20,
//     // backgroundColor:Colors.White_T,
//     marginTop: 0,
//   },
//   Place_list_cont: {
//     position: 'absolute',
//     bottom: 0,
//     zIndex: 10,
//     width: '100%',
//   }
// })




//APP MAP VIEW
// import { View, Text, StyleSheet, Image } from 'react-native'
// import React, { useContext } from 'react'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { Marker } from 'react-native-maps';
// import MapViewStyle from './../../Utils/MapViewStyle.json'
// import { UserLocationContext } from '../../Context/UserLocationContext';
// import Markers from './Markers';


// export default function AppMapView({ placeList }) {
//   // console.log("PLACELIST",placeList);
//   // console.log("(location from AppMapView)", location);

//   const { location, setLocation } = useContext(UserLocationContext);
  
//   return location?.latitude && (
//     <View>
//       <MapView style={styles.map}
//         provider={PROVIDER_GOOGLE}
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         paddingAdjustmentBehavior="automatic"
//         customMapStyle={MapViewStyle}
//         region={{
//           latitude: location?.latitude,
//           longitude: location?.longitude,
//           latitudeDelta: 0.2222,
//           longitudeDelta: 0.2221,
//         }}
//         margin={{top:2}}
//       >
        
//         {location ? <Marker
//           coordinate={{
//             latitude: location?.latitude,
//             longitude: location?.longitude,
//           }}
//         >
//           <Image source={require('./../../../assets/Images/m1.png')}
//             style={{ height: 20, }}
//           />
//         </Marker> : null}
//       </MapView>
//       {/* {placeList && placeList.map((item, index) => {
//         <Markers key={index} place={item} />;
//         //  <Markers key={index}
//         //   place={item}
//         // />
//       })} */}
//       <View>
//         {placeList && placeList.map((item, index) => {
//           <Markers
//             key={index}
//             place={item}
//             index={index}
//           />
//         })}
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// })


// MARKERS 

// import { View, Text, Image } from 'react-native'
// import React from 'react'
// import { Marker } from 'react-native-maps';

// export default function Markers({ index, place }) {
//     console.log("&",place,index);
//   return place && (
//     <Marker
//       coordinate={{
//         latitude: place.location?.latitude,
//         longitude: place.location?.longitude,
//       }}
//       onPress={() => {
//         console.log("Marker pressed", index);
//       }}
//     >
//       <Image source={require('./../../../assets/Images/car_marker.png')}
//         style={{ height: 20 }}
//       />
//     </Marker>
//   )
// }


// place list view

// import { View, Text, FlatList, Dimensions } from 'react-native';
// import React, { useEffect, useRef, useState } from 'react';
// import PlaceItem from './PlaceItem';
// import { getFirestore } from 'firebase/firestore';
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { useUser } from '@clerk/clerk-expo';
// import { app } from '../../Utils/FirebaseConfig';


// export default function PlaceListView({ placeList }) {
//   const flatListRef = useRef(null);
//   const {user}=useUser();
//   const [FavList,SetFavList]=useState([]);

  

//   useEffect(() => {
//     // scrollTOIndex(4);
//   }, []);

//   const scrollTOIndex = (index) => {
//     flatListRef.current?.scrollToIndex({ animated: true, index }); // Corrected "Animation" to "animated"
//   };

//   const getItemLayout = (_, index) => ({
//     length: Dimensions.get('window').width,
//     offset: Dimensions.get('window').width * index,
//     index,
//   });


//   //getting data from firebase
//   const db = getFirestore(app);
  
//   useEffect(()=>{
//     user&&getFavData()
//   },[user])
  
//   const getFavData = async () => {
//     SetFavList([])
//     const q = query(collection(db, "ev-fav-station"), where("email", "==", user?.primaryEmailAddress?.emailAddress));

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       // console.log(doc.id, " => ", doc.data());
//       SetFavList(FavList=>[...FavList,doc.data()]);
//     });
//   }

//   const isFav=(item)=>{
//     if (!item || !item.place || !item.place.id) {
//       console.error("Invalid place object:", item);
//       return false;
//     }
//     const result = FavList.find(item=>item.place.id==place.id);
//     console.log("re", item);
//     return result;
//   }
  

//   return (
//     <View>
//       <FlatList
//         data={placeList}
//         horizontal={true}
//         ref={flatListRef}
//         pagingEnabled
//         getItemLayout={getItemLayout}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item, index }) => (
//           <View key={index}>
//             <PlaceItem place={item} 
//               // isFav={isFav(item)}
//               markedFav={()=>getFavData()}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// }


//place item

// import { View, Text, Image, Dimensions, Pressable, ToastAndroid, Platform, Linking, TouchableOpacity } from 'react-native'
// import React from 'react'
// import Colors from '../../Utils/Colors'
// import Global_API from '../../Utils/Global_API';
// import { FontAwesome6 } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
// import { getFirestore } from "firebase/firestore";
// import { app } from '../../Utils/FirebaseConfig';
// import { doc, setDoc } from "firebase/firestore";
// import { useUser } from '@clerk/clerk-expo';
// import { AntDesign } from '@expo/vector-icons';

// export default function PlaceItem({ place, isFav, markedFav }) {
//     const PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
//     const { user } = useUser();
//     const db = getFirestore(app);
//     const onSetFav = async (place) => {
//         await setDoc(doc(db, "ev-fav-station", (place.id).toString()), {
//             pklace: place,
//             email: user?.primaryEmailAddress?.emailAddress
//         }
//         );
//         markedFav();
//         ToastAndroid.show("Station Added to Fav!!!", ToastAndroid.TOP)
//     }


//     const onDirectionClick = () => {
//         const url = Platform.select({
//             ios: "maps:" + place.location.latitude + "," + place?.location.longitude + "?q=" + place?.formattedAddress,
//             android: "geo:" + place.location.latitude + "," + place?.location.longitude + "?q=" + place?.formattedAddress
//         });
//         // console.log(url);
//         Linking.openURL(url);
//     };
    

//     return (
//         <View style={{
//             width: Dimensions.get('screen').width * 0.9,
//             backgroundColor: Colors.White,
//             margin: 3,
//             borderRadius: 10,
//             // marginBottom: -20,
//             borderWidth: 1,
//             borderColor: Colors.Gray,
//             height: 250,
//             marginLeft: 26,
//             marginRight: 8
//             // display:"flex",
//             // alignItems:"center",
//             // justifyContent:"center"
//         }}>

//             <Pressable
//                 style={{ position: "absolute", zIndex: 10, right: 0, margin: 5 }}
//                 onPress={() => onSetFav(place)}
//             >
//                 {isFav ? <MaterialIcons name="favorite" size={30} color="red" />
//                     : <AntDesign name="hearto" size={24} color="black" />}

//             </Pressable>

//             <Image source={
//                 place?.photos ?
//                     { uri: PHOTO_BASE_URL + place.photos[0].name + "/media?key=" + Global_API.API_KEY + "&maxHeightPx=800&maxWidthPx=1200" }
//                     : require("./../../../assets/Images/login_screen_main.png")
//             }
//                 style={{
//                     height: 130,
//                     width: '100%',
//                     borderRadius: 10,
//                     marginBottom: 0,
//                     borderWidth: 1,
//                 }}
//             />


//             {/* displaying business name and address */}
//             <View style={{ padding: 6, }}>
//                 <Text style={{
//                     fontFamily: 'Poppins-SemiBold',
//                     fontSize: 13,
//                     marginTop: 0,
//                 }}>{place?.displayName.text}</Text>

//                 <Text style={{
//                     color: Colors.Gray,
//                     fontFamily: "Poppins-Regular",
//                     marginTop: -5
//                 }}>{place?.shortFormattedAddress}</Text>

//                 <Text style={{ color: Colors.Gray, fontFamily: "Poppins-SemiBold" }}>Connectors</Text>
//                 <Text style={{
//                     fontFamily: "Poppins-Regular",
//                     fontSize: 13,
//                     marginTop: 0,
//                 }}>{place?.evChargeOptions?.connectorCount} Points</Text>
//                 <TouchableOpacity
//                 onPress={onDirectionClick}
//                 style={{
//                         marginLeft: 270,
//                         marginTop: 70,
//                         position: "absolute",
//                         backgroundColor: Colors.Primary,
//                         borderRadius: 4,
//                         padding: 5,
//                     }} 
//                     >
//                     <FontAwesome6 name="location-arrow" size={24} color="white" />
//                 </TouchableOpacity>


//             </View>
//             <View style={{

//             }}>
//             </View>

//         </View>
//     )
// }


// favorite screen

// import { View, Text, ActivityIndicator, FlatList } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Colors from '../../Utils/Colors'
// import { getFirestore } from 'firebase/firestore';
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { app } from '../../Utils/FirebaseConfig';
// import { useUser } from '@clerk/clerk-expo';
// import PlaceItem from '../HomeScreen/PlaceItem';


// export default function FavoriteScreen() {

//   const db = getFirestore(app);
//   const { user } = useUser();
//   const [FavList, SetFavList] = useState([]);

//   useEffect(() => {
//     user && getFavData();
//   }, [user])

//   const getFavData = async () => {
//     SetFavList([])
//     const q = query(collection(db, "ev-fav-station"), where("email", "==", user?.primaryEmailAddress?.emailAddress));

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       SetFavList(FavList => [...FavList, doc.data()]);
//     });
//   }

//   return (
//     <View>
//       {!FavList ? <View style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", }}>
//         <ActivityIndicator
//           size={"large"}
//           color={Colors.Primary}
//         />
//         <Text style={{ fontFamily: "Poppins-SemiBold", marginTop: 5, }}>Loading...</Text>
//       </View> : null}

//       <FlatList
//         data={FavList}
//         renderItem={({ item, index }) => (
//           <PlaceItem place={item.place}  />
//         )}
//       />
//     </View>
//   )
// }
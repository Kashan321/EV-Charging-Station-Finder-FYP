import { View, Text, Image, Dimensions, Pressable, ToastAndroid, Platform, Linking } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import Global_API from '../../Utils/Global_API';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore } from "firebase/firestore";
import { app } from '../../Utils/FirebaseConfig';
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';


export default function PlaceItem({ place, isFav, markedFav }) {
    const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
    const { user } = useUser();
    const db = getFirestore(app);
    /**
     * Used to save Fav on Click of Heart Icon
     * @param {*} place Place Object
     */
    const onSetFav = async (place) => {
        await setDoc(doc(db, "ev-fav-place", (place.id).toString()), {
            place: place,
            email: user?.primaryEmailAddress?.emailAddress
        }
        );
        markedFav()
        ToastAndroid.show('Favorite Station Added!', ToastAndroid.TOP);
    }

    /**
     * Used to remove Fav from List
     * @param {*} placeId 
     */
    const onRemoveFav = async (placeId) => {
        console.log(placeId)
        await deleteDoc(doc(db, "ev-fav-place", placeId.toString()));
        ToastAndroid.show('Fav Removed!', ToastAndroid.TOP);
        markedFav()
    }

    /**
     * On Direction Click Navigate to Google Map/Apple Map
     */
    const onDirectionClick = () => {
        const url = Platform.select({
            ios: "maps:" + place.location.latitude + "," + place?.location?.longitude + "?q=" + place?.formattedAddress,
            android: "geo:" + place.location.latitude + "," + place?.location?.longitude + "?q=" + place?.formattedAddress,
        });

        Linking.openURL(url);
    }
    return (
        <View
            style={{
                borderRadius: 10,
                width: Dimensions.get('screen').width * 0.9,
                marginHorizontal: 5,
                backgroundColor: Colors.White,
                margin: 1,
                marginBottom:180,
                height: 100,
                marginLeft: 16.5,
                marginRight: 20,

                // backgroundColor: Colors.WHITE,
                // margin: 5,
                // borderRadius: 10,
                // width: Dimensions.get('screen').width * 0.9,
                // marginHorizontal: 20

            }}
        >
            <LinearGradient
                colors={['transparent', '#ffffffff', '#ffffff']}
            >
                {!isFav ? <Pressable style={{
                    position: 'absolute', right: 0,
                    margin: 5,
                }}
                    onPress={() => onSetFav(place)}
                >
                    <Ionicons name="heart-outline" size={30}
                        color="white" />
                </Pressable> :
                    <Pressable style={{
                        position: 'absolute', right: 0,
                        margin: 5
                    }}
                        onPress={() => onRemoveFav(place.id)}
                    >
                        <Ionicons name="heart-sharp" size={30}
                            color="red" />
                    </Pressable>}
                <Image source={
                    place?.photos ?
                        {
                            uri: PLACE_PHOTO_BASE_URL + place?.photos[0]?.name +
                                "/media?key=" + Global_API?.API_KEY + "&maxHeightPx=800&maxWidthPx=1200"
                        }
                        : require('./../../../assets/Images/login_screen_main.png')}
                    style={{
                        width: '100%', borderRadius: 10,
                        height: 120, zIndex: -1
                    }}
                />
                <View style={{ padding: 15 }}>
                    <Text numberOfLines={1} style={{
                        fontSize: 17,
                        fontFamily: 'Poppins-SemiBold'
                    }}>{place.displayName?.text}</Text>
                    <Text style={{
                        color: Colors.Gray,
                        fontFamily: 'Poppins-Regular'
                    }}>{place?.shortFormattedAddress}</Text>
                    <View style={{
                        display: 'flex', flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between', 
                    }}>
                        <View style={{


                        }}>
                            <Text style={{
                                fontFamily: 'Poppins-Regular',
                                color: Colors.Gray,
                                fontSize: 17
                            }}>Connectors</Text>
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 15,
                                marginTop: 2
                            }}>{place?.evChargeOptions?.connectorCount} Points</Text>
                        </View>
                        <Pressable
                            onPress={() => onDirectionClick()}
                            style={{
                                padding: 12, backgroundColor: Colors.Primary,
                                borderRadius: 6, paddingHorizontal: 14
                            }}>
                            <Entypo name="direction" size={24} color="white" />
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}
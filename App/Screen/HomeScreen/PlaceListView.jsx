import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import PlaceItem from './PlaceItem';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';
import { getFirestore } from "firebase/firestore";
import { app } from '../../Utils/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';

export default function PlaceListView({ placeList }) {
  const flatListRef = useRef(null);
  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
  
  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker);
  }, [selectedMarker]);

  useEffect(() => {
    user && getFav();
  }, [user]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index
  });

  const db = getFirestore(app);

  const getFav = async () => {
    setFavList([]);
    const q = query(collection(db, "ev-fav-place"), where("email", "==", user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavList(prevList => [...prevList, doc.data()]);
    });
  };

  const isFav = (place) => {
    const result = favList.find(item => item.place.id === place.id);
    return result ? true : false;
  };

  return (
    <View>
      <FlatList
        data={placeList}
        horizontal={true}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem
              place={item}
              isFav={isFav(item)}
              markedFav={() => getFav()}
            />
          </View>
        )}
      />
    </View>
  );
}

import { View, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppMapView from './AppMapView';
import SearchBar from './SearchBar';
import { UserLocationContext } from '../../Context/UserLocationContext';
import Global_API from '../../Utils/Global_API';
import PlaceListView from './PlaceListView';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';
import Error from './Error'; // Import the Error component

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(0);

  useEffect(() => {
    setSelectedMarker(0);
    location && GetNearByPlace();
  }, [location]);

  /**
   * Used to get Near by place using google place api
   */
  const GetNearByPlace = () => {
    const data = {
      includedTypes: ['electric_vehicle_charging_station'],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 10000.0,
        },
      },
    };
    Global_API.NewNearByPlace(data).then(resp => {
      setPlaceList(resp.data?.places);
    });
  };

  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <View>
        <View style={styles.headerContainer}>
          <SearchBar searchedLocation={location => setLocation({ latitude: location.lat, longitude: location.lng })} />
        </View>
        {!placeList || placeList.length === 0 ? (
          <Error /> // Render the Error component when placeList is empty
        ) : (
          <>
            <AppMapView placeList={placeList} />
            <View style={styles.placeListContainer}>
              <PlaceListView placeList={placeList} />
            </View>
          </>
        )}
      </View>
    </SelectMarkerContext.Provider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  placeListContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
  },
});

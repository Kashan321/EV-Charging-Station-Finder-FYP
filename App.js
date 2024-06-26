import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import * as SecureStore from "expo-secure-store"; // token cache
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo"; //auth
import { NavigationContainer } from '@react-navigation/native'; //navigation
import TabNavigation from './App/Navigatons/TabNavigation'; //navigations
import * as Location from 'expo-location'; //user location
import { UserLocationContext } from './App/Context/UserLocationContext';


SplashScreen.preventAutoHideAsync();

//token cache
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
//end
export default function App() {
  // Font loader start
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('./assets/Fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/Fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/Fonts/Poppins-Bold.ttf'),
  });
  // const [fontsLoaded] = useFonts({
  //   'outfit': require('./assets/Fonts/Outfit-Regular.ttf'),
  //   'outfit-medium': require('./assets/Fonts/Outfit-SemiBold.ttf'),
  //   'outfit-bold': require('./assets/Fonts/Outfit-Bold.ttf'),
  // });
  //Font loader end

  //location
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      // console.log(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  // location end

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={"pk_test_ZGVjZW50LW95c3Rlci02OS5jbGVyay5hY2NvdW50cy5kZXYk"}
    >
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <SignedIn>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
          <StatusBar style="auto" />
        </View>
      </UserLocationContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
  },
});

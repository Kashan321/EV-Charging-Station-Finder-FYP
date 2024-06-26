import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import FavoriteScreen from '../Screen/FavoriteScreen/FavoriteScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../Utils/Colors';


const Tab = createBottomTabNavigator();
export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown:false,
        }}>
            <Tab.Screen name='home' component={HomeScreen} options={{
                tabBarLabel:"search",
                tabBarActiveTintColor:Colors.Primary,
                tabBarIcon:({color,size})=>(
                    <Feather name="search" size={size} color={color} />
                )
            }} />
            <Tab.Screen name='favorite' component={FavoriteScreen} options={{
                 tabBarLabel:"Favorite",
                tabBarActiveTintColor:Colors.Primary,
                tabBarIcon:({color,size})=>(
                    <MaterialIcons name="favorite" size={size} color={color} />
                )
            }} />
            <Tab.Screen name='profile' component={ProfileScreen} options={{
                tabBarLabel:"Profile",
                tabBarActiveTintColor:Colors.Primary,
                tabBarIcon:({color,size})=>(
                    <FontAwesome5 name="user-alt" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}
import React, {Component,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import {StatusBar} from 'react-native';
import List from './Fragments/List';
import Saved from './Fragments/Saved';
import { Ionicons } from '@expo/vector-icons';
import LocalStorage from '../GlobalData/Database';

export default function MainActivity({navigation}){
    const Tab = createBottomTabNavigator();
    useEffect(()=>{
      LocalStorage.initDatabase()
    },[])
    return(
      <View style={[{height: '100%',}]}>
        <StatusBar barStyle="light-content"
        backgroundColor="#8a2be2"/>
        <Tab.Navigator screenOptions={{tabBarActiveTintColor:'#8a2be2',drawUnderTabBar:false,drawUnderTabBar:false}}>
        <Tab.Screen name="Home" component={List} options={{headerShown: false , tabBarIcon:(info)=>{
          return (
            <Ionicons name="home"
            size={info.size}
            color={info.color}/>
          )
        },tabBarLabelStyle:{fontSize:14}}}/>
        <Tab.Screen name="Favourites" component={Saved} options={{headerShown: false ,tabBarIcon:(info)=>{
          return (
            <Ionicons name="star"
            size={info.size}
            color={info.color}/>
          )
        },tabBarLabelStyle:{fontSize:14}
      }}/>
      </Tab.Navigator>
      </View>
    )
}
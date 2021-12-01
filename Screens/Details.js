import { StatusBar } from 'expo-status-bar';
import React, {Component,useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import LocalStorage from '../GlobalData/Database'
export default function Details({navigation,route}){
    const [height,setHeight] = useState(10)
    const [width,setWidth] = useState(20)
    const art= route.params.art
    const [isFavourite,setFavourite] = useState(false)
    Image.getSize(`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`,(width,height)=>{
        setHeight(height);
        setWidth(width);
    },(error)=>null)

    if(LocalStorage.artId.includes(art.id)){
        setFavourite(true)
    }

    const insertData= ({art})=>{
        LocalStorage.insertIntoDatabase({art:art})
        setFavourite(false);
    }

    return(
        <ScrollView contentContainerStyle={[{alignItems:'center'}]}>
            <View style={[{flexDirection:'row',alignSelf:'stretch',justifyContent: 'space-between',backgroundColor:'#8a2be2',paddingTop:10,paddingLeft:8,paddingRight:8,paddingBottom:10}]}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color="white"/>
                </TouchableOpacity>
                <Text style={[{color:'white',fontFamily:'Inter-Bold',fontSize:16}]}>Art Details</Text>
                <TouchableOpacity onPress={()=>{
                    insertData({art:art})
                }}>
                <Entypo name="star-outlined" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={{fontSize:16,marginTop:10,marginHorizontal:10,fontFamily:'Inter-SemiBold',color:'black'}}>{art.title}</Text>
            <Image source={{uri : `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}} style={[{height:((height/width)*Dimensions.get('window').width),width:Dimensions.get('window').width,marginTop:20}]} resizeMode="contain"/>
            <View style={[{flexDirection:'column',justifyContent: 'center',marginHorizontal:20,margin:10,alignItems:'center',borderWidth:1,padding:10,borderColor:'#8a2be2',borderRadius:12,}]}>
                <Text style={[{fontSize:16,fontFamily:'Inter-SemiBold'}]}>By : </Text>
                <Text style={{fontSize:16,fontFamily:'Inter-SemiBold',textAlign:'center',color:'#8a2be2'}}>{art.artist_display}</Text>
            </View>
            <View style={[{flexDirection:'column',justifyContent: 'center',marginHorizontal:20,margin:10,alignItems:'center',borderWidth:1,padding:10,borderColor:'#8a2be2',borderRadius:12,}]}>
                <Text style={[{fontSize:16,fontFamily:'Inter-SemiBold'}]}>Dimensions : </Text>
                <Text style={{fontSize:16,fontFamily:'Inter-SemiBold',color:'#8a2be2',textAlign:'center'}}>{art.dimensions}</Text>
            </View>
            <View style={[{flexDirection:'column',justifyContent: 'center',marginHorizontal:20,margin:10,alignItems:'center',borderWidth:1,padding:10,borderColor:'#8a2be2',borderRadius:12,}]}>
                <Text style={[{fontSize:16,fontFamily:'Inter-SemiBold'}]}>Credit Line : </Text>
                <Text style={{fontSize:16,fontFamily:'Inter-SemiBold',color:'#8a2be2',textAlign:'center'}}>{art.credit_line}</Text>
            </View>
        </ScrollView>
    )
}
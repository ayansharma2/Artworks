import React, {Component,useEffect,useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image } from 'react-native';
import LocalStorage from '../../GlobalData/Database';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
export default function Saved(){
    useEffect(async () =>{
        getArtItems()
    },[])

    const [arts,setArts] = useState([])
    const [isEmpty,setEmpty] = useState(true)
    const getArtItems = async ()=>{
        await LocalStorage.getSavedArtItems()
        setArts(LocalStorage.arts)
        if(LocalStorage.arts.length>0){
            setEmpty(false)
        }
    }
    
    const navigation = useNavigation();
    const renderItem = ({item})=>{
        return(
            <TouchableOpacity onPress={()=>navigation.navigate("Details",{art:item})}>
            <View style={[{flexDirection:'row',alignSelf:'stretch',backgroundColor:'lightgrey',margin:8,padding:8}]}>
                <Image source={{uri : `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}} style={[{height:150,width:"40%"}]}/>
                <View style={[{flexDirection: 'column',marginLeft:10,marginRight:10,width:"59%"}]}>
                    <Text style={[{color: '#8a2be2',fontFamily:'Inter-SemiBold'}]} numerOfLines={2}>{item.title}</Text>
                    <Text style={[{color: '#8a2be2',fontFamily:'Inter-Regular',marginTop: 10}]}>By : {item.artist_title}</Text>
                    <Text style={[{color: '#8a2be2',fontFamily:'Inter-Regular',marginTop: 10}]}>{item.credit_line}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
    return(
        <View style={[{flexDirection: 'column'}]}>
            <View style={[{paddingHorizontal:15,paddingVertical:15,flexDirection:'row',alignItems:'center',backgroundColor:'#8a2be2',justifyContent:'space-between'}]}>
                <View/>
                <Text style={[{position:'absolute',flex:1,left:0,right:0,textAlign:'center',fontFamily:'Inter-ExtraBold',fontSize:18,color:'white'}]}>Art Directory</Text>
                <TouchableOpacity onPress={()=>{getArtItems()}}>
                <Ionicons name="reload" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {   isEmpty
                ?<View style={[{height:'100%',justifyContent: 'center'}]}><Text style={[{fontFamily:'Montserrat-Bold',fontSize:16,color:'#8a2be2',marginHorizontal:10,textAlign:'center'}]}>No Arts Currently. Flag some arts favourite to view them here</Text></View>
                :<FlatList
                data = {arts}
                renderItem = {renderItem}
                keyExtractor = {(item)=>item.id}
                style={[{marginBottom: 87,marginTop:5}]}
                />
            }
        </View>
    )
}
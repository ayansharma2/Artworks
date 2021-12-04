import React, {useEffect,useState,useRef} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as axios from 'axios';
import { StyleSheet, PixelRatio,ActivityIndicator,Text,Keyboard, View,TouchableOpacity, StatusBar, TextInput, FlatList, Image } from 'react-native';
import Snackbar from 'react-native-snackbar';
export default function List({route}){
    const [text, onChangeText] = React.useState("");
    const [arts,onArtsChange] = React.useState([])
    const [searchItems,onSearchItemsChange] = React.useState([])
    const [currentPage,onCurrentPageChange] = useState("Home")
    const inputRef = useRef();
    const [isLoading,setLoading] = useState(false)
    var searchKeys = []
    var controller = new AbortController();
    React.useEffect(()=>{
        fetch('https://api.artic.edu/api/v1/artworks')
        .then((response)=>response.json())
        .then(data=>{
            onArtsChange(data.data)
        })
        
    })
    const [isFocused,setFocused] = useState(false)
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

    const searchArt = async (art)=>{
        onChangeText(art)
        controller.abort()
        controller = new AbortController()
        setLoading(true)
        try{
        const response = await axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${art}&limit=6`,{
            signal: controller.signal
        })
            onSearchItemsChange([])    
            controller.abort()
            controller = new AbortController()
            const arrayResponse = await Promise.all(response.data.data.map(async (item)=>{   
                console.log(item.api_link)
                const response = await axios.get(item.api_link,{
                    signal: controller.signal
                })    
                return response.data.data
            }))
            setLoading(false)
            onSearchItemsChange(arrayResponse)
        }catch(error){
            setLoading(false)
            Snackbar.show({
                text:error.message,
                duration:Snackbar.LENGTH_SHORT,
                backgroundColor:'#8a2be2',
                textColo:'white'
            })
        }

    }
    return(
        <View style={[{flexDirection:'column'}]}>
            <View style={[{backgroundColor:'#8a2be2'}]}>
                <Text style={[{marginLeft:24,fontFamily:'Inter-ExtraBold',fontSize:18,marginTop:6,color:'white'}]}>Art Directory</Text>
                
                <View style={[{marginBottom:8,alignItems:'center',marginEnd:20,marginStart:16,flexDirection:'row',marginTop:8,alignSelf:'stretch'}]}>
                    <View style={[{flexDirection:'row',flex:1,backgroundColor:'white',borderColor:(isFocused ? 'red' :'white'),borderWidth:2,padding:8,borderRadius:20}]}>
                        <TextInput
                        ref={inputRef}
                        style={[{color:'black',flex:1}]}
                        onChangeText={(text)=>{
                            searchArt(text)
                        }}
                        text={text}
                        onFocus={()=>{
                            onCurrentPageChange("Search")
                            setFocused(true)}}
                        onBlur={()=>setFocused(false)}
                        placeholder="Search any art here"
                        />  
                        {(isFocused || currentPage === "Search") && text.trim().length>0 &&<TouchableOpacity onPress={()=>{
                            onChangeText("")
                            inputRef.current.clear();}}>
                            <Entypo name="cross" size={24} color="black" />
                        </TouchableOpacity>}
                    </View>
                    {
                        currentPage === "Search" && <TouchableOpacity onPress={()=>{
                            onCurrentPageChange("Home")
                            onChangeText("")
                            inputRef.current.clear();
                            inputRef.current.blur()}} style={[{marginLeft:9}]}>
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            { currentPage=="Home"
                ?   <FlatList
                data = {arts}
                renderItem = {renderItem}
                keyExtractor = {(item)=>item.id}
                style={[{marginBottom: 87}]}/>
                : (text.length>0 ? (
                    isLoading ?<View style={{flexDirection:'column',margin:20,alignItems: 'center'}}>
                        <ActivityIndicator color={"#8a2be2"} size={'large'}style={{marginTop:25}}/>
                        <Text style={{alignSelf:'stretch',marginHorizontal:10,fontFamily:'Montserrat-Bold',marginTop:20,fontSize:18,textAlign: 'center',color:'#8a2be2'}}>Getting Results</Text>
                    </View> : <FlatList
                    data = {searchItems}
                    renderItem = {renderItem}
                    keyExtractor = {(item)=>item.id}
                    style={[{marginBottom: 87}]}/>
                ) : <Text style={[{marginTop:50,alignSelf:'stretch',marginHorizontal:10,fontFamily:'Montserrat-Bold',fontSize:18,textAlign: 'center',color:'#8a2be2'}]}>Enter Something to get Results</Text>)

            }
        </View>
    )
}
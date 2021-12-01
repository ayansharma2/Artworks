import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, PixelRatio,Text, View,TouchableOpacity, StatusBar, TextInput, FlatList, Image } from 'react-native';
export default function List({route}){
    const [text, onChangeText] = React.useState("Useless Text");
    const [arts,onArtsChange] = React.useState([])
    React.useEffect(()=>{
        fetch('https://api.artic.edu/api/v1/artworks')
        .then((response)=>response.json())
        .then(data=>{
            onArtsChange(data.data)
        })
    })
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
        <View style={[{flexDirection:'column'}]}>
            <View style={[{backgroundColor:'#8a2be2'}]}>
                <Text style={[{marginLeft:16,fontFamily:'Inter-ExtraBold',fontSize:18,marginTop:6,color:'white'}]}>Art Directory</Text>
                <TextInput
                    style={[{color:'black',marginStart:16,marginTop:8,alignSelf:'stretch',backgroundColor:'white',padding:8,marginBottom:8,marginEnd:20,borderRadius:20}]}
                    onChangeText={onChangeText}
                    text={text}
                    placeholder="Search any art here"
                />
            </View>
            <FlatList
                data = {arts}
                renderItem = {renderItem}
                keyExtractor = {(item)=>item.id}
                style={[{marginBottom: 87}]}
            />
        </View>
    )
}
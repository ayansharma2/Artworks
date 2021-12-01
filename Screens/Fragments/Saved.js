import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LocalStorage from '../../GlobalData/Database';

export default function Saved(){
    LocalStorage.getSavedArtItems()
    return(
        <Text>Hello</Text>
    )
}
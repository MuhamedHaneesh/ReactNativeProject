import React from 'react';
import {ActivityIndicator,StyleSheet,Text,View} from 'react-native';


const styles=  StyleSheet.create({
    loadingView:{
        alignItems:"center",
        justifyContent:"center",
        flex:1
    },
    loadigText:{
        color:"#512DA8",
        fontSize:14,
        fontWeight:"bold"
    }
})

export const Loading =() =>{
    return(
        <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#512DA8" />
            <Text style={styles.loadigText}>.......Loading..........</Text>
        </View>
    )
}
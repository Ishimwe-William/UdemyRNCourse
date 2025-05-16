import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Location from 'expo-location'

export default function App() {
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);

        async function getUserLocationHandler() {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            setLocation(location);
        }

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(location)}</Text>
            <Button title={"Get Location"} onPress={getUserLocationHandler}/>
            <StatusBar style="dark"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

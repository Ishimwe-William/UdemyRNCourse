import {StyleSheet, ScrollView, Text, Image, View, useWindowDimensions} from 'react-native';
import OutlinedButton from "../components/ui/OutlinedButton";
import {Colors} from "../constants/colors";
import {useEffect, useState} from "react";
import {fetchPlaceDetails} from "../utils/database";

export default function PlaceDetails({route, navigation}) {
    const selectedPlaceId = route.params.placeId;
    const [fetchedPlace, setFetchedPlace] = useState(null);
    const {height} = useWindowDimensions();

    useEffect(() => {
        async function loadPlaceData() {
            try {
                const place = await fetchPlaceDetails(selectedPlaceId);
                setFetchedPlace(place);
                navigation.setOptions({
                    title: place.title
                })
            } catch (error) {
                console.log(error)
            }
        }

        loadPlaceData()
    }, [selectedPlaceId])

    function showOnMapHandler() {
        navigation.navigate("Map", {
            place: fetchedPlace.location
        })
    }

    if (!fetchedPlace) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>Loading place data...</Text>
            </View>
        );
    }

    const imageStyle = {
        height: height * 0.35,
    }

    return (
        <ScrollView>
            <Image source={{uri: fetchedPlace?.imageUri}} style={[styles.image, imageStyle]}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchedPlace.address}</Text>
                </View>
            </View>
            <OutlinedButton icon={"map"} onPress={showOnMapHandler}>View on Map</OutlinedButton>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        maxHeight: 300,
    },
    locationContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary500,
    }
});

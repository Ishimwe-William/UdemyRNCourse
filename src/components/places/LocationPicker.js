import {StyleSheet, Image, View, Alert, Text} from 'react-native';
import OutlinedButton from "../ui/OutlinedButton";
import {Colors} from "../../constants/colors";
import {PermissionStatus, getCurrentPositionAsync, useForegroundPermissions} from "expo-location";
import {useEffect, useState} from "react";
import {getAddress, getMapPreview} from "../../utils/location";
import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";

export default function LocationPicker({onPickLocation}) {
    const [pickedLocation, setPickedLocation] = useState(null)
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && route.params) {
            setPickedLocation({
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            });
        }
    }, [route, isFocused])

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                try {
                    const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                    onPickLocation({ ...pickedLocation, address });
                } catch (error) {
                    Alert.alert("Failed to get address", "Try picking the location again.");
                }
            }
        }

        handleLocation();
    }, [pickedLocation, onPickLocation]);

    async function verifyPermission() {
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permission", "You need to grant permission to use this app.")
            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) return;

        try {
            const location = await getCurrentPositionAsync();
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            Alert.alert("Could not fetch location", "Please try again or pick on the map.");
        }
    }

    function pickOnMapHandler() {
        navigation.navigate("Map");
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation) {
        locationPreview =
            <Image source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} style={styles.image}/>
    }
    return (
        <View style={styles.container}>
            <View style={[styles.mapPreview, styles.image]}>
                {locationPreview}
            </View>
            <View style={styles.action}>
                <OutlinedButton icon={"location"} onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon={"map"} onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        marginBottom: 26,
    },
    image: {
        width: "100%",
        height: 200,
    },
    mapPreview: {
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    action: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});

import {Alert, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useCallback, useLayoutEffect, useState} from 'react';
import IconButton from '../components/ui/IconButton';
import MapTypesOverlay from '../components/ui/MapTypesOverlay';

// Correct mapViewType values that match react-native-maps expectations
export const mapViewType = ['standard', 'satellite', 'hybrid', 'terrain'];

export default function Map({navigation, route}) {
    const initialLocation = route?.params?.place
        ? {
            lat: route.params.place.lat,
            lng: route.params.place.lng,
        }
        : null;

    const initialRegion = {
        latitude: initialLocation?.lat ?? -1.9640058,
        longitude: initialLocation?.lng ?? 30.0601309,
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0091,
    };

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    const [mapTypeIndex, setMapTypeIndex] = useState(0);
    const [showMapTypeOptions, setShowMapTypeOptions] = useState(false);
    // Add key state to force re-render when map type changes
    const [mapKey, setMapKey] = useState(Date.now());

    function selectMapType(index) {
        setMapTypeIndex(index);
        setMapKey(Date.now());
    }

    const savePickerLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('No location picked!', 'You have to pick a location (by tapping on the map) first!');
            return;
        }
        navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
        });
    }, [navigation, selectedLocation]);

    const toggleMapTypeHandler = useCallback(() => {
        setShowMapTypeOptions((prev) => {
            const newValue = !prev;
            if (newValue) {
                setTimeout(() => {
                    setShowMapTypeOptions(false);
                }, 6000);
            }
            return newValue;
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <View style={{flexDirection: 'row'}}>
                    <IconButton icon="layers" color={tintColor} onPress={toggleMapTypeHandler} size={24}/>
                    {!initialLocation && (
                        <IconButton icon="save" color={tintColor} onPress={savePickerLocationHandler} size={24}/>
                    )}
                </View>
            ),
        });
    }, [navigation, savePickerLocationHandler, toggleMapTypeHandler, initialLocation]);

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({lat, lng});
    }

    return (
        <View style={styles.container}>
            <MapView
                key={mapKey}
                style={styles.map}
                provider={PROVIDER_GOOGLE} // Explicitly use Google Maps provider
                mapType={mapViewType[mapTypeIndex]}
                initialRegion={initialRegion}
                onPress={!initialLocation ? selectLocationHandler : null}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.lat,
                            longitude: selectedLocation.lng,
                        }}
                    />
                )}
            </MapView>

            {showMapTypeOptions && (
                <MapTypesOverlay selectMapType={selectMapType} selectedIndex={mapTypeIndex}/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

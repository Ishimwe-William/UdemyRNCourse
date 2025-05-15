import {StyleSheet, View, Text, FlatList} from 'react-native';
import PlaceItem from "./PlaceItem";
import {Colors} from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";

export default function PlacesList({places}) {
    const navigation = useNavigation();

    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
            </View>
        )
    }

    function selectPlaceHandler(id) {
        navigation.navigate("PlaceDetails", {
            placeId: id
        })
    }

    return (
        <FlatList
            data={places}
            ketExtractor={(item) => item.id}
            renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
            style={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    },
    list: {
        margin: 20,
    }
});

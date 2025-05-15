import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import {Colors} from "../../constants/colors";

export default function PlaceItem({place, onSelect}) {


    return (
        <Pressable onPress={() => onSelect(place.id)} style={({pressed}) => [styles.item, pressed && styles.pressed]}>
            <Image
                source={{uri: place.imageUri}}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        borderRadius: 6,
        marginVertical: 12,
        alignItems: 'flex-start',
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowOpacity: 0.15,
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
    },
    image: {
        flex: 1,
        // width: "10%",
        height: 100,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
    },
    info: {
        flex: 2,
        padding: 12,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: Colors.gray700,
    },
    address: {
        fontSize: 12,
        color: Colors.gray700,
    },
    pressed: {
        opacity: 0.7
    },
});

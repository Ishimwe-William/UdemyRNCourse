import {Pressable, View, Text, StyleSheet, Platform, useWindowDimensions} from "react-native";

export default function CategoryGridTile({title, color, onPress}) {
    const {width} = useWindowDimensions();

    const gridStyle = {
        minWidth: (width / 4) + (width / 8),
        minHeight: width / 3,
    }
    return (
        <View style={[styles.gridItem, gridStyle]}>
            <Pressable onPress={onPress}
                       android_ripple={{color: '#ccc'}}
                       style={({pressed}) => [styles.button, pressed && styles.buttonPressedIoS]}>
                <View
                    style={[styles.innerContainer, {backgroundColor: color}]}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 14,
        elevation: 4,
        shadowOpacity: 0.25,
        shadowColor: '#000',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    button: {
        flex: 1,
    },
    buttonPressedIoS: {
        opacity: 0.5,
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,

        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})

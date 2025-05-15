import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import {mapViewType} from "../../screens/Map";

export default function MapTypesOverlay({ selectMapType, selectedIndex }) {
    return (
        <View style={styles.mapTypeSelector}>
            {mapViewType.map((type, index) => (
                <Pressable
                    key={type}
                    onPress={() => selectMapType(index)}
                    style={({pressed}) => [pressed && styles.pressed]}
                >
                    <Text
                        style={[
                            styles.mapTypeButton,
                            index === selectedIndex && styles.mapTypeButtonActive,
                        ]}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    mapTypeSelector: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 8,
        borderRadius: 8,
        zIndex: 999,
    },
    mapTypeButton: {
        color: 'white',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        fontWeight: 'bold',
    },
    mapTypeButtonActive: {
        backgroundColor: 'white',
        color: Colors.primary500,
    },
    pressed: {
        opacity: 0.7,
    },
});
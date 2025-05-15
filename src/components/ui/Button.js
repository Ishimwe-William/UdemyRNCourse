import {StyleSheet, Text, Pressable} from 'react-native';
import {Colors} from "../../constants/colors";

export default function Button({children, onPress}) {

    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        elevation: 2,
        shadowOpacity: 0.15,
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
        borderRadius: 4,
    },
    pressed: {
        opacity: 0.7
    },
    text: {
        textAlign: "center",
        fontSize: 16,
        color: Colors.primary50,
    },
});

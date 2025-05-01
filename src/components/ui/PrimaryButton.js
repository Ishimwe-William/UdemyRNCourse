import {Pressable, View, Text} from "react-native";
import {StyleSheet} from "react-native";
import {Colors} from "../../utils/colors";

function PrimaryButton({children, onPress}) {

    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </Pressable>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 26,
        margin: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    }
});

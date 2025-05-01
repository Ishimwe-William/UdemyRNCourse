import {View, Text, StyleSheet} from 'react-native'
import {Colors} from "../../utils/colors";

export default function NumberContainer({children}) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accent500,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: 'center',
        minHeight: 50,
        margin: 24,
    },
    numberText: {
        color: Colors.accent500,
        fontSize: 36,
        fontFamily:'open-sans-bold',
    }
});
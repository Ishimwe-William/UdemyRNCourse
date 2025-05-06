import {StyleSheet, Text, View} from "react-native";

export default function Subtitle({children}) {
    return (
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        color: '#efb7b7',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitleContainer: {
        padding: 6,
        borderBottomWidth: 2,
        borderBottomColor: '#efb7b7',
        marginHorizontal: 24,
        marginVertical: 4,
    },
})
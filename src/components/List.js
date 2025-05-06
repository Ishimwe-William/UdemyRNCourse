import {View, StyleSheet, Text} from "react-native";

export default function List({data}) {
    return (
        data.map((dataPoint) => (
            <View key={dataPoint} style={styles.container}>
                <Text style={styles.itemText}>{dataPoint}</Text>
            </View>
        ))
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: '#efb7b7',
    },
    itemText: {
        color: "#701e1e",
        textAlign: "center",
    }
})
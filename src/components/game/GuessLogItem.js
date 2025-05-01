import {StyleSheet, View, Text} from "react-native";
import {Colors} from "../../utils/colors";

export default function GuessLogItem({roundNumber, guess}) {
    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>#{roundNumber}</Text>
            <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    listItem: {
        borderColor: Colors.primary500,
        borderWidth: 1,
        borderRadius: 16,
        padding: 12,
        marginVertical: 5,
        backgroundColor: Colors.accent500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    itemText: {
        fontFamily: 'open-sans'
    }
});
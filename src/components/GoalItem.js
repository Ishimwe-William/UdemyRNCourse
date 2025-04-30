import {Text, View, StyleSheet, Pressable} from "react-native";

function GoalItem(props) {

    return (
        <View style={styles.goalItem}>
            <Pressable
                style={({pressed})=> pressed && (styles.pressedItem)}
                android_ripple={{color: "#dddddd"}}
                onPress={() => props.onDeleteItem(props.id)}
            >
                <Text style={styles.goalItemText}>{props.text}</Text>
            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    goalItem: {
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#5e0acc',
    },
    pressedItem:{
        opacity: 0.5,
    },
    goalItemText: {
        color: '#fff',
        padding: 8,
    }
})

export default GoalItem

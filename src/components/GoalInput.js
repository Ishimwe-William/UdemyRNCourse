import {Button, TextInput, Image, View, StyleSheet, Modal} from "react-native";
import {useState} from "react";

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
    }

    function addGoalHandler() {
        props.onAddGoal(enteredGoalText)
        setEnteredGoalText('')
    }

    return (
        <Modal
            visible={props.visible}
            animationType={"slide"}
        >
            <View style={styles.container}>
                <Image source={require('../../assets/adaptive-icon.png')}
                       style={styles.image}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Your course goal"}
                        onChangeText={goalInputHandler}
                        value={enteredGoalText}
                        numberOfLines={1}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View>
                        <Button title={"Add Goal"} onPress={addGoalHandler}/>
                    </View>
                    <View style={styles.button}>
                        <Button title={"Cancel"} color={'red'}  onPress={props.onToggleShow}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        paddingBottom: 14,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#b1cfef',
        backgroundColor:'#b1cfef',
        width: '90%',
        padding: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#9b88b0',
    },
    button: {
        marginHorizontal: 10,
        width: '25%',
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
    }
})

export default GoalInput;
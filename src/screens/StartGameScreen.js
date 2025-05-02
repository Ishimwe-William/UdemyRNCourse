import {TextInput, Alert, View, StyleSheet, ScrollView, KeyboardAvoidingView} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import LabelText from "../components/ui/LabelText";

function StartGameScreen({onPickNumber}) {
    const [enterNumber, setEnteredNumber] = useState('')

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText)
    }

    function resetInputHandler() {
        setEnteredNumber('')
    }

    function confirmInputHandler() {

        const chosenNumber = parseInt(enterNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{
                text: 'Okay', style: 'destructive', onPress: resetInputHandler
            }])
            return;
        }
        onPickNumber(chosenNumber);
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior={"position"}>
                <View style={styles.rootContainer}>
                    <Title>Guess My number</Title>
                    <Card>
                        <LabelText>Enter a number</LabelText>
                        <TextInput
                            maxLength={2}
                            keyboardType={'numeric'}
                            style={styles.textInput}
                            value={enterNumber}
                            onChangeText={numberInputHandler}
                        />
                        {/*Buttons */}
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginVertical: 70,
        alignItems: 'center',
    },
    textInput: {
        width: 50,
        fontSize: 34,
        borderBottomColor: '#dab432',
        color: '#dab432',
        borderBottomWidth: 2,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: "row",
    },
});
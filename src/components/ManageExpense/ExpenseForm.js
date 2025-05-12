import {View, Text, StyleSheet} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../ui/Button";
import {getFormattedDate} from "../../utils/date";
import {GlobalStyles} from "../../constants/styles";

export default function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {value: defaultValues?.amount?.toString() ?? '', isValid: true},
        date: {value: defaultValues?.date ? getFormattedDate(defaultValues.date) : '', isValid: true},
        description: {value: defaultValues?.description ?? '', isValid: true}
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = !isNaN(expenseData.date.getTime()); // Valid date returns a timestamp
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert("Invalid Input", "Please check your input values");
            setInputs((curInputs) => {
                return {
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid},
                }
            })
            return;
        }
        onSubmit(expenseData)
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label={"Amount"}
                    invalid={!inputs.amount.isValid}
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: (text) => inputChangeHandler('amount', text),
                        value: inputs.amount.value

                    }}
                />
                <Input
                    style={styles.rowInput}
                    label={"Date"}
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: (text) => inputChangeHandler('date', text),
                        value: inputs.date.value
                    }}/>
            </View>
            <Input
                label={"Description"}
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: (text) => inputChangeHandler('description', text),
                    value: inputs.description.value
                }}
            />
            {formIsInvalid && <Text style={styles.errorText}>Invalid Data! Check entered data</Text>}
            <View style={styles.buttonContainer}>
                <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 10,
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: 'white',
        marginVertical: 24,
        textAlign: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
    }
})
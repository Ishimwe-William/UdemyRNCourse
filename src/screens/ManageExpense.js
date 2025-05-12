import {View, StyleSheet} from "react-native";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import Button from "../components/ui/Button";
import {ExpensesContext} from "../store/expenses-context";

export default function ManageExpense({route, navigation}) {
    const editedExpenseId = route.params?.expenseId;
    const expenseCtx = useContext(ExpensesContext);

    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditing])

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    }

    function cancelExpenseHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId,
                {description: 'else', amount: 23.4, date: new Date('2022-06-20')})
        } else {
            expenseCtx.addExpense(
                {description: 'else', amount: 23.4, date: new Date('2022-06-20')})
        }

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button mode={'flat'} onPress={cancelExpenseHandler} style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : "Add"}</Button>
            </View>
            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon={"trash"}
                        color={GlobalStyles.colors.error500}
                        size={32}
                        onPress={deleteExpenseHandler}/>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopColor: GlobalStyles.colors.primary200,
        borderTopWidth: 2,
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    }
})
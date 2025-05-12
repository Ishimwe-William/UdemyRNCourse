import {View, StyleSheet} from "react-native";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function ManageExpense({route, navigation}) {
    const editedExpenseId = route.params?.expenseId;
    const expenseCtx = useContext(ExpensesContext);

    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId)

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

    function confirmHandler(expenseData) {
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId, expenseData)
        } else {
            expenseCtx.addExpense(expenseData)
        }

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                defaultValues={selectedExpense}
                onSubmit={confirmHandler}
                onCancel={cancelExpenseHandler}
                submitButtonLabel={isEditing ? "Update" : "Add"}/>

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
})
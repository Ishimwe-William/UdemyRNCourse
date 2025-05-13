import {View, StyleSheet, Alert} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense} from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

export default function ManageExpense({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('')

    const editedExpenseId = route.params?.expenseId;
    const expenseCtx = useContext(ExpensesContext);

    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this expense?',
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        setIsSubmitting(true);
                        try {
                            await deleteExpense(editedExpenseId);
                            expenseCtx.deleteExpense(editedExpenseId);
                            navigation.goBack();
                        } catch (e) {
                            setError("Could not delete expense - please try again later!");
                            setIsSubmitting(false);
                        }
                    },
                },
            ]
        );
    }

    function cancelExpenseHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                await updateExpense(editedExpenseId, expenseData);
                expenseCtx.updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({...expenseData, id: id})
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save data - please try again later!')
            setIsSubmitting(false)
        }
    }

    function errorHandler() {
        setError('');
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if (isEditing && !selectedExpense) {
        return <ErrorOverlay message="Could not find the expense." onConfirm={errorHandler}/>
    }

    if (isSubmitting) {
        return <LoadingOverlay/>
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
import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";

export default function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext)
    return (
        <ExpensesOutput
            fallbackText={"No registered expenses found"}
            expenses={expensesCtx.expenses}
                        expensesPeriod={"Total"}/>
    )
}

const styles = StyleSheet.create({})
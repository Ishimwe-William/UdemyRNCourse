import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../utils/date";

export default function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext)
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)
        return expense.date > date7DaysAgo && expense.date <= today;
    })

    return (
        <ExpensesOutput
            fallbackText={"No expenses in 7 days found"}

            expenses={recentExpenses} expensesPeriod={"Last 7 days"}/>
    )
}


const styles = StyleSheet.create({})
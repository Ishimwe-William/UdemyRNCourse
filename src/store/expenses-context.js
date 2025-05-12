import {createContext, useReducer} from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'a pair of shoes',
        amount: 19.45,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'a pair of shirt',
        amount: 50.45,
        date: new Date('2026-12-21')
    },
    {
        id: 'e3',
        description: 'bananas',
        amount: 1.45,
        date: new Date('2022-11-12')
    },
    {
        id: 'e4',
        description: 'a pair of shirt',
        amount: 50.45,
        date: new Date('2026-12-21')
    },
    {
        id: 'e5',
        description: 'bananas',
        amount: 1.45,
        date: new Date('2022-11-12')
    },
    {
        id: 'e6',
        description: 'a pair of shirt',
        amount: 50.45,
        date: new Date('2026-12-21')
    },
    {
        id: 'e7',
        description: 'bananas',
        amount: 1.45,
        date: new Date('2022-11-12')
    },
    {
        id: 'e8',
        description: 'a pair of shirt',
        amount: 50.45,
        date: new Date('2026-12-21')
    },
    {
        id: 'e9',
        description: 'bananas',
        amount: 1.45,
        date: new Date('2022-11-12')
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {
    },
    deleteExpense: (id) => {
    },
    updateExpense: (id, {description, amount, date}) => {
    }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state]
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload.id)
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        default:
            return state;
    }
}

export default function ExpensesContextProvider({children}) {
    const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: { id } });
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };
    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}
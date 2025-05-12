import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ManageExpense from "./src/screens/ManageExpense";
import RecentExpenses from "./src/screens/RecentExpenses";
import AllExpenses from "./src/screens/AllExpenses";
import {Ionicons} from "@expo/vector-icons"
import {GlobalStyles} from "./src/constants/styles";
import IconButton from "./src/components/ui/IconButton";
import ExpensesContextProvider from "./src/store/expenses-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
    return (
        <BottomTabs.Navigator screenOptions={({navigation}) => ({
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500,},
            headerTintColor: 'white',
            tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
            tabBarActiveTintColor: GlobalStyles.colors.accent50,
            headerRight: ({tintColor}) => <IconButton
                icon={"add"}
                size={24}
                color={tintColor}
                onPress={() => {
                    navigation.navigate("ManageExpense")
                }}/>
        })}>
            <BottomTabs.Screen
                name={"RecentExpenses"}
                component={RecentExpenses}
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({color, size, focused}) =>
                        <Ionicons
                            name={focused ? "hourglass" : "hourglass-outline"}
                            color={color}
                            size={size}/>
                }}
            />
            <BottomTabs.Screen
                name={"AllExpenses"}
                component={AllExpenses}
                options={{
                    title: "All Expenses",
                    tabBarLabel: "All Expenses",
                    tabBarIcon: ({color, size, focused}) =>
                        <Ionicons
                            name={focused ? "calendar" : "calendar-outline"}
                            color={color}
                            size={size}/>
                }}
            />
        </BottomTabs.Navigator>
    )
}

export default function App() {
    return (
        <>
            <StatusBar style="light"/>
            <ExpensesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={"ExpensesOverview"}
                        screenOptions={{
                            headerStyle: {backgroundColor: GlobalStyles.colors.primary500,},
                            headerTintColor: 'white',
                        }}
                    >
                        <Stack.Screen
                            name={"ManageExpense"}
                            s component={ManageExpense}
                            options={{
                                presentation: "modal"
                            }}/>
                        <Stack.Screen name={"ExpensesOverview"} component={ExpensesOverview} options={{
                            headerShown: false,
                        }}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </ExpensesContextProvider>
        </>
    );
}
import {StatusBar} from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from "@react-navigation/native";
import MealOverviewScreen from "./src/screens/MealOverviewScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import MealDetailScreen from "./src/screens/MealDetailScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import FavoritesContextProvider from "./src/store/context/favorites-context";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: '#701e1e'},
                headerTintColor: 'white',
                contentStyle: {backgroundColor: "#bb7171"},
                drawerContentStyle: {
                    backgroundColor: '#701e1e',
                },
                drawerInactiveTintColor: "#ccc",
                drawerActiveTintColor: "#721212",
                drawerActiveBackgroundColor: '#ffb0b0'
            }}>
            <Drawer.Screen
                name={"Categories"}
                component={CategoriesScreen}
                options={{
                    title: 'All Categories',
                    drawerIcon: ({color, size}) => <Ionicons name={"list-outline"} size={size} color={color}/>
                }}
            />
            <Drawer.Screen
                name={"Favorites"}
                component={FavoritesScreen}
                options={{
                    drawerIcon: ({color, size}) => <Ionicons name={"star-outline"} size={size} color={color}/>
                }}
            />
        </Drawer.Navigator>
    )
}

export default function App() {
    return (
        <>
            <FavoritesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={"MealsCategories"}
                                     screenOptions={{
                                         headerStyle: {backgroundColor: '#701e1e'},
                                         headerTintColor: 'white',
                                         contentStyle: {backgroundColor: "#bb7171"}
                                     }}
                    >
                        <Stack.Screen
                            name="MealsCategories"
                            component={DrawerNavigator}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="MealsOverview"
                            component={MealOverviewScreen}
                        />
                        <Stack.Screen
                            name="MealDetail"
                            component={MealDetailScreen}
                            options={{
                                title: "About the Meal"
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </FavoritesContextProvider>
            <StatusBar style="light"/>
        </>
    );
}

import {StatusBar} from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import MealOverviewScreen from "./src/screens/MealOverviewScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import MealDetailScreen from "./src/screens/MealDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
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
                        component={CategoriesScreen}
                        options={{title: 'Meals Categories'}}
                    />
                    <Stack.Screen
                        name="MealsOverview"
                        component={MealOverviewScreen}
                        // options={({route, navigation}) => {
                        //     const catId = route.params.categoryId
                        //     return {
                        //         title: catId,
                        //     }
                        // }}
                    />
                    <Stack.Screen
                        name="MealDetail"
                        component={MealDetailScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="light"/>
        </>
    );
}

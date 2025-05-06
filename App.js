import {NavigationContainer} from "@react-navigation/native"
// import {createDrawerNavigator} from "@react-navigation/drawer";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import UserScreen from "./src/screens/UserScreen";
import {Ionicons} from "@expo/vector-icons"
import {StatusBar} from "expo-status-bar";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const BottomTabNavigator = createBottomTabNavigator();

export default function App() {
    return (
        <>
            {/*<StatusBar style={"light"}/>*/}
            <NavigationContainer>
                <BottomTabNavigator.Navigator screenOptions={{
                    headerStyle: {backgroundColor: "#152544"},
                    headerTintColor: 'white',
                    tabBarActiveTintColor: '#152544',

                }}>
                    <BottomTabNavigator.Screen
                        name={"Welcome"}
                        component={WelcomeScreen}
                        options={{
                            tabBarIcon: ({color, size}) => <Ionicons name={"home"} size={size} color={color}/>
                        }}
                    />
                    <BottomTabNavigator.Screen
                        name={"User"}
                        component={UserScreen}
                        options={{
                            tabBarIcon: ({color, size}) => <Ionicons name={"person"} size={size} color={color}/>
                        }}
                    />
                </BottomTabNavigator.Navigator>
            </NavigationContainer>
        </>
    )
}

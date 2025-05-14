import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import {View} from "react-native"
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import {Colors} from './src/constants/styles';
import AuthContextProvider, {AuthContext} from "./src/store/auth-context";
import {useCallback, useContext, useEffect, useState} from "react";
import IconButton from "./src/components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: Colors.primary500},
                headerTintColor: 'white',
                contentStyle: {backgroundColor: Colors.primary100},
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    const authCtx = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: Colors.primary500},
                headerTintColor: 'white',
                contentStyle: {backgroundColor: Colors.primary100},
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerRight: ({tintColor}) =>
                        <IconButton
                            icon={"exit"}
                            size={24}
                            color={tintColor}
                            onPress={authCtx.logout}
                        />

                }}
            />
        </Stack.Navigator>
    );
}

function Navigation() {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            {authCtx.isAuthenticated ? <AuthenticatedStack/> : <AuthStack/>}
        </NavigationContainer>
    );
}

function Root() {
    const [appIsReady, setAppIsReady] = useState(false);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function fetchToken() {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                if (storedToken) {
                    authCtx.authenticate(storedToken)
                }
            } catch (error) {
                console.warn(error)
            } finally {
                setAppIsReady(true);
            }
        }

        fetchToken();
    }, [])

    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
            SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Navigation />
        </View>
    );
}

export default function App() {

    return (
        <>
            <StatusBar style="light"/>
            <AuthContextProvider>
                <Root/>
            </AuthContextProvider>
        </>
    );
}
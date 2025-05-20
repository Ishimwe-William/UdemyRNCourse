import {StatusBar} from 'expo-status-bar';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import {useCallback, useEffect, useState} from "react";

import IconButton from "./src/components/ui/IconButton";
import {Colors} from "./src/constants/colors";

import PlaceDetails from "./src/screens/PlaceDetails";
import Map from "./src/screens/Map";
import AllPlaces from "./src/screens/AllPlaces";
import AddPlace from "./src/screens/AddPlace";
import {init} from "./src/utils/database";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await init();
            } catch (error) {
                console.warn("Database init failed:", error);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
            SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{flex: 1}} onLayout={onLayoutRootView}>
            <StatusBar style="auto"/>
            <Text>Hello</Text>
            {/*
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {backgroundColor: Colors.primary500},
                        headerTintColor: Colors.gray700,
                        contentStyle: {backgroundColor: Colors.gray700}
                    }}
                >
                    <Stack.Screen
                        name={"AllPlaces"}
                        component={AllPlaces}
                        options={({navigation}) => ({
                                title: "Your Favorite Places",
                                headerRight: ({tintColor}) => <IconButton
                                    icon={'add'}
                                    color={tintColor}
                                    size={24} onPress={() => navigation.navigate("AddPlace")}/>
                            }
                        )}
                    />
                    <Stack.Screen
                        name={"AddPlace"}
                        component={AddPlace}
                        options={{
                            title: "Add a new Place"
                        }}
                    />
                    <Stack.Screen name={"Map"} component={Map}
                                  options={{
                                      title: "Map"
                                  }}
                    />
                    <Stack.Screen name={"PlaceDetails"} component={PlaceDetails}
                                  options={{
                                      title: "Loading Place..."
                                  }}
                    />
                </Stack.Navigator>
            </NavigationContainer>

            */}
        </View>
    );
}

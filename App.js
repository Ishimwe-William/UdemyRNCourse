import {StatusBar} from 'expo-status-bar';
import StartGameScreen from "./src/screens/StartGameScreen";
import {StyleSheet, ImageBackground} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {useState, useCallback} from "react";
import GameScreen from "./src/screens/GameScreen";
import {SafeAreaView} from "react-native-safe-area-context";
import GameOverScreen from "./src/screens/GameOverScreen";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0)

    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

    if (userNumber) screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
    if (gameIsOver && userNumber) screen =
        <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}/>;

    function gameOverHandler(numberOfRounds) {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds)
    }

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }

    function startNewGameHandler() {
        setUserNumber(null)
        setGuessRounds(0)
    }

    return (
        <LinearGradient colors={['#260213', '#dda501']} style={styles.rootScreen}>
            <StatusBar style="light"/>
            <ImageBackground
                source={require('./assets/maxresdefault.jpg')}
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.rootScreen} onLayout={onLayoutRootView}>
                    {screen}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});

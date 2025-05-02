import {StyleSheet, FlatList, Alert, View} from "react-native";
import Title from "../components/ui/Title";
import {useEffect, useState} from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import LabelText from "../components/ui/LabelText";
import {Ionicons} from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

let minBoundary = 1;
let maxBoundary = 100;

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

export default function GameScreen({userNumber, onGameOver}) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie", "You know that this is wrong...!", [
                {text: "Sorry", style: "cancel"},
            ]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        const newRndNumber = generateRandomBetween(
            minBoundary,
            maxBoundary,
            currentGuess
        );
        setCurrentGuess(newRndNumber);
        setGuessRounds(prev => [newRndNumber, ...prev]);
    }

    const guessRoundsListLength = guessRounds.length;

    return (
        <View style={styles.screen}>
            <FlatList
                data={guessRounds}
                keyExtractor={(item) => item.toString()}
                renderItem={({item, index}) => (
                    <GuessLogItem
                        roundNumber={guessRoundsListLength - index}
                        guess={item}
                    />
                )}
                ListHeaderComponent={
                    <>
                        <Title>Opponent's Guess</Title>
                        <NumberContainer>{currentGuess}</NumberContainer>
                        <Card>
                            <LabelText style={styles.labelText}>Higher or lower</LabelText>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                                    <Ionicons name={'remove'} size={24}/>
                                </PrimaryButton>
                                <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                                    <Ionicons name={'add'} size={24}/>
                                </PrimaryButton>
                            </View>
                        </Card>
                    </>
                }
                contentContainerStyle={{paddingBottom: 100}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    labelText: {
        fontWeight: '300',
        fontSize: 18,
    },
    listContainer: {
        flex: 1, // Makes the list expand and scroll
        padding: 16,
        marginTop: 16,
    },
});

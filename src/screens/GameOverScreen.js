import {StyleSheet, Text, ScrollView, Image, View, useWindowDimensions} from "react-native";
import Title from "../components/ui/Title";
import {Colors} from "../utils/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {
    const {width, height} = useWindowDimensions();
    let imageSize = 300;

    if (width > height) imageSize = 80

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }
    return (
        <ScrollView>
            <View style={styles.rootContainer}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/success.png')}/>
                </View>
                <Text style={styles.summaryText}>Your phone needed <Text
                    style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text
                    style={styles.highlight}>{userNumber}</Text>.</Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        borderRadius: 120,
        width: 240,
        height: 240,
        borderWidth: 3,
        borderColor: Colors.primary500,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: 'center',
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    }
});
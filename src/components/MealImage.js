import {Image, StyleSheet} from "react-native";

export default function MealImage({imageUrl}){
    return(
        <Image
            source={{uri: imageUrl}}
            style={styles.image}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
    }
})
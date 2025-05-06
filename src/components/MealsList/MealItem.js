import {Text, View, StyleSheet, Pressable, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MealDetails from "../MealDetails";
import MealImage from "../MealImage";

export default function MealItem({id, title, imageUrl, duration, complexity, affordability}) {
    const navigation = useNavigation();

    function selectMealItemHandler() {
        navigation.navigate('MealDetail', {
            mealId: id
        });
    }

    return (
        <View style={styles.mealItem}>
            <Pressable
                onPress={selectMealItemHandler}
                android_ripple={{color: '#ccc'}}
            >
                <View>
                    <MealImage imageUrl={imageUrl}/>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <MealDetails duration={duration} complexity={complexity} affordability={affordability}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: 8,
    },
    mealItem: {
        margin: 18,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 4,
        shadowOpacity: 0.25,
        shadowColor: '#000',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
})
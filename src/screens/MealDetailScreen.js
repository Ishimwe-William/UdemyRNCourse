import {View, StyleSheet, Text, ScrollView, Alert} from "react-native";
import {MEALS} from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import MealImage from "../components/MealImage";
import Subtitle from "../components/Subtitle";
import List from "../components/List";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/IconButton";
import {FavoritesContext} from "../store/context/favorites-context";

export default function MealOverviewScreen({route, navigation}) {
    const mealId = route.params.mealId;
    const favoriteMealsCtx = useContext(FavoritesContext);

    const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
            favoriteMealsCtx.removeFavorite(mealId)
        } else {
            favoriteMealsCtx.addFavorite(mealId)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton onPress={changeFavoriteStatusHandler} icon={mealIsFavorite ? 'star' : 'star-outline'}
                                color={'white'}/>
                )
            }
        })
    }, [navigation, changeFavoriteStatusHandler])

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    return (
        <ScrollView style={styles.container}>
            <MealImage imageUrl={selectedMeal.imageUrl}/>
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listContainer}>
                <Subtitle>Ingredients</Subtitle>
                <List data={selectedMeal.ingredients}/>
                <Subtitle>Steps</Subtitle>
                <List data={selectedMeal.steps}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 8,
        textAlign: "center",
        color: 'white',
    },
    detailText: {
        color: "white",
    },
    listContainer: {
        width: '90%',
        alignSelf: 'center',
    }
})
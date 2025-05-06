import {View, StyleSheet, Text, ScrollView} from "react-native";
import {MEALS} from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import MealImage from "../components/MealImage";
import Subtitle from "../components/Subtitle";
import List from "../components/List";
import {
    // useContext,
    useLayoutEffect
} from "react";
import IconButton from "../components/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {addFavorite, removeFavorite} from "../store/redux/favorites";
// import {FavoritesContext} from "../store/context/favorites-context";

export default function MealOverviewScreen({route, navigation}) {
    const mealId = route.params.mealId;
    // const favoriteMealsCtx = useContext(FavoritesContext);
    // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    const dispatch = useDispatch();
    const mealIsFavorite = favoriteMealIds.includes(mealId);

    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
            dispatch(removeFavorite({id: mealId}))
            // favoriteMealsCtx.removeFavorite(mealId)
        } else {
            dispatch(addFavorite({id: mealId}))
            // favoriteMealsCtx.addFavorite(mealId)
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
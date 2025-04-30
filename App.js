import {useState} from 'react';
import {StyleSheet, View, FlatList, Button} from 'react-native';
import GoalItem from "./src/components/GoalItem";
import GoalInput from "./src/components/GoalInput";
import {StatusBar} from "expo-status-bar";

export default function App() {
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [courseGoals, setCourseGoals] = useState([]);

    function toggleAddGoalHandler() {
        setModalIsVisible(!modalIsVisible);
    }

    function addGoalHandler(enteredGoalText) {
        setCourseGoals((currentCourseGoals) => [
            ...currentCourseGoals,
            {text: enteredGoalText, id: Date.now().toString()}
        ])
        toggleAddGoalHandler();
    }

    function deleteGoalHandler(id) {
        setCourseGoals(currentCourseGoals => {
            return currentCourseGoals.filter((goal) => goal.id !== id)
        })
    }

    return (
        <>
            <StatusBar style={'light'}/>
        <View style={styles.appContainer}>
            <Button title={'Add New Goal'} color={'#5e0acc'} onPress={toggleAddGoalHandler}/>

            <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onToggleShow={toggleAddGoalHandler}/>

            <View style={styles.goalsContainer}>
                <FlatList
                    data={courseGoals}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => (
                        <GoalItem
                            text={itemData.item.text}
                            onDeleteItem={deleteGoalHandler}
                            id={itemData.item.id}
                        />
                    )}
                />
            </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    goalsContainer: {
        flex: 4,
    },
});

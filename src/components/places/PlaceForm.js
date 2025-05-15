import {StyleSheet, ScrollView, TextInput, Text, View} from 'react-native';
import {useCallback, useState} from "react";
import {Colors} from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import {Place} from "../../models/place";

export default function PlaceForm({onCreatePlace}) {
    const [enteredTitle, setEnteredTitle] = useState("")
    const [pickedLocation, setPickedLocation] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)

    }, [])

    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation,)
        onCreatePlace(placeData);
    }

    return (
        <ScrollView style={styles.form}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={enteredTitle}
                />
            </View>
            <ImagePicker onTakeImage={takeImageHandler}/>
            <LocationPicker onPickLocation={pickLocationHandler}/>
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 24,
    },
    form: {
        flex: 1,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary700,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
});

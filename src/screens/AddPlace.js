import PlaceForm from "../components/places/PlaceForm";
import {insertPlace} from "../utils/database";

export default function AddPlace({navigation}) {

    async function createPlaceHandler(place) {
        try {
            await insertPlace(place)
        } catch (error) {
            console.log(error)
        } finally {
            navigation.navigate("AllPlaces")
        }
    }

    return (
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    );
}

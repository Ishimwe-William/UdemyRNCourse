import PlacesList from "../components/places/PlacesList";
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {fetchPlaces} from "../utils/database";

export default function AllPlaces() {
    const [loadedPlaces, setLoadedPlaces] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadPlaces() {
            const places = await fetchPlaces();
            setLoadedPlaces(places)
        }

        if (isFocused) {
            loadPlaces();
        }
    }, [isFocused])


    return (
        <PlacesList places={loadedPlaces} />
    );
}

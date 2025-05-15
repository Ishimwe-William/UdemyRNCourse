import {fetch} from "expo/fetch";

const GOOGLE_API_KEY = process.env.PUBLIC_EXPO_GOOGLE_API_KEY;

export function getMapPreview(lat, lng) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
}

export async function getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch address!");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No address found for the given coordinates.");
    }

    return data.results[0].formatted_address;
}

import {Alert, Image, Text, View, StyleSheet,} from "react-native"
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from "expo-image-picker";
import {useState} from "react";
import {Colors} from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

export default function ImagePicker({onTakeImage}) {
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState(null)

    async function verifyPermission() {
        if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permission", "You need to grant permission to use this app.")
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermission();

        if (!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setImageUri(image.assets[0].uri)
        onTakeImage(image.assets[0].uri)
    }

    let imagePreview = <Text>No image taken yet.</Text>

    if (imageUri) {
        imagePreview = <Image source={{uri: imageUri}} style={styles.image}/>
    }
    return (
        <View style={styles.container}>
            <View style={[styles.imagePreview, styles.image]}>{imagePreview}</View>
            <OutlinedButton icon={"camera"} onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
    },
    image: {
        width: "100%",
        height: 200,
    },
    imagePreview: {
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
        textAlign: "center",
    }

});

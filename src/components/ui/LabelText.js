import {StyleSheet, Text} from "react-native";
import {Colors} from "../../utils/colors";

export default function LabelText({children, style}) {
    return (
        <Text style={[styles.labelText, style]}>{children}</Text>

    )
}

const styles = StyleSheet.create({
    labelText: {
        color: Colors.accent500,
        fontSize: 24,
        fontFamily:'open-sans',
    }
});
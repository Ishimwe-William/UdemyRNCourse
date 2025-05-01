import {StyleSheet, Text} from "react-native";
import {Colors} from "../../utils/colors";

export default function Title({children}){
    return(
        <Text style={styles.title}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily:'open-sans-bold',
        fontSize: 24,
        minHeight: 60,
        color: Colors.accent500,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: 8,
    }
});
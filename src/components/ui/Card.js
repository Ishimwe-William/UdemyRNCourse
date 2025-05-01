import {View, StyleSheet} from 'react-native'

export default function Card({children}) {
    return (
        <View style={styles.card}>{children}</View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        marginTop: 16,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#641c30',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        alignItems: 'center',
    },
})
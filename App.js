import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Notifications from 'expo-notifications';
import {useEffect} from "react";

// First, set the handler that will cause the notification
// to show the alert
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldShowAlert: true,
    }),
});


export default function App() {

    useEffect(() => {
        const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
            console.log('NOTIFICATION RECEIVED');
            console.log(notification);
            const username = notification.request.content.data.userName;
            console.log(username);
        })

        const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log('NOTIFICATION RESPONSE RECEIVED');
            console.log(response);
            const username = response.notification.request.content.data.userName;
            console.log(username);
        })

        return () => {
            subscription1.remove();
            subscription2.remove();
        }
    }, [])

    async function scheduleNotificationHandler() {
        // Second, call scheduleNotificationAsync()
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Look at that notification',
                body: "I'm so proud of myself!",
                data: {userName: "Bunsen"},
                badge: 1,
            },
            trigger: {
                seconds: 5,
            },
        });
    }

    return (
        <View style={styles.container}>
            <Text>Hello World!</Text>
            <Button title="Schedule Notification" onPress={scheduleNotificationHandler}/>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

import {useState, useEffect, useRef} from 'react';
import {Text, View, Button, Platform, Alert} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {StatusBar} from "expo-status-bar";

// Set global notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(null);
    const [channels, setChannels] = useState([]);

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) setExpoPushToken(token);
        });

        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(setChannels);
        }

        // Listeners
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('📩 Notification received:', notification);
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('👆 Notification tapped:', response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: 'Here is the notification body',
                data: {userName: 'Bunsen'},
            },
            trigger: {seconds: 2},
        });
    }

    function sendPushNotificationHandler() {
        fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            Headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(
                {
                    "to": `${expoPushToken}`,
                    "title": "Test - sent from device",
                    "body": "Hello World Bunsen",
                    "data": {"userName": "Bunsen"}
                }
            )
        })
    }

    return (
        <>
            <StatusBar style={'dark'}/>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                <Text>Expo Push Token:</Text>
                <Text selectable>{expoPushToken}</Text>

                {notification && (
                    <View style={{marginVertical: 20}}>
                        <Text>Title: {notification.request.content.title}</Text>
                        <Text>Body: {notification.request.content.body}</Text>
                        <Text>Data: {JSON.stringify(notification.request.content.data)}</Text>
                    </View>
                )}

                <Button title="Schedule Notification" onPress={schedulePushNotification}/>
                <Button title="Send Push Notification" onPress={sendPushNotificationHandler}/>
            </View>
        </>
    );
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('myNotificationChannel', {
            name: 'Default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Permission required', 'Push notifications need permission to work.');
            return;
        }

        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

            if (!projectId) throw new Error('Project ID not found');

            token = (await Notifications.getExpoPushTokenAsync({projectId})).data;
            console.log('📱 Expo Push Token:', token);
        } catch (err) {
            console.error('❌ Error getting token:', err);
        }
    } else {
        Alert.alert('Physical device required', 'Must use physical device for push notifications');
    }

    return token;
}

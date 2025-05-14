import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: "",
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
});

export default function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState('');

    async function authenticate(token) {
        setAuthToken(token);
        try {
            await AsyncStorage.setItem("token", token);
        } catch (err) {
            console.warn("Failed to store token", err);
        }
    }

    async function logout() {
        setAuthToken('');
        try {
            await AsyncStorage.removeItem("token");
        } catch (err) {
            console.warn("Failed to remove token", err);
        }
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

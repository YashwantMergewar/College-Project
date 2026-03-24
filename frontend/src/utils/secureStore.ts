import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN = "accessToken"
const REFRESH_TOKEN = "refreshToken"
const setToken = async (access: string, refresh: string ) => {
    try {
        await SecureStore.setItemAsync(ACCESS_TOKEN, access);
        await SecureStore.setItemAsync(REFRESH_TOKEN, refresh);
    } catch (error) {
        console.log("Error while setting token", error);
    }
}

const getAccessToken = async () => {
    try {
        return await SecureStore.getItemAsync(ACCESS_TOKEN);
    } catch (error) {
        console.log("Error while getting token", error);
    }
}

const getRefreshToken = async () => {
    try {
        return await SecureStore.getItemAsync(REFRESH_TOKEN);
    } catch (error) {
        console.log("Error while getting token", error);
    }
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN);
    } catch (error) {
        console.log("Error while removing token", error);
    }
}

export { setToken, getAccessToken, getRefreshToken, removeToken };
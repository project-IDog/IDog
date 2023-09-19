import React, { useRef, useState, useEffect } from "react";
import { AppState, Text, View, Button } from "react-native";
import IndexStore from "../stores/IndexStore";
import * as SecureStore from "expo-secure-store";

const CurrentAppState = () => {
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);
	const { LoginStore } = IndexStore();

	useEffect(() => {
		const subscription = AppState.addEventListener("change", (nextAppState) => {
			if (appState.current.match(/background/) && nextAppState === "active") {
				secureStorageToStore();
			} else if (
				appState.current.match(/active/) &&
				nextAppState === "background"
			) {
				storeToSecureStorage();
			}
			appState.current = nextAppState;
			setAppStateVisible(appState.current);
		});

		return () => {
			subscription.remove();
		};
	}, []);

	const secureStorageToStore = async () => {
		const loginStoreData = await SecureStore.getItemAsync("loginStoreData");
		if (loginStoreData) {
			const parsedData = JSON.parse(loginStoreData);
			Object.assign(LoginStore, parsedData);
		}
	};

	const storeToSecureStorage = async () => {
		await SecureStore.setItemAsync(
			"loginStoreData",
			JSON.stringify(LoginStore),
		);
	};

	return (
		<View>
			<Text>Current state is: {appStateVisible}</Text>
		</View>
	);
};

export default CurrentAppState;

import React, { useRef, useEffect } from "react";
import { AppState } from "react-native";
import IndexStore from "../stores/IndexStore";
import * as SecureStore from "expo-secure-store";

const CurrentAppState = () => {
	const appState = useRef(AppState.currentState);
	const stores = IndexStore();

	useEffect(() => {
		secureStorageToStore();
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
		});

		return () => {
			subscription.remove();
		};
	}, []);

	const secureStorageToStore = async () => {
		for (let key in stores) {
			const storeData = await SecureStore.getItemAsync(key);
			if (storeData) {
				const parsedData = JSON.parse(storeData);
				Object.assign(stores[key], parsedData);
			}
		}
	};

	const storeToSecureStorage = async () => {
		for (let key in stores) {
			await SecureStore.setItemAsync(key, JSON.stringify(stores[key]));
		}
	};

	return null;
};

export default CurrentAppState;

import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	NativeModules,
	DeviceEventEmitter,
	AppState,
} from "react-native";
import * as SecureStore from "expo-secure-store";

const { StopWatchModule } = NativeModules;

const WidgetText = () => {
	const [widgetData, setWidgetData] = useState<number>(0);
	const [appWidgetId, setAppWidgetId] = useState<string | null>(null);
	const [appState, setAppState] = useState<string>(AppState.currentState);

	useEffect(() => {
		fetchStoredAppWidgetId();
		const listener = DeviceEventEmitter.addListener(
			"onAppWidgetUpdate",
			async (data: { appWidgetId: string }) => {
				setAppWidgetId(data.appWidgetId);
				await SecureStore.setItemAsync("appWidgetId", data.appWidgetId);
			},
		);

		const subscription = AppState.addEventListener(
			"change",
			handleAppStateChange,
		);

		return () => {
			if (listener) {
				listener.remove();
			}
			if (subscription) {
				subscription.remove();
			}
		};
	}, []);

	useEffect(() => {
		getWidgetData();
	}, [appWidgetId, appState]);

	const handleAppStateChange = (nextAppState: string) => {
		if (appState.match(/background/) && nextAppState === "active") {
			getWidgetData();
		}
		setAppState(nextAppState);
	};

	const fetchStoredAppWidgetId = async () => {
		const storedId = await SecureStore.getItemAsync("appWidgetId");
		if (storedId) {
			setAppWidgetId(storedId);
		}
	};

	const getWidgetData = async () => {
		if (appWidgetId) {
			const widgetData = await StopWatchModule.getNumber(Number(appWidgetId));
			console.warn(
				"appWidgetId : ",
				appWidgetId + " widgetData : ",
				widgetData,
			);
			setWidgetData(widgetData);
		} else {
			console.warn("AppWidgetId is not yet available.");
		}
	};

	const increaseBy1 = async () => {
		if (appWidgetId) {
			const updatedNumber = await StopWatchModule.updateNumber(
				Number(appWidgetId),
				1,
			);
			setWidgetData(updatedNumber);
		}
	};

	const increaseBy10 = async () => {
		if (appWidgetId) {
			const updatedNumber = await StopWatchModule.updateNumber(
				Number(appWidgetId),
				10,
			);
			setWidgetData(updatedNumber);
		}
	};

	const resetNumber = async () => {
		if (appWidgetId) {
			const updatedNumber = await StopWatchModule.updateNumber(
				Number(appWidgetId),
				-widgetData,
			);
			setWidgetData(updatedNumber);
		}
	};

	return (
		<View>
			<Text>{widgetData}</Text>
			<Button
				title="get widget data"
				onPress={() => getWidgetData()}
				disabled={!appWidgetId}
			/>
			<Text>{appWidgetId}</Text>
			<Text>Current state</Text>
			<Button title="increase by 1" onPress={() => increaseBy1()} />
			<Button title="increase by 10" onPress={() => increaseBy10()} />
			<Button title="reset" onPress={() => resetNumber()} />
		</View>
	);
};

export default WidgetText;

import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NativeModules, DeviceEventEmitter } from "react-native";
import * as SecureStore from "expo-secure-store";

const { StopWatchModule } = NativeModules;

const WidgetText = () => {
	const [widgetData, setWidgetData] = React.useState<number>(0);
	const [appWidgetId, setAppWidgetId] = React.useState<String | null>(null);

	useEffect(() => {
		fetchStoredAppWidgetId();
		const listener = DeviceEventEmitter.addListener(
			"onAppWidgetUpdate",
			async (data) => {
				setAppWidgetId(data.appWidgetId);
				await SecureStore.setItemAsync(
					"appWidgetId",
					data.appWidgetId.toString(),
				);
			},
		);
		return () => {
			if (listener) {
				listener.remove();
			}
		};
	}, []);

	useEffect(() => {
		getWidgetData();
	}, [appWidgetId]);

	const fetchStoredAppWidgetId = async () => {
		const storedId = await SecureStore.getItemAsync("appWidgetId");
		if (storedId) {
			setAppWidgetId(storedId);
		}
	};

	const getWidgetData = async () => {
		if (appWidgetId) {
			const widgetData = await StopWatchModule.getNumber(Number(appWidgetId));
			setWidgetData(widgetData);
			console.log("widgetData : ", widgetData);
			console.log("widgetId : ", appWidgetId);
		}
	};

	const playTimer = () => {
		if (appWidgetId) {
			StopWatchModule.playTimer(Number(appWidgetId));
		}
	};

	const stopTimer = () => {
		if (appWidgetId) {
			StopWatchModule.stopTimer(Number(appWidgetId));
		}
	};

	const resetTimer = () => {
		if (appWidgetId) {
			StopWatchModule.resetTimer(Number(appWidgetId));
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
			<Button title="Play" onPress={playTimer} />
			<Button title="Stop" onPress={stopTimer} />
			<Button title="Reset" onPress={resetTimer} />
		</View>
	);
};

export default WidgetText;

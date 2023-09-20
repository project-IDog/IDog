import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NativeModules, DeviceEventEmitter } from "react-native";
import * as SecureStore from "expo-secure-store";

const { StopWatchModule } = NativeModules;

const WidgetText = () => {
	const [widgetData, setWidgetData] = React.useState<String | null>(null);
	const [appWidgetId, setAppWidgetId] = React.useState<String | null>(null);

	useEffect(() => {
		const fetchStoredAppWidgetId = async () => {
			const storedId = await SecureStore.getItemAsync("appWidgetId");
			if (storedId) {
				setAppWidgetId(storedId);
			}
		};

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
		</View>
	);
};

export default WidgetText;

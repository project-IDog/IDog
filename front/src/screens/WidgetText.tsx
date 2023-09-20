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

import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NativeModules, DeviceEventEmitter } from "react-native";

const { StopWatchModule } = NativeModules;

const WidgetText = () => {
	const [widgetData, setWidgetData] = React.useState<number>(0);

	useEffect(() => {
		getWidgetData();
		const listener = DeviceEventEmitter.addListener(
			"onAppWidgetUpdate",
			async () => {
				getWidgetData();
			},
		);
		return () => {
			if (listener) {
				listener.remove();
			}
		};
	}, []);

	const getWidgetData = async () => {
		const widgetData = await StopWatchModule.getNumber();
		setWidgetData(widgetData);
		console.log("widgetData : ", widgetData);
	};

	const playTimer = () => {
		StopWatchModule.playTimer();
	};

	const stopTimer = () => {
		StopWatchModule.stopTimer();
	};

	const resetTimer = () => {
		StopWatchModule.resetTimer();
	};

	return (
		<View>
			<Text>{widgetData}</Text>
			<Button title="get widget data" onPress={() => getWidgetData()} />
			<Text>Current state</Text>
			<Button title="Play" onPress={playTimer} />
			<Button title="Stop" onPress={stopTimer} />
			<Button title="Reset" onPress={resetTimer} />
		</View>
	);
};

export default WidgetText;

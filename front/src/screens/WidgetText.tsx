import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { NativeModules, DeviceEventEmitter } from "react-native";
import WalkLayout from "../styles/walkLayout";
import TimerImg from "../../assets/images/timer.png";
const { StopWatchModule } = NativeModules;

const WidgetText = () => {
	const [widgetData, setWidgetData] = useState("0:00:00");
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentDate, setCurrentDate] = useState("");

	useEffect(() => {
		getWidgetData();
		const listener = DeviceEventEmitter.addListener(
			"onAppWidgetUpdate",
			async () => {
				getWidgetData();
			},
		);
		console.log("listener : ", listener);
		return () => {
			if (listener) {
				listener.remove();
			}
		};
	}, []);

	const getWidgetData = async () => {
		const widgetData = await StopWatchModule.getNumber();
		const strCurrentDate = await StopWatchModule.getDate();
		setWidgetData(widgetData);
		setCurrentDate(strCurrentDate);
		console.log("widgetData : ", widgetData);
		console.log("strCurrentDate : ", strCurrentDate);
	};

	const playTimer = () => {
		StopWatchModule.playTimer();
		setIsPlaying(true);
	};

	const stopTimer = () => {
		StopWatchModule.stopTimer();
		setIsPlaying(false);
	};

	const resetTimer = () => {
		console.log("widgetData : ", widgetData);
		console.log("strCurrentDate : ", currentDate);
		StopWatchModule.resetTimer();
		setWidgetData("0:00:00");
		setIsPlaying(false);
	};

	return (
		<View style={WalkLayout.contentWrap}>
			<Text style={WalkLayout.todayTimerTitle}>오늘의 산책시간</Text>
			<View style={WalkLayout.timer}>
				<Image source={TimerImg} style={WalkLayout.timerImg} />
				<Text style={WalkLayout.timerText}>{widgetData}</Text>
			</View>

			<View style={WalkLayout.todayTimerButtonWrap}>
				{!isPlaying ? (
					<TouchableOpacity activeOpacity={0.7} onPress={playTimer}>
						<View style={WalkLayout.startButton}>
							<Text style={WalkLayout.startButtonText}>산책 시작</Text>
						</View>
					</TouchableOpacity>
				) : (
					<TouchableOpacity activeOpacity={0.7} onPress={stopTimer}>
						<View style={WalkLayout.stopButton}>
							<Text style={WalkLayout.stopButtonText}>일시 정지</Text>
						</View>
					</TouchableOpacity>
				)}

				<TouchableOpacity activeOpacity={0.7} onPress={resetTimer}>
					<View style={WalkLayout.finishButton}>
						<Text style={WalkLayout.finishButtonText}>산책 종료</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default WidgetText;

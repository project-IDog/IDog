import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";
import BG1 from "../../assets/images/BG1.png";

import React, { useRef } from "react";
import {
	Animated,
	View,
	StyleSheet,
	PanResponder,
	Text,
	Image,
} from "react-native";
import { transform } from "@babel/core";

const App = () => {
	const pan = useRef(new Animated.ValueXY()).current;

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
			onPanResponderRelease: () => {
				pan.extractOffset();
			},
		}),
	).current;

	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>Drag this box!</Text>
			<Animated.View
				style={{
					transform: [{ translateX: pan.x }, { translateY: pan.y }],
				}}
				{...panResponder.panHandlers}
			>
				<Image source={BG1} style={[styles.bg1]} />
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	titleText: {
		fontSize: 14,
		lineHeight: 24,
		fontWeight: "bold",
	},
	bg1: {
		zIndex: -1,
		transform: [
			// { rotate: "45deg" }, // 45도 회전
			{ scale: 0.5 }, // 1.5배 확대
			// { translateY: 50 }, // 50 픽셀 아래로 이동
		],
		resizeMode: "cover",
	},
});

export default App;

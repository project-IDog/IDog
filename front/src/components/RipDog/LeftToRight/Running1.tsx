import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import animationDog from "../../../../assets/animation_runningman.json";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
	const animationProgress = useRef(new Animated.Value(0));
	const translateXValue = useRef(new Animated.Value(450)); // 초기 위치: 오른쪽

	useEffect(() => {
		const loopedAnimation = Animated.loop(
			Animated.timing(animationProgress.current, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true,
			}),
		);
		loopedAnimation.start();
		translateXValue.current.setValue(400); // 초기 위치: 오른쪽

		Animated.timing(translateXValue.current, {
			toValue: -400, // 종료 위치: 왼쪽
			duration: 8000, // 이동하는 데 걸리는 시간
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<AnimatedLottieView
				source={animationDog}
				progress={animationProgress.current}
				style={[
					styles.doggie,
					{
						transform: [{ translateX: translateXValue.current }],
					},
				]}
				loop={true}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	doggie: {
		zIndex: 7,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		height: "50%",
		width: 200,
		top: 200,
	},
});

import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import animationDog from "../../../assets/animation_Bg.json";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
	const animationProgress = useRef(new Animated.Value(0));
	useEffect(() => {
		const loopedAnimation = Animated.loop(
			Animated.timing(animationProgress.current, {
				toValue: 1,
				duration: 10000,
				easing: Easing.linear,
				useNativeDriver: false,
			}),
		);
		loopedAnimation.start();
	}, []);

	return (
		<>
			<AnimatedLottieView
				source={animationDog}
				progress={animationProgress.current}
				style={styles.doggie}
				loop={true}
			/>
		</>
	);
}
const styles = StyleSheet.create({
	doggie: {
		zIndex: -1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		height: "150%",
		width: "100%",
		bottom: -100,
		right: 0,
	},
});

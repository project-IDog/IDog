import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import animationDog from "../../../assets/animation-Doggie.json";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
	const animationProgress = useRef(new Animated.Value(0));
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
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		height: "100%",
		width: 300,
		top: 0,
	},
});

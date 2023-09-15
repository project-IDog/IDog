import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import animationDog from "../../../assets/animation_Dog3.json";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
	const animationProgress = useRef(new Animated.Value(0));
	useEffect(() => {
		const loopedAnimation = Animated.loop(
			Animated.timing(animationProgress.current, {
				toValue: 1,
				duration: 1000,
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
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		height: "50%",
		width: 150,
		bottom: 0,
	},
});

import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import animationDog from "../../../assets/animation_Dog4.json";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
	const animationProgress = useRef(new Animated.Value(0));
	useEffect(() => {
		const loopedAnimation = Animated.loop(
			Animated.timing(animationProgress.current, {
				toValue: 1,
				duration: 2000,
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
		height: "100%",
		width: 200,
		bottom: 200,
		right: 0,
	},
});

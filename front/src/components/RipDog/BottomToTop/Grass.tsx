import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import animationDog from "../../../../assets/animation_grass1.json";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
	const animationProgress = useRef(new Animated.Value(0));

	useEffect(() => {
		const loopedAnimation = Animated.loop(
			Animated.timing(animationProgress.current, {
				toValue: 1,
				duration: 8000,
				easing: Easing.linear,
				useNativeDriver: true,
			}),
		);
		loopedAnimation.start();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<AnimatedLottieView
				source={animationDog}
				progress={animationProgress.current}
				style={styles.doggie}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	doggie: {
		zIndex: -1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		height: "100%",
		width: 100,
		top: -50,
		left: 0,
	},
});

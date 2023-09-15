import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import animationDog from "../../../../assets/animation_building.json";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
	const animationProgress = useRef(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(animationProgress.current, {
			toValue: 0.5,
			duration: 8000,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
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
		width: 600,
		top: -530,
		left: -250,
	},
});

import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import animationDog from "../../../../assets/animation_cloud.json";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ControllingAnimationProgress() {
	const animationProgress = useRef(new Animated.Value(0));


	useEffect(() => {
		const loopedAnimation = Animated.loop(
			Animated.timing(animationProgress.current, {
				toValue: 1,
				duration: 20000,
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
				style={[
					styles.doggie
				]}
				loop={true}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	doggie: { 
		zIndex: 7,
		position: "absolute",
		height: "100%",
		width: "150%",
		top: 0,
	},
});

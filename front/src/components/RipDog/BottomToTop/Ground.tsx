import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View, Image } from "react-native";

import animationDog from "../../../../assets/images/Rip/ground.png";

export default function ControllingAnimationProgress() {
	const translateYValue = useRef(new Animated.Value(400)); // 초기 위치: 아래쪽

	useEffect(() => {
		Animated.timing(translateYValue.current, {
			toValue: 100, // 종료 위치: 위쪽
			duration: 100, // 이동하는 데 걸리는 시간
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<Animated.Image
				source={animationDog}
				style={[
					styles.doggie,
					{
						transform: [{ translateY: translateYValue.current }],
					},
				]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	doggie: {
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		height: 200,
		width: "100%",
		top: -50,
	},
});

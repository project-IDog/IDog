import React, { useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import {
	Animated,
	Easing,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

type TestProps = {
	isSkipped: boolean;
	setIsSkipped?: any;
};

const Test: React.FC<TestProps> = ({ isSkipped, setIsSkipped }) => {
	const ani1Opacity = useRef(new Animated.Value(0)).current;
	const ani2Opacity = useRef(new Animated.Value(0)).current;
	const ani3Opacity = useRef(new Animated.Value(0)).current;
	const ani4Opacity = useRef(new Animated.Value(0)).current;
	const textOpacity = useRef(new Animated.Value(0)).current;

	const showLottieAnimation = (
		aniOpacity: Animated.Value,
		nextAniFunction?: () => void,
	) => {
		Animated.sequence([
			Animated.timing(aniOpacity, {
				toValue: 1,
				duration: 500,
				easing: Easing.linear,
				useNativeDriver: true,
			}),
			Animated.timing(aniOpacity, {
				toValue: 0,
				duration: 500,
				easing: Easing.linear,
				delay: 1000,
				useNativeDriver: true,
			}),
		]).start(() => {
			if (nextAniFunction) {
				nextAniFunction();
			}
		});
	};

	//Text 애니메이션
	const showTextAnimation = () => {
		Animated.timing(textOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start(() => {
			setTimeout(() => {
				Animated.timing(textOpacity, {
					toValue: 0,
					duration: 1000,
					useNativeDriver: true,
				}).start();
			}, 6000);
		});
	};

	const startAnimations = () => {
		showTextAnimation();
		showLottieAnimation(ani1Opacity, () => {
			showLottieAnimation(ani2Opacity, () => {
				showLottieAnimation(ani3Opacity, () => {
					showLottieAnimation(ani4Opacity);
				});
			});
		});
	};

	useEffect(() => {
		startAnimations();
	}, []);

	useEffect(() => {
		if (isSkipped) {
			Animated.parallel([
				Animated.timing(ani1Opacity, {
					toValue: 0,
					duration: 0,
					useNativeDriver: true,
				}),
				Animated.timing(ani2Opacity, {
					toValue: 0,
					duration: 0,
					useNativeDriver: true,
				}),
				Animated.timing(ani3Opacity, {
					toValue: 0,
					duration: 0,
					useNativeDriver: true,
				}),
				Animated.timing(ani4Opacity, {
					toValue: 0,
					duration: 0,
					useNativeDriver: true,
				}),
				Animated.timing(textOpacity, {
					toValue: 0,
					duration: 0,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [isSkipped]);


	return (
		<>
			<Animated.View style={[styles.animateText, { opacity: textOpacity }]}>
				<Text style={[styles.aniText]}>
					여러분과의 추억을 기릴 수 있습니다.
				</Text>
				<TouchableOpacity
					style={[styles.skip]}
					onPress={() => setIsSkipped(true)}
				>
					<Text style={[styles.skipText]}>SKIP</Text>
				</TouchableOpacity>
			</Animated.View>

			<Animated.View style={[styles.centered, { opacity: ani1Opacity }]}>
				<LottieView
					source={require("../../assets/ani1.json")}
					autoPlay
					loop={true}
				/>
			</Animated.View>

			<Animated.View style={[styles.centered, { opacity: ani2Opacity }]}>
				<LottieView
					source={require("../../assets/ani2.json")}
					autoPlay
					loop={true}
				/>
			</Animated.View>

			<Animated.View style={[styles.centered, { opacity: ani3Opacity }]}>
				<LottieView
					source={require("../../assets/ani3.json")}
					autoPlay
					loop={true}
				/>
			</Animated.View>

			<Animated.View style={[styles.centered, { opacity: ani4Opacity }]}>
				<LottieView
					source={require("../../assets/ani4.json")}
					autoPlay
					loop={true}
				/>
			</Animated.View>
		</>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: 150,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: 50,
		height: 300,
	},
	animateText: {
		zIndex: 2,
		top: 185,
		left: 0,
		right: 0,
		bottom: 0,
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
	},
	aniText: {
		fontSize: 18,
		color: "black",
	},
	fullScreenCentered: {
		zIndex: 2,
		position: "absolute",
		top: 20,
		left: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	imageStyle: {
		zIndex: 5, // zIndex 값을 변경합니다.
		width: 415,
		position: "absolute",
		top: -80,
		justifyContent: "center",
		alignItems: "center",
	},
	views: {
		justifyContent: "center",
		alignItems: "center",
		top: 200,
		width: 200,
		textAlign: "center",
		backgroundColor: "red",
	},
	skip: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#EE8A72",
		margin: 20,
		paddingHorizontal: responsiveHeight(4),
		paddingVertical: responsiveWidth(2),
		borderRadius: 30,
	},
	skipText: {
		color: "white",
		fontSize: 20,
	},
});

export default Test;

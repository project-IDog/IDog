import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	View,
	Text,
	StyleSheet,
	ViewStyle,
	Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";
import DogHeavenLayout from "../styles/DogHeavenLayout";
import Hill from "../../assets/Hill.json";
import runningDog1 from "../../assets/runningDog1.json";
import runningDog2 from "../../assets/runningDog2.json";
import runningDog3 from "../../assets/runningDog3.json";
import RightDog from "../../assets/RightDog.json";
4;
import cloud from "../../assets/cloud.json";

const { width } = Dimensions.get("window");

interface RunningDogProps {
	style: ViewStyle;
	source: any;
	height?: number;
}

const RunningDog: React.FC<RunningDogProps> = ({ style, source, height }) => (
	<LottieView
		source={source}
		style={[style, { height: height ?? "auto", zIndex: 5 }]}
		autoPlay
		speed={3}
		loop={true}
		resizeMode="cover"
	/>
);

const Main: React.FC = () => {
	const [isAnimationStarted, setIsAnimationStarted] = useState(false);
	const progress = useRef(new Animated.Value(0)).current;
	const progress2 = useRef(new Animated.Value(0)).current;
	const dogPosition1 = useRef(new Animated.Value(400)).current;
	const dogPosition2 = useRef(new Animated.Value(-400)).current;
	const dogPosition3 = useRef(new Animated.Value(400)).current;
	const cloudPosition1 = useRef(new Animated.Value(100)).current;

	const dogStyles = [
		DogHeavenLayout.runningDog1,
		DogHeavenLayout.runningDog2,
		DogHeavenLayout.runningDog3,
		DogHeavenLayout.runningDog4,
		DogHeavenLayout.runningDog5,
		DogHeavenLayout.runningDog6,
		DogHeavenLayout.runningDog7,
		DogHeavenLayout.runningDog8,
		DogHeavenLayout.runningDog9,
		DogHeavenLayout.runningDog10,
		DogHeavenLayout.runningDog11,
	];

	const CloudStyles = [
		DogHeavenLayout.cloud2,
		DogHeavenLayout.cloud3,
		DogHeavenLayout.cloud4,
		DogHeavenLayout.cloud5,
		DogHeavenLayout.cloud6,
		DogHeavenLayout.cloud7,
		DogHeavenLayout.cloud8,
		DogHeavenLayout.cloud9,
		DogHeavenLayout.cloud10,
		DogHeavenLayout.cloud11,
	];

	useEffect(() => {
		if (!isAnimationStarted) {
			setIsAnimationStarted(true);

			const animationSequence = Animated.sequence([
				Animated.delay(3000),
				Animated.timing(progress, {
					toValue: 0.2,
					duration: 3000, // Adjust as needed.
					useNativeDriver: true,
				}),
				Animated.delay(2000), // Pause for 1 second
				Animated.timing(progress, {
					toValue: 0.5,
					duration: 2000, // Adjust as needed.
					useNativeDriver: true,
				}),
			]);
			animationSequence.start();
		}

		Animated.timing(dogPosition1, {
			toValue: -width,
			duration: 4000,
			useNativeDriver: true,
		}).start();
		Animated.sequence([
			Animated.delay(4000),
			Animated.timing(dogPosition2, {
				toValue: width,
				duration: 3000,
				useNativeDriver: true,
			}),
		]).start();
		Animated.sequence([
			Animated.delay(8000),
			Animated.timing(dogPosition3, {
				toValue: 100,
				duration: 3000,
				useNativeDriver: true,
			}),
			Animated.delay(1000),
			Animated.timing(dogPosition3, {
				toValue: 400,
				duration: 2000,
				useNativeDriver: true,
			}),
		]).start();
	}, [isAnimationStarted]);

	return (
		<>
			<LottieView
				style={[DogHeavenLayout.hill]}
				source={Hill}
				progress={progress}
				loop={false}
				resizeMode="cover"
			/>
			{/* <LottieView
				source={runningDog3}
				style={[
					{
						zIndex: 3,
						width: 100,
						height: 100,
						position: "absolute",
						top: 200,
						bottom: 0,
						left: 100,
						right: 0,
					},
				]}
				autoPlay
				speed={2}
				loop={true}
				resizeMode="cover"
			/> */}
			<Animated.View
				style={{
					position: "absolute",
					transform: [{ translateX: dogPosition1 }],
					zIndex: 2,
				}}
			>
				<LottieView
					source={runningDog2}
					style={[DogHeavenLayout.runningDog22, { zIndex: 5 }]}
					autoPlay
					speed={2}
					loop={true}
					resizeMode="cover"
				/>
			</Animated.View>
			<Animated.View
				style={{
					position: "absolute",
					transform: [{ translateX: dogPosition1 }],
					zIndex: 2,
				}}
			>
				{dogStyles.map((style, index) => (
					<RunningDog
						key={index}
						style={style}
						source={runningDog1}
						height={100}
					/>
				))}
			</Animated.View>
			<Animated.View
				style={{
					position: "absolute",
					transform: [{ translateX: dogPosition2 }],
					zIndex: 2,
				}}
			>
				{dogStyles.map((style, index) => (
					<RunningDog
						key={index}
						style={style}
						source={runningDog3}
						height={150}
					/>
				))}
			</Animated.View>
			<Animated.View
				style={{
					position: "absolute",
					transform: [{ translateX: dogPosition3 }],
					zIndex: 2,
				}}
			>
				<LottieView
					source={RightDog}
					style={[
						{
							zIndex: 4,
							width: 100,
							height: 400,
							position: "absolute",
							top: 50,
							bottom: 0,
							left: 100,
							right: 0,
						},
					]}
					autoPlay
					speed={2}
					loop={true}
					resizeMode="cover"
				/>
			</Animated.View>
			<Animated.View
				style={{
					position: "absolute",
					transform: [{ translateX: cloudPosition1 }],
				}}
			>
				{CloudStyles.map((style, index) => (
					<LottieView
						key={index}
						source={cloud}
						style={[style]}
						autoPlay
						speed={0.5}
						loop={true}
						resizeMode="cover"
					/>
				))}
			</Animated.View>
		</>
	);
};

export default Main;

import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	View,
	StyleSheet,
	ViewStyle,
	Dimensions,
	Image,
} from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

import LottieView from "lottie-react-native";
import DogHeavenLayout from "../styles/DogHeavenLayout";
import Hill from "../../assets/Hill.json";
import runningDog1 from "../../assets/runningDog1.json";
import runningDog2 from "../../assets/runningDog2.json";
import runningDog3 from "../../assets/runningDog3.json";
import RightDog from "../../assets/RightDog.json";
import cloud from "../../assets/cloud.json";
import Heaven from "../../assets/images/Heaven.jpg";
import planet from "../../assets/planet.png";
import cloud2 from "../../assets/images/cloud2.png";
import Dancingdog from "../../assets/dancingDog.json";
import heavenground from "../../assets/heavenground.png";
import Cube from "../../assets/Cube.json";
import Light from "../../assets/Light.json";
import heavencloud4 from "../../assets/images/heavencloud4.png";
import dog1of3 from "../../assets/dog1of3.json";
import dog2of3 from "../../assets/dog2of3.json";
import dog3of3 from "../../assets/dog3of3.json";
import dog4of3 from "../../assets/dog4of3.json";

const { width, height } = Dimensions.get("window");

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
	const hillPosition = useRef(new Animated.Value(0)).current;
	const progress = useRef(new Animated.Value(0)).current;
	const progress2 = useRef(new Animated.Value(0)).current;
	const dogPosition1 = useRef(new Animated.Value(400)).current;
	const dogPosition2 = useRef(new Animated.Value(-400)).current;
	const dogPosition3 = useRef(new Animated.Value(400)).current;
	const cloudPosition1 = useRef(new Animated.Value(100)).current;
	const dog3totop = useRef(new Animated.Value(0)).current;
	const dog3Opacity = useRef(new Animated.Value(0)).current;

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
					duration: 3000,
					useNativeDriver: true,
				}),
				Animated.delay(2000),
				Animated.parallel([
					Animated.sequence([
						Animated.delay(800),
						Animated.timing(dog3Opacity, {
							toValue: 1,
							duration: 1000,
							useNativeDriver: true,
						}),
					]),
					Animated.timing(progress, {
						toValue: 0.5,
						duration: 2000,
						useNativeDriver: true,
					}),
				]),
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
			Animated.parallel([
				Animated.timing(hillPosition, {
					toValue: height,
					duration: 2000,
					useNativeDriver: true,
				}),
				Animated.timing(cloudPosition1, {
					toValue: -(width + 500),
					duration: 2000,
					useNativeDriver: true,
				}),
				Animated.timing(dogPosition3, {
					toValue: width,
					duration: 1500,
					useNativeDriver: true,
				}),
				Animated.timing(dog3totop, {
					toValue: -height,
					duration: 1500,
					useNativeDriver: true,
				}),
			]),
		]).start(() => {});
	}, [isAnimationStarted]);

	const cloudPositionY = useRef(new Animated.Value(0)).current;
	const cloudPositionY2 = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(cloudPositionY, {
					toValue: 50,
					duration: 8000,
					useNativeDriver: true,
				}),
				Animated.timing(cloudPositionY, {
					toValue: 0,
					duration: 8000, // 원하는 대로 지속 시간을 조절하세요
					useNativeDriver: true,
				}),
			]),
		);

		const animation2 = Animated.loop(
			Animated.sequence([
				Animated.timing(cloudPositionY2, {
					toValue: -30,
					duration: 8000,
					useNativeDriver: true,
				}),
				Animated.timing(cloudPositionY2, {
					toValue: 0,
					duration: 8000, // 원하는 대로 지속 시간을 조절하세요
					useNativeDriver: true,
				}),
			]),
		);

		animation.start();
		animation2.start();

		return () => {
			animation.stop();
			animation2.stop();
		}; // 컴포넌트가 사라질 때 애니메이션을 정지합니다
	}, []);

	return (
		<>
			<View>
				<Image
					source={Heaven}
					style={[DogHeavenLayout.heaven]}
					resizeMode="cover"
				/>
				<Image
					source={planet}
					style={[DogHeavenLayout.planet]}
					resizeMode="cover"
				/>
				<Image
					source={cloud2}
					style={[DogHeavenLayout.heavencloud]}
					resizeMode="cover"
				/>
			</View>
			<Animated.Image
				source={heavenground}
				style={[
					DogHeavenLayout.heavenground,
					{ transform: [{ translateY: cloudPositionY }] },
				]}
			/>
			<Animated.Image
				source={heavencloud4}
				style={[
					DogHeavenLayout.heavencloud4,
					{ transform: [{ translateY: cloudPositionY2 }] },
				]}
			/>
			<Animated.Image
				source={cloud2}
				style={[
					DogHeavenLayout.heavencloud2,
					{ transform: [{ translateY: cloudPositionY }] },
				]}
			/>
			<LottieView
				style={[DogHeavenLayout.Dancingdog]}
				source={Dancingdog}
				autoPlay
				loop={true}
				resizeMode="cover"
			/>
			<LottieView
				style={[DogHeavenLayout.cube, { transform: [{ scale: 0.35 }] }]}
				source={Cube}
				autoPlay
				loop={true}
				resizeMode="cover"
				speed={0.5}
			/>
			<LottieView
				style={[DogHeavenLayout.light, { transform: [{ scale: 0.7 }] }]}
				source={Light}
				autoPlay
				loop={true}
				resizeMode="cover"
				speed={0.5}
			/>

			<Animated.View
				style={[{ transform: [{ translateY: hillPosition }], zIndex: 2 }]}
			>
				<LottieView
					style={[DogHeavenLayout.hill]}
					source={Hill}
					progress={progress}
					loop={false}
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
						style={[style, { transform: [{ scale: 1.1 }] }]}
						autoPlay
						speed={0.5}
						loop={true}
						resizeMode="cover"
					/>
				))}
			</Animated.View>
			<Animated.View
				style={{
					position: "absolute",
					zIndex: 2,
					opacity: dog3Opacity,
					transform: [{ translateY: hillPosition }],
				}}
			>
				<LottieView
					source={dog2of3}
					style={[
						{
							zIndex: 4,
							width: 150,
							height: 100,
							position: "absolute",
							top: responsiveHeight(33),
							bottom: 0,
							left: responsiveWidth(5),
							right: 0,
						},
					]}
					autoPlay
					speed={2}
					loop={true}
					resizeMode="cover"
				/>
				<LottieView
					source={dog4of3}
					style={[
						{
							zIndex: 4,
							width: 150,
							height: 100,
							position: "absolute",
							top: responsiveHeight(36),
							bottom: 0,
							left: responsiveWidth(30),
							right: 0,
						},
					]}
					autoPlay
					speed={2}
					loop={true}
					resizeMode="cover"
				/>
			</Animated.View>
		</>
	);
};

export default Main;

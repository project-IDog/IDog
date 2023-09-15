import { useRef, useState, useEffect } from "react";
import Dog4 from "../components/RipDog/Dog4";
import Bg from "../../assets/images/Rip/bg-night.png";
import Object1 from "../components/RipDog/LeftToRight/Object1";
import Ground from "../components/RipDog/BottomToTop/Ground";
import Building from "../components/RipDog/BottomToTop/Building";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Animated,
	Easing,
} from "react-native";
import Grass from "../components/RipDog/BottomToTop/Grass";
import Cycle from "../components/RipDog/LeftToRight/CycleMan";
import Running from "../components/RipDog/LeftToRight/Running";
import Cloud from "../components/RipDog/LeftToRight/Cloud";

const Test = () => {
	const screenWidth = 590; // 화면의 너비. 실제 디바이스 너비를 사용하려면 Dimensions API를 사용하면 됩니다.
	const buildingWidth = 0; // Building 이미지의 너비. 실제 이미지의 너비에 따라 변경해야 합니다.

	const buildingXPosition = useRef(new Animated.Value(0)).current;
	const animationRef = useRef(null); // 애니메이션 참조 저장을 위한 ref

	const [isAnimating, setIsAnimating] = useState(true); // 애니메이션 상태

	const animateBuilding = () => {
		if (animationRef.current) {
			animationRef.current.stop();
		}

		if (isAnimating) {
			const remainingDistance = screenWidth - buildingXPosition._value; // 남은 거리 계산
			animationRef.current = Animated.loop(
				Animated.timing(buildingXPosition, {
					toValue: screenWidth,
					duration: (5000 * remainingDistance) / screenWidth, // 남은 거리에 대한 시간 조절
					useNativeDriver: true,
					easing: Easing.linear,
				}),
			);

			animationRef.current.start(() => {
				buildingXPosition.setValue(0);
			});
		} else {
			buildingXPosition.stopAnimation(); // 애니메이션 멈추기
		}
	};

	const handleButtonPress = () => {
		setIsAnimating(!isAnimating);
	};

	useEffect(() => {
		animateBuilding();
	}, [isAnimating]);
	return (
		<>
			<View style={styles.object1}>
				<Object1 />
			</View>

			<View style={styles.centerButtonContainer}>
				<TouchableOpacity onPress={animateBuilding} style={styles.centerButton}>
					<Text style={styles.text1}>추모하기</Text>
				</TouchableOpacity>
			</View>

			{/* 1번째 BG */}
			<>
				<Animated.View
					style={[
						styles.building,
						{ transform: [{ translateX: buildingXPosition }] },
					]}
				>
					<Building />
				</Animated.View>
				<Animated.View
					style={[
						styles.dog4,
						{ transform: [{ translateX: buildingXPosition }] },
					]}
				>
					<Dog4 />
				</Animated.View>
				<Animated.View
					style={[
						styles.grass,
						{ transform: [{ translateX: buildingXPosition }] },
					]}
				>
					<Grass />
				</Animated.View>
				<Animated.View
					style={[
						styles.ground,
						{ transform: [{ translateX: buildingXPosition }] },
					]}
				>
					<Ground />
				</Animated.View>
			</>

			{/* 2번째 BG */}
			<>
				<Animated.View
					style={[
						styles.dog4,
						{
							transform: [
								{
									translateX: Animated.add(
										buildingXPosition,
										-screenWidth + buildingWidth,
									),
								},
							],
						},
					]}
				>
					<Dog4 />
				</Animated.View>

				<Animated.View
					style={[
						styles.building,
						{
							transform: [
								{
									translateX: Animated.add(
										buildingXPosition,
										-screenWidth + buildingWidth,
									),
								},
							],
						},
					]}
				>
					<Building />
				</Animated.View>

				<Animated.View
					style={[
						styles.grass,
						{
							transform: [
								{
									translateX: Animated.add(
										buildingXPosition,
										-screenWidth + buildingWidth,
									),
								},
							],
						},
					]}
				>
					<Grass />
				</Animated.View>

				<Animated.View
					style={[
						styles.ground,
						{
							transform: [
								{
									translateX: Animated.add(
										buildingXPosition,
										-screenWidth + buildingWidth,
									),
								},
							],
						},
					]}
				>
					<Ground />
				</Animated.View>
			</>

			<View style={styles.bg}>
				<Image source={Bg} />
			</View>

			<View style={styles.cycle}>
				<Cycle />
			</View>
			<View style={styles.running}>
				<Running />
			</View>
			<View style={styles.cloud}>
				<Cloud />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "",
	},
	building: {
		zIndex: -1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		height: "100%",
		width: 400,
		top: 560,
	},
	dog4: {
		zIndex: 8,
		height: 600,
		width: 350,
		top: 570,
		position: "absolute",
	},
	dog5: {
		zIndex: 5,
		height: 600,
		width: 300,
		top: 430,
		left: 100,
		position: "absolute",
	},
	grass: {
		zIndex: 1,
		height: 600,
		width: 300,
		top: 400,
		left: 15,
		position: "absolute",
	},
	cycle: {
		zIndex: 8,
		height: 600,
		width: 300,
		top: 155,
		left: 20,
		position: "absolute",
	},
	running: {
		zIndex: 10,
		height: 600,
		width: 300,
		top: 160,
		left: 20,
		position: "absolute",
	},
	cloud: {
		zIndex: 4,
		height: 300,
		alignContent: "center",
		justifyContent: "center",
		width: 300,
		position: "absolute",
		top: 150,
	},
	bg: {
		zIndex: 5,
		height: 600,
		alignContent: "center",
		justifyContent: "center",
		width: 300,
		position: "absolute",
		top: -50,
		opacity: 0.45,
	},
	ground: {
		top: 490,
		width: 600,
	},
	object1: {
		position: "absolute",
		height: 200,
		top: 570,
		left: 100,
	},
	centerButtonContainer: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		zIndex: 100,
	},
	centerButton: {
		backgroundColor: "#EE8A72",
		color: "#000000",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
		elevation: 5, // 안드로이드용 그림자
		textAlign: "center",
	},
	text1: {
		color: "#ffffff",
		fontSize: 20,
		fontWeight: "bold",
	},
});

export default Test;

import {
	View,
	Text,
	Image,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Animated,
} from "react-native";
import { useState, useEffect } from "react";
import PlayIcon from "../../assets/images/play-icon.png";
import flower1 from "../../assets/flower1.json";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import LottieView from "lottie-react-native";

const SubMain = ({ subTitle, mainTitle, bgImg, desc }: any) => {
	const [flowers, setFlowers] = useState<Array<{ x: number; y: number }>>([]);
	const [progress, setProgress] = useState(new Animated.Value(0));

	const handlePress = (event: any) => {
		if (flowers.length >= 5) {
			return;
		}
		const { pageX, pageY } = event.nativeEvent;
		setFlowers([...flowers, { x: pageX, y: pageY }]);

		console.log("flowers:", flowers);
	};

	// For demo purposes, I'll assume you want to animate the progress on component mount.
	useEffect(() => {
		Animated.timing(progress, {
			toValue: 1,
			duration: 5000,
			useNativeDriver: false,
		}).start();
	}, []);

	const flowers1 = [
		{ x: 226.55691528320312, y: 242.2622833251953 },
		{ x: 106.84989166259766, y: 280.82952880859375 },
		{ x: 30.849609375, y: 237.9681854248047 },
		{ x: 55.13253402709961, y: 175.12081909179688 },
	];

	return (
		<>
			<View style={styles.subMainWrap}>
				<ImageBackground source={bgImg} style={styles.subMainBg}>
					<TouchableOpacity onPress={handlePress}>
						<View style={styles.garden}>
							{flowers1.map((flower, index) => {
								return (
									<Animated.View
										key={index}
										style={{
											position: "absolute",
											top: flower.y,
											left: flower.x,
											zIndex: 10,
											height: responsiveHeight(50),
										}}
									>
										<LottieView
											autoPlay
											loop={true}
											source={flower1}
											progress={progress}
										/>
									</Animated.View>
								);
							})}
						</View>
					</TouchableOpacity>

					<View style={styles.subMainInfoWrap}>
						<Text style={styles.subMainSubTitle}>{subTitle}</Text>
						<Text style={styles.subMainMainTitle}>{mainTitle}</Text>
						<View style={styles.subMainDescWrap}>
							<TouchableOpacity style={styles.Descbtn}>
								<Text style={styles.subMainDesc}>{desc}</Text>
								<Image source={PlayIcon} />
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
				<Animated.View style={{}}>
					<LottieView
						autoPlay
						loop={true}
						source={flower1}
						style={styles.flower1}
					/>
				</Animated.View>
				<Animated.View>
					<LottieView
						source={flower1}
						style={styles.flower1}
						// autoPlay
						// loop={true}
					/>
				</Animated.View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	subMainWrap: {
		position: "relative",
		top: -80,
		zIndex: -1,
	},
	subMainBg: {
		width: responsiveWidth(100),
		height: responsiveHeight(60),
		resizeMode: "cover",
		position: "relative",
	},
	subMainInfoWrap: {
		marginTop: "auto",
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingVertical: responsiveHeight(3),
		paddingHorizontal: responsiveWidth(10),
		justifyContent: "center",
		// borderRadius: 15,
	},
	subMainSubTitle: {
		fontSize: 18,
		fontWeight: "400",
		color: "#FFF",
	},
	subMainMainTitle: {
		fontSize: 26,
		fontWeight: "400",
		color: "#FFF",
		marginTop: 2,
	},
	subMainDescWrap: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		// paddingBottom: responsiveHeight(2),
		marginTop: 12,
	},
	subMainDesc: {
		fontSize: 18,
		fontWeight: "400",
		color: "#FFF",
		marginRight: responsiveWidth(2),
	},
	Descbtn: {
		flexDirection: "row",
	},
	flower1: {
		zIndex: 10,
	},
	garden: {
		backgroundColor: "rgba(0,0,0,0.1)",
		height: responsiveHeight(37),
		zIndex: 1,
	},
});

export default SubMain;

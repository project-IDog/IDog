import {
	View,
	Text,
	Image,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import PlayIcon from "../../assets/images/play-icon.png";
import flower1 from "../../assets/flower3.json";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import LottieView from "lottie-react-native";

const SubMain = ({ subTitle, mainTitle, bgImg, desc }: any) => {
	const [flowers, setFlowers] = useState<
		Array<{ x: number; y: number; animated: boolean }>
	>([]);

	const [lastClick, setLastClick] = useState<number>(0);
	const handlePress = (event: any) => {
		const currentTime = new Date().getTime();

		if (currentTime - lastClick < 300) {
			// 300ms 이내의 연속 클릭 무시
			return;
		}

		setLastClick(currentTime);

		const { pageX, pageY } = event.nativeEvent;
		setFlowers([...flowers, { x: pageX, y: pageY, animated: false }]);
		// console.log("flowers:", flowers);
	};

	const [lottieDimensions, setLottieDimensions] = useState({
		width: 0,
		height: 0,
	});

	return (
		<>
			<View style={styles.subMainWrap}>
				<ImageBackground source={bgImg} style={styles.subMainBg}>
					<TouchableOpacity onPress={handlePress}>
						<View style={styles.garden}>
							{flowers.map((flower, index) => {
								return (
									<>
										<LottieView
											key={index}
											style={[
												styles.flower1,
												{
													position: "absolute",
													left: -25 + index * responsiveWidth(4),
													top: responsiveHeight(13),
												},
											]}
											autoPlay={flower.animated === false}
											loop={false}
											source={flower1}
											speed={0.7}
											onAnimationFinish={() => {
												if (!flower.animated) {
													const updatedFlowers = [...flowers];
													updatedFlowers[index].animated = true;
													setFlowers(updatedFlowers);
												}
											}}
										/>
									</>
								);
							})}
						</View>
					</TouchableOpacity>

					<View style={styles.subMainInfoWrap}>
						<Text style={styles.subMainSubTitle}>{subTitle}</Text>
						<Text style={styles.subMainMainTitle}>{mainTitle}</Text>
						<View style={styles.subMainDescWrap}>
							<TouchableOpacity style={styles.Descbtn} onPress={handlePress}>
								<Text style={styles.subMainDesc}>{desc}</Text>
								<Image source={PlayIcon} />
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	subMainWrap: {
		position: "relative",
		top: -80,
		zIndex: -5,
	},
	subMainBg: {
		zIndex: -3,
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
		position: "absolute",
		// transform: [{ scale: 0.5 }],
		// height: responsiveHeight(20),
		width: responsiveWidth(50),
		// backgroundColor: "rgba(0,0,0,0.7)",
	},
	garden: {
		backgroundColor: "rgba(0,0,0,0.1)",
		height: responsiveHeight(37),
		zIndex: 1,
	},
});

export default React.memo(SubMain);

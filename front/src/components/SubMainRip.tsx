import {
	View,
	Text,
	Image,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import flowerIcon from "../../assets/images/flowerIcon.png";
import flower1 from "../../assets/flower3.json";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import LottieView from "lottie-react-native";
import axios from "../utils/axios";

const SubMain = ({ subTitle, mainTitle, bgImg, desc, data }: any) => {
	const [flowersCnt, setFlowersCnt] = useState<number>(0);
	const [lastClick, setLastClick] = useState<number>(0);
	const handlePress = (event: any) => {
		const currentTime = new Date().getTime();
		if (currentTime - lastClick < 1000) {
			return;
		}

		if (flowersCnt < 10) {
			// flowersCnt가 10 미만인지 확인
			axios
				.post("/flower", {
					graveNo: data.graveNo,
				})
				.then((data) => {
					if (data.data.message === "헌화 등록 성공") {
						setFlowersCnt((prevCount) => prevCount + 1);
					}
				});
		}
	};

	useEffect(() => {
		axios.get(`/flower/${data.graveNo}`).then((data) => {
			if (data.data.message === "헌화 등록 성공") {
				setFlowersCnt(data.data.data.count);
			}
		});
	}, []);

	const imageUrl: string | null = data?.dogImg
		? `https://ipfs.io/ipfs/${data.dogImg.split("://")[1]}`
		: null;

	return (
		<>
			<View style={styles.subMainWrap}>
				<ImageBackground source={{ uri: imageUrl }} style={styles.subMainBg}>
					<View style={styles.garden}>
						{Array.from({ length: flowersCnt }).map((_, index) => {
							return (
								<>
									<LottieView
										key={`flower_${index}`}
										style={[
											styles.flower1,
											{
												position: "absolute",
												left: -25 + index * responsiveWidth(4),
												top: responsiveHeight(13),
											},
										]}
										autoPlay={true}
										loop={false}
										source={flower1}
										speed={0.7}
									/>
								</>
							);
						})}
					</View>

					<View style={styles.subMainInfoWrap}>
						<Text style={styles.subMainSubTitle}>{subTitle}</Text>
						<Text style={styles.subMainMainTitle}>{mainTitle}</Text>
						<View style={styles.subMainDescWrap}>
							<TouchableOpacity
								delayPressOut={600}
								style={styles.Descbtn}
								onPress={handlePress}
							>
								<Text style={styles.subMainDesc}>{desc}</Text>
								<Image source={flowerIcon} style={styles.flowerIcon} />
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
		alignItems: "center",
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

	flowerIcon: {
		// justifyContent: "center",
		width: responsiveHeight(2.5),
		height: responsiveHeight(2.5),
	},
});

export default React.memo(SubMain);

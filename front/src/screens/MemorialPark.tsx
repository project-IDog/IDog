import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	RefreshControl,
	Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MainHeader from "../components/MainHeader";
import MemorialParkDesignLayout from "../styles/MemorialParkDesignLayout";
import Colors from "../stores/ColorStore";
import { LinearGradient } from "react-native-linear-gradient";
import RipnftCreate from "../components/RipnftCreate";
import nftbgcloud from "../../assets/images/skysky.png";
import axios from "../utils/axios";
import dog1 from "../../assets/images/adoption-main-img.png";
import scrolldownblack from "../../assets/scrolldownblack.json";
import LottieView from "lottie-react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

type AlbumData = {
	photoUrl: string;
};

type DogData = {
	dogImg: string;
	dogNo: number;
	dogName: string;
	dogBreed: string;
	dogBirthDate: string;
	dogDeathDate: string;
	dogSex: string;
	albumList: AlbumData[];
};

const Main = ({ navigation }: any) => {
	const [dataList, setDataList] = useState<DogData[]>([]);
	useEffect(() => {
		axios.get("/grave").then((data) => {
			if (data.data.message === "무덤 조회 성공") {
				setDataList(data.data.data);
			}
		});
	}, []);

	const [RipdataList, setRipdataList] = useState<DogData[]>([]);
	const [ripIndex, setRipIndex] = useState<number>(0);
	const [imgDataList, setImgDataList] = useState<Object[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		if (ripIndex < dataList.length) {
			const newItem = dataList[ripIndex];
			RipdataList.unshift(newItem);
			setRipdataList([...RipdataList]);
			setRipIndex(ripIndex + 1);
		}

		setRefreshing(false);
	}, [ripIndex, dataList, RipdataList]);

	const opacity = useState(new Animated.Value(0))[0];

	useEffect(() => {
		Animated.sequence([
			Animated.timing(opacity, {
				toValue: 1,
				duration: 3000,
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: 0,
				duration: 3000,
				useNativeDriver: true,
			}),
		]).start();
	}, [RipdataList]);

	return (
		<>
			<ScrollView
				scrollEventThrottle={16}
				contentOffset={{ x: 0, y: 12000 }}
				// ref={scrollViewRef}
				// pagingEnabled={true}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<MainHeader></MainHeader>
				<View style={MemorialParkDesignLayout.nftcontainer}>
					{RipdataList?.map((data, index) => {
						const startColor =
							index >= Colors.length - 1
								? "rgb(0, 0, 0)"
								: Colors[RipdataList.length - (index % Colors.length)];
						const endColor =
							index >= Colors.length - 1
								? "rgb(0, 0, 0)"
								: Colors[RipdataList.length - (index % Colors.length) - 1];

						const imageUrl: string | null = data?.dogImg;

						return (
							<View key={index} style={[MemorialParkDesignLayout.nftview]}>
								<LinearGradient
									style={[MemorialParkDesignLayout.linearalign, { flex: 1 }]}
									colors={[startColor, endColor]}
								>
									<Animated.View style={{ opacity: opacity }}>
										<LottieView
											autoPlay={true}
											loop={true}
											source={scrolldownblack}
											style={{
												position: "absolute",
												right: responsiveWidth(26),
												height: responsiveHeight(10),
												top: responsiveHeight(-1),
											}}
										/>
										<Text
											style={{
												color: "black",
												fontSize: 18,
												fontWeight: "bold",
												textAlign: "center",
											}}
										>
											스크롤을 내리면 {"\n"} rip NFT를 확인할 수 있습니다
										</Text>
									</Animated.View>

									<Image
										source={nftbgcloud}
										style={MemorialParkDesignLayout.lineralignbg}
									/>
									<View style={MemorialParkDesignLayout.nftbg}>
										<View style={MemorialParkDesignLayout.nftbgtitle}>
											<Text style={MemorialParkDesignLayout.nftbgtitletext}>
												반려견 추모하기
											</Text>
										</View>
										<View style={MemorialParkDesignLayout.nftinnercontainer}>
											<View style={MemorialParkDesignLayout.ripnftrow1}>
												<Image
													source={{ uri: imageUrl }}
													style={MemorialParkDesignLayout.ripnftinnermainimg}
												/>
											</View>
											<View style={MemorialParkDesignLayout.ripnftrow2}>
												<View style={MemorialParkDesignLayout.ripnftbwn}>
													<Text style={MemorialParkDesignLayout.nfttext}>
														{data.dogName}
													</Text>
													<ScrollView
														style={MemorialParkDesignLayout.scrollview}
														horizontal={true}
													>
														<Text style={MemorialParkDesignLayout.nfttext}>
															{data.dogBreed}
														</Text>
													</ScrollView>
												</View>
												<Text style={MemorialParkDesignLayout.nfttextdate}>
													{data.dogBirthDate}~{data.dogDeathDate}
												</Text>
												<View style={MemorialParkDesignLayout.ripnftbwn}>
													<Text style={MemorialParkDesignLayout.nfttext}>
														{data.dogSex}
													</Text>
													<Text style={MemorialParkDesignLayout.nfttext}>
														{data.dogName}의 앨범
													</Text>
												</View>
												<View style={MemorialParkDesignLayout.ripnftbwn}>
													{(() => {
														const dataLength = data?.topAlbums?.length || 0;
														const dummyCount = 3 - dataLength;
														const combinedData = [
															...(data?.topAlbums || []),
															...Array(dummyCount).fill(
																"https://ppobbi.s3.ap-northeast-2.amazonaws.com/default-card-img.png",
															),
														];

														return combinedData.map((imgData, idx) => {
															console.log(imgData);
															return (
																<Image
																	key={idx}
																	source={{ uri: imgData }}
																	style={
																		MemorialParkDesignLayout.ripnftinnersubimg
																	}
																/>
															);
														});
													})()}
												</View>
											</View>
										</View>
										<View style={MemorialParkDesignLayout.ripdetailalign}>
											<TouchableOpacity
												onPress={() =>
													navigation.navigate("MemorialParkDetail", { data })
												}
												style={MemorialParkDesignLayout.ripnftinnerbtncontainer}
											>
												<View
													style={[
														MemorialParkDesignLayout.ripnftinnerbtn,
														{ backgroundColor: startColor },
													]}
												>
													<Text
														style={MemorialParkDesignLayout.ripnftinnertext}
													>
														Detail
													</Text>
												</View>
											</TouchableOpacity>
										</View>
									</View>
								</LinearGradient>
							</View>
						);
					})}
				</View>
				<View>
					<RipnftCreate setDataList={setDataList} />
				</View>
			</ScrollView>
		</>
	);
};

export default Main;

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	NativeSyntheticEvent,
	NativeScrollEvent,
	Image,
	RefreshControl,
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
			console.log("무덤 조회하기!!", data.data.data);
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

						const imageUrl: string | null = data?.dogImg
							? `https://ipfs.io/ipfs/${data.dogImg.split("://")[1]}`
							: "https://ppobbi.s3.ap-northeast-2.amazonaws.com/044f0812-8b86-4bf3-80aa-6a71cecd5ec4.jpeg";

						return (
							<View key={index} style={[MemorialParkDesignLayout.nftview]}>
								<LinearGradient
									style={[MemorialParkDesignLayout.linearalign, { flex: 1 }]}
									colors={[startColor, endColor]}
								>
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
																"https://firebasestorage.googleapis.com/v0/b/asjdba-6e4b7.appspot.com/o/dog1.jpg?alt=media&token=68bb18c2-5b0f-4c4b-b816-7cfb8484a9ed",
															),
														];

														return combinedData.map((imgData, idx) => {
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

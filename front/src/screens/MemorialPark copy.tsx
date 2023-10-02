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
	const scrollViewRef = useRef<ScrollView>(null);
	useEffect(() => {
		setTimeout(() => {
			scrollViewRef.current?.scrollToEnd({ animated: false });
		}, 50);
	}, []);

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
	const [atTop, setAtTop] = React.useState(false);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset } = event.nativeEvent;

		if (contentOffset.y <= 0) {
			setAtTop(true);
		} else {
			setAtTop(false);
		}
	};

	const handleScrollEndDrag = (
		event: NativeSyntheticEvent<NativeScrollEvent>,
	) => {
		const { contentOffset } = event.nativeEvent;
		console.log(contentOffset);

		if (atTop && contentOffset.y <= 0) {
			console.log("맨꼭데기여!!");
			// 만약에 index가 datalist의 크기의 -1보다 작다면
			// ripdatalist에 datalist[index]추가
			// index ++ 해주기
			if (ripIndex < dataList.length) {
				const newItem = dataList[ripIndex];
				RipdataList.unshift(newItem);
				setRipdataList([...RipdataList]);
				setRipIndex(ripIndex + 1);
			}

			console.log(RipdataList.length);
		}
	};
	const [imgDataList, setImgDataList] = useState<Object[]>([]);

	const getDogImage = (dogNo: number) => {
		axios.get(`/photo/dog/${dogNo}`).then((data) => {
			if (data.data.message === "사진 조회 성공") {
				setImgDataList([...imgDataList, data.data.data]);
			}
		});
	};

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
	}, []);

	useEffect(() => {
		// RipdataList의 변화에 따라 axios 요청을 실행하는 로직
		const firstItem = RipdataList[0];

		// 첫 번째 항목이 있고, dogNo가 유효하면 요청을 실행
		if (firstItem && firstItem.dogNo) {
			getDogImage(firstItem.dogNo);
		}
	}, [RipdataList]);
	return (
		<>
			<ScrollView
				onScroll={handleScroll}
				onScrollEndDrag={handleScrollEndDrag}
				scrollEventThrottle={16}
				contentOffset={{ x: 0, y: 12000 }}
				// ref={scrollViewRef}
				// pagingEnabled={true}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						// 여기서 다른 스타일이나 속성을 추가할 수 있습니다.
					/>
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
							: "../../../trace-main-img.png";

						const imgIndexList = imgDataList[ripIndex];

						console.log("imgIndexList:", imgIndexList);
						return (
							<View
								key={index}
								style={[
									MemorialParkDesignLayout.nftview,
									// {
									// 	backgroundColor:
									// 		Colors[dataList.length - (index % Colors.length)],
									// },
								]}
							>
								<LinearGradient
									style={[MemorialParkDesignLayout.linearalign, { flex: 1 }]}
									// start={{ x: 0, y: 0 }}
									// end={{ x: 1, y: 1 }}
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
													{imgDataList.slice(0, 3).map((imgData, idx) => {
														return (
															<Image
																key={idx}
																source={{ uri: imgData.photoUrl }}
																style={
																	MemorialParkDesignLayout.ripnftinnersubimg
																}
															/>
														);
													})}
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

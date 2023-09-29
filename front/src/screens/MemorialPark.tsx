import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	NativeSyntheticEvent,
	NativeScrollEvent,
	Image,
	Modal,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import IndexStore from "../stores/IndexStore";
import MainHeader from "../components/MainHeader";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import Animation from "../components/Animation";
import BG1 from "../../assets/images/BG1.png";
import MemorialParkDesignLayout from "../styles/MemorialParkDesignLayout";
import Colors from "../stores/ColorStore";
import { LinearGradient } from "react-native-linear-gradient";
import mainprofileImg from "../../assets/images/adoption-main-img.png";
import RipnftCreate from "../components/RipnftCreate";
import { GraveData } from "src/stores/Gravedata";
import nftbgcloud from "../../assets/images/nftbg.png";
import axios from "../utils/axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

type DogData = {
	dogImg: string;
	dogNo: number;
	dogName: string;
	dogBreed: string;
	dogBirthDate: string;
	dogDeathDate: string;
	dogSex: string;
	// 필요한 경우 다른 속성 추가
};

type DogImage = {
	photoUrl: string;
};

const Main = ({ navigation }: any) => {
	const scrollViewRef = useRef<ScrollView>(null);
	useEffect(() => {
		setTimeout(() => {
			scrollViewRef.current?.scrollToEnd({ animated: false });
		}, 50);
	}, []);
	const { LoginStore } = IndexStore();

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

	const authHandling = (pageName: string) => {
		if (pageName === "Three") {
			navigation.navigate(pageName);
			return;
		}

		if (LoginStore.isLogged) {
			navigation.navigate(pageName);
		} else {
			alert("해당 서비스는 로그인 후 이용가능합니다.");
		}
	};

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

	useEffect(() => {
		// RipdataList의 변화에 따라 axios 요청을 실행하는 로직
		const firstItem = RipdataList[0];

		// 첫 번째 항목이 있고, dogNo가 유효하면 요청을 실행
		if (firstItem && firstItem.dogNo) {
			axios
				.get(`/photo/dog/${firstItem.dogNo}`)
				.then((data) => {
					console.log("없니???????????", data.data.data);
					if (data.data.message === "사진 조회 성공") {
						setImgDataList([...imgDataList, ...data.data.data]);
					}
				})
				.catch((err) => {
					console.log(firstItem.dogNo);
					console.log("없니???????????", err.response);
				});
		}
	}, [RipdataList]);

	if (imgDataList) {
		console.log("이미지리스트다!!", imgDataList);
	}

	return (
		<>
			<ScrollView
				onScroll={handleScroll}
				onScrollEndDrag={handleScrollEndDrag}
				scrollEventThrottle={16}
				contentOffset={{ x: 0, y: 12000 }}
				// ref={scrollViewRef}
				// pagingEnabled={true}
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
							: null;
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
															{data.dogBreed} {data.dogNo}
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

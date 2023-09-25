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

const Main = ({ navigation }: any) => {
	const scrollViewRef = useRef<ScrollView>(null);
	useEffect(() => {
		setTimeout(() => {
			scrollViewRef.current?.scrollToEnd({ animated: false });
		}, 50);
	}, []);
	const { LoginStore } = IndexStore();

	console.log(LoginStore);
	const [dataList, setDataList] = useState<Object[]>([]);
	const [dogNftList, setDogNftList] = useState<Object[]>([]);
	useEffect(() => {
		axios.get("/grave").then((data) => {
			if (data.data.message === "무덤 조회 성공") {
				setDataList(data.data.data);
			}
		});
		axios.get("/dog/list/8").then((data) => {
			console.log("리스트데이터:", data);
			if (data.data.message === "사용자의 모든 강아지 목록 조회 완료") {
				setDogNftList(data.data.data);
			}
		});
	}, []);

	if (dogNftList.length !== 0) {
		console.log(dogNftList);
	}

	const [RipdataList, setRipdataList] = useState<Object[]>([]);
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
				setRipdataList([...RipdataList, dataList[ripIndex]]);
				setRipIndex(ripIndex + 1);
			}

			console.log(RipdataList.length);
		}
	};

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

						console.log(index, startColor, endColor);

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
													source={mainprofileImg}
													style={MemorialParkDesignLayout.ripnftinnermainimg}
												/>
											</View>
											<View style={MemorialParkDesignLayout.ripnftrow2}>
												<View style={MemorialParkDesignLayout.ripnftbwn}>
													<Text style={MemorialParkDesignLayout.nfttext}>
														{data.dogName}
													</Text>
													<Text style={MemorialParkDesignLayout.nfttext}>
														{data.dogBreed}
													</Text>
												</View>
												<Text style={MemorialParkDesignLayout.nfttextdate}>
													{data.dogBirthDate} ~ {data.dogDeathDate}
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
													<Image
														source={mainprofileImg}
														style={MemorialParkDesignLayout.ripnftinnersubimg}
													/>
													<Image
														source={mainprofileImg}
														style={MemorialParkDesignLayout.ripnftinnersubimg}
													/>
													<Image
														source={mainprofileImg}
														style={MemorialParkDesignLayout.ripnftinnersubimg}
													/>
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
					<RipnftCreate />
				</View>
			</ScrollView>
		</>
	);
};

export default Main;

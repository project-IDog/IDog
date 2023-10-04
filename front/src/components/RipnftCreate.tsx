import React, { useState, useEffect } from "react";
import { View, Modal } from "react-native";
import MemorialParkDesignLayout from "../styles/MemorialParkDesignLayout";
import {
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	Alert,
	Animated,
	ScrollView,
} from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import Animation from "../components/Animation";
import exImg from "../../assets/images/photo-ex-img3.png";
import axios from "../utils/axios";
import scrolldown from "../../assets/scrolldown.json";
import LottieView from "lottie-react-native";
import { set } from "mobx";
import { useNavigation } from "@react-navigation/native";
interface RipnftCreateProps {
	setDataList: (data: any) => void;
}

const RipnftCreate: React.FC<RipnftCreateProps> = ({ setDataList }) => {
	const opacity = useState(new Animated.Value(0))[0];
	const navigation = useNavigation();

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
		]).start(); // 애니메이션이 완료된 후 메시지 숨김
	}, []);

	const fetchNftList = () => {
		axios.get("/dog/alive").then((data) => {
			// console.log("생존강아지 조회!", data);
			if (data.data.message === "사용자의 생존한 강아지 조회 완료") {
				setDogNftList(data.data.data);
			}
		});

		axios.get("/grave").then((data) => {
			if (data.data.message === "무덤 조회 성공") {
				setDataList(data.data.data);
			}
		});
		// 죽은 나의 강아지 API 불러오기
		axios.get("dog/dead").then((data) => {
			console.log("죽은ㄴ강아지!!", data);
			if (data.data.message === "사용자의 생존한 강아지 조회 완료") {
				if (data.data.data.length > 0) {
					setIsMyProfile(true);
					setDogDeathList(data.data.data);
				}
			}
		});
	};
	const [dogNftList, setDogNftList] = useState<Object[]>([]);

	useEffect(() => {
		fetchNftList();
	}, []);

	const [modalVisible, setModalVisible] = useState(false);
	const [confirmationModalVisible, setConfirmationModalVisible] =
		useState(false);
	const [selectedData, setSelectedData] = useState(null);

	const [deathDateInputModalVisible, setDeathDateInputModalVisible] =
		useState(false);
	const [deathDate, setDeathDate] = useState("");

	const handleClick = (data: any) => {
		setSelectedData(data);
		// 죽음의 날짜 입력 모달을 엽니다.
		setDeathDateInputModalVisible(true);
	};
	const handleConfirm = () => {
		axios
			.post("/grave", {
				dogNo: selectedData?.dogNo,
				dogDeathDate: deathDate,
			})
			.then((data) => {
				if (data.data.message === "무덤 생성 완료") {
					// setDogNftList([]);
					Alert.alert(
						"Memorial Sky",
						"등록이 완료되었습니다.",
						[
							{
								text: "OK",
								onPress: () => setConfirmationModalVisible(false),
							},
						],
						{ cancelable: false },
					);

					setConfirmationModalVisible(false);
					setDeathDateInputModalVisible(false);
					fetchNftList();
				}
			});
	};

	const handleCancel = () => {
		setConfirmationModalVisible(false);
	};

	const [isMyProfile, setIsMyProfile] = useState(false);
	const [dogDeathList, setDogDeathList] = useState([]);
	const [modalVisibleDeath, setModalVisibleDeath] = useState(false);
	const [confirmationModalVisible2, setConfirmationModalVisible2] =
		useState(false);

	return (
		<View style={MemorialParkDesignLayout.view1}>
			<Animation />
			<View
				style={{
					width: responsiveHeight(30),
					position: "absolute",
					top: responsiveHeight(25),
					alignItems: "center",
				}}
			>
				<Animated.View style={{ opacity: opacity }}>
					<LottieView
						autoPlay={true}
						loop={true}
						source={scrolldown}
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
			</View>

			{isMyProfile ? (
				<TouchableOpacity
					style={MemorialParkDesignLayout.ripnfbtn}
					onPress={() => setModalVisibleDeath(true)}
				>
					<Text style={MemorialParkDesignLayout.ripnftbtntext}>
						내 RIP 반려견 리스트
					</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={MemorialParkDesignLayout.ripnfbtn}
					onPress={() => setModalVisible(true)}
				>
					<Text style={MemorialParkDesignLayout.ripnftbtntext}>
						RIP 프로필 기억하기
					</Text>
				</TouchableOpacity>
			)}

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={MemorialParkDesignLayout.modalcontainer}>
					<View style={MemorialParkDesignLayout.modalinnercontainer}>
						<View style={MemorialParkDesignLayout.modaltitlecontainer}>
							<Text style={MemorialParkDesignLayout.modaltitle}>
								반려견 RIP 기억하기
							</Text>
						</View>
						<ScrollView>
							{dogNftList?.map((data: any) => {
								return (
									<TouchableOpacity
										key={data.dogNo}
										style={MemorialParkDesignLayout.modalcontentcontainer}
										onPress={() => {
											handleClick(data);
										}}
									>
										<Image
											source={{ uri: data.dogImg }}
											style={MemorialParkDesignLayout.modalcontentimg}
										/>
										<View style={MemorialParkDesignLayout.modalcontents}>
											<View style={MemorialParkDesignLayout.modalcontentrow}>
												<ScrollView
													style={MemorialParkDesignLayout.riptitlename}
													horizontal={true}
												>
													<Text style={MemorialParkDesignLayout.nfttext2}>
														{data.dogName}
													</Text>
												</ScrollView>
											</View>
											<Text
												style={MemorialParkDesignLayout.modalcontentdatetitle}
											>
												{data.dogBirthDate}~{data.dogDeathDate}~{data.dogNo}
											</Text>
										</View>
									</TouchableOpacity>
								);
							})}
						</ScrollView>

						<TouchableOpacity
							style={MemorialParkDesignLayout.modalclosebtn}
							onPress={() => setModalVisible(false)}
						>
							<Text style={MemorialParkDesignLayout.modalclosetext}>X</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<Modal
				animationType="fade"
				transparent={true}
				visible={deathDateInputModalVisible}
				onRequestClose={() => {
					setDeathDateInputModalVisible(false);
				}}
			>
				<View style={MemorialParkDesignLayout.ripregistercontainer}>
					<View style={MemorialParkDesignLayout.ripregistermodal}>
						<TouchableOpacity
							style={{
								position: "absolute",
								top: 24,
								right: 20,

								paddingVertical: 6,
								paddingHorizontal: 10,
								backgroundColor: "#2196F3",
								borderRadius: 10,
							}}
							onPress={() => setDeathDateInputModalVisible(false)}
						>
							<Text
								style={{
									fontSize: 20,
									fontWeight: "bold",
								}}
							>
								X
							</Text>
						</TouchableOpacity>
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text
								style={{
									fontSize: 20,
									fontWeight: "bold",
									paddingVertical: 10,
								}}
							>
								반려견 RIP 등록
							</Text>
						</View>
						<TextInput
							style={[{ fontSize: 18 }]}
							value={deathDate}
							onChangeText={setDeathDate}
							placeholder="사망 날짜 입력 (YYYY-MM-DD)"
						/>
						<TouchableOpacity
							onPress={() => {
								// 여기서 죽음의 날짜 입력 모달을 닫고 확인 모달을 엽니다.
								setConfirmationModalVisible(true);
							}}
							style={[
								{
									justifyContent: "center",
									alignItems: "center",
									paddingTop: 20,
								},
							]}
						>
							<Text
								style={[
									{
										fontSize: 18,
										fontWeight: "bold",
										paddingVertical: 10,
										paddingHorizontal: 20,
										borderRadius: 25,
										backgroundColor: "#2196F3",
										// color: "white",
									},
								]}
							>
								등록하기
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<Modal
				animationType="fade"
				transparent={true}
				visible={confirmationModalVisible}
				onRequestClose={() => {
					setConfirmationModalVisible(false);
				}}
			>
				<View style={MemorialParkDesignLayout.ripregistercontainer}>
					<View style={MemorialParkDesignLayout.ripregistermodal}>
						<Text style={MemorialParkDesignLayout.ripregistercontent}>
							<Text style={MemorialParkDesignLayout.ripregistertitle}>
								{selectedData?.dogName}
							</Text>
							를 {"\n"}정말로 등록하시겠습니까?
						</Text>
						<View style={MemorialParkDesignLayout.ripregisterapplycontainer}>
							<TouchableOpacity onPress={handleConfirm}>
								<Text style={MemorialParkDesignLayout.ripregisteryes}>예</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={handleCancel}>
								<Text style={MemorialParkDesignLayout.ripregisterno}>
									아니오
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisibleDeath}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={MemorialParkDesignLayout.modalcontainer}>
					<View style={MemorialParkDesignLayout.modalinnercontainer}>
						<View style={MemorialParkDesignLayout.modaltitlecontainer}>
							<Text style={MemorialParkDesignLayout.modaltitle}>
								내 RIP 반려견 기억하기
							</Text>
						</View>
						<ScrollView>
							{dogDeathList?.map((data: any) => {
								return (
									<View>
										<TouchableOpacity
											key={data.dogNo}
											style={MemorialParkDesignLayout.modalcontentcontainer}
											onPress={() => {
												setConfirmationModalVisible2(true);
												setSelectedData(data);
											}}
										>
											<Image
												source={{ uri: data.dogImg }}
												style={MemorialParkDesignLayout.modalcontentimg}
											/>
											<View style={MemorialParkDesignLayout.modalcontents}>
												<View style={MemorialParkDesignLayout.modalcontentrow}>
													<ScrollView
														style={MemorialParkDesignLayout.riptitlename}
														horizontal={true}
													>
														<Text style={MemorialParkDesignLayout.nfttext2}>
															{data.dogName}
														</Text>
													</ScrollView>
												</View>
												<Text
													style={MemorialParkDesignLayout.modalcontentdatetitle}
												>
													{data.dogBirthDate}~{data.dogDeathDate}~{data.dogNo}
												</Text>
											</View>
										</TouchableOpacity>

										<Modal
											animationType="fade"
											transparent={true}
											visible={confirmationModalVisible2}
											onRequestClose={() => {
												setConfirmationModalVisible(false);
											}}
										>
											<View
												style={MemorialParkDesignLayout.ripregistercontainer}
											>
												<View style={MemorialParkDesignLayout.ripregistermodal}>
													<Text
														style={MemorialParkDesignLayout.ripregistercontent}
													>
														<Text
															style={MemorialParkDesignLayout.ripregistertitle}
														>
															{data?.dogName}
														</Text>
														의 추모공원으로 {"\n"}이동하시겠습니까?
													</Text>
													<View
														style={
															MemorialParkDesignLayout.ripregisterapplycontainer
														}
													>
														<TouchableOpacity
															onPress={() => {
																navigation.navigate("MemorialParkDetail", {
																	data,
																});
																setConfirmationModalVisible2(false);
																setModalVisible(false);
																setModalVisibleDeath(false);
															}}
														>
															<Text
																style={MemorialParkDesignLayout.ripregisteryes}
															>
																예
															</Text>
														</TouchableOpacity>
														<TouchableOpacity
															onPress={() => {
																setConfirmationModalVisible2(false);
																console.log(selectedData);
															}}
														>
															<Text
																style={MemorialParkDesignLayout.ripregisterno}
															>
																아니오
															</Text>
														</TouchableOpacity>
													</View>
												</View>
											</View>
										</Modal>
									</View>
								);
							})}
						</ScrollView>

						<TouchableOpacity
							style={MemorialParkDesignLayout.modalclosebtn}
							onPress={() => setModalVisibleDeath(false)}
						>
							<Text style={MemorialParkDesignLayout.modalclosetext}>X</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default RipnftCreate;

import React, { useState } from "react";
import { View, Modal } from "react-native";
import MemorialParkDesignLayout from "../styles/MemorialParkDesignLayout";
import { Text, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import Animation from "../components/Animation";
import exImg from "../../assets/images/photo-ex-img3.png";
import axios from "../utils/axios";

const RipnftCreate: React.FC = ({ dogNftList }) => {
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
		// 요청 보내기
		axios
			.post('/grave', {
				dogNo: 6,
				dogDeathDate: "2020-02-02",
			})
			.then((data) => {
				console.log(data);
			});

		// axios
		// 	.post("/grave", {
		// 		dogNo: 4,
		// 		dogDeathDate: 2020-02-02,
		// 	})
		// 	.then((data) => {
		// 		console.log(selectedData?.dogNo, deathDate);
		// 		console.log("데이ㅓ받기!", data);
		// 		if (data.data.message === "무덤 생성 완료") {
		// 			//요청
		// 			Alert.alert(
		// 				"Memorial Sky",
		// 				"등록이 완료되었습니다.",
		// 				[{ text: "OK", onPress: () => setConfirmationModalVisible(false) }],
		// 				{ cancelable: false },
		// 			);

		// 			setConfirmationModalVisible(false);
		// 			setDeathDateInputModalVisible(false);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error occurred during axios request:", error);
		// 	});
	};

	const handleCancel = () => {
		setConfirmationModalVisible(false);
	};

	return (
		<View style={MemorialParkDesignLayout.view1}>
			<Animation />
			<TouchableOpacity
				style={MemorialParkDesignLayout.ripnfbtn}
				onPress={() => setModalVisible(true)}
			>
				<Text style={MemorialParkDesignLayout.ripnftbtntext}>
					RIP 프로필 기억하기
				</Text>
			</TouchableOpacity>
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
						{dogNftList?.map((data: any) => {
							return (
								<TouchableOpacity
									style={MemorialParkDesignLayout.modalcontentcontainer}
									onPress={() => {
										handleClick(data);
									}}
								>
									<Image
										source={exImg}
										style={MemorialParkDesignLayout.modalcontentimg}
									/>
									<View style={MemorialParkDesignLayout.modalcontents}>
										<View style={MemorialParkDesignLayout.modalcontentrow}>
											<Text style={MemorialParkDesignLayout.modalcontenttitle}>
												{data.dogName}
											</Text>
											<Text style={MemorialParkDesignLayout.modalcontenttitle}>
												{data.dogBreed}
											</Text>
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
		</View>
	);
};

export default RipnftCreate;

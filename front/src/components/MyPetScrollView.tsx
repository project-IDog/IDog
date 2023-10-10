import { useState } from "react";
import { View, TouchableOpacity, Image, ScrollView, Text } from "react-native";
import { NativeModules } from "react-native";

import MyPetScrollViewLayout from "../styles/myPetScrollViewLayout";
import { responsiveWidth } from "react-native-responsive-dimensions";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";
import ProfileLayout from "../styles/profileLayout";
import { useNavigation } from "@react-navigation/native";
const { StopWatchModule } = NativeModules;

const MyPetScrollView = (props: any) => {
	const [selectedImages, setSelectedImages] = useState<number>(0);
	const navigation = useNavigation();

	const toggleImageSelection = (dogNo: number, dogImg: String) => {
		if (selectedImages === dogNo) {
			setSelectedImages(0);
			props.setSelectedDogImg("");
			props.setSelectedDogNo(0);
		} else {
			setSelectedImages(dogNo);
			props.setSelectedDogImg(dogImg);
			props.setSelectedDogNo(dogNo);
			submitDogImgAndDogNo(dogNo, dogImg);
		}
	};

	const submitDogImgAndDogNo = async (dogNo: number, dogImg: String) => {
		console.log("dogNo : ", dogNo);
		console.log("dogImg : ", dogImg);
		await StopWatchModule.updateDogImgAndDogNo(dogImg, dogNo);
	};

	return (
		<>
			<ScrollView horizontal={true} style={MyPetScrollViewLayout.myPetContent}>
				{props.userDogs.length === 0 ? (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => navigation.navigate("CreateProfile")}
					>
						<View style={ProfileLayout.addNewNftWrap2}>
							<Image source={AddPlusIcon} />
							<Text style={ProfileLayout.newButtonText}>반려견 등록하기</Text>
						</View>
					</TouchableOpacity>
				) : (
					<>
						{props.userDogs.map((myPetImage: any, index: number) => {
							const imageUrl = myPetImage.dogImg;
							return (
								<>
									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() =>
											toggleImageSelection(myPetImage.dogNo, imageUrl)
										}
										key={index}
									>
										<View style={MyPetScrollViewLayout.myPetItem}>
											<Image
												source={{ uri: imageUrl }}
												style={{
													width: 100,
													height: 132,
													marginHorizontal: responsiveWidth(1),
													borderRadius: 10,
													borderWidth: 4,
													borderColor:
														selectedImages === myPetImage.dogNo
															? "#EE8A72"
															: "transparent",
												}}
											/>
										</View>
									</TouchableOpacity>
								</>
							);
						})}
					</>
				)}
			</ScrollView>
		</>
	);
};

export default MyPetScrollView;

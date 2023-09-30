import { useState } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { NativeModules } from "react-native";

import MyPetScrollViewLayout from "../styles/myPetScrollViewLayout";
const { StopWatchModule } = NativeModules;

const MyPetScrollView = (props: any) => {
	const [selectedImages, setSelectedImages] = useState<number>(0);

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
		const update = await StopWatchModule.updateDogImgAndDogNo(dogImg, dogNo);
	};

	return (
		<>
			<ScrollView horizontal={true} style={MyPetScrollViewLayout.myPetContent}>
				{props.userDogs.map((myPetImage: any, index: number) => {
					const imageUrl = `https://ipfs.io/ipfs/${
						myPetImage.dogImg.split("://")[1]
					}`;

					return (
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => toggleImageSelection(myPetImage.dogNo, imageUrl)}
							key={index}
						>
							<View style={MyPetScrollViewLayout.myPetItem}>
								<Image
									source={{ uri: imageUrl }}
									style={{
										borderWidth: 4,
										borderColor:
											selectedImages === myPetImage.dogNo
												? "#EE8A72"
												: "transparent",
									}}
								/>
							</View>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</>
	);
};

export default MyPetScrollView;

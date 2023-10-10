import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";
import axios from "../utils/axios";

import MyPetThumbnail1 from "../../assets/images/my-pet-thumbnail1.png";
import MyPetThumbnail2 from "../../assets/images/my-pet-thumbnail2.png";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";
import ProfileLayout from "../styles/profileLayout";

import ChoiceDogLayout from "../styles/choiceDogLayout";

const ChoiceDog = ({ navigation }: any) => {
	const [myPetList, setMyPetList] = useState<Object[]>([]);

	const createAlbum = (petId: number) => {
		navigation.navigate("CreateFeed", { selectedId: petId });
	};

	useEffect(() => {
		axios.get("/dog/list").then((data) => {
			if (data.data.message === "사용자의 모든 강아지 목록 조회 완료") {
				setMyPetList(data.data.data);
			}
		});
	}, []);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="앨범 등록" />

				<View style={ChoiceDogLayout.createTitle}>
					<Text style={ChoiceDogLayout.createTitleDesc}>반려견 포토앨범</Text>
					<Text style={ChoiceDogLayout.createMainTitle}>
						어떤 반려견의 사진을{"\n"}
						등록하시겠어요?
					</Text>
				</View>

				<ScrollView horizontal={true} style={ChoiceDogLayout.myPetContent}>
					{myPetList.length === 0 ? (
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
							{myPetList.map((myPetItem: Object, index: number) => {
								return (
									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() => createAlbum(myPetItem.dogNo)}
									>
										<View style={ChoiceDogLayout.myPetItem}>
											<Image
												source={{ uri: myPetItem.dogImg }}
												style={{ width: 100, height: 132 }}
											/>
										</View>
									</TouchableOpacity>
								);
							})}
						</>
					)}
				</ScrollView>

				<Footer />
			</CommonLayout>
		</>
	);
};

export default ChoiceDog;

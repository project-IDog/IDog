import React, { useState } from "react";
import { View, Modal } from "react-native";
import MemorialParkDesignLayout from "../styles/MemorialParkDesignLayout";
import { Text, TouchableOpacity, Image } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Animation from "../components/Animation";
import exImg from "../../assets/images/photo-ex-img3.png";
import { GraveData } from "src/stores/Gravedata";

type RipnftCreateProps = {
	dataList: GraveData[];
};

const RipnftCreate: React.FC<RipnftCreateProps> = ({ dataList }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleClick = () => {
		// 여기에 클릭 시 실행할 로직을 작성합니다.
		alert({ dataList: dataList[0].data });
		// 다른 코드...
	};

	return (
		<View style={MemorialParkDesignLayout.view1}>
			<Animation />
			<TouchableOpacity
				style={MemorialParkDesignLayout.ripnfbtn}
				onPress={() => setModalVisible(true)}
			>
				<Text style={MemorialParkDesignLayout.ripnftbtntext}>
					RIP 프로필 생성하기
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
								반려견 RIP 등록하기
							</Text>
						</View>
						<TouchableOpacity
							style={MemorialParkDesignLayout.modalcontentcontainer}
							onPress={handleClick}
						>
							<Image
								source={exImg}
								style={MemorialParkDesignLayout.modalcontentimg}
							/>
							<View style={MemorialParkDesignLayout.modalcontents}>
								<View style={MemorialParkDesignLayout.modalcontentrow}>
									<Text style={MemorialParkDesignLayout.modalcontenttitle}>
										{dataList[0].data.dogName}
									</Text>
									<Text style={MemorialParkDesignLayout.modalcontenttitle}>
										{dataList[0].data.dogBreed}
									</Text>
								</View>
								<Text style={MemorialParkDesignLayout.modalcontentdatetitle}>
									{dataList[0].data.dogBirthDate}~
									{dataList[0].data.dogDeathDate}
								</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={MemorialParkDesignLayout.modalclosebtn}
							onPress={() => setModalVisible(false)}
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

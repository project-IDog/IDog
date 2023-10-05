import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CommonLayout from "../components/CommonLayout";
import WhiteHeader from "../components/WhiteHeader";
import SubMain from "../components/SubMain";
import Footer from "../components/Footer";
import * as SecureStore from "expo-secure-store";

import axios from "../utils/axios";

import MyPageMainImg from "../../assets/images/mypage-main-bg-img.png";

import EditMypageLayout from "../styles/editMypageLayout";

const ShowPrivate = ({ navigation }: any) => {
	const [password, setPassword] = useState<string>();
	const [walletAddress, setWalletAddress] = useState<string>();
	const [privateKey, setPrivateKey] = useState<string>();
	const [showPrivateKey, setShowPrivateKey] = useState<string>();

	const showMyPrivateKey = async () => {
		await axios
			.post("/user/wallet/check", {
				userWalletPw: password,
			})
			.then((data) => {
				if (data.data.message === "회원 디지털지답 비밀번호 확인 성공") {
					setShowPrivateKey(privateKey);
				}
			});
	};

	useEffect(() => {
		const getPrivateKey = async () => {
			const myWalletAddress = await SecureStore.getItemAsync("walletAddress");
			const privateKey = await SecureStore.getItemAsync("privateKey");
			if (privateKey && myWalletAddress) {
				setWalletAddress(myWalletAddress);
				setPrivateKey(privateKey);
			}
		};

		getPrivateKey();
	}, []);

	return (
		<>
			<CommonLayout>
				<WhiteHeader title="개인키 확인" />
				<SubMain
					subTitle="개인키 확인"
					mainTitle={`내 반려견과\n함께하는 매일,\n간편하게 관리될 수 있도록.`}
					bgImg={MyPageMainImg}
					desc="내 개인키 확인하기"
				/>
				<View style={EditMypageLayout.editMyPageTitleWrap}>
					<Text style={EditMypageLayout.editMyPageTitle}>
						나의 소중한 지갑 개인키{"\n"}
						<Text style={EditMypageLayout.boldEditMyPageTitle}>
							안전하게
						</Text>{" "}
						확인해드려요.
					</Text>
					<Text style={EditMypageLayout.editMyPageSubTitle}>
						매일이 행복해질 수 있도록 소중한 정보를 관리해드려요
					</Text>
				</View>

				<View style={EditMypageLayout.editMyPageFormWrap}>
					<Text style={EditMypageLayout.editMyPageFormText}>
						고객님의 소중한 비밀번호를 입력해주세요.
					</Text>
					<TextInput
						style={EditMypageLayout.editMyPageFormInput}
						value={password}
						secureTextEntry={true}
						onChangeText={(text) => setPassword(text)}
					/>

					<Text style={EditMypageLayout.editMyPageFormText}>
						아래에 고객님의 소중한 지갑주소를 알려드려요.
					</Text>
					<TextInput
						style={EditMypageLayout.showPrivateKeyInput}
						value={walletAddress}
					/>

					<Text style={EditMypageLayout.editMyPageFormText}>
						아래에 고객님의 소중한 개인키를 알려드려요.
					</Text>
					<TextInput
						style={EditMypageLayout.showPrivateKeyInput}
						value={showPrivateKey}
					/>
				</View>

				<View style={EditMypageLayout.editMyPageButtonWrap}>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => showMyPrivateKey()}
					>
						<View style={EditMypageLayout.editButton}>
							<Text style={EditMypageLayout.editButtonText}>
								나의 개인키 확인하기
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("MyPage")}
					>
						<View style={EditMypageLayout.cancelButton}>
							<Text style={EditMypageLayout.cancelButtonText}>취소하기</Text>
						</View>
					</TouchableOpacity>
				</View>
				<Footer />
			</CommonLayout>
		</>
	);
};

export default ShowPrivate;

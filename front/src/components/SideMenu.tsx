import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

import SideMenuIcon from "./SideMenuIcon";
import SideMenuLayout from "../styles/sideMenuLayout";
import IndexStore from "../stores/IndexStore";

import CloseIcon from "../../assets/images/close-icon.png";
import NftCardIcon from "../../assets/images/line-nft-card-icon.png";
import AdoptionIcon from "../../assets/images/line-adoption-icon.png";
import PhotoAlbumIcon from "../../assets/images/line-photo-album-icon.png";
import MedicalIcon from "../../assets/images/line-medical-icon.png";
import WalkRootIcon from "../../assets/images/line-walk-root-icon.png";
import TribeIcon from "../../assets/images/line-tribe-icon.png";

import * as SecureStore from "expo-secure-store";
const SideMenu = (props: any) => {
	const navigation = useNavigation();
	const stores = IndexStore();
	const [isLogged, setIsLogged] = useState<Boolean>(stores.LoginStore.isLogged);
	console.log("stores.LoginStore.isLogged : ", stores.LoginStore.isLogged);
	console.log("isLogged : ", isLogged);

	useEffect(() => {
		setIsLogged(stores.LoginStore.isLogged);
	}, [stores.LoginStore.isLogged]);

	const authMoveMypage = () => {
		if (stores.LoginStore.isLogged) {
			navigation.navigate("MyPage");
		} else {
			alert("로그인 후 이용하실 수 있는 서비스입니다.");
		}
	};

	const handleLogout = async () => {
		stores.LoginStore.isLogged = false;
		setIsLogged(false);
		await SecureStore.deleteItemAsync("accessToken");
		await SecureStore.deleteItemAsync("refreshToken");
		for (let key in stores) {
			stores[key] = {};
		}
	};

	return (
		<>
			<View style={SideMenuLayout.sideMenuWrap}>
				<View style={SideMenuLayout.sideMenuHeader}>
					<Text style={SideMenuLayout.sideMenuLogo}>IDOG</Text>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => props.updateActiveSideMenu(false)}
					>
						<Image source={CloseIcon} />
					</TouchableOpacity>
				</View>
				<View style={SideMenuLayout.navWrap}>
					<Text style={SideMenuLayout.navTitle}>
						반려견 <Text style={SideMenuLayout.boldNavTitle}>소유증명</Text>
					</Text>
					<Text style={SideMenuLayout.navDesc}>
						간편한 NFT 소유증명 및 이전
					</Text>
					<View style={SideMenuLayout.navFlex}>
						<SideMenuIcon
							title="프로필 등록"
							imageIcon={NftCardIcon}
							movePage="Profile"
						></SideMenuIcon>
						<SideMenuIcon
							title="반려견 입양"
							imageIcon={AdoptionIcon}
							movePage="Adoption"
						></SideMenuIcon>
					</View>
					<View style={{ marginTop: 25 }}></View>
					<Text style={SideMenuLayout.navTitle}>
						반려견과의 <Text style={SideMenuLayout.boldNavTitle}>추억공유</Text>
					</Text>
					<Text style={SideMenuLayout.navDesc}>소중한 추억을 간직하세요.</Text>
					<View style={SideMenuLayout.navFlex}>
						<SideMenuIcon
							title="포토앨범"
							imageIcon={PhotoAlbumIcon}
							movePage="Album"
						></SideMenuIcon>
						{/* <SideMenuIcon title="진료일정등록" imageIcon={MedicalIcon}></SideMenuIcon> */}
						<SideMenuIcon
							title="산책루트"
							imageIcon={WalkRootIcon}
							movePage="Walk"
						></SideMenuIcon>
						<SideMenuIcon
							title="추모공원"
							imageIcon={TribeIcon}
							movePage="Three"
						></SideMenuIcon>
					</View>
				</View>
				<View style={SideMenuLayout.authButtonWrap}>
					{/* loginstore의 isloggin에 따른 변화 */}
					{!isLogged ? (
						<TouchableOpacity
							activeOpacity={0.7}
							style={SideMenuLayout.googleAuthButton}
							onPress={() => navigation.navigate("Login")}
						>
							<View>
								<Text style={SideMenuLayout.googleAuthButtonText}>로그인</Text>
							</View>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							activeOpacity={0.7}
							style={SideMenuLayout.googleAuthButton}
							onPress={() => handleLogout()}
						>
							<View>
								<Text style={SideMenuLayout.googleAuthButtonText}>
									로그아웃
								</Text>
							</View>
						</TouchableOpacity>
					)}
					<TouchableOpacity
						activeOpacity={0.7}
						style={SideMenuLayout.moveMypageButton}
						onPress={authMoveMypage}
					>
						<Text style={SideMenuLayout.moveMypageButtonText}>마이페이지</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default SideMenu;

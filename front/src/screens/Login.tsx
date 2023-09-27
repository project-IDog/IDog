import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import { Button, View } from "react-native";
import { ANDROID_CLIENT_ID } from "@env";
// import axios from "../utils/axios";
import axios from "axios";
import IndexStore from "../stores/IndexStore";
import SideMenuLayout from "../styles/sideMenuLayout";
import { BASE_URL, CONTENT_TYPE, TIMEOUT } from "../constants/constants";
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	const stores = IndexStore();
	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: ANDROID_CLIENT_ID,
	});
	const [isLogged, setIsLogged] = useState<Boolean>(stores.LoginStore.isLogged);

	const handleSignInWithGoogle = async () => {
		console.log("response 변화 체크 : ", response?.type);
		if (response?.type !== "success") return;

		const idToken = response.authentication?.idToken;
		const url = `${BASE_URL}/user`;
		try {
			const data = await axios.post(url, null, {
				headers: {
					Authorization: `Bearer ${idToken}`,
					"Content-Type": CONTENT_TYPE,
				},
				timeout: TIMEOUT,
			});
			console.log(data.data.message);
			if (data.data?.message === "로그인 완료") {
				setIsLogged(true);
				stores.LoginStore.isLogged = true;
				console.log("data.data.data.accessToken: ", data.data.data.accessToken);
				console.log(
					"data.data.data.refreshToken: ",
					data.data.data.refreshToken,
				);
				await SecureStore.setItemAsync(
					"accessToken",
					data.data.data.accessToken,
				);
				await SecureStore.setItemAsync(
					"refreshToken",
					data.data.data.refreshToken,
				);
			} else {
				console.log("else : data.data: ", data.data);
			}
		} catch (error) {
			console.log("error : ", error);
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

	// Google 인증 응답이 바뀔때마다 실행
	useEffect(() => {
		handleSignInWithGoogle();
	}, [response]);

	return (
		<View>
			{!isLogged ? (
				<TouchableOpacity
					activeOpacity={0.7}
					style={SideMenuLayout.googleAuthButton}
					onPress={() => promptAsync()}
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
						<Text style={SideMenuLayout.googleAuthButtonText}>로그아웃</Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Login;

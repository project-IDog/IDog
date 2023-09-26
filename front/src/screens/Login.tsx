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
import { set } from "mobx";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	const stores = IndexStore();
	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: ANDROID_CLIENT_ID,
	});
	const [isLogged, setIsLogged] = useState<Boolean>(stores.LoginStore.isLogged);

	const handleSignInWithGoogle = async () => {
		if (response?.type !== "success") return;

		const idToken = response.authentication?.idToken;
		const url = "https://idog.store/api/user";
		try {
			const data = await axios.post(url, null, {
				headers: {
					Authorization: `Bearer ${idToken}`,
					"Content-Type": "application/json",
				},
			});
			console.log(data.data.message);
			if (data.data?.message === "로그인 완료") {
				setIsLogged(true);
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
				stores.LoginStore.isLogged = true;
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

	const getSecureStorage = async () => {
		const accessToken = await SecureStore.getItemAsync("accessToken");
		const refreshToken = await SecureStore.getItemAsync("refreshToken");
		for (let key in stores) {
			console.log("key : ", key, "stores[key] : ", stores[key]);
		}
		console.warn("refreshToken : ", refreshToken);
		console.warn("accessToken : ", accessToken);
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

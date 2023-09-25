import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import { Button, View } from "react-native";
import { ANDROID_CLIENT_ID } from "@env";
// import axios from "../utils/axios";
import axios from "axios";
import IndexStore from "../stores/IndexStore";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	const stores = IndexStore();
	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: ANDROID_CLIENT_ID,
	});
	const handleSignInWithGoogle = async () => {
		if (response?.type === "success") {
			const tokenData = {
				authorizationCode: response.params?.code,
				idToken: response.authentication?.idToken,
				accessToken: response.authentication?.accessToken,
				refreshToken: response.authentication?.refreshToken,
			};
			const url = "https://idog.store/api/user";
			console.log("tokenData : ", JSON.stringify(tokenData));
			try {
				// 테스트용 코드
				await SecureStore.setItemAsync("accessToken", "testAccessToken");
				await SecureStore.setItemAsync("refreshToken", "testRefreshToken");
				stores.LoginStore.isLogged = true;
				stores.LoginStore.userInfo = {
					id: "testId",
					name: "testName",
					email: "testEmail",
				};
				// 이 사이 주석은 로그인이 되었을 시 지웁니다.

				const data = await axios.post(url, JSON.stringify(tokenData), {
					headers: {
						"Content-Type": "application/json",
						charset: "utf-8",
					},
					timeout: 1000,
				});

	// Google 로그인 처리하는 함수
	const handleSignInWithGoogle = async () => {
		const user = await AsyncStorage.getItem("@user");
		if (!user) {
			if (response?.type === "success") {
				// 인증 요청에 대한 응답이 성공이면, 토큰을 이용하여 유저 정보를 가져옴.
				await getUserInfo(response.authentication?.accessToken);
				console.log(response);
			}

			console.log("끝");
		}
	};

	const handleLogout = async () => {
		stores.LoginStore.isLogged = false;
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
			<Button
				disabled={!request}
				title="Login"
				onPress={() => {
					promptAsync();
				}}
			/>
			<Button title="logout" onPress={() => handleLogout()} />
			<Button title="getSecureStorage" onPress={() => getSecureStorage()} />
		</View>
	);
};

export default Login;

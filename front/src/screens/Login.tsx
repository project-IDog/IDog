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
	const { LoginStore } = IndexStore();
	console.log(LoginStore);
	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: ANDROID_CLIENT_ID,
	});
	const handleSignInWithGoogle = async () => {
		if (response?.type === "success") {
			const code = response.params?.code;
			try {
				// 테스트용 코드
				await SecureStore.setItemAsync("accessToken", "testAccessToken");
				await SecureStore.setItemAsync("refreshToken", "testRefreshToken");
				LoginStore.isLogged = true;
				LoginStore.userInfo = {
					id: "testId",
					name: "testName",
					email: "testEmail",
				};
				// 이 사이 주석은 로그인이 되었을 시 지웁니다.
				const { data } = await axios.post(
					"/user",
					{
						idToken: response.authentication?.idToken,
						refreshToken: response.authentication?.refreshToken,
						accessToken: response.authentication?.accessToken,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + code,
						},
					},
				);
				console.warn(data.data.data);
				await SecureStore.setItemAsync(
					"accessToken",
					data.data.data.accessToken,
				);
				await SecureStore.setItemAsync(
					"refreshToken",
					data.data.data.refreshToken,
				);
				LoginStore.isLogged = true;
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleLogout = async () => {
		LoginStore.isLogged = false;
		await SecureStore.deleteItemAsync("accessToken");
		await SecureStore.deleteItemAsync("refreshToken");
		await SecureStore.deleteItemAsync("loginStoreData");
	};

	const getSecureStorage = async () => {
		const accessToken = await SecureStore.getItemAsync("accessToken");
		const refreshToken = await SecureStore.getItemAsync("refreshToken");
		const loginStoreData = await SecureStore.getItemAsync("loginStoreData");
		console.warn("refreshToken : ", refreshToken);
		console.warn("accessToken : ", accessToken);
		console.warn("loginStoreData : ", loginStoreData);
		console.warn("LoginStore : ", LoginStore);
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

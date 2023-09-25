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
			console.log("그냥토큰의 엑세스토큰:", tokenData.accessToken);
			try {
				const data = await axios.post(url, JSON.stringify(tokenData), {
					headers: {
						"Content-Type": "application/json",
						charset: "utf-8",
					},
					timeout: 1000,
				});

				console.warn("여기까지 찍히나 봅시다");
				console.warn("data : ", data.data);
				await SecureStore.setItemAsync(
					"accessToken",
					data.data.data.accessToken,
				);
				await SecureStore.setItemAsync(
					"refreshToken",
					data.data.data.refreshToken,
				);
				stores.LoginStore.isLogged = true;
			} catch (error: any) {
				console.error("Error Message:", error.message);
				if (error.response) {
					console.error("Response Data:", error.response.data);
					console.error("Response Status:", error.response.status);
					console.error("Response Headers:", error.response.headers);
				} else if (error.request) {
					console.error("Request:", error.request);
				}
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
		console.log(accessToken);
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

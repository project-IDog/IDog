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
				await SecureStore.setItemAsync("JWT", data.data.data);
				LoginStore.isLogged = true;
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleLogout = async () => {
		LoginStore.isLogged = true;
		await SecureStore.deleteItemAsync("JWT");
	};

	const getSecureStorage = async () => {
		const JWT = await SecureStore.getItemAsync("JWT");
		console.warn(JSON.parse(JWT || "{}"));
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

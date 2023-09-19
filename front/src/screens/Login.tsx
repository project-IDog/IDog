import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import { Button, View } from "react-native";
import { ANDROID_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: ANDROID_CLIENT_ID,
	});

	const handleSignInWithGoogle = async () => {
		if (response?.type === "success") {
			const tokenData = {
				idToken: response.authentication?.idToken,
				refreshToken: response.authentication?.refreshToken,
				accessToken: response.authentication?.accessToken,
			};
			await SecureStore.setItemAsync("token", JSON.stringify(tokenData));
		}
	};

	const handleLogout = async () => {
		await SecureStore.deleteItemAsync("token");
	};

	const getSecureStorage = async () => {
		const token = await SecureStore.getItemAsync("token");
		console.warn(JSON.parse(token || "{}"));
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
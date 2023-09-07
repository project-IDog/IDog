import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, View, Text } from "react-native";
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";
import { useEffect } from "react";
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	const [request, response, promptAsync] = Google.useAuthRequest({
		webClientId: WEB_CLIENT_ID,
		androidClientId: ANDROID_CLIENT_ID,
	});
	const [userInfo, setUserInfo] = React.useState(null);

	const handleSignInWithGoogle = async () => {
		const user = await AsyncStorage.getItem("@user");
		if (!user) {
			if (response?.type === "success") {
				await getUserInfo(response.authentication?.accessToken);
			}
		} else {
			setUserInfo(JSON.parse(user));
		}
	};

	const getUserInfo = async (token: any) => {
		if (!token) return;
		try {
			const response = await fetch(
				"https://www.googleapis.com/oauth2/v3/userinfo",
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			const userInfoResponse = await response.json();
			await AsyncStorage.setItem("@user", JSON.stringify(userInfoResponse));
			setUserInfo(userInfoResponse);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		handleSignInWithGoogle();
	}, [response]);

	return (
		<View>
			<Text>{JSON.stringify(userInfo, null, 2)}</Text>
			<Button
				disabled={!request}
				title="Login"
				onPress={() => {
					promptAsync();
				}}
			/>
			<Button title="logout" onPress={() => AsyncStorage.removeItem("@user")} />
		</View>
	);
};

export default Login;

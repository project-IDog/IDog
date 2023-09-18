import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, View, Text } from "react-native";
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";
import { useEffect } from "react";

// 로그인 버튼 누르면 웹 브라우저가 열리고, 구글 로그인 페이지로 이동함.
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	// 안드로이드, 웹 클라이언트 아이디를 사용하여 인증 요청 보냄.
	// Google 인증 요청을 위한 훅 초기화
	// promptAsync: 인증 요청 보냄.
	const [request, response, promptAsync] = Google.useAuthRequest({
		// webClientId: WEB_CLIENT_ID,
		androidClientId: ANDROID_CLIENT_ID,
	});

	const [userInfo, setUserInfo] = React.useState(null);

	// Google 로그인 처리하는 함수
	const handleSignInWithGoogle = async () => {
		const user = await AsyncStorage.getItem("@user");
		if (!user) {
			if (response?.type === "success") {
				// 인증 요청에 대한 응답이 성공이면, 토큰을 이용하여 유저 정보를 가져옴.
				await getUserInfo(response.authentication?.accessToken);
				console.log(response);
			}
		} else {
			// 유저 정보가 이미 있으면, 유저 정보를 가져옴.
			setUserInfo(JSON.parse(user));
		}
	};

	// 토큰을 이용하여 유저 정보를 가져오는 함수
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
			// 유저 정보를 AsyncStorage에 저장, 상태업뎃
			await AsyncStorage.setItem("@user", JSON.stringify(userInfoResponse));
			setUserInfo(userInfoResponse);
		} catch (e) {
			console.log(e);
		}
	};

	const handleLogout = async () => {
		await AsyncStorage.removeItem("@user");
		setUserInfo(null);
	};

	// Google 인증 응답이 바뀔때마다 실행
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
			<Button title="logout" onPress={() => handleLogout()} />
		</View>
	);
};

export default Login;

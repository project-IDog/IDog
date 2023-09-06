import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button } from "react-native";
import { WEB_CLIENT_ID } from "@env";
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId: WEB_CLIENT_ID,
		iosClientId: WEB_CLIENT_ID,
		androidClientId: WEB_CLIENT_ID,
		webClientId: WEB_CLIENT_ID,
	});

	React.useEffect(() => {
		if (response?.type === "success") {
			const { authentication } = response;
		}
	}, [response]);

	return (
		<Button
			disabled={!request}
			title="Login"
			onPress={() => {
				promptAsync();
			}}
		/>
	);
};

export default Login;

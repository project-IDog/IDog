import axios from "axios";
import * as Sentry from "@sentry/react-native";
import * as SecureStore from "expo-secure-store";

const getValueFor = async (key: string) => {
	return await SecureStore.getItemAsync(key);
};

const instance = axios.create({
	baseURL: "https://idog.store/api",
	timeout: 1000,
});

instance.interceptors.request.use(
	async (config) => {
		config.headers["Content-Type"] = "application/json; charset=utf-8";
		config.headers["Authorization"] = `Bearer ${await getValueFor(
			"accessToken",
		)}`;
		return config;
	},
	(error) => {
		console.error(error);
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
		console.log("response", response);
		return response;
	},
	async (error) => {
		if (error.response.status === 400) {
			alert(
				"세션이 만료되었습니다. 해당 서비스는 재 로그인 이후 이용 가능합니다.",
			);
			return "session expire";
		}

		if (error.response.status === 500) {
			Sentry.captureMessage("서버 에러");
			alert("시스템 에러, 관리자에게 문의 바랍니다.");
		}

		console.error(error);
	},
);

export default instance;

// import axios, { AxiosError } from "axios";
// import * as Sentry from "@sentry/react-native";
// import * as SecureStore from "expo-secure-store";

// const getValueFor = async (key: string) => {
// 	return await SecureStore.getItemAsync(key);
// };

// const setRequestHeaders = async (config) => {
// 	config.headers["Content-Type"] = "application/json; charset=utf-8";
// 	config.headers["Authorization"] = `Bearer ${await getValueFor(
// 		"accessToken",
// 	)}`;
// 	return config;
// };

// const handleResponseSuccess = (response) => {
// 	console.log("Success response", response);
// 	return response;
// };

// const handleRequestError = (error: AxiosError) => {
// 	console.error("handleRequestError :", error);
// 	return Promise.reject(error);
// };

// const handleResponseError = async (error: AxiosError) => {
// 	console.log("handleResponseError :", error);
// 	if (!error.response) return;

// 	const { status, config } = error.response;
// 	console.log("status :", status);
// 	if (status === 400) {
// 		alert(
// 			"세션이 만료되었습니다. 해당 서비스는 재 로그인 이후 이용 가능합니다.",
// 		);
// 		return "session expire";
// 	} else if (status === 401) {
// 		try {
// 			const { data } = await axios.post(
// 				"https://idog.store/api/user/token",
// 				{},
// 				{
// 					headers: {
// 						"Content-Type": "application/json; charset=utf-8",
// 						Authorization: `Bearer ${await getValueFor("refreshToken")}`,
// 					},
// 				},
// 			);
// 			console.log("data :", data);
// 			if (data.message === "액세스 토큰 발급 완료") {
// 				await SecureStore.setItemAsync("accessToken", data.data.accessToken);
// 				return axios(config);
// 			}
// 		} catch (error) {
// 			alert("토큰 갱신에 실패했습니다. 다시 로그인 해주세요.");
// 			return Promise.reject(error);
// 		}
// 	} else if (status === 500) {
// 		Sentry.captureMessage("서버 에러");
// 		alert("시스템 에러, 관리자에게 문의 바랍니다.");
// 	}
// 	console.error(error);
// 	return Promise.reject(error);
// };

// const instance = axios.create({
// 	baseURL: "https://idog.store/api",
// 	timeout: 1000,
// });

// instance.interceptors.request.use(setRequestHeaders, handleRequestError);
// instance.interceptors.response.use(handleResponseSuccess, handleResponseError);

// export default instance;

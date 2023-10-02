import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Sentry from "@sentry/react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const CommonLayout = ({ children }: any) => {
	const [renderError, setRenderError] = useState<Boolean>();
	const navigation = useNavigation();

	useEffect(() => {
		const handleRenderError = (error: any, isFatal: any) => {
			Sentry.captureMessage("화면 렌더링 에러");
			setRenderError(true);
		};

		const checkExpired = async () => {
			const sessionStatus = await SecureStore.getItemAsync("session_expired");
			if(sessionStatus){
				if(sessionStatus === "expired"){
					await SecureStore.setItemAsync("session expired", "ok");
					navigation.navigate("Login");
				}
			}
		} 

		checkExpired();

		ErrorUtils.setGlobalHandler(handleRenderError);
	}, []);

	// if (renderError) {
	// 	return <Text>시스템 에러, 불편을 끼쳐드려 죄송합니다.</Text>;
	// }

	return (
		<>
			<SafeAreaProvider>
				<SafeAreaView edges={["top", "right", "bottom", "left"]}>
					<ScrollView>{children}</ScrollView>
				</SafeAreaView>
			</SafeAreaProvider>
		</>
	);
};

export default CommonLayout;

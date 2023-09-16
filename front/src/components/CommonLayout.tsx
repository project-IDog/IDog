import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Sentry from "@sentry/react-native";

const CommonLayout = ({ children }: any) => {
	const [renderError, setRenderError] = useState<Boolean>();

	useEffect(() => {
		const handleRenderError = (error: any, isFatal: any) => {
			Sentry.captureMessage("화면 렌더링 에러");
			setRenderError(true);
		};

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

const styles = StyleSheet.create({});

export default CommonLayout;

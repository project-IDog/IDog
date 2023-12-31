import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Sentry from "@sentry/react-native";
import { sentry_dsn } from "@env";
import React, { useEffect } from "react";

import Main from "./src/screens/Main";
import Album from "./src/screens/Album";
import SideMenu from "./src/components/SideMenu";
import Profile from "./src/screens/Profile";
import CreateProfile from "./src/screens/CreateProfile";
import EditProfile from "./src/screens/EditProfile";
import MyPage from "./src/screens/MyPage";
import EditMyPage from "./src/screens/EditMyPage";
import Adoption from "./src/screens/Adoption";
import CreateFeed from "./src/screens/CreateFeed";
import DetailFeed from "./src/screens/DetailFeed";
import Walk from "./src/screens/Walk";
import Login from "./src/screens/Login";
import Three from "./src/screens/MemorialPark";
import CreateWalletMain from "./src/screens/CreateWalletMain";
import AgreeWallet from "./src/screens/AgreeWallet";
import CreateWalletPassword from "./src/screens/CreateWalletPassword";
import ProtectWallet from "./src/screens/ProtectWallet";
import Ipfs from "./src/screens/Ipfs";
import Widget from "./src/screens/Widget";
import CurrentAppState from "./src/components/CurrentAppState";
import ChoiceDog from "./src/screens/ChoiceDog";
import MemorialParkDetail from "./src/screens/MemorialParkDetail";
import WalkStatistics from "./src/components/WalkStatistics";
import ShowPrivate from "./src/screens/ShowPrivate";
// import SplashScreen from "react-native-splash-screen";

LogBox.ignoreAllLogs();

const App = () => {
	const Stack = createNativeStackNavigator();

	Sentry.init({
		dsn: sentry_dsn,
		tracesSampleRate: 1.0,
	});
	// useEffect(() => {
	// 	SplashScreen.hide();
	// }, []);

	return (
		<>
			<CurrentAppState />
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Main"
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name="Main" component={Main} />
					<Stack.Screen name="Album" component={Album} />
					<Stack.Screen name="SideMenu" component={SideMenu} />
					<Stack.Screen name="Profile" component={Profile} />
					<Stack.Screen name="CreateProfile" component={CreateProfile} />
					<Stack.Screen name="EditProfile" component={EditProfile} />
					<Stack.Screen name="MyPage" component={MyPage} />
					<Stack.Screen name="EditMyPage" component={EditMyPage} />
					<Stack.Screen name="Adoption" component={Adoption} />
					<Stack.Screen name="CreateFeed" component={CreateFeed} />
					<Stack.Screen name="DetailFeed" component={DetailFeed} />
					<Stack.Screen name="Walk" component={Walk} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="CreateWalletMain" component={CreateWalletMain} />
					<Stack.Screen name="AgreeWallet" component={AgreeWallet} />
					<Stack.Screen name="ShowPrivate" component={ShowPrivate} />
					<Stack.Screen
						name="CreateWalletPassword"
						component={CreateWalletPassword}
					/>
					<Stack.Screen name="ProtectWallet" component={ProtectWallet} />
					<Stack.Screen name="Three" component={Three} />
					<Stack.Screen
						name="MemorialParkDetail"
						component={MemorialParkDetail}
					/>
					<Stack.Screen name="Ipfs" component={Ipfs} />
					<Stack.Screen name="Widget" component={Widget} />
					<Stack.Screen name="ChoiceDog" component={ChoiceDog} />
					<Stack.Screen name="WalkStatistics" component={WalkStatistics} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default Sentry.wrap(App);

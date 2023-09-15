import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Sentry from "@sentry/react-native"
import {sentry_dsn} from "@env";

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
import Ani from "./src/screens/Ani";
import Three from "./src/screens/Memorial Park";
import CreateWalletMain from "./src/screens/CreateWalletMain";
import AgreeWallet from "./src/screens/AgreeWallet";
import CreateWalletPassword from "./src/screens/CreateWalletPassword";
import ProtectWallet from "./src/screens/ProtectWallet";


const App = () => {
  const Stack = createNativeStackNavigator();

  Sentry.init({
    dsn: sentry_dsn,
    tracesSampleRate: 1.0,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
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
        <Stack.Screen name="CreateWalletPassword" component={CreateWalletPassword} />
        <Stack.Screen name="ProtectWallet" component={ProtectWallet} />
		<Stack.Screen name="Ani" component={Ani} />
		<Stack.Screen name="Three" component={Three} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default Sentry.wrap(App);

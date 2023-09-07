import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from "./src/screens/Main"
import Album from "./src/screens/Album"
import SideMenu from "./src/components/SideMenu"
import Profile from "./src/screens/Profile"
import CreateProfile from "./src/screens/CreateProfile"
import EditProfile from "./src/screens/EditProfile"
import MyPage from './src/screens/MyPage';
import EditMyPage from './src/screens/EditMyPage';

const App = () => {
  const Stack = createNativeStackNavigator();
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

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

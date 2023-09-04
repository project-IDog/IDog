import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Album from "./src/Album";
import Test from "./src/Test";

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="dd" component={Test} />
        <Stack.Screen name="Album" component={Album} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

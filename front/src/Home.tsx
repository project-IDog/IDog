import { Text, View, Button } from "react-native";

const Home = ({ navigation }: any) => {
  return (
    <View>
      <Text>홈화면이에용</Text>
      <Button
        title="앨범"
        onPress={() => navigation.navigate("Album")}
      ></Button>
      <Button
        title="테스트"
        onPress={() => navigation.navigate("Test")}
      ></Button>
    </View>
  );
};

export default Home;

import { View, Text, Image, TouchableOpacity} from "react-native";
import IconButtonLayout from "../styles/iconButtonLayout";
import { useNavigation } from '@react-navigation/native';
import IndexStore from "../stores/IndexStore";

const IconButton = ({desc, title, iconImage, movePage} : any) => {
  const navigation = useNavigation();
  const {LoginStore} = IndexStore();

  const authHandling = (pageName: string) => {
    if(pageName === "Three"){
      navigation.navigate(pageName);
      return;
    }

    if(LoginStore.isLogged){
      navigation.navigate(pageName);
    }else{
      alert("해당 서비스는 로그인 후 이용 가능합니다.");
    }
  }
  return(
        <>
          <TouchableOpacity activeOpacity={0.7} onPress={() => authHandling(movePage)}>
            <View style={IconButtonLayout.iconButtonWrap}>
              <View>
                <Text style={IconButtonLayout.iconButtonDesc}>{desc}</Text>
                <Text style={IconButtonLayout.iconButtonTitle}>{title}</Text>
              </View>
              <View>
                <Image
                  source={iconImage}
                  style={IconButtonLayout.iconButtonIcon}
                />
              </View>
            </View>
          </TouchableOpacity>
        </>
    )
}



export default IconButton;
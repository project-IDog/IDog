import { View, Text, Image, TouchableOpacity} from "react-native";
import IconButtonLayout from "../styles/iconButtonLayout";
import { useNavigation } from '@react-navigation/native';

const IconButton = ({desc, title, iconImage} : any) => {
  const navigation = useNavigation();
  return(
        <>
          <TouchableOpacity activeOpacity={0.7}>
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
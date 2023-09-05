import {View, Text, Image} from "react-native";

const IconButton = ({desc, title, iconImage} : any) => {
    return(
        <>
            <View>
              <View>
                <Text>{desc}</Text>
                <Text>{title}</Text>
              </View>
              <View>
                <Image
                  source={iconImage}
                />
              </View>
            </View>
        </>
    )
}

export default IconButton;
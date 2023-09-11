import {StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import {responsiveWidth, responsiveHeight} from "react-native-responsive-dimensions"
import { useNavigation } from '@react-navigation/native';

const SideMenuIcon = ({title, imageIcon, movePage}: any) => {
    const navigation = useNavigation();
    return(
        <>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(movePage)}>
                <View style={styles.iconWrap}>
                    <Image
                        source={imageIcon}
                        style={styles.sideMenuIcon}
                    />
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    iconWrap:{
        marginHorizontal:responsiveWidth(4),
        marginTop:25,
    },
    sideMenuIcon:{
        width:44,
        height:44,
    },
    text:{
        fontSize:10,
        fontWeight:"500",
        color:"#494949",
        marginTop:4,
    }
});

export default SideMenuIcon;
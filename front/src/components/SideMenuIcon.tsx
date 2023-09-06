import {StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import {responsiveWidth, responsiveHeight} from "react-native-responsive-dimensions"

const SideMenuIcon = ({title, imageIcon}: any) => {
    return(
        <>
            <TouchableOpacity activeOpacity={0.7}>
                <View style={styles.iconWrap}>
                    <Image
                        source={imageIcon}
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
    text:{
        fontSize:10,
        fontWeight:"500",
        color:"#494949",
        marginTop:4,
    }
});

export default SideMenuIcon;
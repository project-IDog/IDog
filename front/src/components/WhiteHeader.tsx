import {View, Text, Image, StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import WhitePreview from "../../assets/images/white-preview-icon.png"
import WhiteHamburgerIcon from "../../assets/images/white-hamburger-menu.png"

const WhiteHeader = () => {
    return(
        <>
            <View style={styles.whiteHeaderWrap}>
                <Image
                    source={WhitePreview}
                />
                <View style={styles.logoWrap}>
                    <Text style={styles.logoTitle}>LOGO</Text>
                    <View style={styles.verticalLine}></View>
                    <Text style={styles.headerTitle}>프로필 만들기</Text>
                </View>
                <Image
                    source={WhiteHamburgerIcon}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    whiteHeaderWrap:{
        height:80,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:responsiveWidth(2),
    },
    logoWrap:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    logoTitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#FFFFFF",
    },
    verticalLine:{
        width:2,
        height:20,
        backgroundColor:"#FFFFFF",
        marginHorizontal:10,
    },
    headerTitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#FFFFFF",
    }
});

export default WhiteHeader;
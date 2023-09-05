import {StyleSheet} from "react-native";
import {responsiveWidth, responsiveHeight} from "react-native-responsive-dimensions"

const SideMenuLayout = StyleSheet.create({
    sideMenuWrap:{
        width: responsiveWidth(70),
        height: responsiveHeight(100),
        position:"absolute",
        top:0,
        left:0,
        backgroundColor:"#FFFFFF",
        zIndex:999,
    },
    sideMenuHeader:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: responsiveWidth(2),
        paddingVertical: responsiveHeight(4),
    },
    sideMenuLogo:{
        fontSize:24,
        fontWeight:"900",
        color:"#EE8A72",
    },

    navWrap:{
        paddingHorizontal:responsiveWidth(2),
    },
    navTitle:{
        fontSize:16,
        fontWeight: "700",
        color:"#000000",
    },
    boldNavTitle:{
        color:"#EE8A72",
    },
    navDesc:{
        fontSize:12,
        fontWeight:"400",
        color:"#BBBBBB",
    },

    navFlex:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
    },
})

export default SideMenuLayout;
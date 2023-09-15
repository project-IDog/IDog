import {StyleSheet} from "react-native"
import { responsiveWidth } from "react-native-responsive-dimensions";

const WalletLoadingLayout = StyleSheet.create({
    modalBack:{
        width:"100%",
        height:"100%",
        position:"absolute",
        top:0,
        left:0,
        backgroundColor:"#000",
        opacity:0.6,
    },
    modalMain:{
        zIndex:3,
        width:"100%",
        height:"100%",
        position:"absolute",
        top:0,
        left:0,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    petAnimation:{
        zIndex:4,
    },
    loadingText:{
        fontSize:14,
        fontWeight:"700",
        color:"#FFF",
        zIndex:4,
    }
})

export default WalletLoadingLayout;
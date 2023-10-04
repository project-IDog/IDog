import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const ProtectWalletLayout = StyleSheet.create({
    titleWrap:{
        marginTop:25,
        paddingHorizontal:responsiveWidth(4),
    },
    mainTitle:{
        fontSize:24,
        fontWeight:"700",
        color:"#616166",
    },
    subTitle:{
        fontSize:12,
        fontWeight:"500",
        color:"#B1B1B7",
        marginTop:8,
    },
    newmonicWrap:{
        marginHorizontal:responsiveWidth(4),
        height:100,
        backgroundColor:"#D9D9D9",
        borderRadius:12,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:33,
    },
    newmonicInfoWrap:{
        paddingHorizontal:responsiveWidth(4),
        marginTop:11,
    },
    newmonicContents:{
        fontSize:16,
        fontWeight:"500",
        color:"#2F3241",
        textAlign:"center",
        lineHeight:24,
        paddingHorizontal:responsiveWidth(6),
    },
    newmonicInfoText:{
        fontSize:10,
        fontWeight:"500",
        color:"#2F3241",
    },
    createButton:{
        width:responsiveWidth(92),
        height:50,
        backgroundColor:"#EE8A72",
        marginHorizontal:responsiveWidth(4),
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:64,
        marginBottom:30,
    },
    createButtonText:{
        fontSize:16,
        fontWeight:"700",
        color:"#FFFFFF",
    },
})

export default ProtectWalletLayout;
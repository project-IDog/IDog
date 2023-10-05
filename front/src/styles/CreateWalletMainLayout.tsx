import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const CreateWalletMainLayout = StyleSheet.create({
    createTitleWrap:{
        marginTop:30,
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
    walletCenterWrap:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    idogWalletImg:{
        width:240,
        height:240,
        marginTop:"25%",
    },
    buttonWrap:{
        paddingHorizontal:responsiveWidth(4),
        marginTop:"25%",
        marginBottom:28,
    },
    reButton:{
        width:"100%",
        height:50,
        backgroundColor:"#EE8A72",
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    reButtonText:{
        fontSize:16,
        fontWeight:"700",
        color:"#FFFFFF",
    },
    createButton:{
        width:"100%",
        height:50,
        backgroundColor:"#E9ECF5",
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:6,
    },
    createButtonText:{
        fontSize:16,
        fontWeight:"400",
        color:"#21242B",
    },
})

export default CreateWalletMainLayout;
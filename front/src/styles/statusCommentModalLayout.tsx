import {StyleSheet, Dimensions} from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const StatusCommentModalLayout = StyleSheet.create({
    modalBack:{
        width:"100%",
        height: "100%",
        position:"absolute",
        backgroundColor:"#000",
        opacity:0.5,
    },
    modal:{
        width:responsiveWidth(70),
        height:responsiveHeight(50),
        backgroundColor:"#FFFFFF",
        position:"absolute",
        top:responsiveHeight(50) - responsiveHeight(25),
        left:responsiveWidth(50) - responsiveWidth(35),
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:responsiveWidth(4),
    },
    modalTitleText:{
        fontSize:16,
        fontWeight:"500",
        color:"#A8A9AC",
        marginTop:16,
        textAlign:"center",
        lineHeight:28,
    },
    commentInput:{
        width:"100%",
        height:40,
        backgroundColor:"#E9ECF5",
        padding:10,
        marginTop:16,
    },
    buttonWrap:{
        width:"100%",
        marginTop:20,
    },
    submitButton:{
        width:"100%",
        height:45,
        backgroundColor:"#EE8A72",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
    },
    submitButtonText:{
        fontSize:18,
        fontWeight:"400",
        color:"#FFFFFF",
    },
    cancelButton:{
        width:"100%",
        height:45,
        backgroundColor:"#E9ECF5",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginTop:7,
    },
    cancelButtonText:{
        fontSize:18,
        fontWeight:"400",
        color:"#21242B",
    }
})

export default StatusCommentModalLayout;
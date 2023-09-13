import { StyleSheet } from "react-native";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const CreateWalletPasswordLayout = StyleSheet.create({
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

    formWrap:{
        marginTop:28,
        paddingHorizontal:responsiveWidth(4),
    },
    formTitle:{
        fontSize:10,
        fontWeight:"500",
        color:"#B6B6B6",
        marginTop:14,
    },
    formInput:{
        borderWidth:1,
        borderColor:"#9D9D9D",
        borderRadius:2,
        padding:2,
        marginTop:7,
    },
    checkWrap:{
        marginTop:14,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    checkbox:{
        borderWidth:1,
        borderRadius:2,
        color:"#9D9D9D",
    },
    checkInfo:{
        marginLeft:8,
        marginRight:responsiveWidth(4),
        fontSize:10,
        fontWeight:"500",
        color:'#B1B1B7',
    },
    buttonWrap:{
        paddingHorizontal:responsiveWidth(4),
        marginTop:34,
    },
    newCreateButton:{
        width:"100%",
        marginBottom:35,
        height:50,
        backgroundColor:"#EE8A72",
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    newCreateButtonText:{
        fontSize:16,
        fontWeight:"700",
        color:"#FFFFFF",
    }
});

export default CreateWalletPasswordLayout;
import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";


const EditMypageLayout = StyleSheet.create({
    editMyPageTitleWrap:{
        marginTop:-40,
        paddingHorizontal: responsiveWidth(4),
    },
    editMyPageTitle:{
        fontSize:22,
        fontWeight:"700",
        color:"#3B3F42",
    },
    boldEditMyPageTitle:{
        color:"#EE8A72",
    },
    editMyPageSubTitle:{
        fontSize:12,
        fontWeight:"500",
        color:"#7D8182",
        marginTop:6,
    },
    editMyPageFormWrap:{
        paddingHorizontal:responsiveWidth(4),
        marginTop:16,
    },
    editMyPageFormText:{
        fontSize:12,
        fontWeight:"500",
        color:"#B6B6B6",
        marginTop:14,
    },
    editMyPageFormInput:{
        height:36,
        borderWidth:1,
        borderColor:"#9D9D9D",
        marginTop:7,
        padding:6,
    },
    showPrivateKeyInput:{
        height:36,
        borderWidth:1,
        borderColor:"#9D9D9D",
        backgroundColor:"#9D9D9D",
        marginTop:7,
        padding:8,
        color:"#FFF",
    },
    editMyPageButtonWrap:{
        paddingHorizontal:responsiveWidth(4),
        marginTop:33,
        marginBottom:42,
    },
    editButton:{
        height:50,
        backgroundColor:"#E59474",
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    editButtonText:{
        fontSize:16,
        fontWeight:"700",
        color:"#FFFFFF",
    },
    cancelButton:{
        height:50,
        backgroundColor:"#E9ECF5",
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:12,
    },
    cancelButtonText:{
        fontSize:16,
        fontWeight:"400",
        color:"#21242B",
    },
})

export default EditMypageLayout;
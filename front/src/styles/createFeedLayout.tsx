import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const CreateFeedLayout = StyleSheet.create({
    createTitle:{
        marginTop:2,
        paddingHorizontal:responsiveWidth(4),
    },
    createTitleDesc:{
        fontSize:12,
        fontWeight:"400",
        color:"#C8C9CE",
    },
    createMainTitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#535458",
        marginTop:3,
    },
    photoUploadWrap:{
        width:responsiveWidth(92),
        height:132,
        borderWidth:2,
        borderColor:"#E4E4E4",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginHorizontal:responsiveWidth(4),
        marginTop:26,
    },
    imageOnLayout:{
        width:200,
        height:200,
        marginHorizontal:responsiveWidth(4),
        marginTop:13,
    },
    createDescWrap:{
        width:responsiveWidth(92),
        height:132,
        borderWidth:2,
        borderColor:"#E4E4E4",
        padding:responsiveWidth(4),
        marginHorizontal:responsiveWidth(4),
        borderRadius:10,
        marginTop:13,

    },
    buttonWrap:{
        width:responsiveWidth(92),
        marginHorizontal:responsiveWidth(4),
        marginTop:16,
        marginBottom:22,
    },

    submitButton:{
        width:"100%",
        height:50,
        backgroundColor:"#EE8A72",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
    },
    submitButtonText:{
        fontSize:16,
        fontWeight:"700",
        color:"#FFFFFF",
    },
    cancelButton:{
        width:"100%",
        height:50,
        backgroundColor:"#E9ECF5",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginTop:6,
    },
    cancelButtonText:{
        fontSize:16,
        fontWeight:"400",
        color:"#21242B",
    },
})

export default CreateFeedLayout;
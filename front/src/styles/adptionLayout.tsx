import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const AdoptionLayout = StyleSheet.create({
    adoptionTitleWrap:{
        marginTop:-44,
        paddingHorizontal: responsiveWidth(4),
    },
    adoptionTitleDesc:{
        fontSize:12,
        fontWeight:"400",
        color:"#000000",
    },
    adoptionMainTitle:{
        fontSize:28,
        fontWeight:"700",
        color:"#000000",
        marginTop:3,
    },
    myPetList:{
        paddingHorizontal:responsiveWidth(4),
        marginTop:22,
    },
    myPetThumbnail:{
        marginHorizontal:responsiveWidth(1),
        borderWidth:6,
        borderColor:"#EE8A72",
    },
    myPetThumbnaulDisable:{
        marginHorizontal:responsiveWidth(1),
    },

    adoptionFormWrap:{
        paddingHorizontal:responsiveWidth(4),
        marginTop:22,
    },
    adoptionFormTitle:{
        fontSize:12,
        fontWeight:"500",
        color:"#B6B6B6",
        marginTop:14,
    },
    adoptionFormInput:{
        height:36,
        borderWidth:1,
        borderColor:"#9D9D9D",
        marginTop:7,
    },

    adoptionButtonWrap:{
        paddingHorizontal:responsiveWidth(4),
        marginTop:33,
        marginBottom:70,
    },
    submitButton:{
        height:50,
        backgroundColor:"#E59474",
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
        height:50,
        borderRadius:10,
        backgroundColor:"#E9ECF5",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:12,
    },
    cancelButtonText:{
        fontSize:16,
        fontWeight:"500",
        color:"#21242B",
    },

})

export default AdoptionLayout;
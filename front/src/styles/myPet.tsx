import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const MyPetLayout = StyleSheet.create({
    myPetWrap:{
        paddingHorizontal: responsiveWidth(1),
    },
    myPetBg:{
        width:120,
        height:150,
    },
    darkLayout:{
        width:"100%",
        height:"100%",
        backgroundColor:"#000",
        opacity:0.5,
        borderRadius:10,
    },
    myPetInfo:{
        height:"100%",
        position:"absolute",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        paddingHorizontal:15,
    },
    myPetCreatedAt:{
        fontSize:8,
        fontWeight:"500",
        color:"#FFFFFF",
    },
    myPetNameTitle:{
        fontSize:16,
        fontWeight:"700",
        color:"#FFFFFF",
        marginTop:1,
    },
    myPetName:{
        fontSize:16,
        fontWeight:"700",
        color:"#FFFFFF",
    },
    myPetSpecies:{
        fontSize:8,
        fontWeight:"500",
        color:"#FFFFFF",
        marginTop:7,
    },
    myPetEditButton:{
        width:42,
        height:16,
        backgroundColor:"#E59474",
        marginTop:12,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    myPetEditButtonText:{
        fontSize:7,
        fontWeight:"400",
        color:"#FFFFFF",
    }
})

export default MyPetLayout;
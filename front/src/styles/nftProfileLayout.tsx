import {StyleSheet} from "react-native"
import { responsiveWidth } from "react-native-responsive-dimensions";

const NftProfileLayout = StyleSheet.create({
    nftProfileWrap:{
        width:100,
        height:132,
    },
    puppyThumbnail:{
        width:100,
        height:132,
    },
    darkLayout:{
        width:"100%",
        height:"100%",
        backgroundColor:"#000",
        opacity:0.15,
        borderRadius:15,
    },
    onNftInfo:{
        position:"absolute",
        zIndex:3,
        paddingHorizontal:responsiveWidth(2),
    },
    myDogName:{
        fontSize:8,
        fontWeight:"400",
        color:"#FFFFFF",
        marginTop:14,
    },
    boldMyDogName:{
        fontWeight:"700",
    },
    createdDateTitle:{
        fontSize:12,
        fontWeight:"400",
        color:"#FFFFFF",
        marginTop:1,
    },
    createdDateContent:{
        fontSize:12,
        fontWeight:"400",
        color:"#FFFFFF",
    },
    myDogSpecies:{
        fontSize:8,
        fontWeight:"400",
        color:"#FFFFFF",
        marginTop:4,
    },
    editButtonWrap:{
        position:"absolute",
        bottom:14,
        zIndex:3,
        paddingHorizontal:responsiveWidth(2),
    },
    editButton:{
        width:50,
        height:14,
        borderWidth:1,
        borderColor:"#FFFFFF",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    editButtonText:{
        fontSize:6,
        fontWeight:"700",
        color:"#FFFFFF",
    },
    
})

export default NftProfileLayout;
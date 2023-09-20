import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const DetailFeedLayout = StyleSheet.create({
    bgImg:{
        width:"100%",
        height:"100%",
        position:"absolute",
        zIndex:-1,
    },
    trashIconWrap:{
        padding:10,
        marginTop:80,
        backgroundColor:"#5C5C5C",
        borderRadius:50,
        position:"absolute",
        right:0,
        marginHorizontal:responsiveWidth(4),
    },
    trashIcon:{
        width:15,
        height:15,
    },
    onInfo:{
        width:responsiveWidth(66),
        marginHorizontal:responsiveWidth(5),
        marginBottom:responsiveHeight(5),
        position:"absolute",
        bottom:0,
    },
    feedContentText:{
        fontSize:18,
        fontWeight:"700",
        color:"#FFFFFF",
    },
    decoWrap:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        marginTop:11,
    },
    firstDecoCircle:{
        marginLeft:0,
    },
    decoCircle:{
        width:10,
        height:10,
        borderRadius:50,
        backgroundColor:"#FFFFFF",
        marginLeft:8,
    }
})

export default DetailFeedLayout;
import { Translate } from "aws-sdk";
import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const AlbumLayout = StyleSheet.create({
    profileWrap:{
        marginTop:3,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:responsiveWidth(4),
        position:"relative",
    },
    myNameTitle:{
        fontSize:22,
        fontWeight:"600",
        color:"#5B5B5B",
        textAlign:"center",
    },
    changeImageWrap:{
        padding:4,
        borderRadius:50,
        backgroundColor:"#EE8A72",
        position:"absolute",
        bottom:0,
        left:responsiveWidth(50) - 49,
    },
    changeImageIcon:{
        
    },
    userPhoto:{
        width:98,
        height:98,
        borderRadius:50,
        marginTop:20,
    },
    newFeedWrap:{
        position:"absolute",
        top:"50%",
        right:responsiveWidth(8),
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    newFeedFlexWrap:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    newFeedIconWrap:{
        width:36,
        height:36,
        backgroundColor:"#EE8A72",
        borderRadius:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    
    newFeedText:{
        fontSize:12,
        fontWeight:"500",
        color:"#C7C7C7",
        marginTop:4,
    },

    statusMessageWrap:{
        marginTop:32,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    statusMessageText:{
        fontSize:14,
        fontWeight:"500",
        color:"#C7C7C7",
        marginLeft:7,
    },
    albumNav:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        marginTop:26,
        marginBottom:19,
    },
    albumNavText:{
        fontSize:16,
        fontWeight:"600",
        color:"#BBBBBB",
        paddingBottom:6,
    },
    activeAlbumNav:{
        fontWeight:"900",
        color:"#797971",
        borderBottomWidth:4,
        borderBottomColor:"#EE8A72",
    },

    photoList:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"center",
    },
    photoItem:{
        width:responsiveWidth(32),
        height:responsiveWidth(32),
        marginHorizontal:responsiveWidth(0.5),
        marginVertical:responsiveWidth(0.5),
    }
})

export default AlbumLayout;
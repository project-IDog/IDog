import { StyleSheet } from "react-native";
import {responsiveWidth, responsiveHeight, responsiveFontSize} from "react-native-responsive-dimensions";

const MainLayout = StyleSheet.create({
    walkMainWrap:{

    },
    walkMainTitle:{
        fontSize:24,
        fontWeight:"700",
        color:"#616166",
        paddingHorizontal:responsiveWidth(5),
    },
    walkBoldText:{
        fontWeight:"700",
        color:"#EE8A72"
    },
    walkMainDesc:{
        fontSize:12,
        fontWeight:"500",
        color:"#B1B1B7",
        paddingHorizontal:responsiveWidth(5),
        marginTop:10,
        lineHeight:18,
    },
    walkMainImg:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        marginTop:42,
    },
    walkButtonWrap:{
        marginTop:20,
        paddingHorizontal:responsiveWidth(5),
    },
    walkRootButton:{
        width:"100%",
        backgroundColor:"#EE8A72",
        height:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    walkRootButtonText:{
        fontSize:16,
        fontWeight:"700",
        color:"#FFFFFF",
    },
    ifNoAuthText:{
        width:"100%",
        textAlign:"center",
        marginTop:7,
        fontSize:12,
        fontWeight:"500",
        color:"#F78874",
    },

    traceWrap:{
        paddingHorizontal:responsiveWidth(5),
        marginTop:77,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    traceMainImg:{
        width:responsiveWidth(40),
        height:responsiveHeight(40),
    },
    traceInfo:{
        marginLeft: responsiveWidth(5),
    },
    traceTitle:{
        fontSize:18,
        fontWeight:"500",
        color:"#373737",
    },
    boldTraceInfo:{
        fontWeight:"900",
    },
    traceDesc:{
        fontSize:12,
        fontWeight:"400",
        color:"#5C5C5C",
        marginTop:20,
    },
    boldTraceDesc:{
        fontWeight:"500",
        color:"#EE8A72",
    },
    createProfileButton:{
        width:responsiveWidth(30),
        height:responsiveHeight(5),
        backgroundColor:"#EE8A72",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:22,
    },
    createProfileButtonText: {
        fontSize:12,
        fontWeight:"700",
        color:"#FFFFFF",
    },

    tribeWrap:{
        marginTop:69,
    },
    tribeMainImg:{
        width:"100%",
    },

    tribeInfoWrap:{
        paddingHorizontal:responsiveWidth(5),
        position:"absolute",
        bottom:0,
    },
    tribeTitle:{
        fontSize:22,
        fontWeight:"700",
        color:"#000000",
    },
    tribeDesc:{
        fontSize:8,
        fontWeight:"500",
        color:"#5C5C5C",
        marginTop:4,
    },
    moveTribeButton:{
        width: responsiveWidth(40),
        height: responsiveHeight(5),
        borderWidth:1,
        borderColor:"#EE8A72",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:7,
    },
    moveTribeButtonText:{
        fontSize:10,
        fontWeight:"500",
        color:"#EE8A72",
    },

    randingButtonWrap:{
        marginTop:41,
        paddingHorizontal: responsiveWidth(5),
        marginBottom:50,
    },
    randingTitle:{
        fontSize:12,
        fontWeight:"400",
        color:"#727272",
        marginBottom:11,
    },
    boldRandingTitle:{
        fontWeight:"700",
        color:"#696A6C",
    },
    flexButtonWrap:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
});

export default MainLayout;
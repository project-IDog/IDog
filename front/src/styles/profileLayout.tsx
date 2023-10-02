import {StyleSheet} from "react-native"
import {responsiveWidth, responsiveHeight} from "react-native-responsive-dimensions"

const ProfileLayout = StyleSheet.create({
    profileWrap:{
        backgroundColor:"#F7F8FC",
        marginTop:-80,
        paddingHorizontal:responsiveWidth(4),
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        paddingVertical:60,
    },
    subTitle:{
        fontSize:14,
        fontWeight:"400",
        color:"#53565D",
    },
    titleWrap:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    mainTitle:{
        fontSize:28,
        fontWeight:"700",
        color:"#373B46",
    },
    rightArrowIcon:{
        marginRight:responsiveWidth(20),
    },
    iconWrap:{
        display:"flex",
        flexDirection:"row",
        overflowX:"scroll",
    },
    myNftWrap:{
        paddingVertical:responsiveHeight(10),
        paddingHorizontal:responsiveWidth(4),
    },
    myNftTitleWrap:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    myNftTitle:{
        fontSize:14,
        fontWeight:"700",
        color:"#0C0C0C",
    },
    myNftMore:{
        fontSize:10,
        fontWeight:"400",
        color:"#A8A8A8",
    },
    nftList:{
        marginTop:23,
    },
    addNewNftWrap: {
        width:100,
        height:132,
        paddingHorizontal:responsiveWidth(2),
        paddingVertical:responsiveHeight(2),
        backgroundColor:"#FFF",
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 60,
        elevation: 1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:10,
    },
    newButtonText:{
        fontSize:10,
        fontWeight:"500",
        color:"#97989A",
        marginTop:6,
    }
})

export default ProfileLayout;
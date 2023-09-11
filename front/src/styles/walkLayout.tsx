import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const WalkLayout = StyleSheet.create({
    calendarTitleWrap:{
        marginTop:-44,
        paddingHorizontal: responsiveWidth(4),
    },
    calendarDesc:{
        fontSize:12,
        fontWeight:"400",
        color:"#C8C9CE",
    },
    calendarTitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#535458",
        marginTop:3,
    },
    calendarWrap:{
        marginHorizontal:responsiveWidth(4),
        borderTopWidth:1,
        borderTopColor:"#C4C4C4",
        borderBottomWidth:1,
        borderBottomColor:"#C4C4C4",
        marginTop:20,
    },
    daysWrap:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:17,
    },
    dayText:{
        
    },
    datesWrap:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:12,
        marginBottom:18,
    }
})

export default WalkLayout;
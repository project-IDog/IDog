import {StyleSheet} from "react-native"

const WeekTimeItemLayout = StyleSheet.create({
    weekTimeItemWrap:{
        width:"100%",
        height:34,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        borderWidth:2,
        borderColor:"#F1F4FB",
        marginTop:4,
    },
    dayBox:{
        width:30,
        height:30,
        backgroundColor:"#F1F4FB",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    dayText:{
        fontSize:14,
        fontWeight:"700",
        color:"#EE8A72",
    },
    withTimeText:{
        fontSize:11,
        fontWeight:"500",
        color:"#8F8F8F",
        paddingHorizontal:10,
    },
    boldTime:{
        fontWeight:"900",
    }
})

export default WeekTimeItemLayout;
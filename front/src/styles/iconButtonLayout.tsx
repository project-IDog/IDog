import { StyleSheet } from "react-native";
import {responsiveWidth, responsiveHeight} from "react-native-responsive-dimensions";

const IconButtonLayout = StyleSheet.create({
    iconButtonWrap:{
      width: responsiveWidth(40),
      backgroundColor:"#F3F8FE",
      borderWidth:1,
      borderColor:"#CACDD4",
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      paddingHorizontal:responsiveWidth(2),
      paddingVertical:responsiveHeight(2),
      marginHorizontal:responsiveWidth(1),
      marginTop:responsiveHeight(1),
    },
    iconButtonDesc:{
        fontSize:8,
        fontWeight:"600",
        color:"#93989C",
    },
    iconButtonTitle:{
        fontSize:14,
        fontWeight: "700",
        color:"#4B76A0",
    },
    iconButtonIcon:{
        width:36,
        height:36,
    }
});

export default IconButtonLayout;
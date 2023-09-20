import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const ChoiceDogLayout = StyleSheet.create({
    createTitle:{
        marginTop:2,
        paddingHorizontal:responsiveWidth(4),
    },
    createTitleDesc:{
        fontSize:12,
        fontWeight:"400",
        color:"#C8C9CE",
    },
    createMainTitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#535458",
        marginTop:3,
    },
    myPetContent:{
        marginTop:20,
        paddingHorizontal:responsiveWidth(4),
        marginBottom:30,
    },
    myPetItem:{
        marginHorizontal:responsiveWidth(1),
    },
});

export default ChoiceDogLayout;
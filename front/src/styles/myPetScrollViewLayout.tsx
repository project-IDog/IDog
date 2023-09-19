import {StyleSheet} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const MyPetScrollView = StyleSheet.create({
    myPetContent:{
        marginTop:20,
        paddingHorizontal:responsiveWidth(4),
    },
    myPetItem:{
        marginHorizontal:responsiveWidth(1),
    },
})

export default MyPetScrollView;
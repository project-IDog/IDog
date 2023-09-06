import {StyleSheet, View, Text, Image} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const ProfileItem = ({desc, title, thumbnail}: any) => {
    return(
        <>
            <View style={styles.itemWrap}>
                <View style={styles.imgWrap}>
                    <Image
                        source={thumbnail}
                        style={styles.iconImg}
                    />
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.iconText}>{desc}</Text>
                    <Text style={styles.iconTitle}>{title}</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    itemWrap:{
        marginHorizontal:responsiveWidth(2),
    },
    imgWrap:{
        width: 110,
        height: 110,
        backgroundColor: "#A1BFF5",
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:20,
    },
    iconImg:{
        width: 60,
        height: 60,
    },
    textWrap:{
        width:110,
        marginTop:14,
    },
    iconText:{
        fontSize:10,
        fontWeight:"500",
        color:"#62656A",
    },
    iconTitle:{
        fontSize:12,
        fontWeight:"700",
        color:"#495058",
    }
});

export default ProfileItem;
import { StyleSheet, View, Text, Image } from 'react-native';
import HamburgerMenu from "../../assets/images/hamburger-menu-icon.png";

const MainHeader = () => {
  return (
    <>
        <View style={styles.header}>
            <Text style={styles.logo}>LOGO</Text>
            <Image
                source={HamburgerMenu}
                style={styles.menuIcon}
            />
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  header:{
    height:80,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  logo:{
    marginLeft:20,
    fontSize:18,
    fontWeight:"700",
    color:"#EE8A72",
  },
  menuIcon:{
    marginRight:20,
  }
});

export default MainHeader;
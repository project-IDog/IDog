import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import HamburgerMenu from "../../assets/images/hamburger-menu-icon.png";
import SideMenu from "./SideMenu";

const MainHeader = () => {
  const [activeSideMenu, setActiveSideMenu] = useState<Boolean>(false);
  const clickHamburger = () => {
    switch (activeSideMenu) {
      case true:
        setActiveSideMenu(false);
        break;
      case false:
        setActiveSideMenu(true);
        break;
    }
  };
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.logo}>LOGO</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={clickHamburger}>
          <Image source={HamburgerMenu} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      {activeSideMenu ? <SideMenu /> : <></>}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "700",
    color: "#EE8A72",
  },
  menuIcon: {
    marginRight: 20,
  },
});

export default MainHeader;

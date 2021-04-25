import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import usrImg from "../../assets/42276047.jpg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Gabriel</Text>
      </View>

      <Image source={usrImg} style={styles.profilePic} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilePic: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  greeting: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 36,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 36,
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantCardProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

export const PlantCardPrimary: React.FC<PlantCardProps> = ({ data }) => {
  return (
    <RectButton style={styles.container}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.name}>{data.name}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "45%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    margin: 10,
  },
  name: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
    marginVertical: 16,
    fontSize: 13,
    paddingHorizontal: 10,
    lineHeight: 23,
  },
});

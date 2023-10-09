import React from "react";
import { Text, StyleSheet } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 12,
    borderWidth: 3,
    borderColor: "white",
    maxWidth: "100%",
  },
});
export default Title;

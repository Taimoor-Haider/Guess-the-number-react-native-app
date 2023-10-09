import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
const Card = ({ children }) => {
  return <View style={styles.inputContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    alignItems: "center",
    marginTop: 36,
    backgroundColor: Colors.primary800,
    marginHorizontal: 24,
    borderRadius: 10,
    elevation: 8, //Only for Android
    //Adding Shadow to IOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export default Card;

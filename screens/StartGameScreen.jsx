import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
  ScrollView,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import PrimaryButton from "../components/game/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/game/ui/Title";
import Card from "../components/game/ui/Card";
const StartGameScreen = ({ onPickNumber }) => {
  const [inputNumber, setInputNumber] = useState("");
  const { width, height } = useWindowDimensions();
  handleInput = (number) => {
    setInputNumber(number);
  };

  resetInputNumber = () => {
    setInputNumber("");
  };
  confirmInputHandler = () => {
    const chosenNumber = parseInt(inputNumber);

    if (isNaN(chosenNumber) || inputNumber < 0 || inputNumber > 99) {
      //Show Alert.
      Alert.alert(
        "Invalid Number!",
        "Please enter a number between 0 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputNumber }]
      );
      return;
    } else {
      console.log("Valid Number");
      onPickNumber(chosenNumber);
    }
  };

  const marginTopDisteance = height < 380 ? 30 : 100;
  return (
    <ScrollView style={styles.rootScreen}>
      <KeyboardAvoidingView style={styles.rootScreen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDisteance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <Text style={styles.instructionText}>Enter a number.</Text>
            <TextInput
              onChangeText={handleInput}
              value={inputNumber}
              style={styles.numberInput}
              maxLength={2}
              keyboardType="decimal-pad"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.centerBtn}>
              <PrimaryButton onPress={resetInputNumber}>Reset</PrimaryButton>
              <PrimaryButton onPress={confirmInputHandler}>
                Confirm
              </PrimaryButton>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

// const deviceHight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHight < 400 ? 30 : 100,
    alignItems: "center",
  },
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    textAlign: "center",
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    fontWeight: "bold",
    marginVertical: 8,
  },
  centerBtn: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartGameScreen;

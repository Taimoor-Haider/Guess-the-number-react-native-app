import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, ScrollView } from "react-native";
import Title from "../components/game/ui/Title";
import NumberContainer from "../components/game/ui/NumberContainer";
import PrimaryButton from "../components/game/ui/PrimaryButton";
import Card from "../components/game/ui/Card";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, gameTerminate }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [wrongGuess, setWrongGuess] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      gameTerminate(wrongGuess.length);
    }
  }, [currentGuess, userNumber, gameTerminate]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  nextGuessHandler = (direction) => {
    //direction =>"Lower" , "Greater"
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Lie", "It is not Possible.", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const randomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(randomNumber);
    setWrongGuess((pre) => [randomNumber, ...pre]);
  };

  const guessRoundsListLength = wrongGuess.length;
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Higher or Lower?
        </Text>
        <View style={{ flexDirection: "row" }}>
          <PrimaryButton onPress={() => nextGuessHandler("higher")}>
            <Ionicons name="md-add" size={24} />
          </PrimaryButton>

          <PrimaryButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} />
          </PrimaryButton>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView>
          {wrongGuess.map((guessRound, index) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - index}
              guess={guessRound}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 16,
  },
  screen: {
    flex: 1,
    padding: 24,
  },
});
export default GameScreen;

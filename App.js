import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";

import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  function pinkedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  function gameOver(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
    setGameIsOver(false);
  }
  let screen = <StartGameScreen onPickNumber={pinkedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} gameTerminate={gameOver} />;
  }

  if (gameIsOver) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartGame={startNewGameHandler}
      />
    );
  }
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        style={[styles.rootScreen]}
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        imageStyle={styles.backImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    // width: "100%",
    // height: "100%",
    flex: 1,
  },
  backImage: {
    opacity: 0.15,
  },
});

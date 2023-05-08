import React from "react";
import { ThemeProvider } from "react-native-elements";
import "./config/firebase";
import RootNavigation from "./navigation/Index";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </>
  );
};

export default App;

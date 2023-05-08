import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/styles";

const Welcome: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.inputContainer, { alignItems: "center", marginTop: 20 }]}
      >
        <Text style={styles.buttonOutlineText}>Welcome to YourJokeBook!</Text>

        <View style={[styles.buttonContainer, { width: "80%" }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign In")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign Up")}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

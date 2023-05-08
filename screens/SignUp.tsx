import { StackScreenProps } from "@react-navigation/stack";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../styles/styles";

const auth = getAuth();

const SignUp: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [pwCheck, setPwCheck] = useState("");
  const [error, setError] = useState("");

  const signUpButton = async () => {
    if (value.email === "" || value.password === "") {
      setError("Email and password are mandatory.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    } else if (value.password !== pwCheck) {
      setError("Passwords do not match.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Sign In");
    } catch (error: any) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {error && (
        <View style={styles.error}>
          <Text>{error}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          style={styles.input}
          returnKeyType="done"
        />
        <TextInput
          placeholder="Password"
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          style={styles.input}
          secureTextEntry
          returnKeyType="done"
        />
        <TextInput
          placeholder="Confirm password"
          value={pwCheck}
          onChangeText={(text) => setPwCheck(text)}
          style={styles.input}
          secureTextEntry
          returnKeyType="done"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={signUpButton} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

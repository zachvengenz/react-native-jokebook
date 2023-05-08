import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../styles/styles";
import { FormValues } from "../interfaces";

const auth = getAuth();

const SignIn = () => {
  const [value, setValue] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const signInButton = async () => {
    if (value.email === "" || value.password === "") {
      setError("Enter both email and password.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={signInButton} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

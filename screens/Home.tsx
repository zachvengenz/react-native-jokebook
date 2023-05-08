import { StackScreenProps } from "@react-navigation/stack";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuthentication } from "../hooks/useAuth";
import { styles } from "../styles/styles";

const auth = getAuth();

const Home: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text
            style={[
              styles.buttonOutlineText,
              { marginBottom: 10, fontWeight: "bold" },
            ]}
          >
            Welcome to YourJokeBook!
          </Text>
          <Text>You are currently signed in as</Text>
          <Text>{user?.email}!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 10 }]}
            onPress={() => navigation.navigate("Write Jokes")}
          >
            <Text style={styles.buttonText}>Write jokes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 10 }]}
            onPress={() => navigation.navigate("Jokebook")}
          >
            <Text style={styles.buttonText}>Jokebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 10 }]}
            onPress={() => navigation.navigate("Jokes")}
          >
            <Text style={styles.buttonText}>Fetch jokes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 10 }]}
            onPress={() => navigation.navigate("Chuck Norris facts")}
          >
            <Text style={styles.buttonText}>Chuck Norris facts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={() => signOut(auth)}
          >
            <Text style={styles.buttonOutlineText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;

import { getAuth } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { app, database } from "../config/firebase";
import { styles } from "../styles/styles";

const WriteJokes = () => {
  const [title, setTitle] = useState("");
  const [joke, setJoke] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [jokeTitles, setJokeTitles] = useState([]);

  const auth = getAuth(app);
  const user = auth.currentUser;
  const userId = user?.uid;

  useEffect(() => {
    try {
      const jokesRef = ref(database, `users/${userId}`);
      onValue(jokesRef, async (snapshot) => {
        const data = await snapshot.val();
        if (data !== null && typeof data === "object") {
          setJokeTitles(Object.values(data));
        }
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  // check if a joke's title already exists in db
  // title needs to not exist in order to not
  // overwrite a joke with that title
  const titleExists = jokeTitles.some((item) =>
    Object.keys(item).includes(title)
  );

  const addToDb = async () => {
    if (user && title !== "" && joke !== "" && !titleExists) {
      try {
        await set(ref(database, `users/${userId}/jokes/${title}`), {
          joke: joke,
        });
        setSuccess("Joke added successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      } catch (error: any) {
        setError(error.message);
      }
    } else if (titleExists) {
      setError("You already have a joke with that title.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      setError("Both fields are required.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}>
        {error && (
          <View style={styles.error}>
            <Text>{error}</Text>
          </View>
        )}
        {success && (
          <View style={styles.success}>
            <Text>{success}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
            multiline={true}
            returnKeyType="done"
            blurOnSubmit={true}
          />
          <TextInput
            placeholder="Body"
            value={joke}
            onChangeText={(text) => setJoke(text)}
            style={[styles.input, { height: 150 }]}
            multiline={true}
            numberOfLines={10}
            returnKeyType="done"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                addToDb();
                Keyboard.dismiss();
              }}
            >
              <Text style={styles.buttonText}>Save to database</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default WriteJokes;

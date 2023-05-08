import { getAuth } from "firebase/auth";
import { onValue, ref, remove, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { app, database } from "../config/firebase";
import { Joke } from "../interfaces";
import { styles } from "../styles/styles";

const Jokebook = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [editingJoke, setEditingJoke] = useState<string>("");
  const [editingKey, setEditingKey] = useState<string>("");

  const auth = getAuth(app);
  const user = auth.currentUser;
  const userId = user?.uid;

  // get jokes from db
  useEffect(() => {
    try {
      const jokesRef = ref(database, `users/${userId}/jokes`);
      onValue(jokesRef, async (snapshot) => {
        const data = await snapshot.val();
        if (data !== null && typeof data === "object") {
          const keys = Object.keys(data);
          if (keys.length === 0) {
            setJokes([]);
          } else {
            const jokesArray = keys.map((key) => ({
              key: key,
              ...data[key],
            }));
            setJokes(jokesArray);
          }
        }
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  const deleteJoke = async (key: string) => {
    try {
      const jokeRef = ref(database, `users/${userId}/jokes/${key}`);
      await remove(jokeRef);
      console.log("Joke deleted successfully");
      setJokes((prevJokes) => prevJokes.filter((joke) => joke.key !== key));
    } catch (error: any) {
      console.log("Error deleting joke:", error.message);
    }
  };

  const editJoke = async (key: string, updatedJoke: string) => {
    try {
      const jokeRef = ref(database, `users/${userId}/jokes/${key}`);
      await update(jokeRef, { joke: updatedJoke });
    } catch (error: any) {
      console.log("Error:", error.message);
    }
    setEditing(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {editing && (
        <Modal animationType="slide" transparent={false}>
          <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            accessible={false}
          >
            <KeyboardAvoidingView style={styles.modal}>
              <View style={styles.homeContainer}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.modalText}>Edit joke</Text>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 16,
                      textAlign: "center",
                      marginTop: 10,
                    }}
                  >
                    Tap outside the input field to close the keyboard
                  </Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editingJoke}
                    onChangeText={setEditingJoke}
                    multiline={true}
                    numberOfLines={10}
                    returnKeyType="done"
                  />
                  <View style={styles.modalButtonView}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => setEditing(false)}
                    >
                      <Text style={styles.editButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => editJoke(editingKey, editingJoke)}
                    >
                      <Text style={styles.deleteButtonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      <FlatList
        data={jokes}
        renderItem={({ item }) => (
          <View style={styles.jokesContainer}>
            <Text style={styles.jokeText}>{item.joke} </Text>
            <View style={styles.jokeButtonView}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setEditing(true);
                  setEditingJoke(item.joke);
                  setEditingKey(item.key);
                }}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteJoke(item.key)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
};

export default Jokebook;

import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  Modal,
  ScrollView,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CHUCK_API, CHUCK_QUERY } from "../constants";
import { styles } from "../styles/styles";

const ChuckNorris = () => {
  const [category, setCategory] = useState("");
  const [fetchId, setFetchId] = useState(0);
  const [fact, setFact] = useState("Fact lands here!");
  const [share, setShare] = useState(false);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [list, setList] = useState([]);

  const fetchOneFact = async () => {
    const response = await fetch(CHUCK_API);
    console.log("Response code:", response.status);
    const data = await response.json();
    console.log(data);
    setFact(data.value);
    setShare(true);
  };

  const fetchFactByCategory = async () => {
    if (category !== "") {
      const response = await fetch(CHUCK_API + "?category=" + category);
      console.log("Response code:", response.status);
      const data = await response.json();
      console.log(data);
      setFact(data.value);
      setShare(true);
    }
  };

  const fetchListOfFacts = async () => {
    const response = await fetch(CHUCK_QUERY + query);
    console.log("Response code:", response.status);
    const data = await response.json();
    if (!data.result || data.result?.length === 0) {
      Alert.alert("Oh no...", "Your search didn't return any results.");
      setList([]);
    } else {
      console.log("First fact from query: " + data.result[0].value);
      const results = data.result.map((item: any) => item.value);
      setList(results);
    }
  };

  const customSearch = () => {
    setSearching(true);
  };

  const handleCategoryPress = (category: string) => {
    setCategory(category);
  };

  const shareFact = async () => {
    try {
      await Share.share({
        message: fact,
      });
    } catch (error: any) {
      console.log("Error sharing:", error.message);
    }
  };

  // API is case sensitive, capitalize category
  // for better readability in the app
  const capitalizeFirstLetter = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <View style={styles.container}>
      {searching && (
        <Modal animationType="slide" transparent={false}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: -10,
            }}
          >
            <Text style={{ fontWeight: "700" }}>
              Search for Chuck Norris facts with a custom keyword.
            </Text>
            <Text style={{ fontWeight: "700" }}>
              Warning: the list you get might be pretty long.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder="Search"
              style={[styles.input, { width: "60%" }]}
              value={query}
              onChangeText={setQuery}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => {
                fetchListOfFacts();
                Keyboard.dismiss();
              }}
              style={[styles.chuckButton, { backgroundColor: "black" }]}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={list}
            renderItem={({ item }) => (
              <View style={styles.jokesContainer}>
                <Text style={styles.jokeText}>{item} </Text>
                <View style={styles.jokeButtonView}></View>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => {
              setSearching(false);
              setList([]);
              setQuery("");
            }}
            style={[
              styles.chuckButton,
              { backgroundColor: "black", marginBottom: 10 },
            ]}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </Modal>
      )}
      <Text style={{ marginTop: 5 }}>
        "There is no such thing as a Chuck Norris joke, only facts."
      </Text>
      <View style={styles.homeContainer}>
        <View style={styles.buttonContainer}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            Availabe categories (press to select):
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("animal");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Animal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("career");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Career</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("celebrity");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Celebrity</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("dev");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Dev</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("explicit");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Explicit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("fashion");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Fashion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("food");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Food</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("history");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>History</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("money");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Money</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("movie");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Movie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("music");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Music</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("political");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Political</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("religion");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Religion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("science");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Science</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("sport");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Sport</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chuckButton}
              onPress={() => {
                handleCategoryPress("travel");
                setFetchId(fetchId + 1);
              }}
            >
              <Text style={styles.buttonOutlineText}>Travel</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Selected category: {capitalizeFirstLetter(category)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              onPress={fetchOneFact}
              style={[styles.chuckButton, { backgroundColor: "black" }]}
            >
              <Text style={styles.buttonText}>Fetch a random fact</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={fetchFactByCategory}
              style={[styles.chuckButton, { backgroundColor: "black" }]}
            >
              <Text style={styles.buttonText}>Fetch by category</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={customSearch} style={styles.chuckButton}>
            <Text style={styles.buttonOutlineText}>Custom search</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={[styles.buttonOutlineText, { fontSize: 18 }]}>
              {fact}
            </Text>
            {share && (
              <TouchableOpacity
                onPress={shareFact}
                style={[styles.shareButton, { marginTop: 10 }]}
              >
                <Text style={styles.buttonText}>Share this fact</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ChuckNorris;

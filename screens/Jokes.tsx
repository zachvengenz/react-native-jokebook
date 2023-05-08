import React, { useState } from "react";
import { ScrollView, Share, Text, TouchableOpacity, View } from "react-native";
import { JOKE_API } from "../constants";
import { styles } from "../styles/styles";

const Jokes = () => {
  const [category, setCategory] = useState<string>("Any");
  const [joke, setJoke] = useState<string>("Your joke lands here!");
  const [share, setShare] = useState<boolean>(false);

  const fetchOneJoke = async () => {
    const response = await fetch(JOKE_API + category);
    console.log("Response code:", response.status);
    const data = await response.json();
    console.log(data);
    if (data.type === "twopart") {
      setJoke(data.setup + "\n\n" + data.delivery);
    } else {
      setJoke(data.joke);
    }
    setShare(true);
  };

  const shareJoke = async () => {
    try {
      await Share.share({
        message: joke, // Replace `joke` with the actual content you want to share
      });
    } catch (error: any) {
      console.log("Error sharing:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        <View style={styles.buttonContainer}>
          <Text style={{ fontWeight: "700", marginBottom: 10, fontSize: 24 }}>
            Pick a category:
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setCategory("Any")}
            >
              <Text style={styles.buttonOutlineText}>Any</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setCategory("Christmas")}
            >
              <Text style={styles.buttonOutlineText}>Christmas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setCategory("Dark")}
            >
              <Text style={styles.buttonOutlineText}>Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setCategory("Misc")}
            >
              <Text style={styles.buttonOutlineText}>Misc</Text>
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
              style={styles.categoryButton}
              onPress={() => setCategory("Programming")}
            >
              <Text style={styles.buttonOutlineText}>Programming</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setCategory("Pun")}
            >
              <Text style={styles.buttonOutlineText}>Pun</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setCategory("Spooky")}
            >
              <Text style={styles.buttonOutlineText}>Spooky</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>
            Selected category: {category}
          </Text>

          <TouchableOpacity
            style={[
              styles.chuckButton,
              { marginTop: 10, backgroundColor: "black" },
            ]}
            onPress={fetchOneJoke}
          >
            <Text style={styles.buttonText}>Fetch a joke</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text
              style={[
                styles.buttonOutlineText,
                { marginTop: 10, fontSize: 18 },
              ]}
            >
              {joke}
            </Text>
            {share && (
              <TouchableOpacity
                onPress={shareJoke}
                style={[styles.shareButton, { marginTop: 10 }]}
              >
                <Text style={styles.buttonText}>Share this joke</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Jokes;

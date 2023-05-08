import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Jokes from "../screens/Jokes";
import Jokebook from "../screens/Jokebook";
import WriteJokes from "../screens/WriteJokes";
import ChuckNorris from "../screens/ChuckNorris";

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Jokes" component={Jokes} />
        <Stack.Screen name="Jokebook" component={Jokebook} />
        <Stack.Screen name="Write Jokes" component={WriteJokes} />
        <Stack.Screen name="Chuck Norris facts" component={ChuckNorris} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default UserStack;

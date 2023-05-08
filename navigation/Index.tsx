import React from "react";
import { useAuthentication } from "../hooks/useAuth";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";

const RootNavigation = () => {
  const { user } = useAuthentication();

  return user ? <UserStack /> : <AuthStack />;
};

export default RootNavigation;

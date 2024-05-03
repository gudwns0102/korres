import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KorailSession } from "korail-ts";
import { createContext, useEffect, useMemo, useState } from "react";
import { LoginScreen } from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { Button } from "react-native";
import { SettingScreen } from "./screens/SettingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "components/TabBar";

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootStackParamList>();
// const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppContext = createContext<{
  session: KorailSession;
}>(undefined as any);

function App() {
  const session = useMemo(() => new KorailSession(), []);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    session.checkLoggedIn().then(setLoggedIn);
  }, []);

  useEffect(() => {
    const loginCallback = () => setLoggedIn(true);
    const logoutCallback = () => setLoggedIn(false);

    session.addEventListener("login", loginCallback);
    session.addEventListener("logout", logoutCallback);

    return () => {
      session.removeEventListener("login", loginCallback);
      session.removeEventListener("logout", logoutCallback);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        session,
      }}
    >
      <GestureHandlerRootView>
        <NavigationContainer>
          {!loggedIn ? (
            <>
              <AuthStack.Navigator initialRouteName={"Login"}>
                <AuthStack.Screen name={"Login"} component={LoginScreen} />
              </AuthStack.Navigator>
            </>
          ) : (
            <>
              <Tab.Navigator tabBar={TabBar}>
                <Tab.Screen
                  name={"Home"}
                  component={HomeScreen}
                  options={({
                    navigation,
                  }: {
                    navigation: NativeStackNavigationProp<
                      RootStackParamList,
                      "Home"
                    >;
                  }) => ({
                    headerRight: () => (
                      <Button
                        title="Setting"
                        onPress={() => {
                          navigation.navigate("Setting");
                        }}
                      />
                    ),
                  })}
                />
                <Tab.Screen name={"Setting"} component={SettingScreen} />
              </Tab.Navigator>
            </>
          )}
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppContext.Provider>
  );
}

export default App;

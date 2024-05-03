import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KorailSession } from "korail-ts";
import { createContext, useEffect, useMemo, useState } from "react";
import { LoginScreen } from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { Button } from "react-native";
import { SettingScreen } from "./screens/SettingScreen";
import { TrainListScreen } from "./screens/TrainListScreen";

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

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
              <Stack.Navigator>
                <Stack.Screen
                  name={"Home"}
                  component={HomeScreen}
                  options={props => ({
                    headerRight: () => (
                      <Button
                        title="Setting"
                        onPress={() => {
                          props.navigation.navigate("");
                        }}
                      />
                    ),
                  })}
                />
                <Stack.Screen name={"TrainList"} component={TrainListScreen} />
                <Stack.Screen name={"Setting"} component={SettingScreen} />
              </Stack.Navigator>
            </>
          )}
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppContext.Provider>
  );
}

export default App;

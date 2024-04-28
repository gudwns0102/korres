import { KorailSession } from "korail-ts";
import { createContext, useEffect, useMemo, useState } from "react";
import { LoginScreen } from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { Button } from "react-native";
import { SettingScreen } from "./screens/SettingScreen";

const Stack = createNativeStackNavigator();

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
      <NavigationContainer>
        {!loggedIn ? (
          <>
            <Stack.Navigator initialRouteName={LoginScreen.title}>
              <Stack.Screen name={LoginScreen.title} component={LoginScreen} />
            </Stack.Navigator>
          </>
        ) : (
          <>
            <Stack.Navigator>
              <Stack.Screen
                name={HomeScreen.title}
                component={HomeScreen}
                options={props => ({
                  headerRight: () => (
                    <Button
                      title="Setting"
                      onPress={() => {
                        props.navigation.navigate(SettingScreen.title);
                      }}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name={SettingScreen.title}
                component={SettingScreen}
              />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;

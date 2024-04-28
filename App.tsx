import { KorailSession } from "korail-ts";
import { createContext, useMemo } from "react";
import { LoginScreen } from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const AppContext = createContext<{
  session: KorailSession;
}>(undefined as any);

function App() {
  const session = useMemo(() => new KorailSession(), []);

  return (
    <AppContext.Provider
      value={{
        session,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName={LoginScreen.name}>
          <Stack.Screen name={LoginScreen.name} component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;

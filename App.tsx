/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { css } from "@emotion/native";
import { SafeAreaView } from "react-native";
import { KorailSession } from "korail-ts";
import { createContext, useMemo } from "react";
import { LoginScreen } from "./screens/LoginScreen";

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
      <SafeAreaView
        style={css`
          flex: 1;
          align-items: center;
          justify-content: center;
        `}
      >
        <LoginScreen />
      </SafeAreaView>
    </AppContext.Provider>
  );
}

export default App;

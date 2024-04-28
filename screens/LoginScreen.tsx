import { css } from "@emotion/native";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useSession } from "../hooks/useSession";
import { Async } from "../components/Async";

export function LoginScreen() {
  const session = useSession();
  const [id, setId] = useState(process.env.KORAIL_ID || "");
  const [password, setPassword] = useState(process.env.KORAIL_PW || "");

  return (
    <View
      style={css`
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <TextInput
        autoFocus
        placeholder="멤버십 ID"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="로그인"
        onPress={() => {
          session.login(id, password);
        }}
      />
      <Text>
        LoggedIn:{" "}
        <Async fallback={<Text>Wait...</Text>}>
          {session.checkLoggedIn().then(res => String(res))}
        </Async>
      </Text>
    </View>
  );
}

LoginScreen.title = "Login";

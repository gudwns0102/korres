import { css } from "@emotion/native";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { useSession } from "../hooks/useSession";

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
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button
        title="로그인"
        onPress={() => {
          session.login(id, password).catch(error => {
            if (error instanceof Error) {
              Alert.alert("로그인 실패", error.message);
            }
          });
        }}
      />
    </View>
  );
}

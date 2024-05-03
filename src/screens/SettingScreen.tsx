import { Button, ScrollView } from "react-native";
import { useSession } from "../hooks/useSession";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export function SettingScreen(
  props: NativeStackScreenProps<RootStackParamList, "Setting">,
) {
  const session = useSession();

  return (
    <ScrollView>
      <Button
        title="Logout"
        onPress={() => {
          session.logout();
        }}
      />
    </ScrollView>
  );
}

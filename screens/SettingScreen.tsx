import { Button, ScrollView } from "react-native";
import { useSession } from "../hooks/useSession";

export function SettingScreen() {
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

SettingScreen.title = "Setting";

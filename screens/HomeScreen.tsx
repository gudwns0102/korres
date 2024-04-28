import { useRef, useState } from "react";
import { css } from "@emotion/native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSession } from "../hooks/useSession";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { StationsListBottomSheet } from "./StationListBottomSheet";
import { Station } from "korail-ts";

export function HomeScreen() {
  const session = useSession();

  const ref = useRef<BottomSheet>(null);

  const [from, setFrom] = useState<Station | null>(null);
  const [to, setTo] = useState<Station | null>(null);

  const [target, setTarget] = useState<"from" | "to">("from");

  return (
    <View
      style={css`
        flex: 1;
        align-items: center;
      `}
    >
      <View
        style={css`
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
        `}
      >
        {[from?.stn_nm || "출발역", to?.stn_nm || "도착역"].map(
          (title, index) => (
            <TouchableOpacity
              key={title}
              onPress={() => {
                setTarget(index === 0 ? "from" : "to");
                ref.current?.expand();
              }}
            >
              <Text
                style={css`
                  font-size: 32px;
                  font-weight: 700;
                `}
              >
                {title}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>
      <BottomSheet
        ref={ref}
        index={1}
        snapPoints={["25%", "80%"]}
        backdropComponent={props => <BottomSheetBackdrop {...props} />}
      >
        <StationsListBottomSheet
          onSelect={station => {
            if (target === "from") {
              setFrom(station);
            } else {
              setTo(station);
            }

            ref.current?.close();
          }}
        />
      </BottomSheet>
    </View>
  );
}

HomeScreen.title = "Home";

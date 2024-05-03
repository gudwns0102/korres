import { useRef, useState } from "react";
import styled, { css } from "@emotion/native";
import { Text, TouchableOpacity, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { StationsListBottomSheet } from "components/StationListBottomSheet";
import { Station, YYYY_MM_DD } from "korail-ts";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TrainList } from "components/TrainList";

const MenuRow = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 16px;
`;

const MenuLabelCell = styled.Text`
  width: 80px;
`;

const MenuCell = styled.Text`
  flex: 1;
`;

export function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList, "Home">,
) {
  const ref = useRef<BottomSheet>(null);

  const [from, setFrom] = useState<Station | null>(null);
  const [to, setTo] = useState<Station | null>(null);
  const [date, setDate] = useState<YYYY_MM_DD>(
    // dayjs().format("YYYY-MM-DD") as YYYY_MM_DD,
    "2024-05-04",
  );

  const [target, setTarget] = useState<"from" | "to">("from");

  return (
    <View
      style={css`
        flex: 1;
      `}
    >
      <View>
        <MenuRow>
          <MenuLabelCell>출발역</MenuLabelCell>
          <TouchableOpacity
            style={css`
              flex: 1;
            `}
            onPress={() => {
              setTarget("from");
              ref.current?.expand();
            }}
          >
            <Text>{from?.stn_nm || "선택해주세요"}</Text>
          </TouchableOpacity>
        </MenuRow>
        <MenuRow>
          <MenuLabelCell>도착역</MenuLabelCell>
          <TouchableOpacity
            style={css`
              flex: 1;
            `}
            onPress={() => {
              setTarget("to");
              ref.current?.expand();
            }}
          >
            <Text>{to?.stn_nm || "선택해주세요"}</Text>
          </TouchableOpacity>
        </MenuRow>
        <MenuRow>
          <MenuLabelCell>날짜</MenuLabelCell>
          <MenuCell>{date}</MenuCell>
        </MenuRow>
      </View>
      {from && to && date && (
        <TrainList
          key={`${from.stn_nm}-${to.stn_nm}-${date}`}
          from={from.stn_nm}
          to={to.stn_nm}
          date={date}
        />
      )}
      <BottomSheet
        ref={ref}
        key={target}
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

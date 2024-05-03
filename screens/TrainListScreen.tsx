import { useEffect, useState } from "react";
import { useSession } from "../hooks/useSession";
import { FlatList, Text, View } from "react-native";
import { css } from "@emotion/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export function TrainListScreen(
  props: NativeStackScreenProps<RootStackParamList, "TrainList">,
) {
  const session = useSession();
  const [trains, setTrains] = useState<Array<any>>([]);

  useEffect(() => {
    session
      .scheduleView({
        dep: props.route.params.from.stn_nm,
        arr: props.route.params.to.stn_nm,
      })
      .then(response => {
        setTrains(response.data.trn_infos.trn_info);
      });
  }, []);

  return (
    <FlatList
      data={trains}
      renderItem={({ item }) => (
        <View
          style={css`
            display: flex;
            align-items: center;
            align-items: center;
          `}
        >
          <Text>테스트</Text>
          <Text>{item.h_dpt_tm}</Text>
          <Text>{item.h_arv_tm}</Text>
        </View>
      )}
    />
  );
}

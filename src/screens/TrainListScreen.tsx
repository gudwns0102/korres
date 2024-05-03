import { useMemo } from "react";
import { useSession } from "../hooks/useSession";
import { ActivityIndicator, FlatList } from "react-native";
import styled, { css } from "@emotion/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAsync } from "hooks/useAsync";

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
  background-color: #fff;
`;

const Cell = styled.Text`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export function TrainListScreen(
  props: NativeStackScreenProps<RootStackParamList, "TrainList">,
) {
  const session = useSession();

  const [{ data, fetching }] = useAsync(session.scheduleView, {
    variables: [
      {
        dep: props.route.params.from.stn_nm,
        arr: props.route.params.to.stn_nm,
      },
    ],
  });

  const trains = useMemo(() => data?.data.trn_infos.trn_info ?? [], [data]);

  return (
    <FlatList
      style={css`
        flex: 1;
      `}
      data={trains}
      ListHeaderComponent={
        <Row>
          <Cell>ㅁㄴㅇㄹ</Cell>
          <Cell>출발시간</Cell>
          <Cell>도착시간</Cell>
        </Row>
      }
      ListEmptyComponent={
        fetching ? (
          <ActivityIndicator />
        ) : trains.length === 0 ? (
          <Cell>데이터가 없습니다.</Cell>
        ) : null
      }
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => (
        <Row>
          <Cell>테스트</Cell>
          <Cell>{item.h_dpt_tm}</Cell>
          <Cell>{item.h_arv_tm}</Cell>
        </Row>
      )}
    />
  );
}

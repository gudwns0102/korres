import { ComponentProps, useCallback, useState } from "react";
import { useSession } from "../hooks/useSession";
import { FlatList } from "react-native";
import styled, { css } from "@emotion/native";
import { Schedule, YYYYMMDD, hhmmss } from "korail-ts";
import { View, TouchableOpacity } from "react-native";
import { useBackgroundService } from "hooks/useBackgroundService";

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  background-color: #fff;
`;

const Cell = styled.Text`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export function TrainList({
  from,
  to,
  date,
  ...props
}: Omit<ComponentProps<typeof FlatList<Schedule>>, "data" | "renderItem"> & {
  from: string;
  to: string;
  date: string;
}) {
  const session = useSession();
  const backgroundService = useBackgroundService();
  const [trains, setTrains] = useState<Array<Schedule>>([]);

  const fetch = useCallback(async () => {
    const lastSchedule = trains[trains.length - 1];

    const {
      data: {
        trn_infos: { trn_info },
      },
    } = await session.scheduleView({
      dep: from,
      arr: to,
      txtGoAbrdDt: date.replace(/-/g, "") as YYYYMMDD,
      txtGoHour: lastSchedule ? (lastSchedule.h_dpt_tm as hhmmss) : undefined,
    });

    setTrains([...trains, ...trn_info]);
  }, [trains]);

  return (
    <FlatList
      style={css`
        flex: 1;
      `}
      data={trains}
      ListHeaderComponent={
        <Row>
          <Cell>열차종류</Cell>
          <Cell>출발시간</Cell>
          <Cell>도착시간</Cell>
          <Cell>예약가능</Cell>
          <Cell>가격</Cell>
        </Row>
      }
      ListEmptyComponent={<Cell>데이터가 없습니다.</Cell>}
      ItemSeparatorComponent={() => (
        <View
          style={css`
            border-bottom-width: 1px;
            border-color: #999;
          `}
        />
      )}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => backgroundService.pushSchedule(item)}>
          <Row>
            <Cell>{item.h_trn_clsf_nm}</Cell>
            <Cell>{item.h_dpt_tm_qb}</Cell>
            <Cell>{item.h_arv_tm_qb}</Cell>
            <Cell>{item.h_rsv_psb_flg}</Cell>
            <Cell>{item.h_rsv_psb_nm}</Cell>
          </Row>
        </TouchableOpacity>
      )}
      onEndReached={fetch}
      {...props}
    />
  );
}

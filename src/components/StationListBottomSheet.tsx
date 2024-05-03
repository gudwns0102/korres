import { useEffect, useState } from "react";
import { useSession } from "../hooks/useSession";
import { Station } from "korail-ts";
import { FlatList } from "react-native-gesture-handler";
import { css } from "@emotion/native";
import { Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

export function StationsListBottomSheet({
  onSelect,
}: {
  onSelect: (station: Station) => void;
}) {
  const session = useSession();
  const [stations, setStations] = useState<Station[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    session.stationdata().then(setStations);
  }, [session]);

  return (
    <FlatList
      style={css`
        flex: 1;
      `}
      data={stations.filter(station => station.stn_nm.includes(search))}
      keyExtractor={item => item.stn_cd}
      numColumns={2}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <View
          style={css`
            background-color: #fff;
          `}
        >
          <TextInput
            style={css`
              padding: 4px 12px;
              font-size: 16px;
            `}
            placeholder="검색"
            value={search}
            autoFocus
            onChangeText={setSearch}
          />
        </View>
      }
      ItemSeparatorComponent={() => (
        <View
          style={css`
            height: 1px;
            background-color: #999;
          `}
        />
      )}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          key={item.stn_nm}
          style={css`
            flex: 1;
            background-color: #fff;
            border-right-width: ${index % 2 === 0 ? "1px" : "0px"};
            border-color: #999;
            text-align: left;
            padding: 4px 12px;
            height: 36px;
            justify-content: center;
          `}
          onPress={() => onSelect(item)}
        >
          <Text
            style={css`
              font-size: 16px;
            `}
          >
            {item.stn_nm}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

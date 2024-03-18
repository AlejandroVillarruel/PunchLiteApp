import { Searchbar } from "react-native-paper";
import { orderBy, where } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

import { FlatList, StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";

import RequestCard from "../../components/card/absense";
import useFirebase from "../../hooks/useFirebase";

export default function ActiveRequests() {
  const { updateDocument } = useFirebase();
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { getDocuments } = useFirebase();

  // const filtered = useMemo(() => {
  // return Requests.filter(
  //   (user) =>
  //     user.firstname.toLowerCase().includes(search.toLowerCase()) ||
  //     user.lastname.toLowerCase().includes(search.toLowerCase())
  // );

  // }, [Requests, search]);

  useFocusEffect(
    React.useCallback(() => {
      getRequests();
    }, [])
  );

  const getRequests = async () => {
    const res = await getDocuments("absense", null, [
      where("status", "==", "pending"),
      orderBy("createdAt"),
    ]);
    if (res.status === 200) {
      setRequests(res.data);
    }
  };

  const updateStatus = async (id, status, setLoading) => {
    const res = await updateDocument("absense", id, { status }, setLoading);
    if (res.status === 200) {
      getRequests();
    }
  };

  return (
    <View>
      <FlatList
        data={requests}
        renderItem={({ item }) => (
          <RequestCard abesense={item} updateStatus={updateStatus} />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={{ height: 100 }} />}
        refreshing={refreshing}
        onRefresh={getRequests}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

import { limit, orderBy, startAfter, where } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";

import { FlatList, StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";

import UserCard from "../../components/card/user";
import useFirebase from "../../hooks/useFirebase";

export default function PendingUsers() {
  const { getDocuments } = useFirebase();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(() => {
    return users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(search.toLowerCase()) ||
        user.lastname.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  useFocusEffect(
    React.useCallback(() => {
      getUsers();
    }, [])
  );

  const getUsers = async () => {
    const res = await getDocuments("users", null, [
      where("status", "==", "pending"),
      where("role", "==", "user"),
      orderBy("firstname"),
    ]);
    if (res.status === 200) {
      setUsers(res.data);
    }
  };

  return (
    <View>
      <FlatList
        data={filtered}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={{ height: 100 }} />}
        // onEndReached={loadMore}
        // onEndReachedThreshold={0.2}
        refreshing={refreshing}
        onRefresh={getUsers}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <Searchbar
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={{
              marginTop: 10,
              marginHorizontal: 10,
            }}
            placeholder="Search Users"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});

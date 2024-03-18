import { Feather } from "@expo/vector-icons";

import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Modalize from "../modalize";
import { colors } from "../../constants";
import { useAuth, useFirebase } from "../../hooks";
import { fire } from "react-native-alertbox";

export default function CategoryModal({
  mdlRef,
  onPress,
  selected,
  categories,
  getCategories,
}) {
  const { team } = useAuth();
  const { addDocument, updateDocument, deleteDocument } = useFirebase();
  const [loading, setLoading] = React.useState(false);

  const editCategory = async (id, name) => {
    if (!name) return Alert.alert("Error", "Category name is required");

    const res = await updateDocument(
      "categories",
      id,
      { name: name },
      setLoading
    );
    if (res?.error) return Alert.alert("Error", res.error);
    setLoading(true);
    await getCategories();
    setLoading(false);
  };

  const addCategory = async (name) => {
    if (!name) return Alert.alert("Error", "Category name is required");

    const res = await addDocument(
      "categories",
      {
        name: name,
        teamId: team.id,
      },
      setLoading
    );
    if (res?.error) return Alert.alert("Error", res.error);

    setLoading(true);
    await getCategories();
    setLoading(false);
  };

  const deleteCategory = async (id) => {
    const res = await deleteDocument("categories", id, setLoading);
    if (res?.error) return Alert.alert("Error", res.error);
    setLoading(true);
    await getCategories();
    setLoading(false);
  };

  return (
    <Modalize bsref={mdlRef}>
      {categories.map((item, index) => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: colors.lightGrey,
            backgroundColor: selected === item.id ? colors.lightGrey : "white",
          }}
          onPress={() => {
            onPress(item.id);
          }}
          key={index}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: colors.grey,
              flex: 1,
            }}
          >
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === "ios") {
                Alert.prompt(
                  "Edit Category",
                  "Update category name",
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: (text) => {
                        editCategory(item.id, text);
                      },
                    },
                  ],
                  "plain-text",
                  item.name
                );
              } else {
                fire({
                  title: "Edit Category",
                  message: "Update category name",
                  actions: [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: (data) => {
                        editCategory(item.id, data.type);
                      },
                    },
                  ],
                  fields: [
                    {
                      name: "category",
                      placeholder: item.name,
                    },
                  ],
                });
              }
            }}
            style={{ marginRight: 10 }}
          >
            <Feather name="edit" size={18} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Are you sure?",
                "You want to delete this category?",
                [
                  {
                    text: "No",
                    onPress: () => {},
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      deleteCategory(item.id);
                    },
                  },
                ]
              );
            }}
          >
            <Feather name="trash-2" size={18} color={colors.danger} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={{
          padding: 10,
          paddingVertical: 15,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          if (Platform.OS === "ios") {
            Alert.prompt(
              "Add Category",
              "Enter category name",
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: (text) => {
                    addCategory(text);
                  },
                },
              ],
              "plain-text"
            );
          } else {
            fire({
              title: "Add Category",
              message: "Enter category name",
              actions: [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: (data) => {
                    addCategory(data.category);
                  },
                },
              ],
              fields: [
                {
                  name: "category",
                  placeholder: "Category name",
                },
              ],
            });
          }
        }}
      >
        {loading && <ActivityIndicator size="small" color={colors.primary} />}
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: colors.primary,
            textAlign: "center",
            marginLeft: 5,
          }}
        >
          Add New Category
        </Text>
      </TouchableOpacity>
      <View style={{ height: 50 }} />
    </Modalize>
  );
}

const styles = StyleSheet.create({});

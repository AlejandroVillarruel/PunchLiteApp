import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Modalize from "../modalize";
import { colors } from "../../constants";

export default function FacilityModal({
  mdlRef,
  onPress,
  selected,
  facilities,
}) {
  return (
    <Modalize bsref={mdlRef}>
      {facilities.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            height: 200,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              textAlign: "center",
              color: colors.primary,
            }}
          >
            No facility found
          </Text>
        </View>
      )}
      {facilities.map((item, index) => (
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
        </TouchableOpacity>
      ))}
    </Modalize>
  );
}

const styles = StyleSheet.create({});

import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SuccessModal = ({
  onClose,
  visible,
  title,
  description,
  btn1 = "Close",
  onPress1,
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={32} color="#333333" />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "rgba(17, 197, 35, 0.1)",
              borderRadius: 100,
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={50}
              color="#11C523"
              style={{ marginLeft: 2 }}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={{ marginTop: 20, width: "100%" }}>
            <Button
              mode="contained"
              style={{ borderRadius: 10, width: "100%", paddingVertical: 5 }}
              textColor="#fff"
              onPress={onPress1}
            >
              {btn1}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
    color: "#999A98",
  },
});

export default SuccessModal;

import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { colors } from "../../constants";

const DangerModal = ({
  visible,
  onClose,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  loading,
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
              backgroundColor: "rgba(255, 105, 97, 0.1)",
              borderRadius: 100,
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="close-circle"
              size={50}
              color="#FF6961"
              style={{
                marginLeft: 2,
              }}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              mode="contained"
              style={{ borderRadius: 10, width: "48%" }}
              textColor="#fff"
              onPress={onConfirm}
              buttonColor="#FF6961"
              loading={loading}
            >
              {confirmText}
            </Button>
            <Button
              mode="contained"
              style={{ borderRadius: 10, width: "48%" }}
              onPress={onClose}
              buttonColor={colors.primaryLight}
              textColor={colors.primary}
              loading={loading}
            >
              {cancelText}
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

export default DangerModal;

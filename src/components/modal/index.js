import React from "react";
import { Modal as RNModal, View, StyleSheet } from "react-native";

import SuccessModal from "./success";
import DangerModal from "./danger";

const Modal = ({ visible, onClose, containerStyle, children, wd = "80%" }) => {
  return (
    <RNModal transparent visible={visible} animationType="slide">
      <View style={[styles.modalContainer, containerStyle]}>
        <View style={[styles.modalContent, { width: wd }]}>{children}</View>
      </View>
    </RNModal>
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
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default Modal;
export { SuccessModal, DangerModal };

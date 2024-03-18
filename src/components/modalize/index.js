import { Modalize as RNModalize } from "react-native-modalize";

import React from "react";
import { StyleSheet } from "react-native";

const Modalize = ({
  bsref,
  children,
  modalStyle = styles.modal,
  headerStyle = styles.modalHeader,
  adjustToContentHeight = true,
  ...props
}) => {
  return (
    <RNModalize
      handlePosition="inside"
      handleStyle={[styles.modalHeader, headerStyle]}
      modalStyle={[styles.modal, modalStyle]}
      ref={bsref}
      adjustToContentHeight={adjustToContentHeight}
      {...props}
    >
      {children}
    </RNModalize>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    top: 13,
    width: 40,
    backgroundColor: "#bcc0c1",
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    overflow: "hidden",
  },
});

export default Modalize;

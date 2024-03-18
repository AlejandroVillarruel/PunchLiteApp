import DateTimePickerModal from "react-native-modal-datetime-picker";

import React from "react";
import { StyleSheet } from "react-native";

export default function TimeDatePicker({
  mode,
  show,
  time,
  date,
  onChange,
  setShow,
  ...props
}) {
  return (
    <>
      <DateTimePickerModal
        isVisible={show}
        mode={mode}
        date={mode === "time" ? time : date}
        onConfirm={(date) => {
          onChange(date, date);
          setShow(false);
        }}
        onCancel={() => setShow(false)}
        {...props}
      />
    </>
  );
}

const styles = StyleSheet.create({});

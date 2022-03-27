import React from "react";
import { Text, themeColor, useTheme } from "react-native-rapi-ui";
export default (props) => {
  return (
    <Text
      fontWeight="bold"
      style={{
        marginBottom: 5,
        color: props.focused
            ? themeColor.white100
            : themeColor.primary,
        fontSize: 10,
      }}
    >
      {props.title}
    </Text>
  );
};

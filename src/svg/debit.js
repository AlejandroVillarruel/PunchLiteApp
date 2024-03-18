import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DebitCardSvg(props) {
  return (
    <Svg
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 16 16"
      {...props}
    >
      <Path d="M0 12a2 2 0 002 2h12a2 2 0 002-2V7H0v5zM14 2H2a2 2 0 00-2 2v2h16V4a2 2 0 00-2-2z" />
    </Svg>
  );
}

export default DebitCardSvg;

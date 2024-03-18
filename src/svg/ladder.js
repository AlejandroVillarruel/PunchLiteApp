import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function LadderSvg(props) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_220_2309)"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M34.5 7.5h-18M19.5 7.5l-12 33M19.5 40.5l12-33M12.954 25.5h12M16.228 16.5h12M9.682 34.5h12M29.25 13.688L39 40.5M23.317 30h11.865" />
      </G>
      <Defs>
        <ClipPath id="clip0_220_2309">
          <Path fill="#fff" d="M0 0H48V48H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default LadderSvg;

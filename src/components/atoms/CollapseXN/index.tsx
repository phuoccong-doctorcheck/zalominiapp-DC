import React, { useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";
import "./index.scss";
import Icon from "zmp-ui/icon";
import { mapModifiers } from "../../../utils/functions";
import normal from "./images/normal.svg";
import upArrow from "./images/upArrow.svg";
import downArrow from "./images/downArrow.svg";
import higher from "./images/higher.svg";
import negative from "./images/negative.svg";
import FramerMotionCollapse from "../../molecules/framerMotionCollapse";

export type IconCollapseType =
  | "normal"
  | "higher"
  | "lower"
  | "positive"
  | "negative";

interface CCollapseXNProps {
  children?: React.ReactNode;
  open?: boolean;
  title?: string;
  unit?: string;
  index?: string;
  type?: IconCollapseType;
  isNormal: boolean;
  isHigher: boolean;
  isLower: boolean;
}

const CCollapseXN: React.FC<CCollapseXNProps> = ({
  children,
  open,
  title,
  unit,
  index,
  type,
  isLower,
  isHigher,
  isNormal,
}) => {
  const listConvert = ["NEGATIVE"];
  const listConvertSyb = ["NEGATIVE", "NORMAL", "POSITIVE"];
  const i18nConvertSyb = {
    NEGATIVE: "Âm tính",
    NORMAL: "Bình thường",
    POSITIVE: "Dương tính",
  };
  const [stateOpen, setStateOpen] = useState(open);

  useEffect(() => {
    setStateOpen(open);
  }, [open]);

  const handleReturnIcon = () => {
    if (listConvert.includes(index as any) || index?.search("POS") !== -1) {
      return listConvert.includes(index as any) ? negative : higher;
    } else {
      if (isHigher) return upArrow;
      if (isLower) return downArrow;
      if (isNormal) return normal;
    }

    return higher;
  };

  const handleReturnColor = () => {
    if (isHigher || ["POSITIVE"].includes(index as any)) return "#d54837";
    if (isLower) return "#fbb90d";
    if (["NEGATIVE"].includes(index as any)) return "#44b678";
    if (isNormal) return "#000";
  };

  const handleRenderIndex = () => {
    if (listConvertSyb.includes(index as any)) {
      return i18nConvertSyb[index as any];
    } else {
      return index;
    }
  };

  return (
    <Box
      className={`${mapModifiers(
        "a-collapse_custom",
        stateOpen && "open"
      )} shadow-sm border rounded-lg `}
    >
      <Box
        className={mapModifiers("a-collapse_custom_header")}
        onClick={() => {
          setStateOpen(!stateOpen);
        }}
      >
        <Box className="a-collapse_custom_header_left">
          {type && <img src={handleReturnIcon()} />}
          <Text>{title}</Text>
        </Box>
        <Box className="a-collapse_custom_header_right">
          {!stateOpen && (
            <Text style={{ color: handleReturnColor() }}>
              {handleRenderIndex()}
            </Text>
          )}
          <p>{unit}</p>
          <div className="a-collapse_custom_header_right_icon">
            <Icon icon="zi-play-solid" size={16} />
          </div>
        </Box>
      </Box>
      {stateOpen && (
        <FramerMotionCollapse>
          <Box className={mapModifiers("a-collapse_custom_body")}>{children}</Box>
        </FramerMotionCollapse>
      )}
    </Box>
  );
};

CCollapseXN.defaultProps = {};

export default CCollapseXN;

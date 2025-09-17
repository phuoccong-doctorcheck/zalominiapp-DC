import React, { useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";
import "./index.scss";
import Icon from "zmp-ui/icon";
import { mapModifiers } from "../../../utils/functions";

const { Title } = Text;
type Variant = "default" | "style" | "abnormal";

interface CCollapseProps {
  children?: React.ReactNode;
  headerIcon?: string | any;
  headerText?: string;
  onClick?: () => void;
  open?: boolean;
  styleTitle?: string;
  icons?: string;
  isChild: boolean;
  variant?: Variant;
  idName?: string;
  ref?: any;
  isHiddenIcon?: boolean;
  textStatus?: any;
}

const CCollapse: React.FC<CCollapseProps> = ({
  children,
  headerIcon,
  headerText,
  onClick,
  open,
  styleTitle,
  isChild,
  variant,
  icons,
  idName,
  ref,
  isHiddenIcon,
  textStatus
}) => {
  return (
    <Box
      ref={ref}
      id={idName}
      className={`${mapModifiers(
        "a-collapse",
        variant,
        open ? "open" : "hide",
        isChild ? "child" : "parent"
      )} my-4 ${open ? "transition-all transform linear" : ""}`}
    >
      <div
        className={`a-collapse_header h-fit flex justify-between items-center bg-[#fff] p-2 ${
          open ? "rounded-[12px_12px_0_0] border-b" : "rounded-md"
        }`}
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        <Box flex justifyContent="flex-start" className="gap-3">
          {!isChild && icons && <img src={icons} className="w-[24px]" />}
          <Title
            className={`text-[${
              isChild ? "13px" : "15px"
            }] color_main ${styleTitle}`}
          >
            {headerText} <span style={{color:`${textStatus?.color}`}}>{textStatus?.displayname}</span>
          </Title>
        </Box>
        <Box className="w-fit ">
          {!isHiddenIcon && (
            <Icon
              className={`text-[#f00] transition-all transform ${
                open ? "rotate-[-90deg]" : ""
              }`}
              icon={"zi-chevron-left"}
            />
          )}
        </Box>
      </div>
      {open && children !== undefined ? (
        <Box
          className={`a-collapse_content bg-[#fff] px-4 py-2 rounded-[0_0_12px_12px] `}
        >
          {children}
        </Box>
      ) : null}
    </Box>
  );
};

CCollapse.defaultProps = {
  isHiddenIcon: false,
};

export default CCollapse;

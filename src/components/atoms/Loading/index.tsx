import React, { useEffect, useState } from "react";
import { Box, Spinner, Text } from "zmp-ui";
import "./style.scss";
import { mapModifiers } from "../../../utils/functions";
import logo from "./logo.png";

interface LoadingProps {
  hasText: boolean;
  text: string;
}

const Loading: React.FC<LoadingProps> = ({ hasText, text }) => {
  const [dot, setDot] = useState(["."]);

  useEffect(() => {
    const clone = [...dot];
    const interval = setInterval(() => {
      setDot([...clone, "."]);
    }, 1000);
    return () => clearInterval(interval);
  }, [dot]);

  useEffect(() => {
    if (dot.length > 3) {
      setDot(["."]);
    }
  }, [dot]);

  return (
    <div className={mapModifiers("a-loading")}>
      <Box flex alignItems="center" className="flex-col ">
        <Spinner visible logo={logo} />
        {hasText && (
          <Text className="font-[600] text-[#fff] w-screen flex justify-center">
            {text}
            <Box className="min-w-[10px] flex justify-start">
              {hasText &&
                dot.length &&
                dot.map((i, idnex) => (
                  <span className="text-[#fff]" key={idnex}>
                    {i}
                  </span>
                ))}
            </Box>
          </Text>
        )}
      </Box>
    </div>
  );
};

export default Loading;

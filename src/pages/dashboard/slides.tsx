import React from "react";
import { Box, Swiper } from "zmp-ui";

interface SlidesItem {
  id: number | string;
  link: string;
  onClick: () => void;
}

interface SlidesProps {
  children: React.ReactNode;
}

const Slides: React.FC<SlidesProps> = ({ children }) => {
  return (
    <Box>
          <Swiper autoplay>{children}</Swiper>
    </Box>
  );
};

export default Slides;

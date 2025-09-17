import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Icon, Input, Page, Slider, Text } from "zmp-ui";
import banner from "./images/img_location.jpg";
import "./styles.scss";
import { mapModifiers } from "../../utils/functions";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";

const RegisterAddress: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Page className="p-register_address">
      <Box className="p-register_address_header">
        <Slider label="Bước 5/7" defaultValue={50} max={7} min={0} value={5} />
        <div className="p-register_address_header_back">
          <Icon icon="zi-arrow-left" className="font-bold" />
        </div>
      </Box>
      <Box className="p-register_address_heading">
        <Text>Địa chỉ của bạn</Text>
        <p>Hãy cho Doctor Check biết địa chỉ của bạn để đạt được trải nghiệm tốt nhất</p>
      </Box>
      <Box className="p-register_address_banner">
        <img src={banner} alt="banner" />
      </Box>
      <Box className="p-register_address_content">
        <Input
          label=""
          placeholder="Địa chỉ"
          onChange={(event) => {
            
          }}
        />
      </Box>
      <Box className="p-register_address_button">
        <Button>
          <Icon icon="zi-chevron-left" /> Quay lại
        </Button>
        <Button>
          Tiếp theo <Icon icon="zi-chevron-right" />
        </Button>
      </Box>
    </Page>
  );
};

export default RegisterAddress;

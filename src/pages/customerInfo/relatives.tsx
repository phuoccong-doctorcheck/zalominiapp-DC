import React, { useState } from "react";
import { Button, Box, Header, Icon, Page, Text, Sheet } from "zmp-ui";
import "./style.scss";

const Relatives: React.FC = () => {
  const [customSheetOpened, setCustomSheetOpened] = useState(false);
  return (
    <Page className="p-relatives">
      <Header
        title="Thành viên gia đình"
        className="p-booking_headers"
        showBackIcon
        backgroundColor="#fff"
      />
      <Box height={50} />
      <Box className="p-relatives_footer">
        <Button onClick={() => setCustomSheetOpened(!customSheetOpened)}>
          <Icon icon="zi-add-story" />
          <Text>Thêm người thân</Text>
        </Button>
      </Box>
    </Page>
  );
};

export default Relatives;

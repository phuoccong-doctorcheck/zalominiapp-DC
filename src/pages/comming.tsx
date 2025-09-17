import { Box, Header, Page, Text, useNavigate } from "zmp-ui";
import React from "react";

function CommingPage() {
  const navigate = useNavigate()

  return (
    <Page className="bg-cover py-4 px-2 ">
      <Header
        title=""
        className="p-booking_header "
        showBackIcon
        backgroundColor="#fff"
        onBackClick={() => {
          navigate("/dashboard", {
            replace: false,
            animate: true,
            direction: "backward",
          });
        }}
      />
      <Box className="mt-10 flex justify-center">
        <Text className="text-[red]">Tính năng này đang phát triển</Text>
      </Box>
      <Box height={100}></Box>
      <Box height={20}></Box>
    </Page>
  );
}

export default CommingPage;

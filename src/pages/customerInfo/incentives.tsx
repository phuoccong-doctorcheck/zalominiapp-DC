import React from "react";
import { Avatar, Box, Header, Icon, Page, Tabs, Text, List } from "zmp-ui";
import "./style.scss";

const Incentives: React.FC = () => {
  const tabs = [
    {
      id: 1,
      title: "Mã ưu đãi",
      key: 1,
      onclick: () => { },
      component: (
        <Box className="w-screen p-customer_incentives_content flex items-center justify-center bg-[#dbdbdb]">
          Chưa có ưu đãi nào
        </Box>
      ),
    },
    {
      id: 2,
      title: "Đã sử dụng",
      key: 2,
      onclick: () => { },
      component: (
        <Box className="w-screen p-customer_incentives_content flex items-center justify-center bg-[#dbdbdb]">
          Chưa có ưu đãi nào
        </Box>
      ),
    },
    {
      id: 3,
      title: "Hết hạn",
      key: 3,
      onclick: () => { },
      component: (
        <Box className="w-screen p-customer_incentives_content flex items-center justify-center bg-[#dbdbdb]">
          Chưa có ưu đãi nào
        </Box>
      ),
    },
  ];

  return (
    <Page className="p-customer_incentives">
      <Header
        title="Ví ưu đãi"
        className="p-booking_headers"
        showBackIcon
        backgroundColor="#fff"
      />
      <Box height={50} />
      <Tabs className="p-customer_incentives_tabs w-screen" scrollable>
        {tabs.map((tab) => (
          <Tabs.Tab label={tab.title} key={tab.key}>
            {tab.component}
          </Tabs.Tab>
        ))}
      </Tabs>
    </Page>
  );
};

export default Incentives;

import React from "react";
import { Header, Page, Box, Text, useNavigate } from "zmp-ui";
import banner from "../static/images/img_support.png";
import icZalo from "../static/icons/img_zalo.svg";
import icPhone from "../static/icons/ic_home_call.svg";
import { openChat, openPhone } from "zmp-sdk/apis";
import NavigationBar from "../components/organisms/navigation-bar";

const { Title } = Text;

const SupportCustomer: React.FC = () => {
  const navigate = useNavigate();

  const openChatScreen = async (id: string) => {
    try {
      await openChat({
        type: "oa",
        id: id,
        message: "Xin Chào",
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  const openCallScreen = async (phone: string) => {
    try {
      await openPhone({
        phoneNumber: phone,
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  const link = [
    {
      id: 0,
      image: icZalo,
      title: "Chat qua Zalo",
      slug: "",
      desc: "Nhắn tin cho Doctor Check",
      onClick: () => openChatScreen("309834292180920772"),
    },
    {
      id: 0,
      image: icPhone,
      title: "Gọi",
      slug: "",
      desc: "Gọi cho Doctor Check",
      onClick: () => openCallScreen("0989010101"),
    },
  ];

  return (
    <Page className="p-support">
      <Header
        title="Bạn cần hỗ trợ gì ?"
        className="p-support_header"
        showBackIcon={false}
        backgroundColor="#04566e"
        onBackClick={() => {
          navigate("/dashboard", {
            replace: false,
            animate: true,
            direction: "backward",
          });
        }}
      />
      <Box height={43} />
      <Box className="p-support_banner">
        <img src={banner} />
        <Text>24/7</Text>
      </Box>
      <Box className="flex flex-col items-center px-6 py-2">
        <Title className="color_main font-bold text-[16px]">
          Hãy cho Doctor Check biết vấn đề của bạn
        </Title>
        <p className="font-sm text-center">
          Đội ngũ Doctor Check sẽ luôn bên cạnh và hỗ trợ bạn mọi lúc mọi nơi
        </p>
      </Box>
      <Box className="px-4 mt-2">
        {link.map((item) => (
          <div
            className="shadow-lg p-3 border my-3   rounded-xl cursor-pointer flex justify-start gap-3"
            onClick={item.onClick}
          >
            <Box className="w-[50px] flex justify-center items-center">
              <img src={item.image} className="h-[40px] " />
            </Box>
            <Box className="flex justify-center items-start flex-col">
              <Title className="color_main font-bold text-[16px] text-start">
                {item.title}
              </Title>
              <p className="font-sm text-start">{item.desc}</p>
            </Box>
          </div>
        ))}
      </Box>
      <NavigationBar navigateDeault={"/support"} />
    </Page>
  );
};

export default SupportCustomer;

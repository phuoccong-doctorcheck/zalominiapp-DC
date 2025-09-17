import React, { useEffect, useState } from "react";
import { openChat, openProfilePicker, openShareSheet } from "zmp-sdk/apis";
import { Header, Page, useNavigate, Box, useSnackbar, Text } from "zmp-ui";
import { useAppSelector } from "../redux/common/hooks";
import { copyClipboard } from "../utils/functions";
import RichTextEditor from "../components/atoms/RichTextEditor";

const Introduce: React.FC = () => {
  const navigate = useNavigate();
  const { openSnackbar, closeSnackbar } = useSnackbar();


  const affiliateCode = useAppSelector(
    (state) => state.dashboard.affiliateCode
  );
  const affiliateCodeLoading = useAppSelector(
    (state) => state.dashboard.loadingaffiliateCode
  );
  const [states, setStates] = useState({
    loading: affiliateCodeLoading,
    data: affiliateCode,
  });

  const openChatScreen = (id: string) => {
    openChat({
      type: 'user',
      id: id,
      message: `Đường dẫn tải App Doctor Check Member: \nMã Giới thiệu của bạn là: `,
      success: () => { },
      fail: (err) => { }
    });
  }

  const handleShareInfo = async () => {
    await openShareSheet({
      type: "zmp",
      data: {
        title: "Doctor Check Member",
        description: `Truy cập ứng dụng và đăng kí tài khoản với mã giới thiệu: "${states.data?.data?.affiliate_code}" để nhận các ưu đãi`,
        thumbnail: "https://logo-mapps.zdn.vn/d9824b28ee6d07335e7c.jpg"
      },
    }).then((res) => {
      console.log("🚀 ~ handleShareInfo ~ res:", res)
    })
      .catch((err) => {
        console.log("🚀 ~ handleShareInfo ~ err:", err)
      })
  };

  useEffect(() => {
    setStates({
      loading: affiliateCodeLoading,
      data: affiliateCode,
    });
  }, [affiliateCode, affiliateCodeLoading]);

  return (
    <Page className="p-affiliate_code">
      <Header
        title="Chia sẻ app cho bạn bè"
        showBackIcon
        onBackClick={() =>
          navigate("/dashboard", {
            animate: true,
            direction: "backward",
          })
        }
        className="p-booking_headers"
      />
      <Box height={44} />
      <Box className="mt-8 px-4 p-affiliate_code_content">
        {states.data?.data?.share_content ?
          <RichTextEditor
            handleChange={(value: string) => { }}
            value={states.data?.data?.share_content}
            header="hide"
            readOnly
          />
          : <Text className="text-center text-[#f00]">Chưa có chương trình khuyến mãi nào</Text>}
      </Box>
      <Box className="p-affiliate_code_footer">
        <Box className="rounded-full w-[90vw]">
          <div className="flex items-center justify-center text-lg font-bold color_main">
            {states.data?.data?.affiliate_code}
          </div>
          <div className="h-[40px] rounded-full overflow-hidden flex justify-between gap-[1px]">
            <button
              className="bg-[#424242] text-[white] w-full"
              onClick={() => {
                copyClipboard(states.data?.data?.affiliate_code);
                openSnackbar({
                  position: "top",
                  duration: 4000,
                  action: {
                    onClick: () => {
                      closeSnackbar();
                    },
                  },
                  icon: true,
                  text: `Copied`,
                  type: "success",
                });
              }}
            >
              Sao chép
            </button>
            <button
              className="bg-[#2688e9] text-[white] w-full"
              onClick={handleShareInfo}
            >
              Chia sẻ
            </button>
          </div>
        </Box>
      </Box>
    </Page>
  );
};

export default Introduce;

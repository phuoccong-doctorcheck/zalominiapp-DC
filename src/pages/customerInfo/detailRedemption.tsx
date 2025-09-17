import React, { useEffect, useRef, useState } from "react";
import { zmp } from "zmp-framework/react";
import { Box, Button, Header, Page, Text, useNavigate, useSnackbar } from "zmp-ui";
import { useAppSelector } from "../../redux/common/hooks";
import { useMutation } from "react-query";
import { fetchProfileByPhone, postGiftOrder } from "../../services/apis/dashboard";
import { getStorage, setStorage } from "zmp-sdk/apis";
import { useAuthentication } from "../../components/custom/authen-provider";
import RichTextEditor from "../../components/atoms/RichTextEditor";

const DetailRedemption: React.FC = () => {
  const navigate = useNavigate();
  const giftActive = useAppSelector((state) => state.dashboard.gift);
  const profile = useAppSelector((state) => state.dashboard.profile);
  const { uuid, phone } = useAuthentication();

  const { openSnackbar, closeSnackbar } = useSnackbar();

  const [state, setState] = useState({
    infoCustomer: undefined,
    customerId: ''
  })

  const getData = async () => {
    try {
      const { infoCustomer, customerId,  } = await getStorage({
        keys: ["infoCustomer", "customerId"],
      });
      setState({
        ...state,
        customerId: customerId,
        infoCustomer: infoCustomer,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const { mutate: getCustomerByPhone } = useMutation(
    "post-footer-form",
    (data: any) => fetchProfileByPhone(data),
    {
      onSuccess: (data) => {
        if (data.status && data.data !== "notfound") {
          setStorage({
            data: {
              infoCustomer: data,
            },
          });
        }
      },
      onError: (error) => {
        console.log("🚀: error --> detailRedemption -> getCustomerByCustomerId:", error);
      },
    }
  );

  const { mutate: fetchGift } = useMutation(
    "post-footer-form",
    (body: any) => postGiftOrder(body),
    {
      onSuccess: (data) => {
        if (data.status) {
          const body = {
            phone: phone,
            uid_zalo: uuid,
          }
          openSnackbar({
            position: "top",
            duration: 4000,
            action: {
              onClick: () => {
                closeSnackbar();
              },
            },
            icon: true,
            text: data.message,
            type: "success",
          });

          getCustomerByPhone(body);
          navigate(-1);
        } else {
          openSnackbar({
            position: "top",
            duration: 4000,
            action: {
              onClick: () => {
                closeSnackbar();
              },
            },
            icon: true,
            text: data.message,
            type: "error",
          });
        }
      },
      onError: (error) => {
        console.log("🚀: error --> detailRedemption -> getCustomerByCustomerId:", error);
      },
    }
  );

  const handleSubmit = () => {
    const body = {
      customer_ref: state.customerId,
      gift_ref: giftActive?.code,
    };

    fetchGift(body);
  };

  return (
    <Page className="p-detail_redemption">
      <Header
        title="chi tiết quà tặng"
        className="p-detail_redemption_header"
        showBackIcon
        backgroundColor="#04566e"
      />
      <Box height={48} />
      <Box className="p-detail_redemption_image">
        <img src={`data:image/png;base64,${giftActive?.image}`} />
      </Box>
      <Box className="p-detail_redemption_name">
        <Text>{giftActive?.name}</Text>
        {giftActive?.redeem_point && <p>{giftActive?.redeem_point} Điểm</p>}
      </Box>
      <Box className="p-detail_redemption_desc">
        <RichTextEditor
          handleChange={(value: string) => { }}
          value={giftActive?.content}
          header="hide"
          readOnly
        />
      </Box>
      <Box className="p-detail_redemption_button" onClick={handleSubmit}>
        <Button>Đổi quà</Button>
      </Box>
    </Page>
  );
};

export default DetailRedemption;

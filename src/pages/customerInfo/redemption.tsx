import React, { useLayoutEffect, useState, useEffect } from "react";
import { Box, Header, Icon, Page, Spinner, Text, useNavigate } from "zmp-ui";
import "./style.scss";
import imgVoucher from './icPoint.svg';
import imgGift from './icPointWaiting.svg';
import bg from './imgListGift.png';
import { getStorage } from "zmp-sdk/apis";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { handleGetGiftMember, setGiftActive } from "../../redux/dashboard";
import { ResponseGift } from "../../redux/dashboard/types";
import Loading from "../../components/atoms/Loading";

const Redemption: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const dataGift = useAppSelector((state) => state.dashboard.storeGift);
  const dataLoadingGift = useAppSelector((state) => state.dashboard.loadingGift);
  const [gift, setGift] = useState<ResponseGift>(dataGift);
  const [loadingGift, setLoadingGift] = useState<boolean>(dataLoadingGift);
  const [dataProfile, setDataProfile] = useState<any>();

  useEffect(() => {
    setLoadingGift(dataLoadingGift);
  }, [dataLoadingGift]);

  useEffect(() => {
    setGift(dataGift);
  }, [dataGift]);

  const getData = async () => {
    try {
      const { infoCustomer } = await getStorage({
        keys: [ "infoCustomer"],
      });
      setDataProfile(infoCustomer);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getData();
    if (!gift?.data) {
      dispatch(handleGetGiftMember({}));
    }
  },[])

  return (
    <Page className="p-customer_redemption">
      <Header
        title="Điểm tích lũy"
        className="p-booking_headers"
        showBackIcon
        backgroundColor="#fff"
      />
      <Box height={50} className="shadow-md" />
      <Box className="p-customer_redemption_content">
        <Box className="p-customer_redemption_content_header border-b py-3 px-2 flex justify-between">
          <Box className="color_main uppercase font-[500] text-[16px]">
            Điểm sử dụng được: <span className="text-[green] font-bold text-[18px]">{dataProfile?.user?.member?.loyalty_points}</span>
          </Box>
          {/* <Icon icon="zi-play-solid" /> */}
        </Box>
        <Box className="p-customer_redemption_content_point px-2 py-1">
          <Box className="p-customer_redemption_content_point_item">
            <img src={imgVoucher} />
            <Box>
              <p className="text-[red] font-bold">{dataProfile?.user?.member?.use_points}</p>
              <Text>Tổng điểm</Text>
            </Box>
          </Box>
          <Box className="p-customer_redemption_content_point_item">
            <img src={imgGift} />
            <Box>
              <p className="text-[orange] font-bold">{dataProfile?.user?.member?.pending_points}</p>
              <Text>Điểm chờ về</Text>
            </Box>
          </Box>
        </Box>
        <Box className="p-customer_redemption_content_banner px-2">
          <div className="flex justify-end">
            <img src={bg} />
          </div>
          <Text>danh sách quà tặng</Text>
        </Box>
        <Box className="p-customer_redemption_content_gift">
          {loadingGift ? <Box className="flex justify-center mt-2">
            <Spinner logo={undefined} />
          </Box> : 
            <>
            {gift?.data?.length ? gift?.data?.map((item) => (
              <div
                key={item?.code}
                className="p-customer_redemption_content_gift_item border-b"
                onClick={() => {
                    dispatch(setGiftActive(item));
                    navigate('/detail-redemption', {
                      replace: false,
                      animate: true,
                      })
                  }}
              >
                <Box className="flex items-center justify-center  min-w-[80px]">
                  <img src={`data:image/png;base64,${item.image}`} />
                </Box>
                <Box className="flex flex-col justify-center">
                  <Text>{item?.name}</Text>
                  {item.redeem_point && 
                  <p>{item.redeem_point} Điểm</p>
                  }
                </Box>
                <Box
                  className="p-customer_redemption_content_gift_item_button"
                  
                >
                  Đổi quà<Icon icon="zi-chevron-right" />
                </Box>
              </div>
            )) : <Box className="flex justify-center mt-2">
                <Text className="text-[red]">Không tìm thấy quà tặng</Text>
              </Box>}
            </>
          }
        </Box>
      </Box>
    </Page>
  );
};

export default Redemption;

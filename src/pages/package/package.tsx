"use-strict";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Page, Box, Text, Icon, Header, useNavigate, Spinner } from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { formatNumber } from "../../utils/functions";
import { getServicePackageGroup, setDetailPackageItem } from "../../redux/dashboard";
import './index.scss';
import banner from "./imgBookingTitle.png";
import { setFormBooking } from "../../redux/booking";
import { getStorage, openChat } from "zmp-sdk/apis";
import { useAuthentication } from "../../components/custom/authen-provider";

const PackagePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formBooking = useAppSelector((state) => state.booking.formBooking);
  const { havePhone, phone } = useAuthentication();

  const packageServiceLoading = useAppSelector(
    (state) => state.dashboard.loadingPackageService
  );
  const listPackage = useAppSelector((state) => state.dashboard.packageService);
  const packageServiceGroup = useAppSelector((state) => state.dashboard.packageServiceGroup);

  const [state, setState] = useState({
    package: listPackage?.data,
    packageLoading: packageServiceLoading,
  });
  const [isLogin, setIsLogin] = useState(false);

  const getData = async () => {
    try {
      const { isLogin } = await getStorage({
        keys: ["isLogin"],
      });
      setIsLogin(isLogin);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useLayoutEffect(() => {
    if (!packageServiceGroup?.data) {
      dispatch(getServicePackageGroup());
    }
  }, []);

  useEffect(() => {
    setState({
      ...state,
      package: listPackage?.data,
      packageLoading: packageServiceLoading,
    });
  }, [packageServiceLoading, listPackage?.data]);
  
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
  return (
    <Page hideScrollbar={true} resetScroll={false} className="p-package">
      <Header
        title="GÓi khám"
        className="p-booking_header "
        showBackIcon
        backgroundColor="#fff"
      />
      <Box height={50} />
      <Box className="p-package_banner" onClick={() => {
        // if (isLogin) {
          
        //   dispatch(
        //     setFormBooking({
        //       ...formBooking,
        //       is_exams: true,
        //       is_register_package: false,
        //       package_name: "Khám nội tiêu hóa",
        //       data: "LK001",
        //       package_price: 200000,
        //     })
        //     );
        //     navigate(`/booking`, {
        //       replace: false,
        //       animate: true,
        //       direction: "forward",
        //     });
        // } else {
        //   if (havePhone && phone.trim()) {
        //     navigate("/404", {
        //       replace: true,
        //       animate: true,
        //     });
        //   } else {
        //     navigate("/permission", {
        //       replace: true,
        //       animate: true,
        //     });
        //   }
        //   }
        openChatScreen('309834292180920772')
      }}>
        <img src={banner} alt="banner"/>
        <Box className="p-package_banner_heading">
          <Text className="capitalize text-[20px] font-bold color_main">
            Đặt khám tại
          </Text>
          <Text className="capitalize text-[24px] font-bold color_main mt-2">
            Doctor Check
          </Text>
          {/* <p className="text-[14px] font-[500] text-[red] mt-2">
            {formatNumber(200000)} VNĐ
          </p> */}
          <button className="py-1 px-3 mt-2 rounded-md bg-[#00ed9e] text-[12px] font-[500] text-[white] uppercase" >
            Chọn
          </button>
        </Box>
      </Box>
      <Box className="mt-2 bg-[orange] p-2 rounded-md">
        <Text className="uppercase font-[600] color_main">
          Gói tầm soát ung thư tiêu hóa
        </Text>
      </Box>
      <Box className="p-package_content mb-4">
        {state.packageLoading ? (
          <Box flex justifyContent="center" className="mt-16">
            <Spinner visible logo={""} />
          </Box>
        ) : (
          <>
            {state?.package?.length
              ? state?.package?.map((item) => (
                  <div
                    key={item?.package_id}
                    className="p-package_content_item "
                    onClick={() => {
                      dispatch(setDetailPackageItem(item));
                      navigate(`/package-detail/${item.package_id}`, {
                        replace: true,
                      });
                    }}
                  >
                    <img src={item?.package_image} />
                    <Text className="p-1 font-[600] capitalize text-[14px] min-h-[70px]">
                      {item.package_name}
                    </Text>
                    {/* <p className="text-center text-[red] font-[400] mt-1">
                      {formatNumber(item.package_prices)} VNĐ
                    </p> */}
                    <Box
                      flex
                      justifyContent="center"
                      alignItems="center"
                      className="p-2 bg-[#B3CCD3] gap-2"
                    >
                      <Text className="color_main font-[600]">Chi tiết</Text>
                      <Icon
                        className="border rounded-md border-[#04566e] border-[1px] flex items-center justify-center color_main font-[500]"
                        icon="zi-chevron-right"
                        size={18}
                      />
                    </Box>
                  </div>
                ))
              : null}
          </>
        )}
      </Box>
    </Page>
  );
};

export default PackagePage;

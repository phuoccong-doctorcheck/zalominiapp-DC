"use-strict";

import React, {  useEffect, useState } from "react";
import { Page, Box, Text, Header, useNavigate } from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import {  handleConverPackage } from "../../utils/functions";
import { setFormBooking } from "../../redux/booking";
import "./index.scss";
import { getStorage, openChat } from "zmp-sdk/apis";
import { useAuthentication } from "../../components/custom/authen-provider";
import CCollapse from "../../components/atoms/Collapse";

const PackageDetailPage = () => {
  const dispatch = useAppDispatch();
  const { havePhone, phone } = useAuthentication();

  const navigate = useNavigate();
  const bannerPackageDetail = useAppSelector(
    (state) => state.dashboard.PackageDetailItem
  );
  const packageServiceGroup = useAppSelector(
    (state) => state.dashboard.packageServiceGroup
  );

  const formBooking = useAppSelector((state) => state.booking.formBooking);
  const [openGroupService, setOpenGroupService] = useState("");
  const [isLogin, setIsLogin] = useState(false)

  const [state, setState] = useState({
    packageDetail: {
      ...bannerPackageDetail,
      items: handleConverPackage(
        bannerPackageDetail?.items,
        packageServiceGroup?.data
      ),
    },
  });

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

  useEffect(() => {
    setState({
      ...state,
      packageDetail: {
        ...bannerPackageDetail,
        items: handleConverPackage(
          bannerPackageDetail?.items,
          packageServiceGroup?.data
        ),
      },
    });
  }, [bannerPackageDetail, packageServiceGroup]);

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
    <Page hideScrollbar={true} resetScroll={false} className="p-package_detail">
      <Header
        title="Chi tiết gói khám"
        className="p-booking_header "
        showBackIcon
        backgroundColor="#fff"
      />
      <Box height={50} />
      <Box className="p-package_detail_banner">
        <img src={state.packageDetail?.package_image} />
      </Box>
      <Box className="mt-1 p-1">
        <Text className="capitalize font-[600] color_main text-[20px] leading-7">
          {state.packageDetail?.package_name}
        </Text>
        {/* <Box flex justifyContent="space-between" className="mt-2">
          <Text className="font-[600]">Tổng tiền gói:</Text>
          <p className="font-[600] text-[red]">
            {state.packageDetail?.package_prices?.toLocaleString("vi-VN")} đ
          </p>
        </Box> */}
      </Box>
      <Box className="p-package_detail_main">
        <Box className="p-package_detail_main_heading mt-2 bg-[#b3ccd3] py-4 px-2">
          <Text className="text-[24px] color_main font-[600]">
            Chi tiết dịch vụ
          </Text>
        </Box>
        <Box className="p-package_detail_main_list">
          {state.packageDetail?.items?.length &&
            state.packageDetail.items.map((item) => (
              <div key={item.id} className="p-package_detail_main_item">
                <CCollapse
                  open={openGroupService === item.order_number}
                  isChild={false}
                  headerText={item.service_group_name}
                  onClick={() => {
                    if (openGroupService === item.order_number) {
                      setOpenGroupService("");
                    } else {
                      setOpenGroupService(item.order_number);
                    }
                  }}
                  variant="style"
                >
                  {item?.items?.length &&
                    item?.items?.map((child) => (
                      <div
                        key={child.service_id}
                        className="p-package_detail_main_item_child "
                      >
                        <Text>
                        {child.service_name}
                        </Text>
                      </div>
                    ))}
                </CCollapse>
              </div>
            ))}
        </Box>
      </Box>
      <Box
        className="p-package_detail_button bg-[#04566e]"
        flex
        justifyContent="center"
        alignItems="center"
      >
        {/* <button
          onClick={() => {
            if (isLogin) {
              dispatch(
                setFormBooking({
                ...formBooking,
                  is_register_package: true,
                is_exams: false,
                data: state.packageDetail.package_id,
                package_name: state.packageDetail.package_name,
                package_price: state.packageDetail.package_prices,
              })
            );
            navigate("/booking", {
              replace: false,
              animate: true,
              direction: "backward",
            });
            } else {
              if (havePhone && phone.trim()) {
                navigate("/404", {
                  replace: true,
                  animate: true,
                });
              } else {
                navigate("/permission", {
                  replace: true,
                  animate: true,
                });
              }
          }
          }}
        >
          Chọn
        </button> */}
         <button
          onClick={() => {
            if (isLogin) {
              openChatScreen('309834292180920772')
          
            } else {
              if (havePhone && phone.trim()) {
                navigate("/404", {
                  replace: true,
                  animate: true,
                });
              } else {
                navigate("/permission", {
                  replace: true,
                  animate: true,
                });
              }
          }
          }}
        >
          Chọn
        </button>
      </Box>
    </Page>
  );
};

export default PackageDetailPage;

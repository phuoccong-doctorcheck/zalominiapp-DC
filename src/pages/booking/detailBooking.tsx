import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Box, Header, Page, useNavigate, Text, useSnackbar, Spinner } from "zmp-ui";
import "./index.scss";
import { formatNumber, handleConvertPCD } from "../../utils/functions";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import imgPCD from "./icons/ic_PCD.svg";
import CCollapse from "../../components/atoms/Collapse";
import InfoCustomer from "../../components/molecules/infoCustomer";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import { getAccountByMiniApp, getListProfile, getMasterById } from "../../services/apis/dashboard";
import { setBookingDetail } from "../../redux/booking";
import { setMasterIdExam } from "../../redux/detailExam";
import { getStorage, setStorage } from "zmp-sdk/apis";
import { getCustomerById } from "../../services/apis/common";
import Loading from "../../components/atoms/Loading";
import { Profile } from "../../redux/booking/types";
import { useAuthentication } from "../../components/custom/authen-provider";

const DetailBooking: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { phone, uuid, version, platform, deviceId, fetchData, havePhone } =
    useAuthentication();
  const dataBooking = useAppSelector((state) => state.booking.detailBooking);

  let [searchParams, setSearchParams] = useSearchParams();
  const masterRef = searchParams.get("master_ref");
  const customerId = searchParams.get("customerId");
  const variant = searchParams.get("variant");

  const [collapse, setCollapse] = useState(true);
  const [states, setStates] = useState({
    data: dataBooking,
    services: handleConvertPCD(dataBooking?.servicepoint?.items),
    loading: false,
  });
  const [dataProfile, setDataProfile] = useState<any>();
  
  useLayoutEffect(() => {
    setStates({
      ...states,
      data: dataBooking,
      services: handleConvertPCD(dataBooking?.servicepoint?.items),
    });
  }, [dataBooking]);

  const { mutate: getPCD } = useMutation(
    "post-footer-form",
    (data: any) => getMasterById(data),
    {
      onSuccess: (data) => {
        if (data.status) {
        setStates({
          ...states,
          loading: false,
          data: data?.data,
          services: handleConvertPCD(data?.data?.servicepoint?.items),
        });
          dispatch(setMasterIdExam(masterRef as string))
        }
      },
      onError: (error) => {
        console.log("🚀: error --> booking -> getCustomerByCustomerId:", error);
      },
    }
  );

  useEffect(() => {
    if (havePhone && variant === "notification") {
      const body = {
        phone_number: phone,
        uid_zalo: uuid,
        device_id: deviceId,
        device_flatform: platform,
        device_flatform_version: version
      };
      getAccountByPhone(body);
    }
  }, [havePhone, fetchData]);

  useLayoutEffect(() => {
    if (!masterRef?.trim()) return;
    setStates({
      ...states,
      loading: true
    });
    getPCD(masterRef);
  }, []);

  const getData = async () => {
    try {
      const { profileActive } = await getStorage({
        keys: ["profileActive"],
      });
      if (!profileActive && customerId) {
        fetchData();
      } else {
        setDataProfile(profileActive);
      }

    } catch (error) {
      console.log(`HomePage - getStorage => error:${error}`);
    }
  };

  const { mutate: getProfilesByUsername } = useMutation(
    "post-footer-form",
    (data: any) => getListProfile(data),
    {
      onSuccess: (data) => {
        if (data?.status) {
          const profileRequired = data?.data?.find((item: Profile) => item.customer_id === customerId);
          setDataProfile(profileRequired);
          return setStorage({
            data: {
              profileActive: profileRequired,
              profileIdActive: profileRequired.customer_id,
            },
          })
        }
      },
      onError: (error) => {
        console.log(
          `🚀: error --> getPermission -> getCustomerByCustomerId: ${error}`
        );
      },
    }
  );

  const { mutate: getAccountByPhone } = useMutation(
    "post-footer-form",
    (data: any) => getAccountByMiniApp(data),
    {
      onSuccess: (data) => {
        if (data.status) {
          getProfilesByUsername(data?.data?.account?.data?.username)
          return setStorage({
            data: {
              customerId: data?.data?.profile_id,
              isLogin: true,
              account: data?.data,
              accountUserName: data?.data?.account?.data?.username,
            },
          });
        } else {
          if ([2, 3].includes(data?.data)) {
            return navigate('/create-account', {
              replace: false,
              animate: true,
            });
          } else if ([4].includes(data?.data)) {
            return navigate('/it-support', {
              replace: false,
              animate: true,
            });
          }
        }
      },
      onError: (error) => {
        console.log("🚀: error -->authen getCustomerByCustomerId:", error);
      },
    }
  );

  useLayoutEffect(() => {
    getData();
  }, [])

  const memoryRenderTable = useMemo(() => (
    <table className="w-full">
      <thead className="w-full border-b">
        <tr className="grid grid-cols-[1fr_80px_40px_40px_80px] w-full">
          <th className="text-start w-full font-[400] text-[green]"> Tên dịch vụ </th>
          <th className="text-center w-full font-[400] text-[green]"> Đơn giá {`(VNĐ)`}</th>
          <th className="text-center w-full font-[400] text-[green]"> SL </th>
          <th className="text-center w-full font-[400] text-[green]"> ĐVT </th>
          <th className="text-end w-full font-[400] text-[green]"> Thành tiền {`(VNĐ)`} </th>
        </tr>
      </thead>
      {states.loading ? <Box className="flex items-center justify-center mt-2">
        <Spinner logo={undefined} />
      </Box> :
        <tbody>{
          states?.services?.map((record: any) => (
            <div key={record.group_id}>
              <tr>
                <Text className="font-[700] color_main">
                  {record.group_name}
                </Text>
              </tr>
              {record?.child?.length &&
                record?.child?.map((item) => (
                  <tr
                    className="grid grid-cols-[1fr_80px_40px_40px_80px] w-full text-[main] my-2"
                    key={item?.servicespoint_detail_id}
                  >
                    <td className="text-start text-[14px]">{item?.service_name}</td>
                    <td className="text-center text-[14px]">{item?.service_prices}</td>
                    <td className="text-center text-[14px]">{item?.unit_name}</td>
                    <td className="text-center text-[14px]">{item?.quantity}</td>
                    <td className="text-end text-[14px]">
                      {item?.service_prices
                        ? `${formatNumber(item?.service_prices)}`
                        : ""}
                    </td>
                  </tr>
                ))}
            </div>
          ))
        }
        </tbody>
      }
    </table>
  ), [states.loading, states?.services, states])

  return (
    <Page className="px-2">
      <Header
        title="Chi tiết dịch vụ"
        className="p-booking_headers"
        showBackIcon={true}
        backgroundColor="#fff"
        onBackClick={() => {
          if (!!masterRef) {
            navigate("/dashboard", {
              replace: false,
              animate: true,
              direction: "backward",
            });
          } else {
            navigate("/follow-booking", {
              replace: false,
              animate: true,
              direction: "backward",
            });
          }
        }}
      />
      <Box height={60} />
      <InfoCustomer isRenderBMI={false} isChangeInfo={!!dataProfile} />
      <CCollapse
        styleTitle={"font-[700] text-[#ff8a00]"}
        open={true}
        headerIcon={"zi-pin-solid"}
        headerText={"DANH SÁCH DỊCH VỤ ĐÃ ĐẶNG KÝ"}
        icons={imgPCD}
        onClick={() => {
          setCollapse(!collapse);
        }}
        isChild={false}
        isHiddenIcon
      >
        <Box className="t-result_item_pcd">
          <Box flex justifyContent="space-between" className="">
            <p className="min-w-[100px] font-[400] color_main">
              Thời gian đăng ký:
            </p>
            <span>
              {moment(states?.data?.servicepoint_datetime).format( "DD/MM/YYYY HH:mm", )}
            </span>
          </Box>
          <Box className="">
            <p className="min-w-[100px] font-[400] color_main">Ghi chú:</p>
          </Box>
          <Box className="mt-4 w-full">
            {/* {memoryRenderTable} */}
            {/* <Box className="pt-1 border-t mt-2 flex justify-between pf-1 pr-0 py-2">
              <Text className="font-bold color_main">Tổng tiền:</Text>
              <span className="font-bold text-[red]">
                {states.data?.servicepoint?.items && formatNumber(
                  Number(
                    states.data?.servicepoint?.items?.reduce(
                      (accumulator, currentValue) => {
                        return accumulator + currentValue?.service_prices;
                      },
                      0
                    )
                  )
                )}
              </span>
            </Box> */}
          </Box>
        </Box>
      </CCollapse>
      <Box height={50} />
    </Page>
  );
};

export default DetailBooking;

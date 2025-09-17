import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  Box,
  Header,
  Icon,
  Page,
  Text,
  useNavigate,
  useSnackbar,
} from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { getInvoiceDetailsByOrderRef } from "../../redux/invoice";
import InfoCustomer from "../../components/molecules/infoCustomer";
import { getStorage, setStorage } from "zmp-sdk/apis";
import Loading from "../../components/atoms/Loading";
import { formatNumber } from "../../utils/functions";
import { useMutation } from "react-query";
import { getCustomerById } from "../../services/apis/common";
import { useAuthentication } from "../../components/custom/authen-provider";
import { getListProfile } from "../../services/apis/dashboard";
import { Profile } from "../../redux/booking/types";

const InvoiceDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { openSnackbar, closeSnackbar } = useSnackbar();

  const invoice = useAppSelector((state) => state.invoice.invoice);
  const invoiceLoading = useAppSelector(
    (state) => state.invoice.invoiceLoading
  );

  let [searchParams, setSearchParams] = useSearchParams();
  const orderRef = searchParams.get("order_ref");
  const customerId = searchParams.get("customerId");
  const variant = searchParams.get("variant");

  const [stateInvoice, setStateInvoice] = useState(invoice?.data);
  const [dataProfile, setDataProfile] = useState<any>();
  const [savedUrl, setSavedUrl] = useState<string>('');
  const location = useLocation();
  const { scope, fetchData, havePhone, phone } = useAuthentication();

  useEffect(() => {
    if (!invoice?.data) {
      dispatch(getInvoiceDetailsByOrderRef(orderRef as string));
    }
  }, [orderRef, customerId]);

  useEffect(() => {
    setStateInvoice(invoice?.data);
  }, [invoice?.data]);

  useEffect(() => {
    if (variant === "notification") {
      setSavedUrl(location.pathname + location.search);
    }
  }, [location]);

  const getData = async () => {
    try {
      const { isLogin, profileActive, } = await getStorage({
        keys: ["profileActive", "isLogin",],
      });
      if (!isLogin && profileActive?.customer_id) {
        getCustomerByCustomerId(profileActive?.customer_id as string);
      }
      if (isLogin && profileActive) {
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
          const profileRequired = data?.data?.find((item: Profile) => item?.customer_id === customerId);
          setDataProfile(profileRequired);
          return setStorage({
            data: {
              profileActive: profileRequired,
              profileIdActive: profileRequired?.customer_id,
            },
          });
        }
      },
      onError: (error) => {
        console.log(
          `🚀: error --> getPermission -> getCustomerByCustomerId: ${error}`
        );
      },
    }
  );

  const { mutate: getCustomerByCustomerId } = useMutation(
    "post-footer-form",
    (id: string) => getCustomerById(id),
    {
      onSuccess: (data) => {
        if (data?.status) {
          getProfilesByUsername(data?.data?.user?.customer?.customer_phone);
          if (data?.data?.user?.customer?.customer_id === customerId) {
            setStorage({
              data: {
                infoCustomer: data?.data?.user?.customer,
                isLogin: true,
                customerId: customerId,
              },
            }).then(() => {
              navigate(savedUrl, {
                replace: false,
                animate: true,
              });
            });
          } else {
            return navigate('/switch-profile', {
              replace: false,
              animate: true,
            });
          }
        } else {
          return navigate('/it-support', {
            replace: false,
            animate: true,
          });
        }
      },
      onError: (error) => {
        console.log(
          `🚀: error --> getPermission -> getCustomerByCustomerId: ${error}`
        );
      },
    }
  );

  useLayoutEffect(() => {
    if (variant === "notification" && !!scope.userInfo && !!scope.userPhoneNumber) {
      getData();
    }
  }, []);

  useLayoutEffect(() => {
    if (variant === "notification" && !scope.userInfo && !scope.userPhoneNumber) {
      fetchData();
    }
  }, []);

  useLayoutEffect(() => {
    if (
      !!dataProfile &&
      !!stateInvoice &&
      stateInvoice?.customer_code !== customerId
    ) {
      openSnackbar({
        position: "top",
        duration: 3000,
        icon: true,
        text: "Bạn không thể xem hóa đơn của người khác",
        type: "error",
      });
      navigate('/dashboard', {
        replace: true,
        animate: false,
      })
    }
  }, [dataProfile, stateInvoice]);

  return (
    <Page>
      <Header
        title="Chi tiết hóa đơn"
        className="p-booking_headers"
        showBackIcon
        backgroundColor="#fff"
        backIcon={<Icon icon="zi-home" size={1} />}
        onBackClick={() =>
          navigate("/dashboard", {
            animate: true,
            direction: "backward",
          })
        }
      />
      <Box height={60} />
      {(invoiceLoading && !dataProfile) ? (
        <Box className="h-[80vh] flex items-center justify-center">
          <Loading hasText={false} text={""} />
        </Box>
      ) : (
        <>
          <Box className="mx-2">
            <InfoCustomer
              isRenderBarcode={false}
              isBill
              isChangeInfo={!!dataProfile}
            />
          </Box>
          <Box>
            <Box className="mt-2 w-full px-1 pb-4">
              <Box className="px-1 mb-2 w-[97vw]">
                <Box
                  flex
                  justifyContent="space-between"
                  alignItems="center"
                  className="py-[3px]"
                >
                  <Text className="min-w-[120px]">Mã thanh toán:</Text>
                  <Text>{stateInvoice?.order_ref}</Text>
                </Box>
                <Box
                  flex
                  justifyContent="space-between"
                  alignItems="center"
                  className="py-[3px]"
                >
                  <Text className="min-w-[120px]">Ngày tạo:</Text>
                  <Text>{stateInvoice?.created_datetime}</Text>
                </Box>
                <Box
                  flex
                  justifyContent="space-between"
                  alignItems="center"
                  className="py-[3px]"
                >
                  <Text className="min-w-[120px]">Ngày thanh toán:</Text>
                  <Text>{stateInvoice?.payment_datetime}</Text>
                </Box>
                <Box
                  flex
                  justifyContent="space-between"
                  alignItems="center"
                  className="py-[3px]"
                >
                  <Text className="min-w-[120px]">Người thanh toán:</Text>
                  <Text>{stateInvoice?.cashier}</Text>
                </Box>
              </Box>
              <table className="w-full border">
                <thead className="w-full border-b mb-2">
                  <tr className="grid grid-cols-[1fr_80px_40px_40px_90px] w-full">
                    <th className="border-r px-1 py-2 text-[14px] text-start w-full font-[600]">
                      {" "}
                      Tên dịch vụ{" "}
                    </th>
                    <th className="border-r px-1 py-2 text-[14px] text-center w-full font-[600]">
                      {" "}
                      Đơn giá {`(VNĐ)`}
                    </th>
                    <th className="border-r px-1 py-2 text-[14px] text-center w-full font-[600]">
                      {" "}
                      SL{" "}
                    </th>
                    <th className="border-r px-1 py-2 text-[14px] text-center w-full font-[600]">
                      {" "}
                      ĐVT{" "}
                    </th>
                    <th className="px-1 py-2 text-[14px] text-center w-full font-[600] pr-[2px]">
                      {" "}
                      Thành tiền {`(VNĐ)`}{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="p-1">
                  {stateInvoice?.items?.map((record: any, index: any) => (
                    <tr
                      className={`grid grid-cols-[1fr_80px_40px_40px_90px] border-b ${index % 2 === 0 && "bg-[#f0f0f099]"
                        } `}
                      key={index}
                    >
                      <td className=" p-2 border-r text-[13px] font-[500]">
                        {" "}
                        {record.service_name}{" "}
                      </td>
                      <td className=" p-2 border-r font-[500] flex items-center justify-end w-[80px]">
                        {" "}
                        {record.unit_price === 0
                          ? "-"
                          : formatNumber(record.unit_price)}{" "}
                      </td>
                      <td className=" p-2 border-r font-[500] flex items-center justify-center w-[40px]">
                        {" "}
                        {record.quantity}{" "}
                      </td>
                      <td className=" p-2 border-r font-[500] flex items-center justify-center w-[40px]">
                        {" "}
                        {record.unit_name}{" "}
                      </td>
                      <td className=" p-2 font-[500] flex items-center justify-end ">
                        {" "}
                        {record.price_subtotal === 0
                          ? "-"
                          : formatNumber(record.price_subtotal)}
                      </td>
                    </tr>
                  ))}
                  <tr className="flex justify-between items-center border-b p-2">
                    {" "}
                    <Text className="font-[500] text-[17px] ">
                      Tổng cộng
                    </Text>{" "}
                    <Text className="text-[#880015] text-[18px] text-end">
                      {formatNumber(stateInvoice?.amount_total || 0)}
                    </Text>{" "}
                  </tr>
                  <>
                  {
                    stateInvoice?.is_hide_discount === false && (
                      <tr className="flex justify-between items-center border-b p-2">
                      {" "}
                      <Text className="font-[500] text-[17px] ">
                        Chiết khấu/ Giảm giá
                      </Text>{" "}
                      <Text className="text-[#880015] text-[18px] text-end">
                        {stateInvoice?.total_discount === 0
                          ? "-"
                          : formatNumber(stateInvoice?.total_discount || 0)}
                      </Text>{" "}
                    </tr>
                    )
                  }
                  </>
                  <>
                  {
                    stateInvoice?.is_hide_discount === false && (
                      <tr className="flex justify-between items-center p-2">
                      {" "}
                      <Text className="font-[500] text-[17px] ">
                        Tổng tiền thanh toán
                      </Text>{" "}
                      <Text className="text-[#880015] text-[18px] text-end">
                        {formatNumber(
                          Number(
                            stateInvoice?.amount_total -
                            stateInvoice?.total_discount
                          )
                        )}
                      </Text>{" "}
                    </tr>
                    )
                  }
                  </>
                 
                </tbody>
              </table>
            </Box>
          </Box>
        </>
      )}
    </Page>
  );
};

export default InvoiceDetails;

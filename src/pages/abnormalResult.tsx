// import { Box, Header, Page, Text, useNavigate, useSnackbar } from "zmp-ui";
// import React, {
//   useEffect,
//   useLayoutEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { useAppDispatch } from "../redux/common/hooks";
// import {
//   getVitalsignsCustomer,
// } from "../redux/detailExam";
// import InfoCustomer from "../components/molecules/infoCustomer";
// import { useSearchParams } from "react-router-dom";
// import { useMutation } from "react-query";
// import {
//   getAbnormalResults,
//   getAccountByMiniApp,
//   getListProfile,
// } from "../services/apis/dashboard";
// import { getStorage, setStorage } from "zmp-sdk/apis";
// import { useAuthentication } from "../components/custom/authen-provider";
// import Loading from "../components/atoms/Loading";
// import { Profile } from "../redux/booking/types";
// import { useLocation } from 'react-router-dom';
// import { ResponseAbnormalResult, AbnormalResult, AbnormalResultItem, AbnormalResultItemTests, ReExamMing } from "../utils/models";
// import CCollapse from "../components/atoms/Collapse";
// import CCollapseXN, { IconCollapseType } from "../components/atoms/CollapseXN";
// import RangeResult from "../components/atoms/ResultInRange";
// import { formatDate } from "../utils/functions";

// function AbnormalResultPage() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { openSnackbar } = useSnackbar();
//   const { havePhone, phone, fetchData, uuid, isCancel, scope, version, platform, deviceId } =
//     useAuthentication();
//   const wrapperRef = useRef();

//   let [searchParams, setSearchParams] = useSearchParams();
//   const masterId = searchParams.get("masterId");
//   const customerId = searchParams.get("customerId");

//   const [savedUrl, setSavedUrl] = useState<string>('');
//   const location = useLocation();

//   const [dataProfile, setDataProfile] = useState<any>();
//   const [abnormalResult, setAbnormalResult] = useState<AbnormalResult>(undefined as any)
//   const [abnormalResultLoading, setAbnormalResultLoading] = useState<boolean>(false)

//   useEffect(() => {
//     setSavedUrl(location.pathname + location.search);
//   }, [location]);

//   const getData = async () => {
//     try {
//       const { profileActive, isLogin } = await getStorage({
//         keys: ["profileActive", "isLogin"],
//       });
//       if (!profileActive?.customer_id || !isLogin) {
//         fetchData();
//       } else {
//         setDataProfile(profileActive);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const { mutate: getProfilesByUsername } = useMutation(
//     "post-footer-form",
//     (data: any) => getListProfile(data),
//     {
//       onSuccess: (data) => {
//         if (data?.status) {
//           const profileRequired = data?.data?.find((item: Profile) => item?.customer_id === customerId);
//           setDataProfile(profileRequired);
//           return setStorage({
//             data: {
//               profileActive: profileRequired,
//               profileIdActive: profileRequired?.customer_id,
//               accountUserName: data?.data?.find((item: Profile) => item?.relation_type_id === 1)?.username,
//               isLogin: true,
//             },
//           }).then(() => {
//             if (!profileRequired) {
//               openSnackbar({
//                 position: "top",
//                 duration: 3000,
//                 icon: true,
//                 text: `Bạn không thể xem thông tin của người khác`,
//                 type: "error",
//               });
//               return navigate('/switch-profile', {
//                 replace: false,
//                 animate: true,
//               });
//             }
//           })
//         }
//       },
//       onError: (error) => {
//         console.log(
//           `🚀: error --> getPermission -> getCustomerByCustomerId: ${error}`
//         );
//       },
//     }
//   );

//   const { mutate: getAccountByPhone } = useMutation(
//     "post-footer-form",
//     (data: any) => getAccountByMiniApp(data),
//     {
//       onSuccess: (data) => {
//         if (data.status) {
//           getProfilesByUsername(data?.data?.account?.data?.username);
//           if (data?.data?.my_profile?.customer_id === customerId) {
//             return setStorage({
//               data: {
//                 customerId: data?.data?.my_profile?.customer_id,
//                 isLogin: true,
//                 account: data?.data,
//                 accountUserName: data?.data?.account?.data?.username,
//               },
//             }).then(() => {
//               navigate(savedUrl, {
//                 replace: false,
//                 animate: true,
//               });
//             });
//           }
//         } else {
//           if ([2, 3].includes(data?.data)) {
//             return navigate('/create-account', {
//               replace: false,
//               animate: true,
//             });
//           } else if ([4].includes(data?.data)) {
//             return navigate('/it-support', {
//               replace: false,
//               animate: true,
//             });
//           }
//         }
//       },
//       onError: (error) => {
//         console.log("🚀: error -->authen getCustomerByCustomerId:", error);
//       },
//     }
//   );

//   useEffect(() => {
//     if (havePhone) {
//       const body = {
//         phone_number: phone,
//         uid_zalo: uuid,
//         device_id: deviceId,
//         device_flatform: platform,
//         device_flatform_version: version
//       };
//       getAccountByPhone(body);
//     }
//   }, [havePhone]);

//   useEffect(() => {
//     if (isCancel) {
//       openSnackbar({
//         position: "top",
//         duration: 3000,
//         icon: true,
//         text: `Không tìm thấy thông tin khách hàng`,
//         type: "success",
//       });
//       return navigate("/dashboard", {
//         replace: false,
//         animate: true,
//       });
//     }
//   }, [isCancel]);

//   const { mutate: getAbnormalResultByCustomer } = useMutation(
//     "post-footer-form",
//     (body: any) => getAbnormalResults(body),
//     {
//       onSuccess: (data: ResponseAbnormalResult) => {
//         console.log(data)
//         console.log(data.status)
//         if (data.status) {
//           setAbnormalResult(data.data);
//         } else {
//           openSnackbar({
//             position: "top",
//             duration: 3000,
//             icon: true,
//             text: `Đã có lỗi xảy ra...!`,
//             type: "error",
//           });
//           return navigate("/dashboard", {
//             replace: false,
//             animate: true,
//           });
//         }
//         setAbnormalResultLoading(false);  
//       },
//       onError: (error) => {
//         setAbnormalResultLoading(false);
//       },
//     }
//   );

//   useLayoutEffect(() => {
//     if (!!scope.userInfo && !!scope.userPhoneNumber) {
//       getData();
//     }
//     if (!scope.userInfo && !scope.userPhoneNumber) {
//       fetchData();
//     }
//   }, []);

//   useLayoutEffect(() => {
//     if (!masterId || !customerId) return;
//     const body = {
//       master_id: masterId,
//       customer_id: customerId,
//     }
//     getAbnormalResultByCustomer(body);
//     setAbnormalResultLoading(true);
//   }, [masterId, customerId]);

//   useEffect(() => {
//     if (customerId) {
//       dispatch(
//         getVitalsignsCustomer(
//           customerId
//         )
//       );
//     }
//   }, [customerId]);

//   const memoryInfo = useMemo(
//     () => (
//       dataProfile
//         ?
//         <Box className="">
//           <InfoCustomer
//             isChangeInfo={!!dataProfile}
//             isRenderBarcode={false}
//             moreInfo={
//               <>
//                 {abnormalResult?.customer?.year_of_birth &&
//                   <p className={`m-0 text-[14px] font-[400] `}>
//                     Năm sinh: {abnormalResult?.customer?.year_of_birth}
//                   </p>
//                 }
//                 {abnormalResult?.customer?.gender?.name &&
//                   <p className={`m-0 text-[14px] font-[400] `}>
//                     Giới tính: {abnormalResult?.customer?.gender?.name}
//                   </p>
//                 }
//               </>
//             }
//           />
//         </Box>
//         : <Box className="h-screen flex items-center justify-center">
//           <Loading hasText={false} text={""} />
//         </Box>
//     ),
//     [dataProfile, havePhone, abnormalResult]
//   );

//   const handleCheckType = (data: AbnormalResultItemTests): IconCollapseType => {
//     if (data.is_normal) { return 'normal' }
//     if (data.is_lower) { return 'lower' }
//     if (data.is_higher) { return 'higher' }

//     return 'higher'
//   }

//   const renderResultAbnormal = (item: AbnormalResultItem) => {
//     switch (item.service_group_type) {
//       case 'XN': 
//       return (
//         (item?.data as any)?.map((test) => (
//           <div key={test} className="mb-3">
//             <CCollapseXN
//               unit={test.unit_id}
//               title={test.labtests_name}
//               type={handleCheckType(test)}
//               index={test.labtests_result}
//               isNormal={test.is_normal}
//               isHigher={test.is_higher}
//               isLower={test.is_lower}
//               open
//             >
//               <Text className="text-[14px]">{test.description}</Text>
//               <RangeResult
//                 min={test.lower_index}
//                 max={test.higher_index}
//                 index={test.labtests_result}
//                 isNormal={test.is_normal}
//                 isHigher={test.is_higher}
//                 isLower={test.is_lower}
//               />
//             </CCollapseXN>
//           </div>
//         ))
//       );
//       case 'REEXAMMING': return (
//         <>
//           <Box flex justifyContent="space-between" className="w-[90vw]">
//             <p className="text-[14px] min-w-[110px] font-[400] color_main ">
//               Người tái khám:
//             </p>
//             <Text>{formatDate((item.data as ReExamMing).reexamming_date)}</Text>
//           </Box>
//           <Box flex justifyContent="space-between" className="w-[90vw]">
//             <p className="text-[14px] min-w-[110px] font-[400] color_main ">
//               Ghi chú:
//             </p>
//             <Text>{(item.data as ReExamMing).note}</Text>
//           </Box>
//         </>
//       );
//       default: return (
//         <Text>{item.data as string}</Text>
//       );

//     }
//   }

//   return (
//     <Page
//       className={"pb-16 px-1 overflow-scroll h-screen bg-[white] relative"}
//       ref={wrapperRef as any}
//     >
//       {//dataProfile &&
//         <Header
//           title="Các dấu hiệu bất thường"
//           className="p-booking_headers"
//           showBackIcon
//           backgroundColor="#fff"
//           onBackClick={() => navigate('/dashboard', {
//             replace: true,
//             animate: true,
//             direction: "backward",
//           })}
//         />
//       }
//       <Box height={60} />
//       {/* {memoryInfo} */}
//       <div className="mt-2 px-1 overflow-scroll  detail-exam-wrapper">
//         {!abnormalResultLoading ? (
//           <>
//             {abnormalResult?.page_title &&
//               <Text className="mb-2 font-bold color_main uppercase text-[16px]">{abnormalResult?.page_title}:</Text>
//             }
//             {abnormalResult?.items ? (
//               abnormalResult?.items?.map((item) => (
//                 <div key={item.index}>
//                   <CCollapse
//                     open={true}
//                     headerText={`${item.index}. ${item.title}`}
//                     styleTitle={"text-[12px]"}
//                     onClick={() => { }}
//                     isChild={false}
//                     variant="abnormal"
//                   >
//                     {renderResultAbnormal(item)}
//                   </CCollapse>
//                 </div>
//               ))
//             ) : <Text>Không tìm thấy kết quả bất thường</Text>}
//           </>
//         ) : <Box className="h-screen flex items-center justify-center">
//           <Loading hasText={false} text={""} />
//         </Box>}
//       </div>
//     </Page>
//   );
// }

// export default AbnormalResultPage;

import { Box, Header, Page, Text, useNavigate, useSnackbar } from "zmp-ui";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppDispatch } from "../redux/common/hooks";
import {
  getVitalsignsCustomer,
} from "../redux/detailExam";
import InfoCustomer from "../components/molecules/infoCustomer";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import {
  getAbnormalResults,
  getAccountByMiniApp,
  getListProfile,
} from "../services/apis/dashboard";
import { getStorage, setStorage } from "zmp-sdk/apis";
import { useAuthentication } from "../components/custom/authen-provider";
import Loading from "../components/atoms/Loading";
import { Profile } from "../redux/booking/types";
import { useLocation } from 'react-router-dom';
import { ResponseAbnormalResult, AbnormalResult, AbnormalResultItem, AbnormalResultItemTests, ReExamMing } from "../utils/models";
import CCollapse from "../components/atoms/Collapse";
import CCollapseXN, { IconCollapseType } from "../components/atoms/CollapseXN";
import RangeResult from "../components/atoms/ResultInRange";
import { formatDate } from "../utils/functions";

function AbnormalResultPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { havePhone, phone, fetchData, uuid, isCancel, scope, version, platform, deviceId } =
    useAuthentication();
  const wrapperRef = useRef();

  let [searchParams, setSearchParams] = useSearchParams();
  const masterId = searchParams.get("masterId");
  const customerId = searchParams.get("customerId");

  const [savedUrl, setSavedUrl] = useState<string>('');
  const location = useLocation();

  const [dataProfile, setDataProfile] = useState<any>();
  const [abnormalResult, setAbnormalResult] = useState<AbnormalResult>(undefined as any);
  const [abnormalResultLoading, setAbnormalResultLoading] = useState<boolean>(true); // Initial state

  useEffect(() => {
    setSavedUrl(location.pathname + location.search);
  }, [location]);

  const getData = async () => {
    try {
      const { profileActive, isLogin } = await getStorage({
        keys: ["profileActive", "isLogin"],
      });
      if (!profileActive?.customer_id || !isLogin) {
        fetchData();
      } else {
        setDataProfile(profileActive);
      }
    } catch (error) {
      console.log(error);
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
              accountUserName: data?.data?.find((item: Profile) => item?.relation_type_id === 1)?.username,
              isLogin: true,
            },
          }).then(() => {
            if (!profileRequired) {
              openSnackbar({
                position: "top",
                duration: 3000,
                icon: true,
                text: `Bạn không thể xem thông tin của người khác`,
                type: "error",
              });
              return navigate('/switch-profile', {
                replace: false,
                animate: true,
              });
            }
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
          getProfilesByUsername(data?.data?.account?.data?.username);
          if (data?.data?.my_profile?.customer_id === customerId) {
            return setStorage({
              data: {
                customerId: data?.data?.my_profile?.customer_id,
                isLogin: true,
                account: data?.data,
                accountUserName: data?.data?.account?.data?.username,
              },
            }).then(() => {
              navigate(savedUrl, {
                replace: false,
                animate: true,
              });
            });
          }
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

  useEffect(() => {
    if (havePhone) {
      const body = {
        phone_number: phone,
        uid_zalo: uuid,
        device_id: deviceId,
        device_flatform: platform,
        device_flatform_version: version
      };
      setAbnormalResultLoading(true); // Ensure loading is started
      getAccountByPhone(body);
    }
  }, [havePhone]);

  useEffect(() => {
    if (isCancel) {
      openSnackbar({
        position: "top",
        duration: 3000,
        icon: true,
        text: `Không tìm thấy thông tin khách hàng`,
        type: "success",
      });
      setAbnormalResultLoading(false); // Ensure loading is stopped
      return navigate("/dashboard", {
        replace: false,
        animate: true,
      });
    }
  }, [isCancel]);

  const { mutate: getAbnormalResultByCustomer } = useMutation(
    "post-footer-form",
    (body: any) => getAbnormalResults(body),
    {
      onSuccess: (data: ResponseAbnormalResult) => {
        console.log(data)
        console.log(data.status)
        setAbnormalResultLoading(false); // Ensure loading is stopped
        if (data.status) {
          setAbnormalResult(data.data);
        } else {
          openSnackbar({
            position: "top",
            duration: 3000,
            icon: true,
            text: `Đã có lỗi xảy ra...!`,
            type: "error",
          });
          navigate("/dashboard", {
            replace: false,
            animate: true,
          });
        }
      },
      onError: (error) => {
        setAbnormalResultLoading(false); // Ensure loading is stopped
      },
    }
  );

  useLayoutEffect(() => {
    if (!!scope.userInfo && !!scope.userPhoneNumber) {
      getData();
    }
    if (!scope.userInfo && !scope.userPhoneNumber) {
      fetchData();
    }
  }, []);

  useLayoutEffect(() => {
    if (!masterId || !customerId) return;
    const body = {
      master_id: masterId,
      customer_id: customerId,
    }
    setAbnormalResultLoading(true); // Ensure loading is started
    getAbnormalResultByCustomer(body);
  }, [masterId, customerId]);

  useEffect(() => {
    if (customerId) {
      dispatch(
        getVitalsignsCustomer(
          customerId
        )
      );
    }
  }, [customerId]);

  const memoryInfo = useMemo(
    () => (
      dataProfile
        ?
        <Box className="">
          <InfoCustomer
            isChangeInfo={!!dataProfile}
            isRenderBarcode={false}
            moreInfo={
              <>
                {abnormalResult?.customer?.year_of_birth &&
                  <p className={`m-0 text-[14px] font-[400] `}>
                    Năm sinh: {abnormalResult?.customer?.year_of_birth}
                  </p>
                }
                {abnormalResult?.customer?.gender?.name &&
                  <p className={`m-0 text-[14px] font-[400] `}>
                    Giới tính: {abnormalResult?.customer?.gender?.name}
                  </p>
                }
              </>
            }
          />
        </Box>
        : <Box className="h-screen flex items-center justify-center">
          <Loading hasText={false} text={""} />
        </Box>
    ),
    [dataProfile, havePhone, abnormalResult]
  );

  const handleCheckType = (data: AbnormalResultItemTests): IconCollapseType => {
    if (data.is_normal) { return 'normal' }
    if (data.is_lower) { return 'lower' }
    if (data.is_higher) { return 'higher' }

    return 'higher'
  }

  const renderResultAbnormal = (item: AbnormalResultItem) => {
    switch (item.service_group_type) {
      case 'XN':
        return (
          (item?.data as any)?.map((test, testIdx) => (
            <div key={`${test.unit_id}-${testIdx}`} className="mb-3">
              <CCollapseXN
                unit={test.unit_id}
                title={test.labtests_name}
                type={handleCheckType(test)}
                index={test.labtests_result}
                isNormal={test.is_normal}
                isHigher={test.is_higher}
                isLower={test.is_lower}
                open
              >
                <Text className="text-[14px]">{test.description}</Text>
                <RangeResult
                  min={test.lower_index}
                  max={test.higher_index}
                  index={test.labtests_result}
                  isNormal={test.is_normal}
                  isHigher={test.is_higher}
                  isLower={test.is_lower}
                />
              </CCollapseXN>
            </div>
          ))
        );
      case 'REEXAMMING':
        return (
          <>
            <Box flex justifyContent="space-between" className="w-[90vw]">
              <p className="text-[14px] min-w-[110px] font-[400] color_main ">
                Người tái khám:
              </p>
              <Text>{formatDate((item.data as ReExamMing).reexamming_date)}</Text>
            </Box>
            <Box flex justifyContent="space-between" className="w-[90vw]">
              <p className="text-[14px] min-w-[110px] font-[400] color_main ">
                Ghi chú:
              </p>
              <Text>{(item.data as ReExamMing).note}</Text>
            </Box>
          </>
        );
      default:
        return (
          <Text>{item.data as string}</Text>
        );
    }
  }

  return (
    <Page
      className={"pb-16 px-1 overflow-scroll h-screen bg-[white] relative"}
      ref={wrapperRef as any}
    >
      {
      // dataProfile &&
        <Header
          title="Các dấu hiệu bất thường"
          className="p-booking_headers"
          showBackIcon
          backgroundColor="#fff"
          onBackClick={() => navigate('/dashboard', {
            replace: false,
            animate: true,
            direction: "backward",
          })}
        />
      }
      <Box height={60} />
      {/* {memoryInfo} */}
      <div className="mt-2 px-1 overflow-scroll  detail-exam-wrapper">
        {!abnormalResultLoading ? (
          <>
            {abnormalResult?.items ? (
              abnormalResult?.items?.map((item, idx) => (
                <div key={`${item.index}-${idx}`}>
                  <CCollapse
                    open={true}
                    headerText={`${item.index}. ${item.title}`}
                    styleTitle={"text-[12px]"}
                    onClick={() => { }}
                    isChild={false}
                    variant="abnormal"
                  >
                    {renderResultAbnormal(item)}
                  </CCollapse>
                </div>
              ))
            ) : <Text>Không tìm thấy kết quả bất thường</Text>}
          </>
        ) : <Box className="h-screen flex items-center justify-center">
          <Loading hasText={false} text={""} />
        </Box>}
      </div>
    </Page>
  );
}

export default AbnormalResultPage;

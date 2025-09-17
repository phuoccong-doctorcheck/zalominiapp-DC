import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { useMemo } from "react";
import { Avatar, Box, Icon, Page, Spinner, Text, useNavigate } from "zmp-ui";
import { getStorage, openWebview } from "zmp-sdk/apis";
import { PackageRecommend } from "./packageRecommend";
import { MenuButton } from "./menuButton";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { geNotification, handleGetAffiliateCode } from "../../redux/dashboard";
import banner from "./affiliate_banner.jpg";
import bannerRating from "./img_rating_person.png";
import "./index.scss";
import { AppointmentItem, Profile } from "../../redux/booking/types";
import { DashboardBooking } from "./dashboardBooking";
import { useAuthentication } from "../../components/custom/authen-provider";
import { infoGuest } from "../../utils/state";
import LazyLoadComponentWrapper from "../../components/organisms/lazyLoadComponentWrapper";
import NavigationBar from "../../components/organisms/navigation-bar";
import { useMutation } from "react-query";
import { createSurvey } from "../../services/apis/dashboard";
import FramerMotion from "../../components/molecules/framerMotion";
import { getAppointmentByCustomerId } from "../../redux/booking";

const { Header, Title } = Text;

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formBooking = useAppSelector((state) => state.booking.getBooking);
  const loadingGetBooking = useAppSelector(
    (state) => state.booking.loadingGetBooking
  );
  const dataAffiliate = useAppSelector(
    (state) => state.dashboard.affiliateCode
  );
  const { havePhone, scope, fetchData, fetchAccessToken, isCancel } =
    useAuthentication();

  const [states, setStates] = useState({
    data: formBooking,
    haveAppointment:
      formBooking?.data?.some((item) => item.status.status !== "done") || false,
    active: formBooking?.data?.find(
      (item) => item.status.status !== "done"
    ) as AppointmentItem,
    isLogin: false,
  });

  const [infoAccount, setInfoAccount] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [profileId, setProfileId] = useState<any>();
  const [profileActive, setprofileActive] = useState<Profile>();

  const getData = async () => {
    try {
      getStorage({
        keys: ["account", "profileActive", "zalo_avatar", "isLogin", "profileIdActive"],
        success: (data) => {
          // xử lý khi gọi api thành công
          const { account, profileActive, zalo_avatar, isLogin, profileIdActive } = data;
          if (profileActive) {
            setprofileActive(profileActive)
          }
          if (account) {
            setInfoAccount(account);
          } else {
            setInfoAccount(infoGuest);
          }
          setProfileId(profileIdActive);
          setAvatar(zalo_avatar);
          setStates({ ...states, isLogin: isLogin });
        },
        fail: (error) => {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(`HomePage - getStorage => error:${error}`);
      setInfoAccount(infoGuest);
    }
  };
  useLayoutEffect(() => {
    getData();
  }, []);

  useLayoutEffect(() => {
    if (!!profileId) {
      dispatch(
        getAppointmentByCustomerId(profileId)
      );
    }
  }, [profileId]);

  useEffect(() => {
    if (
      !scope.userInfo &&
      !scope.userPhoneNumber &&
      states.isLogin &&
      isCancel
    ) {
      fetchData();
      return;
    }
    if (
      scope.userInfo &&
      !scope.userPhoneNumber &&
      states.isLogin &&
      isCancel
    ) {
      fetchAccessToken();
    }
  }, [states.isLogin]);

  const openUrlInWebview = async (url) => {
    try {
      await openWebview({
        url: url,
        config: {
          style: "normal",
          leftButton: "back",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate: GetSurvey } = useMutation(
    "post-footer-form",
    (data: any) => createSurvey(data),
    {
      onSuccess: (data) => {
        if (data.status) {
          openUrlInWebview(data?.data?.url);
        }
      },
      onError: (error) => {
        console.log(
          "🚀: error --> dashboard -> getCustomerByCustomerId:",
          error
        );
      },
    }
  );

  const memoryDashboard = useMemo(
    () => (
      <>
        <FramerMotion numberDelay={3}>
          <LazyLoadComponentWrapper>
            <MenuButton isHaveBooking={states?.haveAppointment} />
          </LazyLoadComponentWrapper>
        </FramerMotion>
        {/* {profileId && (
          <FramerMotion numberDelay={3}>
            <Box
              className={`px-2 pb-2 translate-y-[-2px] p-dashboard_survey ${states?.haveAppointment && "mt-4"
                }`}
            >
              <Suspense>
                <LazyLoadComponentWrapper>
                  <Box
                    className="p-dashboard_survey_wrapper"
                    onClick={() => {
                      GetSurvey({
                        customer_id: profileId
                      });
                    }}
                  >
                    <Box className="p-dashboard_survey_wrapper_text">
                      <Text className="">Làm bộ câu hỏi sàng lọc</Text>
                      <p className="">
                        Bạn nên làm bộ 18 câu hỏi sàng lọc
                        <br /> trước khi đến phòng khám
                      </p>
                    </Box>
                    <Box className="p-dashboard_survey_wrapper_icon">
                      <img src={bannerRating} />
                    </Box>
                  </Box>
                </LazyLoadComponentWrapper>
              </Suspense>
            </Box>
          </FramerMotion>
        )} */}
        {loadingGetBooking ? (
          <Box flex justifyContent="center">
            <Spinner logo={undefined} />
          </Box>
        ) : (
          <>
            {states?.haveAppointment && (
              <LazyLoadComponentWrapper>
                <FramerMotion numberDelay={3}>
                  <DashboardBooking data={states?.active} />
                </FramerMotion>
              </LazyLoadComponentWrapper>
            )}
            <Box className="px-2 pb-20 mt-3">
              <Suspense>
                <LazyLoadComponentWrapper>
                  <FramerMotion numberDelay={3}>
                    <PackageRecommend />
                  </FramerMotion>
                </LazyLoadComponentWrapper>
              </Suspense>
            </Box>
          </>
        )}
      </>
    ),
    [states.haveAppointment, states]
  );

  useEffect(() => {
    setStates({
      ...states,
      data: formBooking,
      haveAppointment: formBooking?.data?.some(
        (item) => item.status.status !== "done"
      ),
      active: formBooking?.data?.find(
        (item) => item.status.status !== "done"
      ) as AppointmentItem,
    });
  }, [formBooking]);

  return (
    <Page hideScrollbar={true} resetScroll={false} className="p-dashboard">
      <Header
        className="flex justify-between items-center p-dashboard_header"
        size="small"
      >
        <Box className="flex gap-2 ">
          <div
            className="p-dashboard_header_notify"
            onClick={() => {
              navigate("/notification", {
                replace: true,
                animate: true,
              });
              dispatch(
                geNotification({
                  customer_id: profileId,
                  page: 1,
                  size: 100,
                  key_word: "",
                })
              );
            }}
          >
            <Avatar story="default" src={avatar} />
            <Icon icon="zi-notif" size={20} />
          </div>
          <Box>
            <Title className="font-[700] text-[#fff]">
              {profileActive?.customer_fullname}
            </Title>
            <Text className="text-[orange]">{infoAccount?.account?.data?.member_display_text ?? 'Thành viên vàng'}</Text>
          </Box>
        </Box>
      </Header>
      <FramerMotion numberDelay={1}>
        <Box
          className="p-dashboard_slider mb-4 relative z-0"
          onClick={async () => {
            if (states.isLogin) {
              await navigate("/introduce");
              if (!dataAffiliate?.data) {
                await dispatch(handleGetAffiliateCode(profileId as any));
              }
            } else {
              if (havePhone) {
                await navigate("/create-account");
              } else {
                await navigate("/permission");
              }
            }
          }}
        >
          <img src={banner} height={100} className="" />
          <div className="curved-bottom"></div>
        </Box>
      </FramerMotion>
      {memoryDashboard}
      <NavigationBar navigateDeault={"/dashboard"} />
    </Page>
  );
};

export default HomePage;

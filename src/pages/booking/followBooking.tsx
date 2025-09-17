import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, Header, Page, useNavigate, Text, Button, Icon } from "zmp-ui";
import "./index.scss";
import { formatNumber } from "../../utils/functions";
import banner from "./imgBookingTitle.png";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import moment from "moment";
import { AppointmentItem } from "../../redux/booking/types";
import { useMutation } from "react-query";
import { getMasterById } from "../../services/apis/dashboard";
import { setBookingDetail, setFormBooking } from "../../redux/booking";
import { setMasterIdExam } from "../../redux/detailExam";
import BarCode from "../../components/atoms/BarCode";
import NavigationBar from "../../components/organisms/navigation-bar";
import { openChat } from "zmp-sdk";

const { Title } = Text;

const FollowBooking: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formBooking = useAppSelector((state) => state.booking.getBooking);

  const [states, setStates] = useState({
    data: formBooking,
    haveAppointment:
      formBooking?.data?.some((item) => item.status.status !== "done") || false,
    active: formBooking?.data?.find(
      (item) => item.status.status !== "done"
    ) as AppointmentItem,
    loading: false
  });
  const location = window.location
  const [typeParams, setTypeParams] = useState('')

  const searchParams = new URLSearchParams(location.search);

  const { mutate: getPCD } = useMutation(
    "post-footer-form",
    (data: any) => getMasterById(data),
    {
      onSuccess: (data) => {
        if (data.status) {
          setStates({
            ...states,
          loading: false
          })
          dispatch(setBookingDetail(data?.data))
          dispatch(setMasterIdExam(states?.active?.master_id))
          navigate("/detail-booking", {
            replace: false,
            animate: true,
            direction: "forward",
          });
        } else {
          navigate("/404", {
            replace: false,
            animate: false,
            direction: "forward",
          });
        }
      },
      onError: (error) => {
        console.log("🚀: error --> booking -> getCustomerByCustomerId:", error);
      },
    }
  );

  const handleGetDetailExam = () => {
    getPCD(states?.active?.master_id);
    setStates({
      ...states,
      loading: true
    })
  }

  useLayoutEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      setTypeParams(type)
    }
  }, [location])

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
    <Page className="p-follow_booking">
      <Header
        title="theo dõi lịch khám"
        className="p-booking_headers"
        backgroundColor="#fff"
        onBackClick={() => {
          navigate("/dashboard", {
            replace: true,
            animate: true,
            direction: "backward",
          });
        }}
      />
      <Box height={55}/>
      {states?.haveAppointment ? (
        <Box className="p-4">
          <Box className="p-follow_booking_item shadow-lg p-4 rounded-md">
            <Title className="color_main font-bold mb-2 text-center">Bạn đang có lịch hẹn tại Doctor Check</Title>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Ngày đặt lịch:
              </p>
              <span className="text-[14px]">
                {states.active?.create_date &&
                  moment(states.active?.create_date).format(
                    "HH:mm - DD/MM/YYYY"
                  )}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Ngày khám:
              </p>
              <span className="text-[14px]">
                {states.active?.appointment_date &&
                  moment(states.active?.appointment_date).format(
                    "HH:mm - DD/MM/YYYY"
                  )}
              </span>
            </Box>
            <Box className="flex justify-center mt-2">
              <Title className="uppercase font-bold">Số Thứ Tự</Title>
            </Box>
            <Text className="text-center text-[60px] font-bold leading-[80px] my-2">{states.active.appointment_order_number}</Text>
            <Box>
              <Text className="text-center font-bold">Mã lượt khám</Text>
              <p className="text-center">(Dùng mã này để checkin ở quầy lễ tân)</p>
              <Box className="flex justify-center mt-2">
                <BarCode value={states.active.master_id} config={{
                  height: 60,
                  fontSize: 15,
                }} />
              </Box>
            </Box>
            <Box className="mt-4 mb-2 pb-3 p-follow_booking_item_btn" flex justifyContent="center">
              <Button className="" onClick={handleGetDetailExam} loading={states.loading}>Chi tiết phiếu hẹn</Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          className="p-package_banner"
            onClick={() => {
              openChatScreen('309834292180920772')
            //   dispatch(
            //     setFormBooking({
            //       ...formBooking,
            //       clinic_id: 2,
            //       customer_id: "",
            //       appointment_datetime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
            //       appointment_note: "",
            //       is_exams: true,
            //       is_register_package: false,
            //       package_name: "Khám nội tiêu hóa",
            //       data: "LK001",
            //       time_id: 0,
            //       package_price: 200000,
            //       time_value: "",
            //       dateTime: new Date(),
            //       symptom: [],
            //       other_symptoms: "",
            //     } as any)
            //   );
            // navigate("/booking", {
            //   replace: false,
            //   animate: true,
            //   direction: "backward",
            // });
          }}
        >
          <img src={banner} />
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
            <button className="py-1 px-3 mt-2 rounded-md bg-[#00ed9e] text-[12px] font-[500] text-[white] uppercase">
              Chọn
            </button>
          </Box>
        </Box>
      )}
      {typeParams === 'navigate' &&
        <NavigationBar navigateDeault={'/follow-booking?type=navigate'} />
      }
    </Page>
  );
};

export default FollowBooking;

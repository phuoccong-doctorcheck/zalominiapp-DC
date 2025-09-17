"use-strict";

import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import {
  Page,
  Header,
  useNavigate,
  DatePicker,
  Box,
  Icon,
  useSnackbar,
  Text,
  Button,
  Sheet,
  Modal,
} from "zmp-ui";
import { useMutation } from "react-query";
import { getStorage } from "zmp-sdk/apis";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { getAppointmentByCustomerId, getProfilesByUsername, setFormBooking } from "../../redux/booking";
import { formatNumber } from "../../utils/functions";
import "./index.scss";
import iconWarning from "../../static/images/img_warning.svg";
import { createAppointment } from "../../services/apis/booking";
import { useAuthentication } from "../../components/custom/authen-provider";
import { Profile } from "../../redux/booking/types";

const BookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { openSnackbar, closeSnackbar } = useSnackbar();
  const { uuid } = useAuthentication();

  const formBooking = useAppSelector((state) => state.booking.formBooking);
  const [pendding, setPendding] = useState(false);
  const [symptom, setSymptom] = useState(`${formBooking.symptom.length ? formBooking.symptom.map((i) => i.label).join(", ") : ""} ${!!formBooking.other_symptoms.trim() ? `, ${formBooking.other_symptoms}` : ""}`);
  const [state, setState] = useState({
    ...formBooking,
    date: formBooking.dateTime,
  });

  const [confirmBooking, setConfirmBooking] = useState(false)

  const [dataProfile, setDataProfile] = useState<Profile>();

  const getData = async () => {
    try {
      const { profileIdActive, profileActive } = await getStorage({
        keys: ["profileIdActive", "profileActive"],
      });
      setDataProfile(profileIdActive);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setState({
      ...formBooking,
      date: formBooking.dateTime,
    });
  }, [formBooking]);

  const { mutate: postAppointment } = useMutation(
    "post-footer-form",
    (data: any) => createAppointment(data),
    {
      onSuccess: (data) => {
        if (data.status) {
          setPendding(false);
          dispatch(
            getAppointmentByCustomerId(dataProfile?.customer_id as any)
          );
          openSnackbar({
            position: "top",
            duration: 4000,
            action: {
              onClick: () => {
                closeSnackbar();
              },
            },
            text: "Đặt lịch thành công",
            type: "success",
          });
          navigate("/dashboard", {
            replace: false,
            animate: false,
          });
        } else {
          openSnackbar({
            position: "top",
            duration: 4000,
            action: {
              onClick: () => {
                closeSnackbar();
              },
            },
            text: data?.message,
            type: "error",
          });
          setPendding(false);
        }
      },
      onError: (error) => {
        console.log("🚀: error --> booking -> getCustomerByCustomerId:", error);
      },
    }
  );

  const handleValidateBooking = () => {
    if (!state.time_value.trim()) {
      openSnackbar({
        position: "top",
        duration: 4000,
        action: {
          onClick: () => {
            closeSnackbar();
          },
        },
        icon: true,
        text: "Bạn chưa chọn giờ khám",
        prefixIcon: <img src={iconWarning} height={100} />,
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleBooking = () => {
    setPendding(true);
    const body = {
      clinic_id: 2,
      customer_id: state.profileId,
      appointment_datetime: `${moment(state.appointment_datetime).format(
        "YYYY-MM-DD"
      )} ${state.time_value}`,
      appointment_note: symptom,
      is_exams: state.is_exams,
      is_register_package: state.is_register_package,
      data: state?.data,
      uid_zalo: uuid ? uuid : '',
    };
    postAppointment(body);
  };

  const categoriesBooking = [
    {
      id: 0,
      title: "Dịch vụ",
      required: true,
      component: (
        <div
          onClick={() => {
            navigate("/package/booking", {
              replace: false,
            });
          }}
          className="flex justify-between items-center"
        >
          <Box flex justifyContent="flex-start" className="gap-2">
            <Icon icon="zi-wallpaper" />
            <Text>{state.package_name}</Text>
          </Box>
          <Icon icon="zi-chevron-right" />
        </div>
      ),
    },
    {
      id: 1,
      title: "Ngày khám",
      required: true,
      component: (
        <div className="flex justify-between items-center">
          <DatePicker
            mask
            maskClosable
            dateFormat="dd/mm/yyyy"
            placeholder="Chọn ngày đến khám"
            title="Ngày khám"
            value={state.date}
            onChange={(value: any) => {
              setState({
                ...state,
                date: value,
              });
            }}
            formatPickedValueDisplay={(date: Date) => {
              return moment(date).format("DD-MM-YYYY");
            }}
            onVisibilityChange={(visibilityState: boolean) => {
              if (!visibilityState && state.appointment_datetime) {
                dispatch(
                  setFormBooking({
                    ...formBooking,
                    appointment_datetime: moment(state.date).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                    dateTime: state.date,
                  })
                );
              }
            }}
          />
        </div>
      ),
    },
    {
      id: 2,
      title: "Thời gian",
      required: true,
      component: (
        <Box
          flex
          justifyContent="space-between"
          alignItems="center"
          onClick={() =>
            navigate("/time-picker", {
              replace: false,
            })
          }
        >
          <Box flex justifyContent="flex-start" className="gap-2">
            <Icon icon="zi-clock-2" />
            <Text>
              {state.time_value
                ? `${state.time_value.slice(0, 5)} - ${state.time_id < 15 ? "Sáng" : "Chiều"
                }`
                : "Chọn giờ khám"}
            </Text>
          </Box>
          <Icon icon="zi-chevron-right" />
        </Box>
      ),
    },
    {
      id: 4,
      title: "Hồ sơ đăng kí khám",
      required: false,
      component: (
        <Box
          flex
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box flex justifyContent="flex-start" className="gap-2">
            <Icon icon="zi-user" />
            <Text>
              {state.profileName as any}
            </Text>
          </Box>
        </Box>
      ),
    },
    {
      id: 5,
      title: "Triệu chứng",
      required: false,
      component: (
        <Box
          onClick={() =>
            navigate("/symptoms-picker", {
              replace: true,
            })
          }
        >
          <button>
            {symptom.trim() ? symptom : "Chọn triệu chứng hiện tại"}
          </button>
        </Box>
      ),
    },
  ];

  const memoryDataBooking = useMemo(() => (
    categoriesBooking.map((item) => (
      <div key={item.id} className="p-booking_form_item">
        <Box className="p-booking_form_item_heading">
          <Text className="color_main ">{`${item.id + 1}. ${item.title
            }`}</Text>
          {item.required && <p>*</p>}
        </Box>
        <Box className="p-booking_form_item_content">{item.component}</Box>
      </div>
    ))
  ), [state])

  return (
    <Page hideScrollbar={true} resetScroll={false} className="p-booking">
      <Header
        title="Đặt lịch khám"
        className="p-booking_headers"
        showBackIcon={true}
        backgroundColor="#fff"
        backIcon={<Icon icon="zi-home" size={32} className="font-[400]" />}
        onBackClick={() => {
          dispatch(
            setFormBooking({
              ...formBooking,
              clinic_id: 1,
              customer_id: "",
              appointment_datetime: moment(new Date()).format(
                "DD-MM-YYYY HH:mm:ss"
              ),
              appointment_note: "",
              is_exams: false,
              is_register_package: false,
              package_name: "Khám nội tiêu hóa",
              data: "LK001",
              time_id: 0,
              package_price: 200000,
              time_value: "",
              dateTime: new Date(),
              symptom: [],
              other_symptoms: "",
            })
          );
          navigate("/dashboard", {
            animate: true,
            direction: "backward",
          });
        }}
      />
      <Box height={55} />
      <Box className="p-booking_intro">
        <Text className="text-[orange] text-center font-[700] text-[17px]">
          Bạn đang có vấn đề về tiêu hóa?
        </Text>
        <p className="text-center mt-2 font-[400] text-[#7b7b7b] text-[15px]">
          Hãy để Doctor Check giúp bạn chăm sóc hệ thống tiêu hóa của bạn một
          cách tốt nhất
        </p>
      </Box>
      <Box className="p-booking_form">
        {memoryDataBooking}
        <Box
          className="bg-[white] py-2 px-4 border-t mt-1"
          flex
          justifyContent="space-between"
        >
          <Text className="color_main font-[700] uppercase">Tổng tiền</Text>
          <Text className="text-[red] font-[700]">
            {formatNumber(state.package_price)}đ
          </Text>
        </Box>
      </Box>
      <Box className="mt-4 mb-2 pb-16" flex justifyContent="center">
        <Button
          className="bg-[#04566e] text-[#fff] py-2 px-6 rounded-lg font-[600]"
          onClick={() => {
            if (!handleValidateBooking()) return;
            setConfirmBooking(true)
          }}
        >
          Đặt lịch
        </Button>
      </Box>
      <Modal
        visible={confirmBooking}
        title="Xác nhận đặt lịch"
        onClose={() => setConfirmBooking(false)}
      >
        <Box className="flex justify-center gap-4">
          <Button
            className="bg-[red] text-[#fff] py-2 px-6 rounded-lg font-[600]"
            onClick={() => setConfirmBooking(false)}
          >
            Hủy
          </Button>
          <Button
            className="bg-[green] text-[#fff] py-2 px-6 rounded-lg font-[600]"
            onClick={handleBooking}
            loading={pendding}
          >
            Đặt lịch
          </Button>
        </Box>
      </Modal>

    </Page>
  );
};

export default BookingPage;

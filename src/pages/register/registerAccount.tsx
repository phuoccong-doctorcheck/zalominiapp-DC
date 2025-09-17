import {
  Box,
  Page,
  Text,
  useSnackbar,
  Input,
  DatePicker,
  Button,
  Select,
  useNavigate,
  Header,
  Icon,
} from "zmp-ui";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useMutation } from "react-query";
import { setStorage, showToast } from "zmp-sdk/apis";
import imgToast from "./img_warning.svg";
import {
  getHistoriesCustomer,
  getPrescriptionCustomer,
  setProfile,
} from "../../redux/dashboard";
import { createAccount, createProfile } from "../../services/apis/dashboard";
import { useAuthentication } from "../../components/custom/authen-provider";
import { useAppDispatch } from "../../redux/common/hooks";
import { mapModifiers } from "../../utils/functions";
import { getVitalsignsCustomer } from "../../redux/detailExam";
import { getAppointmentByCustomerId } from "../../redux/booking";
import moment from "moment";
const { Option } = Select;

function RegisterAccount() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { openSnackbar, closeSnackbar } = useSnackbar();
  const { phone, zaloName } = useAuthentication();
  const [form, setForm] = useState({
    fullName: zaloName,
    phoneNumber: phone,
    email: "",
    loading: false,
  });

  const [formError, setFormError] = useState({
    fullName: "",
    phoneNumber: "",
  });

  const { mutate: createAccountCustomer } = useMutation(
    "post-footer-form",
    (data: any) => createAccount(data),
    {
      onSuccess: (data) => {
        setForm({
          ...form,
          loading: false,
        });
        if (data.status) {
          setStorage({
            data: {
              account: {
                account: {
                  success: true,
                  message: "",
                  error_code: 0,
                  data: data?.data,
                  profile_id: "",
                  message_unread_count: 0,
                },
              },
            },
          }).then(() => {
            navigate("/switch-profile", { replace: true, animate: true });
          });
        } else {
          openSnackbar({
            position: "top",
            duration: 5000,
            action: {
              onClick: () => {
                closeSnackbar();
              },
            },
            icon: true,
            text: data?.message,
            type: "error",
          });
        }
      },
      onError: (error) => {
        console.log("🚀: error --> getCustomerByCustomerId:", error);
      },
    }
  );

  useEffect(() => {
    openSnackbar({
      position: "top",
      duration: 2000,
      action: {
        onClick: () => {
          closeSnackbar();
        },
      },
      icon: false,
      text: "Bạn cần nhập đầy đủ thông tin để tiếp tục sử dụng chức năng này",
      type: "success",
    });
  }, []);

  useLayoutEffect(() => {
    setForm({
      ...form,
      fullName: zaloName,
      phoneNumber: phone,
    });
  }, [phone, zaloName]);

  const handleValidateNewProfile = () => {
    if (!form.fullName.trim()) {
      setFormError({
        ...formError,
        fullName: "Tên là trường bắt buộc",
      });
      return false;
    }
    return true;
  };

  const handleCreateNewProfile = async () => {
    if (!handleValidateNewProfile()) return;
    const body = {
      displayname: form.fullName,
      phone_number: form.phoneNumber,
      email: form.email,
    };
    setForm({
      ...form,
      loading: true,
    });

    await createAccountCustomer(body);
  };

  return (
    <Page className="p-register bg-cover py-4 px-2 ">
      <Header
        title=""
        showBackIcon
        backIcon={<Icon icon="zi-home" size={1} />}
        onBackClick={() =>
          navigate("/dashboard", {
            animate: true,
            direction: "backward",
          })
        }
        className="p-booking_headers"
      />
      <Box height={64} />

      <Box className="flex justify-center items-center relative">
        <Text className="color_main text-[20px] font-[600] uppercase">
          Đăng kí tài khoản
        </Text>
      </Box>
      <Box className="p-register_form mt-8 px-4 h-fit">
        <Text
          style={{
            color: formError.fullName.trim() && "red",
          }}
        >
          Họ tên <span className="text-red">*</span>
        </Text>
        <Input
          placeholder="Vui lòng nhập họ tên của bạn"
          className={mapModifiers(
            "form-input",
            formError.fullName.trim() && "error"
          )}
          inputClassName="capitalize"
          helperText={formError.fullName}
          value={form.fullName}
          onChange={(event) => {
            setForm({
              ...form,
              fullName: event.target.value,
            });
            setFormError({
              ...formError,
              fullName: "",
            });
          }}
        />
        <Text className="mt-2">
          Số điện thoại <span className="text-red">*</span>
        </Text>
        <Input
          value={form.phoneNumber}
          className={mapModifiers("form-input")}
          onChange={(event) => {
            setForm({
              ...form,
              phoneNumber: event.target.value,
            });
          }}
          readOnly
        />
        <Text className="mt-2">Email</Text>
        <Input
          value={form.email}
          placeholder="Nhập email của bạn"
          className={mapModifiers("form-input")}
          type="text"
          onChange={(event) => {
            setForm({
              ...form,
              email: event.target.value,
            });
          }}
        />
      </Box>
      <Box className="h-[50px] flex justify-center mt-8 gap-2">
        <Button
          className="bg-[#04566e] text-[#fff] py-2 px-6 rounded-full h-[40px] font-[600]"
          onClick={handleCreateNewProfile}
          loading={form.loading}
        >
          Đăng ký
        </Button>
      </Box>
    </Page>
  );
}

export default RegisterAccount;

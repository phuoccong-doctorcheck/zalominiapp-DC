import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Page,
  useNavigate,
  Text,
  Icon,
  Button,
  Header,
  useSnackbar,
} from "zmp-ui";
import "./styles.scss";
import banner from "./img_finish.svg";
import { useAuthentication } from "../../components/custom/authen-provider";
import { useMutation } from "react-query";
import { getAccountByMiniApp, getListProfile } from "../../services/apis/dashboard";
import { setStorage } from "zmp-sdk/apis";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { getProfilesByUsername, setFormBooking } from "../../redux/booking";
import { Profile } from "../../redux/booking/types";

interface AuthenProps { }

const GetPermission: React.FC<AuthenProps> = ({ }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { fetchData, isCancel, uuid, phone, havePhone, version, platform, deviceId } = useAuthentication();
  const { openSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const formBooking = useAppSelector((state) => state.booking.formBooking);

  const handleAsyncData = async (data, customerId) => {
    await setStorage({
      data: {
        infoCustomer: data,
        isLogin: true,
        uuidZalo: uuid,
        customerId: customerId,
      },
    });
    setLoading(false);
    navigate(-1);
  };

  const { mutate: getAccountByInfo } = useMutation(
    "post-footer-form",
    (data: any) => getAccountByMiniApp(data),
    {
      onSuccess: (data) => {
        if (data?.status) {
          setStorage({
            data: {
              account: data?.data,
              accountUserName: data?.data?.account?.data?.username,
              isLogin: true,
            },
          }).then(() => {
            navigate('/switch-profile')
          })
        } else {
          openSnackbar({
            position: "top",
            duration: 2000,
            action: { onClick: () => { closeSnackbar(); }, },
            icon: true,
            text: data?.message,
            type: "error",
          });
          if ([2, 3].includes(data?.data)) {
            navigate('/create-account', {
              replace: false,
              animate: true,
            });
          } else if ([4].includes(data?.data)) {
            navigate('/it-support', {
              replace: false,
              animate: true,
            });
          }
        }
      },
      onError: (error) => {
        console.log(`🚀: error --> getPermission -> getCustomerByCustomerId: ${error}`);
      },
    }
  );

  useEffect(() => {
    if(import.meta.env.VITE_IS_DEMO === true){
      const demo_body = {
        "phone_number": "0369513600",
        "uid_zalo": "2688840823868757681",
        "device_id": "32423453242432",
        "device_name": "",
        "device_flatform": "Android",
        "device_flatform_version": "12.0.0"
      }
      getAccountByInfo(demo_body);
        setStorage({
          data: {
            phoneNumber: phone,
          },
        });
    }else{
      if (havePhone && deviceId) {
        const body = {
          phone_number: phone,
          uid_zalo: uuid,
          device_id: deviceId,
          device_flatform: platform,
          device_flatform_version: version
        };
        getAccountByInfo(body);
        setStorage({
          data: {
            phoneNumber: phone,
          },
        });
      }
    }
    

  }, [havePhone, deviceId, phone]);

  useEffect(() => {
    if (isCancel) {
      setLoading(false);
    }
  }, [isCancel]);

  return (
    <Page className="p-get_permission">
      <Header
        title=""
        className="p-booking_headers"
        showBackIcon={true}
        backgroundColor="#fff"
        onBackClick={() => {
          navigate(-1);
        }}
      />
      <Box className="p-get_permission_banner">
        <img src={banner} alt="" loading="lazy" />
      </Box>
      <Box className="p-get_permission_heading">
        <Text>Doctor Check cần thông tin của bạn</Text>
      </Box>
      <Box className="p-get_permission_content">
        <Box className="p-get_permission_content_item flex">
          <Icon icon="zi-check-circle-solid" className="text-[green]" />
          <Box>
            <p>Theo dõi hồ sơ sức khỏe</p>
          </Box>
        </Box>
        <Box className="p-get_permission_content_item">
          <Icon icon="zi-check-circle-solid" className="text-[green]" />
          <Box>
            <p>Theo dõi thông tin lịch hẹn</p>
          </Box>
        </Box>
        <Box className="p-get_permission_content_item">
          <Icon icon="zi-check-circle-solid" className="text-[green]" />
          <Box>
            <p>Theo dõi các chương trình khuyến mãi</p>
          </Box>
        </Box>
      </Box>
      <Box className="p-get_permission_desc">
        <p>
          Vui lòng chia sẻ số điện thoại để liên kết với tài khoản của bạn trên
          hệ thống của Doctor Check
        </p>
      </Box>
      <Box className="p-get_permission_button">
        {/* <Button className="bg-[yellow]" onClick={()=> navigate(-1)}>Từ chối</Button> */}
        <Button loading={loading} onClick={() => { fetchData(); setLoading(true) }}>Liên kết số điện thoại</Button>
      </Box>
    </Page>
  );
};

GetPermission.defaultProps = {};

export default GetPermission;

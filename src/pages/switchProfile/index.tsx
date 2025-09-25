import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Page,
  Header,
  Box,
  Avatar,
  useNavigate,
  Text,
  Icon,
  useSnackbar,
  Input,
  Select,
  Modal,
  DatePicker,
  Button,
} from "zmp-ui";
import "./style.scss";
import { Profile } from "../../redux/booking/types";
import { mapModifiers } from "../../utils/functions";
import { useAuthentication } from "../../components/custom/authen-provider";
import moment from "moment";
import { useMutation } from "react-query";
import {
  createNewProfile,
  getListProfile,
  removeProfile,
  linkProfileCustomer,
} from "../../services/apis/dashboard";
import { relationtypes } from "../../state";
const { Option } = Select;
import iconAdd from './plus.svg'
import iconLink from './link.svg'
import logo from './mark.svg'
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { getStorage, setStorage } from "zmp-sdk/apis";
import { setFormBooking } from "../../redux/booking";
import Loading from "../../components/atoms/Loading";

function SwitchProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { phone, zaloName } = useAuthentication();
  const { openSnackbar, closeSnackbar } = useSnackbar();

  const formBooking = useAppSelector((state) => state.booking.formBooking);

  const [state, setState] = useState({
    listProfile: undefined as unknown as Profile[],
    profileActive: undefined as unknown as Profile,
    accountUserName: "",
    usenameDelete: "",
    customerDelete: "",
  });
  console.log("🚀 ~ SwitchProfile ~ state:", state);

  const [isOpenAddProfile, setIsOpenAddProfile] = useState(false);
  const [isOpenLinkProfile, setIsOpenLinkProfile] = useState(false);
  const [isOpenRemoveProfile, setIsOpenRemoveProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: zaloName,
    phoneNumber: phone,
    birthday: new Date("2000-01-01"),
    address: "",
    loading: false,
    customerId: "",
    gender: "",
    relationship: "",
    affiliate: "",
  });

  const [formError, setFormError] = useState({
    fullName: "",
    phoneNumber: "",
    birthday: "",
    relationship: "",
    gender: "",
  });

  const [linkProfile, setlinkProfile] = useState({
    customerId: "",
    relationship: "",
  });

  const [linkProfileError, setlinkProfileError] = useState({
    customerId: "",
    relationship: "",
  });
 
  const getData = async () => {
    try {
      getStorage({
        keys: ["accountUserName","path"],
        success: (data) => {
          const { accountUserName ,path} = data;
          console.log(path)
          setState({
            ...state,
            accountUserName: accountUserName,
          })

        },
        fail: (error) => {
          console.log('SwitchProfile - GetData - error:', error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let itemActive = document.querySelector("p-switch_profile_item-active");
    if (!itemActive) return;
    itemActive.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (!state.accountUserName) return;
    getProfilesByUsername(state.accountUserName);
    setIsLoading(true);
  }, [state.accountUserName]);


  const resetFormData = () => {
    setForm({
      ...form,
      fullName: zaloName,
      phoneNumber: phone,
      birthday: new Date("2000-01-01"),
      address: "",
      loading: false,
      customerId: "",
      gender: "",
      relationship: "",
      affiliate: "",
    });
    setFormError({
      ...formError,
      fullName: "",
      phoneNumber: "",
      birthday: "",
      relationship: "",
      gender: "",
    })
  }

  const { mutate: getProfilesByUsername } = useMutation(
    "post-footer-form",
    (data: any) => getListProfile(data),
    {
      onSuccess: (data) => {
        if (data?.status) {
          setState({
            ...state,
            listProfile: data?.data,
          });
          setIsLoading(false);
        }
      },
      onError: (error) => {
        console.log(
          `🚀: error --> getPermission -> getCustomerByCustomerId: ${error}`
        );
      },
    }
  );

  const { mutate: makeProfile } = useMutation(
    "post-footer-form",
    (data: any) => createNewProfile(data),
    {
      onSuccess: (data) => {
        if (data.status) {
          getProfilesByUsername(state.accountUserName);
          setIsLoading(true);
          setIsOpenAddProfile(false);
          setForm({
            ...form,
            fullName: zaloName,
            phoneNumber: phone,
            birthday: new Date("2000-01-01"),
            address: "",
            loading: false,
            customerId: "",
            gender: "",
            relationship: "",
            affiliate: "",
          });
        }
      },
      onError: (error) => {
        console.log("🚀: error --> getCustomerByCustomerId:", error);
      },
    }
  );
  const { mutate: removeProfileByCustomerId } = useMutation(
    "post-footer-form",
    (data: any) => removeProfile(data),
    {
      onSuccess: (data) => {
        if (data.status) {
          getProfilesByUsername(state.accountUserName);
        }
        setIsLoading(false);
        setIsOpenRemoveProfile(false);
        openSnackbar({
          position: "top",
          duration: 3000,
          action: {
            onClick: () => {
              closeSnackbar();
            },
          },
          icon: false,
          text: data?.message,
          type: "success",
        });
      },
      onError: (error) => {
        console.log("🚀: error --> getCustomerByCustomerId:", error);
      },
    }
  );
  const { mutate: linkProfileByCustomerId } = useMutation(
    "post-footer-form",
    (data: any) => linkProfileCustomer(data),
    {
      onSuccess: (data) => {
        setIsOpenLinkProfile(false);
        openSnackbar({
          position: "top",
          duration: 3000,
          action: {
            onClick: () => {
              closeSnackbar();
            },
          },
          icon: false,
          text: data?.message,
          type: "success",
        });
        if (data.status) {
          getProfilesByUsername(state.accountUserName);
          setIsLoading(true);
        }
      },
      onError: (error) => {
        console.log("🚀: error --> getCustomerByCustomerId:", error);
      },
    }
  );

  const handleValidateNewProfile = () => {
    if (!form?.fullName) {
      setFormError({
        ...formError,
        fullName: "Tên là trường bắt buộc",
      });
      return false;
    }
    if (!form?.gender) {
      setFormError({
        ...formError,
        gender: "Giới tính là trường bắt buộc",
      });
      return false;
    }
    if (!form?.relationship) {
      setFormError({
        ...formError,
        relationship: "Vui lòng chọn mối quan hệ",
      });
      return false;
    }
    if (!form?.birthday) {
      setFormError({
        ...formError,
        birthday: "Ngày sinh là trường bắt buộc",
      });
      return false;
    }
    return true;
  };

  const handleCreateNewProfile = () => {
    if (!handleValidateNewProfile()) return;
    try {
      const body = {
        username: state.accountUserName,
        relation_type_id: form.relationship,
        profile: {
          customer_fullname: form.fullName,
          day_of_birth: form.birthday.getDate(),
          month_of_birth: form.birthday.getMonth(),
          year_of_birth: form.birthday.getFullYear(),
          customer_phone: form.phoneNumber,
          customer_address: form.address,
          gender_id: form.gender,
          customer_identity_card: form.customerId,
          country_id: "VN",
        },
        launch_source_id: 7,
      };

      setForm({
        ...form,
        loading: true,
      });
      makeProfile(body);
    } catch (error) {
      console.log("🚀 ~ handleCreateNewProfile ~ error:", error)
    }
  };

  const handleRemoveProfile = () => {
    const body = {
      username: state.usenameDelete,
      customer_id: state.customerDelete,
    }
    removeProfileByCustomerId(body)
  };

  const handleValidateLinkProfile = () => {
    if (!linkProfile?.customerId) {
      setlinkProfileError({
        ...linkProfileError,
        customerId: "Mã hồ sơ là trường bắt buộc",
      });
      return false;
    }
    if (!linkProfile?.relationship) {
      setlinkProfileError({
        ...linkProfileError,
        relationship: "Vui lòng chọn mối quan hệ",
      });
      return false;
    }
    return true;
  }

  const handleLinkProfile = () => {
    if (!handleValidateLinkProfile()) return;
    try {
      const body = {
        username: state?.accountUserName,
        customer_id: linkProfile?.customerId,
        relation_type_id: linkProfile?.relationship
      }

      linkProfileByCustomerId(body);
    } catch (error) {
      console.log("🚀 ~ handleLinkProfile ~ error:", error)
    }
  }

  const handleSubmit = async (profileItem: Profile) => {
    dispatch(setFormBooking({
      ...formBooking,
      profileId: profileItem?.customer_id,
      profileName: profileItem?.customer_fullname,
    }))
    await setStorage({
      data: {
        profileActive: profileItem,
        profileIdActive: profileItem.customer_id,
      },
    }).then(() => {
      
      navigate("/dashboard", {
        replace: true,
        animate: true,
        direction: "forward",
      });
    })
  }

  return (
    <Page className="p-switch_profile">
      <Box className="p-switch_profile_background" />
      <Box className="p-switch_profile_header">
        <Text>
          <strong>Khách ơi</strong>, <br />
          Hãy chọn một Hồ Sơ để tiếp tục
        </Text>
      </Box>
      <Box flex justifyContent="space-between" alignItems="center" className="gap-4 px-4">
        <div
          className={`${mapModifiers(
            "p-switch_profile_item_link",
          )} shadow-lg`}
          onClick={() => {
            setIsOpenLinkProfile(true);
          }}
        >
          <img src={iconLink} />
          <Text>Liên kết hồ sơ</Text>
        </div>
        <div
          className={`${mapModifiers(
            "p-switch_profile_item_add",
          )} shadow-lg`}
          onClick={() => {
            setIsOpenAddProfile(true);
          }}
        >
          <img src={iconAdd} />
          <Text>Tạo hồ sơ</Text>
        </div>
      </Box>
      {isLoading ?
        <Box flex alignItems="center" justifyContent="center" className="h-[20vh]">
          <Loading hasText={false} text={""} />
        </Box>
        :
        <Box className="p-switch_profile_body">
          {!!state?.listProfile ? state?.listProfile?.map((profile) => (
            <div
              className={`${mapModifiers(
                "p-switch_profile_item",
                profile?.customer_id === state.profileActive?.customer_id &&
                "active"
              )} shadow-md`}
              key={profile?.customer_id}
            >
              <Box
                flex
                justifyContent="center"
                alignItems="center"
                className="mb-2 h-[120px]"
                onClick={() => {
                  setState({ ...state, profileActive: profile });
                  handleSubmit(profile);
                }}
              >
                <Avatar size={70} src={logo} />
              </Box>
              <Box className="p-switch_profile_item_content" onClick={() => {
                setState({ ...state, profileActive: profile });
                handleSubmit(profile);
              }}>
                <Text className="text-center font-bold text-[18px] color_main">
                  {profile.customer_fullname}{" "}
                </Text>
                <Text className="text-[16px] mb-1 ">
                  Năm sinh: {profile.year_of_birth}{" "}
                </Text>
                <Text className="text-[16px] mb-1 ">Tuổi: {profile.age} </Text>
                <Text className="text-[16px] mb-1 ">
                  Giới tính: {profile.gender}{" "}
                </Text>
                <Text className="text-[16px] mb-1 ">
                  Quan hệ: {profile.relationship_type_name}{" "}
                </Text>
              </Box>
              <Box
                flex
                alignItems="center"
                className="relative z-100 cursor-pointer"
              >
                <div onClick={() => {
                  setState({
                    ...state,
                    usenameDelete: profile?.username,
                    customerDelete: profile?.customer_id,
                  });
                  setIsOpenRemoveProfile(true);
                }}>
                  <Icon icon="zi-delete" size={30} className="text-[red]" />
                </div>
              </Box>
            </div>
          )) : <Text className="text-center text-[#f00] font-thin">Không tìm thấy hồ sơ của bạn</Text>}
        </Box>
      }
       {/* Tạo Profile */}
      <Modal
        visible={isOpenAddProfile}
        title="TẠO MỚI HỒ SƠ"
        height={"85vh"}
        width={"75vh"}
        onClose={() => {
          setIsOpenAddProfile(false);
          resetFormData();
        }}
      >
        <Box className="p-register_form mt-4 px-4 h-fit">
          <Text
            style={{
              color: formError.fullName?.trim() && "red",
            }}
          >
            Họ tên <span className="text-red">*</span>
          </Text>
          <Input
            placeholder="Vui lòng nhập họ tên của bạn"
            className={mapModifiers(
              "form-input",
              formError.fullName?.trim() && "error"
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
          <Text
            style={{
              color: formError.gender && "red",
            }}
          >
            Giới tính <span className="text-red">*</span>
          </Text>
          <Select
            className={mapModifiers("form-select", formError.gender && "error")}
            helperText={formError.gender}
            value={form.gender}
            closeOnSelect
            placeholder="Vui lòng chọn giới tính"
            onChange={(select: any) => {
              setForm({
                ...form,
                gender: select,
              });
              setFormError({
                ...formError,
                gender: "",
              });
            }}
          >
            <Option value="M" title="Nam" />
            <Option value="F" title="Nữ" />
          </Select>
          <Text>
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
          />
          <Text
            style={{
              color: formError.relationship && "red",
            }}
          >
            Mối quan hệ <span className="text-red">*</span>
          </Text>{" "}
          <Select
            className={mapModifiers("form-select")}
            value={form.relationship}
            helperText={formError.relationship}
            closeOnSelect
            placeholder="Vui lòng chọn mối quan hệ"
            onChange={(select: any) => {
              setForm({
                ...form,
                relationship: select,
              });
              setFormError({
                ...formError,
                relationship: "",
              });
            }}
          >
            {relationtypes?.map((item) => {
              return (
                <Option value={item?.id} title={item?.name} key={item?.id} />
              );
            })}
          </Select>
          <Text>CCCD/CMND</Text>
          <Input
            value={form.customerId}
            placeholder="Nhập CCCD/CMND của bạn"
            className={mapModifiers("form-input")}
            type="text"
            onChange={(event) => {
              setForm({
                ...form,
                customerId: event.target.value,
              });
            }}
          />
          <Text>Ngày sinh</Text>
          <DatePicker
            locale="vi"
            placeholder="Ngày/ Tháng/ Năm"
            inputClass={mapModifiers(
              "form-datepicker",
              formError.birthday && "error"
            )}
            columnsFormat="DD-MM-YYYY"
            startYear={1924}
            endYear={new Date().getFullYear()}
            helperText={formError.birthday}
            value={form.birthday}
            formatPickedValueDisplay={(date: Date) => {
              if (date.valueOf() > new Date().valueOf()) {
                return `${moment(new Date()).format("DD/MM/YYYY")}`;
              } else {
                return moment(date).format("DD/MM/YYYY");
              }
            }}
            onChange={(value) => {
              if (value.valueOf() > new Date().valueOf()) {
                openSnackbar({
                  position: "top",
                  duration: 3000,
                  action: {
                    onClick: () => {
                      closeSnackbar();
                    },
                  },
                  icon: false,
                  text: "Không thể chọn ngày sinh ở tương lai",
                  type: "error",
                });
              } else {
                setForm({
                  ...form,
                  birthday: value,
                });
              }
              setFormError({
                ...formError,
                birthday: "",
              });
            }}
          />
          <Text style={{}}>Địa chỉ</Text>
          <Input.TextArea
            className={mapModifiers("form-input")}
            placeholder="Địa chỉ hiện tại của bạn"
            value={form.address}
            onChange={(event) => {
              setForm({
                ...form,
                address: event.target.value,
              });
            }}
          />
        </Box>
        <Box className="h-[50px] flex justify-center mt-4 gap-2">
          <Button
            className="bg-[#04566e] text-[#fff] py-2 px-6 rounded-lg font-[600]"
            onClick={handleCreateNewProfile}
            loading={form.loading}
          >
            Đăng ký
          </Button>
        </Box>
      </Modal>
      {/* Liển kết Profile */}
      <Modal
        visible={isOpenLinkProfile}
        title="LIÊN KẾT HỒ SƠ"
        height={'40vh'}
        width={'90vw'}
        onClose={() => {
          setIsOpenLinkProfile(false);
          setlinkProfile({
            customerId: "",
            relationship: "",
          });
          setlinkProfileError({
            customerId: "",
            relationship: "",
          });
        }}
      >
        <Box className="p-register_form gap-4 mt-4 px-2">
          <Text
            style={{
              color: linkProfileError.customerId?.trim() && "red",
            }}
          >
            CCCD/Mã hồ sơ <span className="text-red">*</span>
          </Text>
          <Input
            placeholder="Điền CCCD hoặc mã hồ sơ"
            className={mapModifiers(
              "form-input",
              linkProfileError.customerId?.trim() && "error"
            )}
            inputClassName="capitalize"
            helperText={linkProfileError.customerId}
            value={linkProfile.customerId}
            onChange={(event) => {
              setlinkProfile({
                ...linkProfile,
                customerId: event.target.value,
              });
              setlinkProfileError({
                ...linkProfileError,
                customerId: "",
              });
            }}
          />
          <Text
            style={{
              color: linkProfileError?.relationship && "red",
            }}
          >
            Mối quan hệ <span className="text-red">*</span>
          </Text>{" "}
          <Select
            className={mapModifiers("form-select")}
            value={linkProfile.relationship}
            helperText={linkProfileError.relationship}
            closeOnSelect
            placeholder="Vui lòng chọn mối quan hệ"
            onChange={(select: any) => {
              setlinkProfile({
                ...linkProfile,
                relationship: select,
              });
              setlinkProfileError({
                ...linkProfileError,
                relationship: "",
              });
            }}
          >
            {relationtypes?.map((item) => {
              return (
                <Option value={item?.id} title={item?.name} key={item?.id} />
              );
            })}
          </Select>
        </Box>
        <Box className="flex justify-center gap-4 mt-6">
          <Button
            className="bg-[red] text-[#fff] py-2 px-6 rounded-lg font-[600] h-[40px]"
            onClick={() => setIsOpenLinkProfile(false)}
          >
            Hủy
          </Button>
          <Button
            className="bg-[green] text-[#fff] py-2 px-6 rounded-lg font-[600] h-[40px]"
            onClick={handleLinkProfile}
          >
            Liên kết
          </Button>
        </Box>
      </Modal>
      {/* Delete Profile */}
      <Modal
        visible={isOpenRemoveProfile}
        title="Xác nhận xóa hồ sơ"
        description="Bạn chắc chắn muốn xóa hồ sơ này?"
        onClose={() => setIsOpenRemoveProfile(false)}
      >
        <Box className="flex justify-center gap-4 mt-4">
          <Button
            className="bg-[#3590ff] text-[#fff] py-2 px-6 rounded-lg font-[600] h-[40px]"
            onClick={() => setIsOpenRemoveProfile(false)}
          >
            Hủy
          </Button>
          <Button
            className="bg-[red] text-[#fff] py-2 px-6 rounded-lg font-[600] h-[40px]"
            onClick={handleRemoveProfile}
          >
            Xóa
          </Button>
        </Box>
      </Modal>
    </Page>
  );
}

export default SwitchProfile;

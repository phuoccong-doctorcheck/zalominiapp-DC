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
import React, {  useEffect, useLayoutEffect, useState } from "react";
import { useMutation } from "react-query";
import { setStorage, showToast } from "zmp-sdk/apis";
import imgToast from './img_warning.svg'
import { getHistoriesCustomer, getPrescriptionCustomer, setProfile } from "../../redux/dashboard";
import { createProfile } from "../../services/apis/dashboard";
import { useAuthentication } from "../../components/custom/authen-provider";
import { useAppDispatch } from "../../redux/common/hooks";
import { mapModifiers } from "../../utils/functions";
import { getVitalsignsCustomer } from "../../redux/detailExam";
import { getAppointmentByCustomerId } from "../../redux/booking";
import moment from "moment";
const {  Option } = Select;

function RegisterExamPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { openSnackbar, closeSnackbar } = useSnackbar();
    const { phone, zaloName } = useAuthentication();
    const [form, setForm] = useState({
        fullName: zaloName,
        phoneNumber: phone,
        birthday: new Date('2000-01-01'),
        address: "",
        loading: false,
        customerId: "",
        gender: "",
        affiliate: '',
        email:'',
        job:'',
        nation:''

    });

    const [formError, setFormError] = useState({
        fullName: "",
        phoneNumber: "",
        birthday: "",
        customerId: "",
        gender: "",
        address:""
    });

    const { mutate: makeProfile } = useMutation(
        "post-footer-form",
        (data: any) => createProfile(data),
        {
            onSuccess: (data) => {
                if (data.status) {
                    setStorage({
                        data: {
                            infoCustomer: data.data,
                            isLogin: true,
                        },
                    });
                    dispatch(setProfile(data.data));
                    dispatch(getVitalsignsCustomer(data?.data?.user?.customer_id));
                    dispatch(getPrescriptionCustomer(data?.data?.user?.customer_id));
                    dispatch(getHistoriesCustomer(data?.data?.user?.customer_id));
                    dispatch(getAppointmentByCustomerId(data?.data?.user?.customer_id as any));
                    navigate("/dashboard", {
                        replace: false,
                        animate: false,
                        direction: "forward",
                    });
                    setForm({
                        ...form,
                        loading: false,
                    });
                    openSnackbar({
                        position: "top",
                        duration: 5000,
                        action: {
                            onClick: () => {
                                closeSnackbar();
                            },
                        },
                        icon: true,
                        text: data.message,
                        type: "success",
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
                        text: data.message,
                        prefixIcon: (
                            <img src={imgToast} height={100} />
                        ),
                        type: "error",
                    });
                    setForm({
                        ...form,
                        loading: false,
                    });
                }
            },
            onError: (error) => {
                console.log("🚀: error --> getCustomerByCustomerId:", error);
            },
        },
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
            text: 'Bạn cần nhập đầy đủ thông tin để tiếp tục sử dụng chức năng này',
            type: "success",
        }); 
    }, [])
    
    useLayoutEffect(() => {
        setForm({
            ...form,
            fullName: zaloName,
            phoneNumber: phone,
        })
    }, [phone, zaloName])

    const handleValidateNewProfile = () => {
     
        if (!form.fullName.trim() || !form.gender.trim() || !form.phoneNumber.trim()) {
            setFormError({
                ...formError,
                fullName: !form.fullName.trim() ? "Tên là trường bắt buộc" : "",
                gender: !form.gender.trim() ? "Giới tính là trường bắt buộc" : "",
                phoneNumber: !form.phoneNumber.trim() ? "Số điện thoại là trường bắt buộc" : "",
                
            });
            return false;
        }
        
        if (!form.customerId.trim()) {
            setFormError({
                ...formError,
                customerId: "CMND/CCCD là trường bắt buộc",
            });
            return false;
        }
        if (!form.birthday) {
            setFormError({
                ...formError,
                birthday: "Ngày sinh là trường bắt buộc",
            });
            return false;
        }
        return true;
    };

    const handleCreateNewProfile = async () => {
        if (!handleValidateNewProfile()) return;
        const body = {
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
            dependent_code: form.affiliate
        };

        setForm({
            ...form,
            loading: true,
        });

        await makeProfile(body);
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
            <Box height={44} />
                
            <Box className="flex justify-center items-center relative">
                <Text className="color_main text-[20px] font-[600]">
                Bổ sung hồ sơ
                </Text>
            </Box>
            <Box className="p-register_form mt-4 px-4 h-fit">
                <Text style={{
                    color: formError.fullName.trim() && 'red'
                }}>Họ tên <span className="text-red">*</span></Text>
                <Input
                    placeholder="Vui lòng nhập họ tên của bạn"
                    className={mapModifiers(
                        "form-input",
                        formError.fullName.trim() && "error",
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
                <Text style={{
                    color: formError.gender && 'red'
                }}>Giới tính <span className="text-red">*</span></Text>
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
                <Text >Số điện thoại <span className="text-red">*</span></Text>
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
                <Text style={{
                    color: formError.customerId && 'red'
                }}>CCCD/CMND <span className="text-red">*</span></Text>
                <Input
                    value={form.customerId}
                    placeholder="Nhập CCCD/CMND của bạn"
                    className={mapModifiers(
                        "form-input",
                        formError.customerId && "error",
                    )}
                    type="number"
                    helperText={formError.customerId}
                    onChange={(event) => {
                        setForm({
                            ...form,
                            customerId: event.target.value,
                        });
                        setFormError({
                            ...formError,
                            customerId: "",
                        });
                    }}
                />
                <Text style={{ }}>Ngày sinh <span className="text-red">*</span></Text>
                <DatePicker
                    locale="vi"
                    placeholder="Ngày/ Tháng/ Năm"
                    inputClass={mapModifiers(
                        "form-datepicker",
                        formError.birthday && "error",
                    )}
                    columnsFormat='DD-MM-YYYY' 
                    startYear={1924}
                    endYear={new Date().getFullYear()}
                    helperText={formError.birthday}
                    value={form.birthday}
                    formatPickedValueDisplay={(date: Date) => {
                        if (date.valueOf() > new Date().valueOf()) {
                            return `${moment(new Date()).format('DD/MM/YYYY')}`
                        } else {
                            return moment(date).format('DD/MM/YYYY')
                            // return `${moment(date).format('DD/MM/YYYY')}  -  ${new Date().getFullYear() - date.getFullYear()} Tuổi`
                            
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
                                text: 'Không thể chọn ngày sinh ở tương lai',
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
                 <Text style={{}}>Email</Text>
                <Input
                    value={form.email}
                    placeholder="Nhập email của bạn (nếu có)"
                    className={mapModifiers(
                        "form-input"                    )}
                    onChange={(event) => {
                        setForm({
                            ...form,
                            email: event.target.value,
                        });
                    }}
                />
                 <Text style={{}}>Nghề nghiệp</Text>
                  <Input
                    value={form.job}
                    placeholder="Vui lòng nhập nghề nghiệp của bạn"
                    className={mapModifiers(
                        "form-input"                    )}
                    onChange={(event) => {
                        setForm({
                            ...form,
                            job: event.target.value,
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
        </Page>
    );
}

export default RegisterExamPage;

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Avatar, Box, Button, Icon, Modal, Page, Text, useNavigate } from "zmp-ui";
import './style.scss'
import imgVoucher from './imgVoucher.svg';
import imgGift from './imgGift.svg';
import { clearStorage, closeApp, getStorage, setStorage } from "zmp-sdk/apis";
import moment from "moment";
import BarCode from "../../components/atoms/BarCode";
import NavigationBar from "../../components/organisms/navigation-bar";
import { useAppDispatch } from "../../redux/common/hooks";

const CustomerInformation: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState<any>();
    const [dataProfile, setDataProfile] = useState<any>();
    const [dataAccount, setDataAccount] = useState<any>();
    const [confirmBooking, setConfirmBooking] = useState(false)

    const getData = async () => {
        try {
            const { profileActive, zalo_avatar, account } = await getStorage({
                keys: ["profileActive", "zalo_avatar", "account"],
            });
            setDataProfile(profileActive);
            setDataAccount(account);
            setAvatar(zalo_avatar);
        } catch (error) {
            console.log(error);
        }
    };

    const menu = [
        { id: 1, isEdit: false, title: dataProfile?.gender, icon: 'zi-user-window-solid' },
        // { id: 2, isEdit: false, title: dataProfile?.username, icon: 'zi-call' },
        { id: 3, isEdit: false, title: `${dataProfile?.age} Tuổi`, icon: 'zi-at' },
    ]

    useEffect(() => {
        getData();
    }, []);

    const handleLogout = () => {
        navigate('/switch-profile', {
            replace: false,
            animate: false,
            direction: "forward",
        });
    }

    return <Page className="p-customer_infos">
        <Box className="p-customer_infos_header">
            <Box className="p-customer_infos_main">
                <Box className="p-customer_infos_main_avatar">
                    <Avatar src={avatar} />
                </Box>
                <Box className="p-customer_infos_main_name">
                    <Text className="color_main">{dataProfile?.customer_fullname}</Text>
                    {(dataProfile?.year_of_birth) &&
                        <p>{dataProfile?.age} Tuổi</p>
                    }
                    {(dataProfile?.customer_id) &&
                        <BarCode
                            value={dataProfile?.customer_id}
                            config={{
                                background: "transparent",
                                height: 30,
                                width: 1.2,
                                font: 16,
                                fontSize: 10,
                                textMargin: 5,
                            }}
                        />
                    }
                </Box>
                <Box className="p-customer_infos_main_point">
                    <Box className="p-customer_infos_main_point_item">
                        <Text>Tổng điểm</Text>
                        <p>{dataAccount?.account?.data?.loyalty_points?.toLocaleString('vi-VN') ?? 0}</p>
                    </Box>
                    <Box className="p-customer_infos_main_point_item">
                        <Text>Điểm đổi quà</Text>
                        <p>{dataAccount?.account?.data?.use_points?.toLocaleString('vi-VN') ?? 0}</p>
                    </Box>
                    <Box className="p-customer_infos_main_point_item">
                        <Text>Điểm chờ về</Text>
                        <p>{dataAccount?.account?.data?.pending_points?.toLocaleString('vi-VN') ?? 0}</p>
                    </Box>
                </Box>
            </Box>
            <Box className="p-customer_infos_header_icon">
                <div onClick={handleLogout}>
                    <Icon icon="zi-share-external-1" size={32} className="text-[white] rotate-[90deg]" />
                </div>
            </Box>
        </Box>
        <Box className="p-customer_infos_menu">
            <Box className="p-customer_infos_menu_gift">
                <Box className="p-customer_infos_menu_gift_item bg-[#FEFAEF]" onClick={() => navigate('/incentives', {
                    replace: false,
                    animate: true,
                })}>
                    <img src={imgVoucher} />
                    <Text>Ưu đãi</Text>
                </Box>
                <Box className="p-customer_infos_menu_gift_item bg-[#FFDFE2]" onClick={() => {
                    navigate('/redemption', {
                        replace: false,
                        animate: true,
                    })
                }
                }
                >
                    <img src={imgGift} />
                    <Text>Đổi quà</Text>
                </Box>
            </Box>
            <Box className="p-customer_infos_menu_main">
                {menu.map((item) => (
                    item.title &&
                    <div
                        key={item.id}
                        className="p-customer_infos_menu_main_item flex items-center justify-between"
                    >
                        <Box className="flex items-center flex-start gap-4">
                            <Icon icon={item.icon as any} />
                            <Text>{item.title}</Text>
                        </Box>
                        {item.isEdit &&
                            <Icon icon="zi-post" size={24} />
                        }
                    </div>
                ))}
            </Box>
        </Box>
        <NavigationBar navigateDeault={"/infos"} />
    </Page>;
};

export default CustomerInformation;

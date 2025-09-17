import React, { useEffect, useLayoutEffect, useState } from "react";
import { FunctionComponent } from "react";
import { Avatar, Box, Icon, Modal, Sheet, Spinner, Text } from "zmp-ui";
import { getStorage } from "zmp-sdk/apis";
import imgbarcode from "./barcode.svg";
import { useAppSelector } from "../../../redux/common/hooks";
import { VitalsignsCustomerItem } from "../../../redux/detailExam/types";
import { formatDate } from "../../../utils/functions";
import BarCode from "../../atoms/BarCode";
import { useParams } from "react-router-dom";
import Loading from "../../atoms/Loading";
const { Title } = Text;

interface RestaurantProps {
    isRenderBMI?: boolean;
    isRenderBarcode?: boolean;
    isBill?: boolean;
    isChangeInfo?: boolean;
    moreInfo?: React.ReactNode;
}

const InfoCustomer: FunctionComponent<RestaurantProps> = ({ isRenderBMI, isRenderBarcode, isBill, isChangeInfo, moreInfo }) => {
    const { variant } = useParams();


    const infoCustomerVitalsigns = useAppSelector(
        (state) => state.detail.infoCustomerVitalsigns
    );
    const masterId = useAppSelector((state) => state.detail.masterIdExam);
    const infoCustomerVitalsignsLoading = useAppSelector(
        (state) => state.detail.infoCustomerVitalsignsLoading
    );
    const [dataProfile, setDataProfile] = useState<any>();
    const [showBarcode, setShowBarCode] = useState(false);
    const [showSheet, setShowSheet] = useState(false);

    const getData = async () => {
        try {
            const { profileActive } = await getStorage({
                keys: ["profileActive"],
            });
            setDataProfile(profileActive);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [isChangeInfo]);

    useEffect(() => {
        getData();
    }, [infoCustomerVitalsigns]);

    const [state, setState] = useState({
        loading: infoCustomerVitalsignsLoading,
        info: infoCustomerVitalsigns?.data?.find((i) => i.master_id === masterId),
        listVitalsigns: infoCustomerVitalsigns?.data,
        masterId: masterId,
    });

    useLayoutEffect(() => {
        setState({
            ...state,
            loading: infoCustomerVitalsignsLoading,
            info: infoCustomerVitalsigns?.data?.find((i) => i.master_id === masterId),
            listVitalsigns: infoCustomerVitalsigns?.data,
            masterId: masterId,
        });
    }, [infoCustomerVitalsignsLoading, infoCustomerVitalsigns, masterId]);

    const renderBMI = (bmi: string) => {
        if (Number(bmi) < 18.5) return "Cân nặng thấp (gầy)";
        if (Number(bmi) > 18.5 && Number(bmi) < 24.9) return "Bình Thường";
        if (Number(bmi) > 25 && Number(bmi) < 29.9) return "Tiền béo phì";
        if (Number(bmi) > 30 && Number(bmi) < 34.9) return "Béo phì độ I";
        if (Number(bmi) > 30 && Number(bmi) < 34.9) return "Béo phì độ I";
        if (Number(bmi) > 35 && Number(bmi) < 39.9) return "Béo phì độ II";
        if (Number(bmi) >= 40 && Number(bmi) < 39.9) return "Béo phì độ III";
        if (Number(bmi) == 25) return "Thừa cân";
    };

    const BMI: any[] = [
        { id: 1, title: "Mạch", value: state.info?.heart_rate ? state.info?.heart_rate : "", unit: "lần/phút", },
        { id: 4, title: "Huyết áp", value: state.info?.blood_pressure_min ? `${state.info?.blood_pressure_min} - ${state.info?.blood_pressure_max}` : "", unit: "mmHg", },
        { id: 2, title: "Nhịp thở", value: state.info?.respiratory_rate ? state.info?.respiratory_rate : "", unit: "lần/phút", },
        { id: 5, title: "Nhiệt độ", value: state.info?.temperature ? state.info?.temperature : "", unit: "°C", },
        { id: 3, title: "Chiều cao", value: state.info?.height ? state.info?.height : "", unit: "cm", },
        { id: 6, title: "Cân nặng", value: state.info?.weight ? state.info?.weight : "", unit: "kg", },
    ];

    const renderVitalsignsItem = (data: VitalsignsCustomerItem) => {
        const BMIItem: any[] = [
            { id: 1, title: "Mạch", value: data?.heart_rate ? data?.heart_rate : "", unit: "lần/phút", },
            { id: 4, title: "Huyết áp", value: data?.blood_pressure_min ? `${data?.blood_pressure_min} - ${data?.blood_pressure_max}` : "", unit: "mmHg", },
            { id: 2, title: "Nhịp thở", value: data?.respiratory_rate ? data?.respiratory_rate : "", unit: "lần/phút", },
            { id: 5, title: "Nhiệt độ", value: data?.temperature ? data?.temperature : "", unit: "°C", },
            { id: 3, title: "Chiều cao", value: data?.height ? data?.height : "", unit: "cm", },
            { id: 6, title: "Cân nặng", value: data?.weight ? data?.weight : "", unit: "kg", },
        ];
        return (
            <Box className="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
                {BMIItem.map(
                    (item) =>
                        item?.value?.trim() && (
                            <div
                                key={item.id}
                                className="flex item-center justify-between"
                            >
                                <p className="m-0 font-[400] text-[14px]">{`${item.title}(${item.unit}):`}</p>
                                <span className=" font-[600] text-[15px] color_main">
                                    {item.value}
                                </span>
                            </div>
                        )
                )}
            </Box>
        )
    }

    return (
        <Box className="o-info_wrapper">
            <Box
                flex
                justifyContent="space-between"
                alignItems="flex-start"
                className=""
            >
                <Avatar className="" story="seen" size={50} />
                <Box className="w-[82%]">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Title className={`text-[20px] font-[700] ${isBill && 'text-[black]'}`}>
                            {dataProfile?.customer_fullname}
                        </Title>
                        {isRenderBarcode &&
                            <span
                                className="o-info_wrapper_barcode"
                                onClick={() => setShowBarCode(true)}
                            >
                                <img className="w-[40px] h-[30px]" src={imgbarcode} />
                            </span>
                        }
                    </div>
                    <Box className="">
                        <p className={`m-0 text-[14px] font-[400] ${isBill && 'text-[black]'}`}>
                            {(dataProfile?.username) &&
                                <>
                                    Điện thoại: {dataProfile?.username.replace('+84-', '0')}
                                </>
                            }
                        </p>
                        {moreInfo}
                    </Box>
                </Box>
            </Box>
            {infoCustomerVitalsignsLoading ? (
                <Box className="h-screen flex items-center justify-center">
                    <Loading hasText={false} text={""} />
                </Box>
            ) : (
                <>
                    <Box className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 px-1">
                        {(isRenderBMI || variant === 'notification')
                            ? BMI.map(
                                (item) =>
                                    item?.value?.trim() && (
                                        <div
                                            key={item.id}
                                            className="flex item-center justify-between"
                                        >
                                            <p className="m-0 font-[400] text-[14px]">{`${item.title}(${item.unit}):`}</p>
                                            <span className=" font-[600] text-[15px] color_main">
                                                {item.value}
                                            </span>
                                        </div>
                                    )
                            )
                            : null}
                    </Box>
                    <Box
                        className={
                            state.listVitalsigns?.length > 1
                                ? ((isRenderBMI && state.info?.bmi || variant === 'notification') ? `flex justify-between items-center` : `flex justify-end items-center`)
                                : ""
                        }
                    >
                        {(isRenderBMI && state.info?.bmi || variant === 'notification') ? (
                            <Box className="flex gap-x-4 gap-y-4 mt-4 items-center pl-1">
                                <Text className="m-0 text-[15px] font-[600] text-[#333]">
                                    BMI:
                                </Text>
                                <span
                                    className={`font-[600] text-[${Number(state.info?.bmi) > 18.5 &&
                                        Number(state.info?.bmi) < 24.9
                                        ? "green"
                                        : "red"
                                        }]`}
                                >
                                    {state.info?.bmi} {"->"} {renderBMI(state.info?.bmi as any)}
                                </span>
                            </Box>
                        ) : null}
                        {state.listVitalsigns?.length > 1 && (
                            <Box
                                className="flex item-center mt-[16px] color_main"
                                onClick={() => setShowSheet(true)}
                            >
                                <Icon
                                    icon="zi-arrow-right"
                                    size={18}
                                    className="translate-y-[3px]"
                                />{" "}
                                <Text>Lịch sử sinh hiệu</Text>
                            </Box>
                        )}
                    </Box>
                </>
            )}

            <Sheet
                visible={showSheet}
                onClose={() => setShowSheet(false)}
                height={480}
                mask
                handler
                swipeToClose
            >
                <Box className="o-info_vitalsigns">
                    <Box className="o-info_vitalsigns_header">
                        <Text>Lịch sử đo sinh hiệu</Text>
                    </Box>
                    <Box className="o-info_vitalsigns_content">
                        {state.listVitalsigns?.length
                            ? state.listVitalsigns?.map((item) => (
                                <div key={item.id} className="my-2 border-b pb-2">
                                    <Box>
                                        <Box flex justifyContent="space-between" alignItems="center">
                                            <Text className="">Thời gian đo: </Text><Text>{formatDate(item.datetime, 'HH:mm A, DD-MM-YYYY')}</Text>
                                        </Box>
                                        <Text className={`flex items-center gap-1 font-bold mt-1 `}>BMI: <p className={`text-[${Number(item?.bmi) > 18.5 && Number(item?.bmi) < 24.9 ? "green" : "red"}]`}>{item.bmi} {"->"} {renderBMI(item.bmi)}</p></Text>
                                    </Box>
                                    <Box className="">
                                        {renderVitalsignsItem(item)}
                                    </Box>
                                    <Box className="mt-2" flex justifyContent="space-between" alignItems="center">
                                        <Text>Người thực hiện:</Text> <Text>{item.employee.signature_name}</Text>
                                    </Box>
                                </div>
                            ))
                            : null}
                    </Box>
                </Box>
            </Sheet>

            <Sheet
                visible={showBarcode}
                onClose={() => setShowBarCode(false)}
                autoHeight
                mask
                handler
                swipeToClose
            >
                <Box className="o-info_vitalsigns">
                    <Box className="o-info_vitalsigns_header">
                        <Text>Mã phiếu khám</Text>
                    </Box>
                    <Box className="flex justify-center">
                        {masterId &&
                            <BarCode value={masterId} config={{ height: 50, fontSize: 14 }} />
                        }
                    </Box>
                </Box>
            </Sheet>
        </Box>
    );
};

InfoCustomer.defaultProps = {
    isRenderBMI: true,
    isRenderBarcode: true,
    isBill: false,
};

export default InfoCustomer;

import React from "react";
import { Box, Icon, Text,useNavigate } from "zmp-ui";
import { AppointmentItem } from "../../redux/booking/types";
import moment from "moment";

interface DashboardBookingProps {
    data: AppointmentItem;
}

export const DashboardBooking: React.FC<DashboardBookingProps> = ({ data }) => {
    const navigate = useNavigate();
    return (
        <Box className="grid grid-cols-[60px_1fr_70px] min-h-[100px] mx-2 mt-4 shadow-[3px_2px_5px_2px_#0000001f,0px_2px_3px_1px_#0000004d] rounded-xl overflow-hidden"
            onClick={() =>
            navigate('/follow-booking',{
            replace: false,
            animate: true,
        })}
        >
            <Box className="flex justify-center items-center bg-[#FEF6DF]">
                <Icon icon="zi-add-story" className="color_main font-[700]" size={30}/>
            </Box>
            <Box className="bg-[#04566e] p-1">
                <Text className="text-[19px] text-[white]"> Bạn đang có 1 lịch hẹn</Text>
                <p className="font-bold text-[white] text-[16px] mt-1">{moment(data?.appointment_date).format('DD-MM-YYYY HH:mm')} {Number(moment(data?.appointment_date).format('HH')) < 12 ? 'Sáng' : 'Chiều'}</p>
                <p className="text-[#FEF6DF] text-[13px]">(Nếu bạn tới muộn sau thời gian hẹn <br/>
                    Vui lòng gặp lễ tân để nhận STT mới)
                </p>
            </Box>
            <Box className="bg-[#1A667D] flex flex-col justify-center items-center">
                    <Text className="text-[20px] text-[white]">STT</Text>
                <p className="font-bold text-[white] text-[20px] mt-1">{data?.appointment_order_number}</p>
            </Box>
        </Box>
    )
}
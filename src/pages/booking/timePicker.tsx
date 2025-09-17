import React from "react";
import {
  Box,
  Header,
  Page,
  Text,
  Icon,
  useNavigate,
  useSnackbar,
} from "zmp-ui";
import { dataTimePicker } from "../../utils/state";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { setFormBooking } from "../../redux/booking";
import { openChat } from "zmp-sdk";

interface TimePickerProps {}

const TimePicker: React.FC<TimePickerProps> = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formBooking = useAppSelector((state) => state.booking.formBooking);
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
    <Page className="overflow-hidden">
      <Header
        title="Chọn giờ khám"
        className="p-booking_headers"
        showBackIcon
        backgroundColor="#fff"
      />
      <Box height={50} />
      <Box className="h-screen w-screen">
        {dataTimePicker.length &&
          dataTimePicker.map((item) => (
            <div key={item.id}>
              <Box
                className="bg-[orange] p-2 gap-2"
                flex
                justifyContent="flex-start"
                alignItems="center"
              >
                <Icon icon="zi-clock-2" className="text-[#000]" />
                <Text className="text-[#000] font-[400] text-lg ">
                  {item.group}
                </Text>
              </Box>
              <Box className="grid grid-cols-3 gap-4 mt-2 py-2 px-3 mb-2">
                {item.range.length &&
                  item.range.map((range, index) => (
                    <div
                      key={index}
                      className={`flex justify-center border border-[#04566e] color_main py-3 px-[3px] rounded-md text-[16px] ${
                        formBooking.time_id === range.id && "bg-[orange]"
                      }`}
                      onClick={() => {
                        // dispatch(
                        //   setFormBooking({
                        //     ...formBooking,
                        //     appointment_datetime: `${
                        //       formBooking.appointment_datetime.split(" ")[0]
                        //     } ${range.start}`,
                        //     time_id: range.id,
                        //     time_value: range.start,
                        //   })
                        // );
                        // navigate("/booking", {
                        //   replace: false,
                        //   animate: true,
                        //   direction: "backward",
                        // }); 
                          openChatScreen('309834292180920772')
                      }}
                    >
                      {range.timeline}
                    </div>
                  ))}
              </Box>
            </div>
          ))}
      </Box>
    </Page>
  );
};

TimePicker.defaultProps = {};

export default TimePicker;

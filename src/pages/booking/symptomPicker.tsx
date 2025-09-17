import React, { useEffect, useState } from "react";
import { Box, Header, Text, Page, Input, useNavigate } from "zmp-ui";
import { dataSmyptom } from "../../utils/state";
import { SmyptomItem } from "../../redux/booking/types";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { setFormBooking } from "../../redux/booking";
import { openChat } from "zmp-sdk";

interface SymptomsPickerProps {}

const SymptomsPicker: React.FC<SymptomsPickerProps> = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formBooking = useAppSelector((state) => state.booking.formBooking);

  const [listSymptom, setListSymtom] = useState<SmyptomItem[]>(
    formBooking.symptom,
  );
  const [value, setValue] = useState(formBooking.other_symptoms);

  useEffect(() => {
    setListSymtom(formBooking.symptom);
    setValue(formBooking.other_symptoms);
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
    <Page className="overflow-scroll c-symptoms pb-6">
      <Header
        title="Triệu chứng hiện tại"
        className="p-booking_headers"
        showBackIcon
        backgroundColor="#fff"
        onBackClick={() => {
          // navigate("/booking", {
          //   replace: true,
          //   direction: 'backward',
          // });
          openChatScreen('309834292180920772')
        }}
      />
      <Box height={50} />
      <Box className="h-fit w-screen">
        {dataSmyptom.length &&
          dataSmyptom.map((item) => (
            <div key={item.id}>
              <Box
                className="bg-[orange] p-2 gap-2"
                flex
                justifyContent="flex-start"
                alignItems="center"
              >
                <Text className="text-[#000] font-[400]">{item.group}</Text>
              </Box>
              <Box className="gap-2 mt-2 py-1 px-2 mb-2 flex flex-wrap">
                {item.symptoms.length &&
                  item.symptoms.map((range) => (
                    <div
                      key={range.id}
                      className={`flex justify-center border border-[#04566e] color_main p-2 rounded-md text-[16px] ${
                        listSymptom.includes(range) &&
                        "bg-[#04566e] text-[#fff]"
                      }`}
                      onClick={() => {
                        if (listSymptom.some((i) => i.id === range.id)) {
                          setListSymtom((prev) =>
                            prev.filter((y) => y.id !== range.id),
                          );
                        } else {
                          setListSymtom([...listSymptom, range]);
                        }
                      }}
                    >
                      {range.label}
                    </div>
                  ))}
              </Box>
            </div>
          ))}
        <div>
          <Box
            className="bg-[orange] p-2 gap-2"
            flex
            justifyContent="flex-start"
            alignItems="center"
          >
            <Text className="text-[#000] font-[400]">{"Triệu chứng khác"}</Text>
          </Box>
          <Box className="gap-2 mt-2 py-2 px-4 mb-2 flex flex-wrap  c-symptoms_input">
            <Input.TextArea
              value={value}
              placeholder="Nhập triệu chứng bạn đang gặp phải..."
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
          </Box>
        </div>
      </Box>
      <Box flex justifyContent="center" alignItems="center" className="w-full">
        <button
          className="py-2 px-6 border rounded-md bg-[white] shadow-md"
          onClick={() => {
            // dispatch(
            //   setFormBooking({
            //     ...formBooking,
            //     symptom: listSymptom,
            //     other_symptoms: value,
            //   }),
            // );
            // navigate("/booking", {
            //   replace: false,
            //   animate: true,
            //   direction: "backward",
            // });
            openChatScreen('309834292180920772')
          }}
        >
          Xác nhận
        </button>
      </Box>
    </Page>
  );
};

SymptomsPicker.defaultProps = {};

export default SymptomsPicker;

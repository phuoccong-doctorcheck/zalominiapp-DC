import React, { useEffect, useRef, useState } from "react";
import { Box, Header, Text, Icon, useNavigate } from "zmp-ui";
import { getStorage, openChat } from "zmp-sdk/apis";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import Loading from "../../components/atoms/Loading";
import BarCode from "../../components/atoms/BarCode";
import { setFormBooking } from "../../redux/booking";
import { Profile } from "../../redux/booking/types";

const { Header: Heading } = Text;

interface ProfilePickerProps {}

const ProfilePicker: React.FC<ProfilePickerProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const dataProfiles = useAppSelector((state) => state.booking.dataProfiles);
  const loadingGetProfile = useAppSelector(
    (state) => state.booking.loadingGetProfile
  );

  const [stateProfile, setStateProfile] = useState(dataProfiles);
  const formBooking = useAppSelector((state) => state.booking.formBooking);

  const [dataProfile, setDataProfile] = useState<any>();

  const getData = async () => {
    try {
      const { infoCustomer } = await getStorage({
        keys: ["infoCustomer"],
      });
      setDataProfile(infoCustomer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setStateProfile(dataProfiles);
  }, [dataProfiles]);

  const handleSetData = async (data: Profile) => {
    await dispatch(setFormBooking({
      ...formBooking,
      profileId: data.customer_id,
      profileName: data.customer_fullname,
    }))
  }
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
    <Box className="overflow-hidden c-profile">
      <Header
        title="Chọn hồ sơ khám"
        className="p-booking_headers"
        showBackIcon
        backgroundColor="#fff"
      />
      <Box height={50} />
      <Box className="h-screen w-screen c-profile_list p-2 mt-1">
        {loadingGetProfile ? (
          <Box className="h-screen flex items-center justify-center">
            <Loading hasText={false} text={""} />
          </Box>
        ) : (
          stateProfile?.data?.map((item) => (
            <div
              key={item.customer_id}
              className=" c-profile_item mb-4 border-b pb-2"
              onClick={() => {
                handleSetData(item).then(() => {
                  openChatScreen('309834292180920772')
                  // navigate("/booking", {
                  //   replace: true,
                  //   direction: "backward",
                  // });
                })
              }}
            >
              <Box
                flex
                alignItems="center"
                justifyContent="center"
                className="color_main"
              >
                <Icon icon="zi-user-circle-solid" size={40} />
              </Box>
              <Box>
                <Heading className="color_main ml-4">
                  {item.customer_fullname}
                </Heading>
                <Text className="text-[#999] ml-4">{`${item.relationship_type_name} - ${item.year_of_birth} - ${item.gender}`}</Text>
              </Box>
            </div>
          ))
        )}
      </Box>
    </Box>
  );
};

ProfilePicker.defaultProps = {};

export default ProfilePicker;

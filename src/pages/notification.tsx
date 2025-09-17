import React, { useEffect, useLayoutEffect, useState } from "react";
import { Page, Text, Header, Box, Icon, useNavigate } from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../redux/common/hooks";
import moment from "moment";
import { mapModifiers } from "../utils/functions";
import { getVitalsignsCustomer, setListService, setMasterIdExam } from "../redux/detailExam";
import { getHistoriesCustomer, getPrescriptionCustomer } from "../redux/dashboard";
import { getStorage } from "zmp-sdk/apis";
import Loading from "../components/atoms/Loading";

const { Title } = Text;

type DataType =
  | "HISTOPATHOLOGY_RESULT"
  | "EXAMS_RESULT"
  | "IMAGING_RESULT"
  | "LABTEST_RESULT"
  | "APPOINTMENT"
  ;

export const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const notifies = useAppSelector((state) => state.dashboard.notify);
  const historiesCustomer = useAppSelector(
    (state) => state.dashboard.historiesCustomer,
  );
  const notifyLoading = useAppSelector(
    (state) => state.dashboard.notifyLoading
  );

  const [dataHistories, setDataHistories] = useState(historiesCustomer)

  const handleSaveData = async (data:any) => {
    try {
      dispatch(setListService(data.items));
      dispatch(setMasterIdExam(data.master_id));
      dispatch(getVitalsignsCustomer(data.customer_id));
      navigate(`/detail-exam?variant=default`);
    } catch (error) {
      console.log("🚀 ~ handleSaveData ~ error:", error)
    }
  }

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
  useLayoutEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    dispatch(getHistoriesCustomer(dataProfile?.user?.customer_id ? dataProfile?.user?.customer_id : dataProfile?.user?.customer?.customer_id as any));
  }, [dataProfile]);

  useEffect(() => {
    setDataHistories(historiesCustomer);
  }, [historiesCustomer]);

  return (
    <Page className="p-notify">
      <Header
        title="Thông báo"
        className="p-booking_headers"
        showBackIcon
        backgroundColor="#fff"
      />
      <Box height={44} />
      {notifyLoading ? (
        <Box className="h-screen flex items-center justify-center">
          <Loading hasText={false} text={""} />
        </Box>
      ) : (
          <Box className="p-notify_wrapper">
            {notifies?.data?.data?.length ? notifies?.data?.data?.map((item: any) => (
              <div key={item.card_id} className={`p-notify_item my-4 ${item.is_read && 'p-notify_item_seen'}`} onClick={() => {
                const getExam = dataHistories.data.find((i) => i.master_id === item.data_id)
                if (getExam) {
                  handleSaveData(getExam);
                }
              }}>
                <Box key={item.card_id} className={mapModifiers('p-notify_item_icon', item.data_type === 'APPOINTMENT' && 'appointment')}>
                  <span>
                    <Icon className="text-[#fff]" icon={'zi-bookmark'}/>
                  </span>
                  {!item.is_read && <p></p>}
                </Box>
                <Box key={item.card_id} className="p-notify_item_content">
                  <Box key={item.card_id} className="p-notify_item_title">
                    <Title>{item.message_title}</Title>
                    <span className="p-notify_item_title_date">{ moment(item.write_date).format('DD-MM-YYYY')}</span>
                  </Box>
                  <p className="p-notify_item_desc">{item.message_content}</p>
                </Box>
              </div>
            ))
              : <Box className="mt-5 flex justify-center">
                <Text className="text-[red]">Không tìm thấy thông báo...</Text>
              </Box>
          }
        </Box>
      )}
    </Page>
  );
};

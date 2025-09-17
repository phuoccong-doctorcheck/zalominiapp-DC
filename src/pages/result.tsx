import { Box, Page, useNavigate, Text, Header, Spinner, Icon } from "zmp-ui";
import React, { useEffect, useLayoutEffect, useState } from "react";
import NavigationBar from "../components/organisms/navigation-bar";
import { useAppDispatch, useAppSelector } from "../redux/common/hooks";
import MedicalExamItem from "../components/organisms/MedicalExamItem";
import Prescription from "../components/organisms/PrescriptionItem";
import {
  getVitalsignsCustomer,
  setListService,
  setMasterIdExam,
} from "../redux/detailExam";
import { getPrescriptionCustomer } from "../redux/dashboard";
import { getStorage } from "zmp-sdk/apis";
import { Profile } from "../redux/booking/types";
import { Button } from "zmp-react";

function Category({ setTabActive, tabId, tab }) {
  return (
    <Box className="grid grid-cols-2 p-2 shadow-sm border rounded-full gap-2 ">
      {tab.map((button, index) => (
        <div
          key={index}
          className={`flex justify-center items-center p-1 gap-2 ${
            tabId === button.id ? "result-category_active " : "result-category"
          } `}
          onClick={() => setTabActive(button)}
        >
          <Icon icon={button.icon as any} size={28} />
          <Text>{button.title}</Text>
        </div>
      ))}
    </Box>
  );
}

function ResultPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = window.location;
  const [typeParams, setTypeParams] = useState("");

  const searchParams = new URLSearchParams(location.search);

  const historiesCustomerLoading = useAppSelector(
    (state) => state.dashboard.loadingHistoriesCustomer
  );
  const historiesCustomer = useAppSelector(
    (state) => state.dashboard.historiesCustomer
  );
  const prescriptionCustomerLoading = useAppSelector(
    (state) => state.dashboard.loadingPrescriptionCustomer
  );
  const prescriptionCustomer = useAppSelector(
    (state) => state.dashboard.prescriptionCustomer
  );

  const [itemActive, setItemActive] = useState(0);
  const [state, setState] = useState({
    loadingHistories: historiesCustomerLoading,
    listHistories: historiesCustomer?.data,
    loadingPrescription: prescriptionCustomerLoading,
    listPrescription: prescriptionCustomer?.data,
    customerId: "",
    profileActive: undefined as unknown as Profile,
    accountUserName: "",
  });

  const getData = async () => {
    try {
      const { profileActive, profileIdActive, accountUserName } =
        await getStorage({
          keys: ["profileActive", "profileIdActive", "accountUserName"],
        });
      setState({
        ...state,
        customerId: profileIdActive,
        profileActive: profileActive,
        accountUserName: accountUserName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useLayoutEffect(() => {
    setState({
      ...state,
      loadingHistories: historiesCustomerLoading,
      loadingPrescription: prescriptionCustomerLoading,
      listHistories: historiesCustomer?.data,
      listPrescription: prescriptionCustomer?.data,
    });
  }, [
    historiesCustomerLoading,
    prescriptionCustomerLoading,
    historiesCustomer,
    prescriptionCustomer,
  ]);

  useLayoutEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setTypeParams(type);
    }
  }, [location]);

  const categoryItem = [
    {
      id: 0,
      icon: "zi-list-2",
      title: "Lượt khám",
      component: !state.loadingHistories ? (
        <>
          {historiesCustomer?.data?.length ? (
            historiesCustomer?.data?.map((item, index) => {
              return (
                <div key={index}>
                  <MedicalExamItem
                    exam={item}
                    onClick={() => {
                      dispatch(setListService(item.items));
                      dispatch(getVitalsignsCustomer(item?.customer_id));

                      dispatch(setMasterIdExam(item.master_id));
                      navigate(`/detail-exam?variant=default`, {
                        replace: false,
                        animate: true,
                        direction: "forward",
                      });
                    }}
                  />
                </div>
              );
            })
          ) : (
            <Box className="mt-6">
              <Text className="text-[red] text-center">
                Không tìm thấy phiếu khám
              </Text>
            </Box>
          )}
        </>
      ) : (
        <Box flex justifyContent="center" className="mt-16">
          <Spinner logo={undefined} />
        </Box>
      ),
    },
    {
      id: 1,
      icon: "zi-poll-solid",
      title: "Thuốc",
      component: !state.loadingPrescription ? (
        <>
          {state.listPrescription?.length ? (
            state.listPrescription?.map((item, index) => (
              <div key={index}>
                <Prescription prescription={item} />
              </div>
            ))
          ) : (
            <Box className="mt-6">
              <Text className="text-[red] text-center">
                Không tìm thấy toa thuốc
              </Text>
            </Box>
          )}
        </>
      ) : (
        <Box flex justifyContent="center" className="mt-16">
          <Spinner logo={undefined} />
        </Box>
      ),
    },
  ];

  // const onClickChooseButtonType = () => {
  //   navigate(`/abnormal_result?masterId=24060409060011&customerId=DC24060409060007`, {
  //     replace: false,
  //     animate: true,
  //   });
  // };

  return (
    <Page className="bg-cover py-4 px-2 ">
      <Header
        title="Kết quả"
        className="p-booking_headers"
        showBackIcon={typeParams !== "navigate"}
        backgroundColor="#fff"
        onBackClick={() => {
          navigate("/dashboard", {
            replace: false,
            animate: true,
            direction: "backward",
          });
        }}
      />
      <Box height={40} />
      {/* <Box>
          <Button
            className='filter-button'
            typeName='primary'
            onClick={() => onClickChooseButtonType()}
          >
            Primary
          </Button>
        </Box>
      <Box height={40} /> */}
      <div className="bg-white rounded-full  px-1 py-1 restaurant-with-cover mx-4">
        <Category
          tab={categoryItem}
          setTabActive={(item) => {
            setItemActive(item.id);
            if (item.id === 1 && !state.listPrescription?.length) {
              dispatch(getPrescriptionCustomer(state.customerId));
            }
          }}
          tabId={itemActive}
        />
      </div>
      {categoryItem.map((tab, index) => {
        if (tab.id !== itemActive) return;
        return <div key={index}>{tab.component}</div>;
      })}
      {typeParams === "navigate" && (
        <NavigationBar navigateDeault={"/result?type=navigate"} />
      )}
    </Page>
  );
}

export default ResultPage;

import React, { useEffect, useState } from "react";
import { BottomNavigation, Icon, useNavigate } from "zmp-ui";
import { mapModifiers } from "../../utils/functions";
import { getStorage, openChat } from "zmp-sdk/apis";
import { useAuthentication } from "../custom/authen-provider";
import { useAppDispatch } from "../../redux/common/hooks";
import {
  getHistoriesCustomer,
  getPrescriptionCustomer,
  setDefaultPrescription,
} from "../../redux/dashboard";
import { getVitalsignsCustomer } from "../../redux/detailExam";

const navItems = [
  {
    key: "home",
    path: "/dashboard",
    label: "Trang chủ",
    icon: <Icon icon="zi-home" className="font-[500]" />,
    permission: false,
  },
  {
    key: "result",
    path: "/result?type=navigate",
    label: "Kết quả",
    icon: <Icon icon="zi-pcline" className="font-[500]" />,
    permission: true,
  },
  {
    key: "booking",
    path: "/follow-booking?type=navigate",
    label: "Đặt lịch",
    icon: <Icon icon="zi-add-story" className="font-[500]" />,
    permission: true,
  },
  {
    key: "support",
    //   path: "/customer_point_view?customerId=DC23033108410007",
    path: "/support",
    label: "Hỗ trợ",
    icon: <Icon icon="zi-chat" className="font-[500]" />,
    permission: false,
  },
  {
    key: "infos",
    path: "/infos",
    label: "Thông tin",
    icon: <Icon icon="zi-user" className="font-[500]" />,
    permission: true,
  },
];

function NavigationBar({ navigateDeault }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { havePhone, phone } = useAuthentication();

  const [activeTab, setActiveTab] = useState(navigateDeault);
  const [navigationActive, setNavigationActive] = useState(
    navItems.find((i) => i?.path === navigateDeault)?.key
  );
  const [states, setStates] = useState({
    customerId: "",
    isLogin: false,
  });

  const getData = async () => {
    try {
      const { isLogin, profileIdActive } = await getStorage({
        keys: ["isLogin", "profileIdActive"],
      });
      setStates({
        ...states,
        isLogin: isLogin,
        customerId: profileIdActive,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    navigate(activeTab);
  }, [activeTab]);
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
    <BottomNavigation
      id="bottom-nav"
      className="bottom-navigation_bar"
      activeKey={navigationActive}
      fixed
    >
      {navItems.map(({ path, label, icon, key, permission }) => (
        <BottomNavigation.Item
          key={path}
          label={label}
          icon={icon}
          className={`"text-[#04566e] font-[600]" ${mapModifiers(
            "bottom-navigation_item",
            navigationActive === key && "active"
          )}`}
          onClick={() => {
            if (key === "booking") {
              // Log ra khi bấm "Đặt lịch" và không chuyển trang
              openChatScreen("309834292180920772");
              return; // Ngăn việc tiếp tục thực hiện điều hướng
            }
            if (
              !states.isLogin &&
              navItems.find((i) => i.key === key)?.permission
            ) {
              if (havePhone && phone.trim()) {
                navigate("/404", {
                  replace: true,
                  animate: true,
                });
              } else {
                navigate("/permission", {
                  replace: true,
                  animate: true,
                });
              }
            } else {
              setNavigationActive(key);
              navigate(path, {
                replace: true,
                animate: false,
              });
              if (key === "result") {
                dispatch(getHistoriesCustomer(states.customerId));
              //  dispatch(getHistoriesCustomer("DC25020507370004"));
                dispatch(setDefaultPrescription());
              }
            }
          }}
        />
      ))}
    </BottomNavigation>
  );
}

export default NavigationBar;

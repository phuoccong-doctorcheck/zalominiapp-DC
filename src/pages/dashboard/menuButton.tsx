// import React, { useEffect, useState } from "react";
// import { getStorage } from "zmp-sdk/apis";
// import { Icon, useNavigate, Text, useSnackbar } from "zmp-ui";
// import { useAppDispatch } from "../../redux/common/hooks";
// import {
//   getHistoriesCustomer,
//   setDefaultPrescription,
// } from "../../redux/dashboard";
// import { useAuthentication } from "../../components/custom/authen-provider";

// interface MenuButtonProps{
//   isHaveBooking?: boolean
// }

// export const MenuButton: React.FC<MenuButtonProps> = ({ isHaveBooking }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { havePhone, phone } = useAuthentication();

//   const { openSnackbar, closeSnackbar } = useSnackbar();
//   const [states, setStates] = useState({
//     customerId: '',
//     isLogin: false,
//   });

//   const getData = async () => {
//     try {
//       const { isLogin,  profileIdActive } = await getStorage({
//         keys: ["isLogin", "profileIdActive"],
//       });
//       setStates({
//         ...states,
//         isLogin: isLogin,
//         customerId: profileIdActive,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getData();
//   }, []);

//   const listButton = [
//     {
//       id: 1,
//       icon: "zi-add-story",
//       title: "Đặt lịch",
//       onClick: (data: any) => { },
//       style: "border-t-0 border-l-0 border-b border-r",
//       slug: "/booking",
//       release: true,
//       permission: true,
//     },
//     {
//       id: 2,
//       icon: "zi-pcline",
//       title: "Kết quả",
//       onClick: (data: any) => { },
//       permission: true,
//       style: "border-t-0 border-l-0 border-b border-r-0",
//       slug: "/result?type=menu",
//       release: true,
//     },
//     {
//       id: 3,
//       icon: "zi-note",
//       title: "Bảng giá",
//       onClick: (data: any) => { },
//       style: "border-t-0 border-l border-b border-r-0",
//       slug: "/package/price",
//       release: true,
//     },
//     {
//       id: 4,
//       icon: "zi-warning-circle",
//       title: "Ưu đãi",
//       onClick: (data: any) => { },
//       style: "border-t-0 border-l-0 border-b-0 border-r",
//       slug: "/prioritize",
//       release: false,
//     },
//     {
//       id: 5,
//       icon: "zi-members",
//       title: "Thành viên",
//       onClick: (data: any) => { },
//       style: "border-t-0 border-l-0 border-b-0 border-r-0",
//       slug: "/member",
//       release: false,
//     },
//     {
//       id: 6,
//       icon: "zi-heart",
//       title: "Thói quen",
//       onClick: (data: any) => { },
//       style: "border-t-0 border-l border-b-0 border-r-0",
//       slug: "/mannered",
//       release: false,
//     },
//   ];

//   return (
//     <div className={`grid grid-cols-3 p-0 bg-[#fff] rounded-xl overflow-hidden p-0 m-0 mt shadow-md border border-solid border-[#dbdbdb] mx-4 p-dashboard_popular relative z-2 translate-y-[-30px]`}>
//       {listButton.length
//         ? listButton.map((button, index) => (
//           <div
//             key={index}
//             onClick={() => {
//               if (button.permission && !states.isLogin) {
//                 if (havePhone && phone.trim()) {
//                   navigate("/create-account", {
//                     replace: true,
//                     animate: true,
//                   });
//                 } else {
//                   navigate("/permission", {
//                     replace: true,
//                     animate: true,
//                   });
//                 }
//               } else {
//                 if (button.release) {
//                   navigate(button.slug, {
//                     replace: true,
//                   });
//                   if (button.id === 2) {
//                     dispatch(getHistoriesCustomer(states.customerId));
//                     dispatch(setDefaultPrescription());
//                   }
//                 } else {
//                   openSnackbar({
//                     position: "top",
//                     duration: 4000,
//                     action: {
//                       onClick: () => {
//                         closeSnackbar();
//                       },
//                     },
//                     icon: true,
//                     text: "Tính năng này đang được phát triển",
//                     type: "error",
//                   });
//                 }
//               }
//             }}
//             className={`flex items-center justify-center py-8 px-4 flex-col border-solid ${button.style} border-[#dbdbdb] shadow-sm cursor-pointer`}
//           >
//             <Icon
//               icon={button.icon as any}
//               size={28}
//               className="color_main font-[500]"
//             />
//             <Text className="font-[700] color_main text-md mt-2">
//               {button.title}
//             </Text>
//           </div>
//         ))
//         : null}
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { getStorage, openChat, setStorage } from "zmp-sdk/apis";
import { Icon, useNavigate, Text, useSnackbar } from "zmp-ui";
import { useAppDispatch } from "../../redux/common/hooks";
import {
  getHistoriesCustomer,
  setDefaultPrescription,
} from "../../redux/dashboard";
import { useAuthentication } from "../../components/custom/authen-provider";

interface MenuButtonProps {
  isHaveBooking?: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isHaveBooking }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { havePhone, phone } = useAuthentication();

  const { openSnackbar, closeSnackbar } = useSnackbar();
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
  const handleAsyncData = async (path) => {
     setStorage({
                data: {
                  path: path,
                },});

   
  }
  const listButton = [
    {
      id: 1,
      icon: "zi-add-story",
      title: (
        <div style={{ textAlign: "center" }}>
          Đặt lịch <br></br>{" "}
          <span style={{ fontSize: "0.6rem" }}>(0989 01 01 01)</span>
        </div>
      ),
      onClick: () => {
        openChatScreen("309834292180920772");
      },
      style: "border-t-0 border-l-0 border-b border-r",
      slug: "",
      release: true,
      permission: false,
    },
    {
      id: 2,
      icon: "zi-pcline",
      title: "Kết quả",
      onClick: (data: any) => {},
      permission: true,
      style: "border-t-0 border-l-0 border-b border-r-0",
      slug: "/result?type=menu",
      release: true,
    },
    {
      id: 3,
      icon: "zi-note",
      title: "Bảng giá",
      onClick: (data: any) => {},
      style: "border-t-0 border-l border-b border-r-0",
      slug: "/package/price",
      release: true,
    },
    {
      id: 4,
      icon: "zi-help-circle",
      title: "Câu hỏi",
      onClick: (data: any) => {},
      style: "border-t-0 border-l-0 border-b-0 border-r",
      slug: "/examming-survey",
      permission: true,
      release: true,
    },
    {
      id: 5,
      icon: "zi-members",
      title: "Thành viên",
      onClick: (data: any) => {},
      style: "border-t-0 border-l-0 border-b-0 border-r-0",
      slug: "/member",
      release: false,
    },
    {
      id: 6,
      icon: "zi-heart",
      title: "Thói quen",
      onClick: (data: any) => {},
      style: "border-t-0 border-l border-b-0 border-r-0",
      slug: "/mannered",
      release: false,
    },
  ];

  return (
    <div
      className={`grid grid-cols-3 p-0 bg-[#fff] rounded-xl overflow-hidden p-0 m-0 mt shadow-md border border-solid border-[#dbdbdb] mx-4 p-dashboard_popular relative z-2 translate-y-[-30px]`}
    >
      {listButton.length
        ? listButton.map((button, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
              key={index}
              onClick={() => {
                if (button.permission && !states.isLogin) {
                  handleAsyncData(button?.slug)
                  if (havePhone && phone.trim()) {
                    navigate("/create-account", {
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
                  if (button.release) {
                    if (button.onClick) {
                      button.onClick(null); // Thực thi hàm onClick nếu tồn tại
                    }
                    navigate(button.slug, {
                      replace: true,
                    });
                    if (button.id === 2) {
                      dispatch(getHistoriesCustomer(states.customerId));
                      dispatch(setDefaultPrescription());
                    }
                  } else {
                    openSnackbar({
                      position: "top",
                      duration: 4000,
                      action: {
                        onClick: () => {
                          closeSnackbar();
                        },
                      },
                      icon: true,
                      text: "Tính năng này đang được phát triển",
                      type: "error",
                    });
                  }
                }
              }}
              className={`flex items-center justify-center py-8 px-4 flex-col border-solid ${button.style} border-[#dbdbdb] shadow-sm cursor-pointer`}
            >
              <Icon
                icon={button.icon as any}
                size={28}
                className="color_main font-[500]"
              />
              <Text className="font-[700] color_main text-md mt-2">
                {button.title}
                {button.title === "Câu hỏi" ? <br></br> :<></> }
                {button.title === "Câu hỏi" ? "    sàng lọc" :"" }
                
              </Text>
            </div>
          ))
        : null}
    </div>
  );
};

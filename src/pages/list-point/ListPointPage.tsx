import {
  Box,
  Page,
  useNavigate,
  Text,
  Header,
  Spinner,
  Icon,
  Progress,
  Modal,
  Button,
  useSnackbar,
} from "zmp-ui";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { setListService, setMasterIdExam } from "../../redux/detailExam";

import { useParams } from "react-router-dom";
import MedicalExamItem from "../../components/organisms/MedicalExamItem";
import Prescription from "../../components/organisms/PrescriptionItem";
import NavigationBar from "../../components/organisms/navigation-bar";
import { getStorage } from "zmp-sdk";
import imgTT1 from "../../static/images/Group 126.svg";
import imgTT2 from "../../static/images/Group 131.svg";
import imgV1 from "../../static/images/Group 132.svg";
import imgV2 from "../../static/images/Group 128.svg";
import imgVV1 from "../../static/images/Group 129.svg";
import imgVV2 from "../../static/images/Group 133.svg";
import logo from "../../static/images/logo.png";
import logoGift from "../../static/images/icon-gift.png"
import iconPoint from "../../static/icons/icons-point.png"
import iconStar from "../../static/icons/icons-star.png"
import iconStart from "../../static/icons/icon_unrank.svg"
import iconSilver from "../../static/icons/icon_silver.png"
import iconGold from "../../static/icons/icon_gold.png" 
import iconDiamond from "../../static/icons/icon_diamond.svg"
import iconEye from "../../static/icons/icons-eye.png"
import iconPartner from "../../static/icons/icon-partner.png"
import iconFinal from "../../static/icons/icon_final.svg"
import axios from "axios";
import { useMutation } from "react-query";
import { getCustomersReferral, getHistoryPoint } from "../../services/apis/dashboard";
interface ProgressBarProps {
  progress: number; // Giá trị phần trăm của tiến trình
  milestones: Array<{ position: number; avatar: string }>; // Các mốc với vị trí và hình đại diện
  colorBg: string;
  isRoleUser: boolean;
  nameRank: string;
  imgAvt: string;
  imgCheckPoint: any;
  isCheckPointLast: boolean;
  imgCheckPointLast: any;
  wi: string;
  nameRank2: string;
  nameDesRank:string;
  nameDesRank2:string;
  nameDesRank1:string;
  nameDesRank21:string;
  isCheckPointFrist:boolean;
}
interface MemberInfo {
  username: string;
  phone: string;
  display_name: string;
  pending_points: number;
  use_points: number;
  loyalty_points: number;
  member_id: string;
  member_display_text: string;
  customers_referral: number;
  customers_need_referral: number;
  next_level: string;
  dm_members: MemberLevel[];
  history_points: PointHistory[];
};
interface CustomerReferralInfo {
  Id_NguoiGioiThieu: string;
  customer_fullname: string;
  customer_id: string;
  customer_phone: string;
  gender:string;
  loyalty_points:number;
  member_display_text: string;
  members_id:string;
  pending_points:number;
  status_account:string;
  use_points:number;
  username:string;
  year_of_birth:number;
};
type MemberLevel = {
  members_id: string;
  member_display_text: string;
  member_level: number;
  member_points: number;
  referrals_target: number;
  referrals_target_points: number;
  next_level: string;
  is_max_level: boolean;
};

type PointHistory = {
  date: string; // ISO date string
  points: number;
  type: "add" | "burn";
  type_display: string;
  note: string;
};

type ApiResponse = {
  data: MemberInfo;
  message: string;
  status: boolean;
  client_ip: string;
};
const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  milestones,
  colorBg,
  isRoleUser,
  nameRank,
  imgAvt,
  imgCheckPoint,
  isCheckPointLast,
  imgCheckPointLast,
  wi,
  nameRank2,
  nameDesRank,
  nameDesRank1,
  nameDesRank2,
  nameDesRank21,
  isCheckPointFrist,
}) => {
  return (
    <div className="relative " style={{ width: `${wi}%`,height:"4.5rem" }}>
      {/* Thanh nền của progress */}
      <div className="w-full bg-[#c4edff] h-[5px]  mt-3 relative">
        {/* Thanh tiến trình */}
        <div
          className=" h-[5px]"
          style={{
            width: `${progress}%`,
            background: `${colorBg}`,
            borderBottomRightRadius: "10px",
            borderTopRightRadius: "10px",
            height:"5px"
          }}
        ></div>
        {isRoleUser === true && (
          <div
            className="absolute top-1/2 transform -translate-y-1/2"
          
            style={{
              left: `${progress}%`,
              transform: "translate(-50%, -52%)",
            }}
          >
            <div className="w-[1rem] h-[1rem] rounded-full bg-[#56cfab]" style={{width:"1rem", height:"1rem",background:"#56cfab"}}/>
          </div>
        )}
        {
          isCheckPointFrist === true && (
            <div
            className="absolute top-1/2 transform -translate-y-1/2"
          
            style={{ left: `${-1}%`, transform: "translate(-50%, -52%)" }}
          >
            <img
              src={imgCheckPoint}
              alt="Avatar milestone"
              className="w-[1.6rem] h-[1.6rem] rounded-full  "
            />
          </div>
          )
        }
       

        {isCheckPointLast === true && (
          <div
            className="absolute top-1/2 transform -translate-y-1/2"
            // style={
            //   progress === 100
            //     ? { right: '-2px', transform: 'translateY(-50%)' }
            //     : progress === 0
            //     ? { left: `${progress + 10}%`, transform: "translate(-50%, -50%)" }
            //     : { left: `${progress}%`, transform: "translate(-50%, -50%)" }
            // }
            style={{ right: `${-3}%`, transform: "translate(-0%, -50%)" }}
          >
            <img
              src={imgCheckPointLast}
              alt="Avatar milestone"
              className="w-[1.6rem] h-[1.6rem] rounded-full  "
            />
          </div>
        )}
      </div>
      <div
        className="absolute top-[80%] transform -translate-y-1/2"
        // style={
        //   progress === 100
        //     ? { right: '-2px', transform: 'translateY(-50%)' }
        //     : progress === 0
        //     ? { left: `${progress + 10}%`, transform: "translate(-50%, -50%)" }
        //     : { left: `${progress}%`, transform: "translate(-50%, -50%)" }
        // }
        style={{ left: `${0}%`, transform: "translate(-56%, -52%)", display:'flex',flexDirection:"column",alignItems:"center" ,}}
      >
        <span className="text-[11px]" style={{fontWeight:"600",fontSize:"13px"}}>{nameRank}</span>
        <span className="text-[11px]">{nameDesRank}</span>
        <span className="text-[11px]">{nameDesRank1}</span>
      </div>
      {isCheckPointLast === true && (
        <div
          className="absolute top-[80%] transform -translate-y-1/2"
          // style={
          //   progress === 100
          //     ? { right: '-2px', transform: 'translateY(-50%)' }
          //     : progress === 0
          //     ? { left: `${progress + 10}%`, transform: "translate(-50%, -50%)" }
          //     : { left: `${progress}%`, transform: "translate(-50%, -50%)" }
          // }
          
          style={{ right: `${-0}%`, transform: "translate(40%, -50%)" ,display:'flex',flexDirection:"column",alignItems:"center" ,}}
        >
          <span className="text-[11px]" style={{fontWeight:"600",fontSize:"13px"}}>{nameRank2}</span>
          <span className="text-[11px]">{nameDesRank2}</span>
          <span className="text-[11px]">{nameDesRank21}</span>
        </div>
      )}
    </div>
  );
};

function Category({ setTabActive, tabId, tab }) {
  return (
    <Box className="grid grid-cols-2 p-2 shadow-md border rounded-full gap-2 ">
      {tab.map((button, index) => (
        <div
          key={index}
          className={`flex justify-center items-center p-1 gap-2 ${
            tabId === button.id ? "result-category_active " : "result-category"
          } `}
          onClick={() => setTabActive(button.id)}
        >
          <Icon icon={button.icon as any} size={28} />
          <Text>{button.title}</Text>
        </div>
      ))}
    </Box>
  );
}
// cái khúc này làm sao mà tối cũng k
const FormSavePoint = ({ imgA ,data ,getCustomersReferrals,customerId, setOpenPopupC} : any) => {
  const milestones = [
    { position: 75, avatar: "https://via.placeholder.com/40" },
  ];
  let pointneed  = data.customers_need_referral 
  
  if(data.customers_need_referral  <=0) {
    pointneed = 0
  }
  let point  = data.customers_referral

  if(data.customers_referral  <=0) {
    point = 0
  }
  
  return (
    <Box className="w-full shadow-md border rounded-[5px] " onClick={() => {
      getCustomersReferrals(customerId)
      setOpenPopupC(true)
    }}>
      {/* {
        data.member_id === "MEM" ?
        <div
        className="w-full flex  justify-between items-start px-3 py-4 rounded-t-[5px] "
        style={{ background: "#e6f739" }}
      >
        <Text size="small" style={{ fontWeight: "600",fontSize:"14px" }}>
          Điểm đang có: <span style={{ color: "#ff0000" }}>{data.use_points.toLocaleString("vn-VN")}</span>
        </Text>
        <Text 
  size="small" 
  style={{ fontWeight: "600", fontSize: "14px" }}
>
Chưa lên hạng thành viên
 
 
</Text>
      </div>
      : */}
      <div
      className="w-full flex flex-col justify-between items-start px-3 py-4 rounded-t-[5px] "
      style={{ background: "#e6f739" }}
    >
      <Text size="small" style={{ fontWeight: "600",fontSize:"14px" }}>
      🏆  Điểm đang có: <span style={{ color: "#ff0000" }}>{data.use_points.toLocaleString("vn-VN")}</span>
      </Text>
      {/* <Text 
size="small" 
style={{ fontWeight: "600", fontSize: "14px" }}
>

    Hạng thành viên của bạn đang là{" "}
    <span style={{ color: "#ff0000" }}>{data.member_display_text}</span>


</Text> */}
        <Text 
        size="small" 
        style={{ fontWeight: "600", fontSize: "14px", display:"flex", gap:"3px" }}
        >

<span style={{marginTop:"1px"}}>🤝</span>  Bạn đã giới thiệu  
            <span style={{ color: "#ff0000" }} >{data.customers_referral}</span>
        khách hàng  

        </Text>
    </div>
      {/* } */}
    
      <div
        className="w-full px-3 py-3 rounded-b-[5px] "
        style={{ background: "white" }}
      >
          {/* {
       data.member_id === "VVIP" || pointneed <= 0 ? */}
     
        <div className="w-full flex justify-between items-center ">
        <Text size="small" style={{ fontWeight: "600",fontSize:"14px" }}>
        Bạn sẽ nhận được <span style={{ color: "#ff0000" }}>300,000</span> điểm cho mỗi lượt giới thiệu
        </Text>
      </div> 
      {/* :
       <div className="w-full flex justify-between items-center ">
      <Text size="small" style={{ fontWeight: "600", fontSize: "14px" }}>
  Chỉ cần giới thiệu <span style={{ color: "#ff0000", }}>{pointneed}</span> người nữa bạn sẽ lên: 
  <span style={{ color: "#ff0000",marginLeft:"3px" }}>
    {
      (() => {
        if (data.next_level === "VIPSilver") {
          return "VIP Silver";
        } else if (data.next_level === "VIPGold") {
          return "VIP Gold";
        } else {
          return "VIP Diamond"
        }
      })()
    }
  </span>
</Text>

     </div>
      } */}
       
        {/* <Box mt={3}>
          <div className="flex px-[25px] w-full" style={{paddingLeft:"40px",paddingRight:"40px",paddingBottom:"10px"}}>
            <ProgressBar
              progress={(point - 1) >=  0 ? 100 : 0}
              wi="20"
              milestones={milestones}
              colorBg="rgb(12 159 50)"
              isRoleUser={false}
              nameRank=""
              imgAvt={imgA}
              imgCheckPoint={iconStart}
              imgCheckPointLast={imgVV1}
              isCheckPointLast={false}
              nameRank2=""
              nameDesRank=""
              nameDesRank1=""
              nameDesRank2=""
              nameDesRank21=""
              isCheckPointFrist={true}
            />
             <ProgressBar
              progress={(point - 2) >=  0 ? 100 : 0}
              wi="24"
              milestones={milestones}
              colorBg="rgb(12 159 50)"
              isRoleUser={data.member_id === "MEM"}
              nameRank={data.dm_members[1].member_display_text}
              imgAvt={imgA}
              imgCheckPoint={iconSilver}
              imgCheckPointLast={iconGold}
              isCheckPointLast={false}
              nameRank2=""
              nameDesRank="Giới thiệu"
              nameDesRank1="lần đầu"
              nameDesRank2=""
              nameDesRank21=""
              isCheckPointFrist={true}

            />
            <ProgressBar
              progress={(point - 2) >=  4 ? 100 : ((point - 2) <=0 ? 0 :(point - 2) * (100/3))}
              wi="56"
              milestones={milestones}
              colorBg="rgb(12 159 50)"
              isRoleUser={data.member_id === "VIPGold"}
              nameRank={data.dm_members[2].member_display_text}
              imgAvt={imgA}
              imgCheckPoint={(data.member_id === "VIPGold" || data.member_id === "VIPDiamond") ? iconGold : iconGold}
              imgCheckPointLast={data.member_id === "VIPDiamond" ? iconDiamond : iconDiamond}
              isCheckPointLast={true}
              nameRank2={data.dm_members[3].member_display_text}
              isCheckPointFrist={true}
         
          nameDesRank="Giới thiệu"
          nameDesRank1="2-4 người"
          nameDesRank2="Giới thiệu"
          nameDesRank21="5 người"
            />
          
          </div>
        
        </Box> */}
      </div>
    </Box>
  );
};
const FormSavePoint2 = ({ imgA ,data ,getCustomersReferrals, customerId,setOpenPopupC} : any) => {
  const milestones = [
    { position: 75, avatar: "https://via.placeholder.com/40" },
  ];
  let pointneed  = data.customers_need_referral 
  
  if(data.customers_need_referral  <=0) {
    pointneed = 0
  }
  let point  = data.customers_referral

  if(data.customers_referral  <=0) {
    point = 0
  }
  
  return (
    <Box className="w-full shadow-md border rounded-[5px] " onClick={() => {
      getCustomersReferrals(customerId)
      setOpenPopupC(true)
    }}>
      {
        data.member_id === "MEM" ?
        <div
        className="w-full flex  justify-between items-start px-3 py-4 rounded-t-[5px] "
        style={{ background: "#e6f739" }}
      >
        <Text size="small" style={{ fontWeight: "600",fontSize:"14px" }}>
          Điểm đang có: <span style={{ color: "#ff0000" }}>{data.use_points.toLocaleString("vn-VN")}</span>
        </Text>
        <Text 
  size="small" 
  style={{ fontWeight: "600", fontSize: "14px" }}
>
Chưa lên hạng thành viên
 
 
</Text>
      </div>
      :
      <div
      className="w-full flex flex-col justify-between items-start px-3 py-4 rounded-t-[5px] "
      style={{ background: "#e6f739" }}
    >
      <Text size="small" style={{ fontWeight: "600",fontSize:"14px" }}>
        Điểm đang có: <span style={{ color: "#ff0000" }}>{data.use_points.toLocaleString("vn-VN")}</span>
      </Text>
      <Text 
size="small" 
style={{ fontWeight: "600", fontSize: "14px" }}
>

    Hạng thành viên của bạn đang là{" "}
    <span style={{ color: "#ff0000" }}>{data.member_display_text}</span>


</Text>
<Text 
        size="small" 
        style={{ fontWeight: "600", fontSize: "14px", display:"flex",gap:"3px" }}
        >

Bạn đã giới thiệu  
            <span style={{ color: "#ff0000" }} >{data.customers_referral}</span>
        khách hàng  

        </Text>
    </div>
      }
    
      <div
        className="w-full px-3 py-3 rounded-b-[5px] "
        style={{ background: "white" }}
      >
          {/* {
       data.member_id === "VVIP" || pointneed <= 0 ? */}
     
        <div className="w-full flex justify-between items-center ">
        <Text size="small" style={{ fontWeight: "600",fontSize:"14px" }}>
        Bạn sẽ nhận được <span style={{ color: "#ff0000" }}>300,000</span> điểm cho mỗi lượt giới thiệu
        </Text>
      </div> 
      {/* :
       <div className="w-full flex justify-between items-center ">
      <Text size="small" style={{ fontWeight: "600", fontSize: "14px" }}>
  Chỉ cần giới thiệu <span style={{ color: "#ff0000", }}>{pointneed}</span> người nữa bạn sẽ lên: 
  <span style={{ color: "#ff0000",marginLeft:"3px" }}>
    {
      (() => {
        if (data.next_level === "VIPSilver") {
          return "VIP Silver";
        } else if (data.next_level === "VIPGold") {
          return "VIP Gold";
        } else {
          return "VIP Diamond"
        }
      })()
    }
  </span>
</Text>

     </div>
      } */}
       
        {/* <Box mt={3}>
          <div className="flex px-[25px] w-full" style={{paddingLeft:"20px",paddingRight:"10px",paddingBottom:"10px"}}>
            <ProgressBar
              progress={(point - 1) >=  0 ? 100 : 0}
              wi="16"
              milestones={milestones}
              colorBg="rgb(12 159 50)"
              isRoleUser={false}
              nameRank=""
              imgAvt={imgA}
              imgCheckPoint={iconStart}
              imgCheckPointLast={imgVV1}
              isCheckPointLast={false}
              nameRank2=""
              nameDesRank=""
              nameDesRank1=""
              nameDesRank2=""
              nameDesRank21=""
              isCheckPointFrist={true}
            />
             <ProgressBar
              progress={(point - 2) >=  0 ? 100 : 0}
              wi="20"
              milestones={milestones}
              colorBg="rgb(12 159 50)"
              isRoleUser={data.member_id === "MEM"}
              nameRank={data.dm_members[1].member_display_text}
              imgAvt={imgA}
              imgCheckPoint={iconSilver}
              imgCheckPointLast={iconGold}
              isCheckPointLast={false}
              nameRank2=""
              nameDesRank="Giới thiệu"
              nameDesRank1="lần đầu"
              nameDesRank2=""
              nameDesRank21=""
              isCheckPointFrist={true}
            />
            <ProgressBar
              progress={(point - 2) >=  4 ? 100 : ((point - 2) <=0 ? 0 :(point - 2) * (100/3))}
              wi="36"
              milestones={milestones}
              colorBg="rgb(12 159 50)"
              isRoleUser={data.member_id === "VIPGold"}
              nameRank={data.dm_members[2].member_display_text}
              imgAvt={imgA}
              imgCheckPoint={(data.member_id === "VIPGold" || data.member_id === "VIPDiamond") ? iconGold : iconGold}
              imgCheckPointLast={data.member_id === "VIPDiamond" ? iconDiamond : iconDiamond}
              isCheckPointLast={true}
              nameRank2={data.dm_members[3].member_display_text}
              
              isCheckPointFrist={true}
          nameDesRank="Giới thiệu"
          nameDesRank1="2-4 người"
          nameDesRank2="Giới thiệu"
          nameDesRank21="5 người"
            />
             <ProgressBar
              progress={(point - 2) >=  0 ? 100 : 0}
              wi="24"
              milestones={milestones}
              colorBg="rgb(12 159 50)"
              isRoleUser={data.member_id === "MEM"}
              nameRank=""
              imgAvt={imgA}
              imgCheckPoint={iconSilver}
              imgCheckPointLast={iconFinal}
              isCheckPointLast={true}
              nameRank2={`${data.customers_referral} KH`}
              nameDesRank=""
              nameDesRank1=""
              nameDesRank2="Bạn là"
              nameDesRank21="ngôi sao"
              isCheckPointFrist={false}

            />
            
          </div>
         
        </Box> */}
      </div>
    </Box>
  );
};
function ListPointPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = window.location;
  const [typeParams, setTypeParams] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const customerId = searchParams.get("customerId");
  
  const [load, setLoad] = useState(true);

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
  const { openSnackbar } = useSnackbar();
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupC, setOpenPopupC] = useState(false);
  const [isopenPopupC, setIsOpenPopupC] = useState(true);
  const [itemActive, setItemActive] = useState(0);
  const [state, setState] = useState({
    loadingHistories: historiesCustomerLoading,
    listHistories: historiesCustomer?.data,
    loadingPrescription: prescriptionCustomerLoading,
    listPrescription: prescriptionCustomer?.data,
  });
  const [data, setData] = useState([]);
  const [avatar, setAvatar] = useState<any>();
  const [dataProfile, setDataProfile] = useState<any>();
  const [dataAccount, setDataAccount] = useState<any>();
  const [loyaltyData, setLoyaltyData] = useState<MemberInfo | null>(null);
  const [stateListCustomerReferral, setStateListCustomerReferral] = useState<[] | null>(null);
  const [notFound,setNotFounnd] = useState(false)
  useEffect(() => {
    const body = {
    
      customer_id: customerId,
    }
    getPointsCustomer(body.customer_id);
  }, [customerId]); 
  const { mutate: getPointsCustomer } = useMutation(
    "post-footer-form",
    (body: any) => getHistoryPoint(body),
    {
      onSuccess: (data: any) => {
       // Ensure loading is stopped
        if (data.status) {
          setLoyaltyData(data.data)
          setLoad(false);
        }
        else {
          setLoad(false);
          openSnackbar({
            position: "top",
            duration: 3000,
            icon: true,
            text: `Không tìm thấy thông tin khách hàng...!`,
            type: "error",
          });
          setNotFounnd(true)
         
        }
      },
      onError: (error) => {
        // setAbnormalResultLoading(false); // Ensure loading is stopped

      },
    }
  );
  const { mutate: getCustomersReferrals } = useMutation(
    "post-footer-form",
    (body: any) => getCustomersReferral(body),
    {
      onSuccess: (data: any) => {
        console.log(data)
       // Ensure loading is stopped
        if (data.status) {
          setStateListCustomerReferral(data.data)
          
          setIsOpenPopupC(false)
        }
        else {
          console.log(data)
         
        }
      },
      onError: (error) => {
        // setAbnormalResultLoading(false); // Ensure loading is stopped

      },
    }
  );
  useEffect(() => {
    setState({
      ...state,
      loadingHistories: historiesCustomerLoading,
      loadingPrescription: prescriptionCustomerLoading,
    });
  }, [historiesCustomerLoading, prescriptionCustomerLoading]);

  useLayoutEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setTypeParams(type);
    }
  }, [location]);

  const formatDateStringManual = (dateString) => {
    // Tách chuỗi theo ký tự khoảng trắng để lấy phần ngày
    const [datePart] = dateString.split(" ");
  
    // Tách ngày thành các phần tử năm, tháng, ngày
    const [year, month, day] = datePart.split("-");
  
    // Định dạng lại thành DD-MM-YYYY
    return `${day}/${month}/${year}`;
  };
  return (
    <Page className="bg-cover py-4 px-2 ">
      <Header
        title="Điểm thành viên"
        className="p-booking_headers"
         showBackIcon={false}
        backgroundColor="#fff"
        onBackClick={() => {
          navigate("/infos", {
            replace: false,
            animate: true,
            direction: "backward",
          });
        }}
      />
      <Box height={44} />
      {load === true ? (
        <div className="h-[90%] flex justify-center items-center">
          <Spinner visible logo={logo} />
        </div>
      ) : (
        <>
        {
          notFound === true ? 
          (
            <div className="flex flex-col items-center justify-center h-[80%]  text-center">
      <div className="bg-white rounded-lg p-6 max-w-sm flex flex-col items-center">

          <svg width="200" height="167" viewBox="0 0 200 167" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M164.62 80.6665C164.506 79.9185 163.801 79.3972 163.027 79.5106C162.276 79.6239 161.753 80.3265 161.867 81.0972C162.071 82.3891 162.322 86.4236 160.911 88.0555C160.615 88.4181 160.251 88.6221 159.773 88.7128L159.91 81.0292C159.933 79.9185 159.022 78.9893 157.908 78.9893C156.77 78.9893 155.883 79.9185 155.905 81.0292L156.269 95.6258C155.792 95.5578 155.405 95.3311 155.086 94.9685C153.698 93.3366 153.949 89.3021 154.131 88.0102C154.244 87.2622 153.721 86.5369 152.97 86.4236C152.219 86.3102 151.491 86.8315 151.377 87.5795C151.286 88.2141 150.467 93.8805 152.947 96.7591C153.812 97.7564 154.95 98.323 156.315 98.4137L156.474 104.76H159.5L159.728 91.478C161.048 91.3647 162.185 90.8207 163.004 89.8461C165.507 86.9449 164.711 81.3011 164.62 80.6665Z" fill="#BDBDBD"></path><path d="M35.1309 93.0418C35.0626 92.5659 34.6075 92.2259 34.1297 92.3165C33.6519 92.3845 33.3106 92.8379 33.4016 93.3138C33.5381 94.1298 33.6974 96.7137 32.7873 97.7563C32.6053 97.9829 32.355 98.1189 32.0592 98.1643L32.1502 93.2685C32.1729 92.5659 31.5814 91.9766 30.876 91.9766C30.1479 91.9766 29.5791 92.5659 29.6018 93.2912L29.8294 102.607C29.5336 102.561 29.2833 102.425 29.0785 102.199C28.1911 101.156 28.3504 98.5949 28.4642 97.7563C28.5324 97.2803 28.2139 96.827 27.7361 96.759C27.2583 96.691 26.8032 97.0083 26.7349 97.4843C26.6667 97.8923 26.1661 101.496 27.7361 103.332C28.2822 103.967 29.0103 104.329 29.8749 104.375L29.9659 108.432H31.8999L32.0364 99.9775C32.8783 99.9095 33.6064 99.5469 34.1297 98.9349C35.6997 97.0537 35.1991 93.4272 35.1309 93.0418Z" fill="#BDBDBD"></path><path d="M100 167C155.228 167 200 151.21 200 131.732C200 112.255 155.228 96.4648 100 96.4648C44.7715 96.4648 0 112.255 0 131.732C0 151.21 44.7715 167 100 167Z" fill="url(#paint0_linear_4899_28223)"></path><path d="M115.972 88.9843C115.972 88.9843 115.904 92.3841 115.972 92.7241C116.018 93.0641 114.63 95.0587 114.061 94.968C113.492 94.8773 112.354 94.696 112.195 94.492C112.036 94.3107 112.104 93.8574 112.172 93.4494C112.241 93.0414 112.65 89.3469 112.65 89.1656C112.65 88.9843 115.335 88.463 115.972 88.9843Z" fill="#FFD3BC"></path><path d="M113.766 92.5209C113.061 92.9062 112.652 94.0622 112.561 94.0848C112.469 94.1075 112.265 94.0622 112.265 93.9488C112.265 93.8355 112.287 93.4502 112.174 93.4502C112.037 93.4502 111.901 94.0848 111.878 95.0141C111.855 95.9434 111.514 98.142 111.878 98.414C112.105 98.5953 114.153 99.6606 114.221 99.8192C114.29 99.9552 114.176 100.975 114.358 101.134C114.54 101.292 114.927 101.678 115.245 101.7C115.564 101.723 117.407 101.904 118.272 101.7C119.136 101.496 120.228 101.088 120.274 100.975C120.297 100.862 120.046 98.414 119.773 98.1193C119.5 97.8247 117.521 95.1048 117.361 94.8555C117.202 94.6061 117.088 94.0168 117.088 93.6768C117.088 93.3369 116.77 92.5662 116.201 92.3849C115.541 92.1583 114.29 92.2263 113.766 92.5209Z" fill="url(#paint1_linear_4899_28223)"></path><path d="M95.2002 90.9339C95.2002 90.9339 95.2002 92.9058 95.132 93.2458C95.0864 93.5858 96.4744 95.5804 97.0432 95.4897C97.612 95.399 98.7497 95.2177 98.909 95.0137C99.0682 94.8324 99 94.3791 98.9317 93.9711C98.8635 93.5631 98.4994 91.2966 98.4994 91.0926C98.5222 90.9339 95.8373 90.4353 95.2002 90.9339Z" fill="#FFD3BC"></path><path d="M97.0198 47.3253C96.2234 50.2492 94.699 60.222 94.699 65.0951C94.699 69.9456 94.2212 82.321 94.2212 84.2022C94.2212 86.0835 94.0164 90.7526 94.5169 91.0019C94.9948 91.2512 96.1324 91.9765 97.6796 91.7272C99.2268 91.4779 99.6364 90.5033 99.6819 89.6193C99.7274 88.7353 100.091 82.321 100.456 79.8504C100.82 77.3799 102.116 72.6201 102.981 69.5376C103.846 66.4777 105.825 60.3127 106.349 60.3354C106.872 60.358 110.171 73.8667 110.444 74.6374C110.717 75.408 111.24 86.2875 111.286 87.1941C111.309 88.1007 111.286 88.9847 111.855 89.3473C112.424 89.71 114.198 90.6393 115.109 90.7073C116.019 90.7752 116.633 89.3246 116.815 88.8713C116.974 88.4407 117.293 73.8894 117.179 69.9002C117.065 65.9111 117.384 58.4768 117.202 56.0516C117.02 53.6264 116.428 48.4359 116.041 47.3253C115.632 46.2374 97.0198 47.3253 97.0198 47.3253Z" fill="#192B59"></path><path d="M91.3548 13.4401C92.1284 12.5788 95.7007 8.56697 96.4288 8.43098C97.1341 8.29498 98.8634 7.97767 99.2502 7.56969C99.637 7.16171 101.275 2.06195 100.615 1.13266C99.9783 0.203372 97.4754 0.475359 96.7246 2.03928C95.9737 3.62587 95.9965 4.44184 94.7678 5.52978C93.5164 6.61773 88.0784 11.0375 87.5778 11.4908C87.0772 11.9441 88.0784 14.12 88.8747 14.4827C89.6483 14.8907 91.3548 13.4401 91.3548 13.4401Z" fill="url(#paint2_linear_4899_28223)"></path><path d="M101.252 14.6645C99.4088 15.0498 96.3826 15.3671 95.3815 15.6844C94.3803 16.0018 90.4213 17.3844 90.444 16.795C90.4668 16.2057 92.287 13.6219 91.9457 13.3499C91.6272 13.0779 89.6704 12.7606 89.3519 12.3526C89.0333 11.9446 88.5783 10.97 88.146 11.0833C87.7136 11.1966 82.5714 15.9791 82.9127 17.7923C83.7319 22.0988 95.882 25.2266 96.1551 27.1079C96.4281 28.9891 95.2222 46.9856 95.882 47.6429C96.5419 48.3002 103.595 50.8387 107.122 51.0654C110.672 51.2921 116.883 50.0455 117.224 49.1162C117.566 48.1869 115.495 30.3037 115.746 30.3037C115.996 30.3037 116.064 35.9248 118.749 37.3981C120.524 38.35 122.981 37.3754 123.459 36.8314C123.937 36.3101 121.775 28.8078 120.819 26.2919C119.841 23.776 118.931 18.563 116.724 16.7044C114.54 14.8458 111.422 15.1631 110.353 14.7325C109.284 14.3018 105.711 14.6192 104.801 14.5058C103.914 14.4605 101.252 14.6645 101.252 14.6645Z" fill="url(#paint3_linear_4899_28223)"></path><path d="M124.141 33.4768C124.141 33.4768 120.979 34.4287 120.728 34.746C120.478 35.0634 120.046 36.378 120.728 36.9219C121.411 37.4659 122.162 37.8739 122.981 37.2393C123.8 36.6046 124.528 35.766 125.006 35.6527C125.484 35.5393 126.872 35.7433 127.463 35.5167C128.055 35.29 129.17 30.8476 128.715 30.5756C128.26 30.3263 124.141 33.4768 124.141 33.4768Z" fill="url(#paint4_linear_4899_28223)"></path><path d="M101.274 14.0523C100.25 13.8483 98.2936 11.9218 98.1116 9.97251C97.9296 8.0686 96.5416 2.74219 101.411 0.747622C105.984 -1.13362 110.694 0.792954 111.377 3.12751C112.014 5.28074 106.644 5.39407 104.665 6.79933C102.685 8.2046 102.571 9.13389 102.071 8.9299C101.57 8.68058 101.274 14.0523 101.274 14.0523Z" fill="#E64D4E"></path><path d="M101.184 10.2669C101.115 11.1282 100.911 15.344 101.275 15.956C101.616 16.5226 102.208 18.1772 104.551 18.1092C106.895 18.0412 108.396 15.7067 108.533 15.4347C108.669 15.1627 108.396 11.7855 108.396 11.2415C108.396 10.6749 105.257 9.33763 103.982 9.38296C102.708 9.40563 101.252 9.45096 101.184 10.2669Z" fill="url(#paint5_linear_4899_28223)"></path><path d="M101.411 10.267C101.684 10.267 101.365 11.8536 101.843 12.3749C102.321 12.8962 104.392 15.6388 106.599 15.3668C108.51 15.1401 108.237 13.5082 108.51 12.1483C108.76 10.9243 109.556 10.811 109.83 7.63783C109.943 6.41389 110.512 4.46465 109.443 4.12467C108.373 3.76202 104.323 2.81006 103.322 4.12467C102.321 5.43927 102.23 8.56712 101.707 8.1818C101.183 7.77382 100.091 5.80192 99.4313 6.8672C98.7715 7.93248 100 10.3124 101.411 10.267Z" fill="#F2DAD4"></path><path d="M118.385 26.5861L111.991 34.655C111.65 35.0857 111.968 35.6976 112.492 35.675L124.323 35.471C124.528 35.471 124.71 35.3803 124.824 35.2217L130.876 27.1754C131.172 26.7901 130.876 26.2461 130.398 26.2461L118.863 26.3368C118.681 26.3368 118.499 26.4274 118.385 26.5861Z" fill="url(#paint6_linear_4899_28223)"></path><path d="M128.51 29.8275C127.896 29.8955 126.986 30.2355 126.986 30.5528C126.986 30.8701 127.714 30.9608 127.919 31.0061C128.123 31.0288 128.374 31.0968 128.306 31.1874C128.237 31.2781 128.078 31.7767 127.668 31.7087C127.259 31.6181 125.507 31.5954 125.166 31.5954C124.824 31.5954 124.437 31.8221 124.392 32.0714C124.369 32.3207 124.301 32.366 124.096 32.3887C123.891 32.4114 123.527 32.5927 123.527 32.91C123.527 33.2273 124.324 33.522 124.324 33.6353C124.324 33.7486 125.894 34.7006 126.212 34.8819C126.531 35.0632 127.1 35.5166 127.418 35.5166C127.737 35.5166 128.283 35.1992 128.328 34.7686C128.374 34.3153 129.011 33.998 129.011 33.7713C129.011 33.5446 128.806 33.386 128.829 33.25C128.852 33.114 129.42 32.91 129.42 32.57C129.42 32.23 129.193 31.7541 129.17 31.5954C129.147 31.4594 129.011 31.1421 129.147 31.0968C129.284 31.0514 129.739 30.6435 129.648 30.2355C129.602 29.8955 128.806 29.8048 128.51 29.8275Z" fill="#FFD3BC"></path><path d="M97.3389 93.0649C98.0443 93.4502 98.4538 94.6061 98.5448 94.6288C98.6358 94.6514 98.8406 94.6061 98.8406 94.4928C98.8406 94.3795 98.8179 93.9941 98.9316 93.9941C99.0681 93.9941 99.2047 94.6288 99.2274 95.5581C99.2502 96.4874 99.5915 98.6859 99.2274 98.9579C98.9999 99.1392 96.9521 100.205 96.8838 100.363C96.8156 100.499 96.9294 101.519 96.7473 101.678C96.5653 101.836 96.1785 102.222 95.86 102.244C95.5414 102.267 93.6984 102.448 92.8338 102.244C91.9692 102.04 90.877 101.632 90.8315 101.519C90.8088 101.406 91.059 98.9579 91.3321 98.6632C91.6051 98.3686 93.5846 95.6487 93.7439 95.3994C93.9032 95.1501 94.017 94.5608 94.017 94.2208C94.017 93.8808 94.3355 93.1102 94.9043 92.9289C95.5642 92.7022 96.8156 92.7702 97.3389 93.0649Z" fill="url(#paint7_linear_4899_28223)"></path><defs><linearGradient id="paint0_linear_4899_28223" x1="100.001" y1="80.4757" x2="100.001" y2="135.854" gradientUnits="userSpaceOnUse"><stop stop-color="#E5E5E5"></stop><stop offset="0.4764" stop-color="#F4F4F4"></stop><stop offset="1" stop-color="white"></stop></linearGradient><linearGradient id="paint1_linear_4899_28223" x1="117.556" y1="96.1637" x2="112.396" y2="100.091" gradientUnits="userSpaceOnUse"><stop stop-color="#4E9CFF"></stop><stop offset="0.9844" stop-color="#176AD4"></stop></linearGradient><linearGradient id="paint2_linear_4899_28223" x1="102.816" y1="8.54029" x2="93.0292" y2="7.44392" gradientUnits="userSpaceOnUse"><stop stop-color="#F2BFAD"></stop><stop offset="1" stop-color="#F2DAD4"></stop></linearGradient><linearGradient id="paint3_linear_4899_28223" x1="91.107" y1="20.7277" x2="124.373" y2="46.0421" gradientUnits="userSpaceOnUse"><stop stop-color="#4E9CFF"></stop><stop offset="0.9844" stop-color="#176AD4"></stop></linearGradient><linearGradient id="paint4_linear_4899_28223" x1="124.675" y1="34.9298" x2="125.17" y2="43.3402" gradientUnits="userSpaceOnUse"><stop stop-color="#F2BFAD"></stop><stop offset="0.7043" stop-color="#F2DAD4"></stop></linearGradient><linearGradient id="paint5_linear_4899_28223" x1="104.085" y1="12.0403" x2="107.301" y2="18.7825" gradientUnits="userSpaceOnUse"><stop stop-color="#F2BFAD"></stop><stop offset="1" stop-color="#F2DAD4"></stop></linearGradient><linearGradient id="paint6_linear_4899_28223" x1="119.246" y1="26.9521" x2="124.847" y2="37.2956" gradientUnits="userSpaceOnUse"><stop stop-color="#F6DBDB"></stop><stop offset="1" stop-color="#EB9A99"></stop></linearGradient><linearGradient id="paint7_linear_4899_28223" x1="93.5495" y1="96.7089" x2="98.71" y2="100.636" gradientUnits="userSpaceOnUse"><stop stop-color="#4E9CFF"></stop><stop offset="0.9844" stop-color="#176AD4"></stop></linearGradient></defs></svg>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Không tìm thấy thông tin khách hàng
        </h1>
        <p className="text-gray-600 mb-4">
          Chúng tôi không tìm thấy thông tin phù hợp. <br></br>Vui lòng kiểm tra lại hoặc thử lại sau !
        </p>
       
      </div>
    </div>
          ) : (
            <div style={{height:"calc(100vh - 55px - 40px)"}}>
            {" "}
            <div
              className="bg-white rounded-full  px-1 py-1 restaurant-with-cover "
            
            >
             
             {/* {
  loyaltyData && loyaltyData.customers_referral !== undefined && loyaltyData.customers_referral > 5 ? (
    <FormSavePoint2 imgA={avatar} data={loyaltyData} getCustomersReferrals={getCustomersReferrals} customerId={customerId} setOpenPopupC={setOpenPopupC}/>
  ) : ( */}
    <FormSavePoint imgA={avatar} data={loyaltyData} getCustomersReferrals={getCustomersReferrals} customerId={customerId} setOpenPopupC={setOpenPopupC}/>
  {/* )
} */}

            </div>
            <div style={{paddingLeft:"0.25rem", paddingRight:"0.25rem", marginTop:"10px", marginBottom:"10px"}}>
            <Text size="small" style={{ fontWeight: "600",fontSize:"16px", borderBottom:"1px solid #f0f0f0",paddingBottom:"8px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span> Lịch sử tích điểm</span>
       
        <div
  className="text-white text-[12px] bg-[#4299e1] px-[12px] py-[6px] rounded-[4px] shadow-md hover:shadow-lg hover:bg-[#056f8c] transition-all duration-200 cursor-pointer"
  style={{
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "2px",
    paddingBottom: "6px",
    borderRadius: "4px",
    background:"#4299e1",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display:"flex",alignItems:"center"
  }}
  onClick={() => setOpenPopup(true)}
>
 <img src={iconEye} alt="" style={{height:"16px",width:"16px", marginRight:"5px", marginTop:"3px"}}/> Xem nội dung chương trình
</div>

              
     
        </Text>
        
            </div>
          <div className="flex items-center justify-center flex-col" style={{width:"100%", height:"68%", overflowY:"scroll", clipPath:"inset(0)",display:'flex',flexDirection:"column",alignItems:"flex-start",padding:"10px",justifyContent:"flex-start",gap:"10px"}}>
          {loyaltyData?.history_points?.slice().reverse()?.map((item: any, index: any) => (
            <div className="w-full h-[fit-content]" style={{display:"flex",borderRadius:"5px",padding:"5px"}}>
              <div style={{marginRight:"5px"}}>
                <img src={logoGift} alt="" style={{width:"36px",marginRight:"5px"}}/>
              </div>
              <div style={{maxWidth:"85%"}}>
              <Text size="small" style={{ fontWeight: "600",fontSize:"14px", }}>
              Ngày {formatDateStringManual(item.date)} -   {item.type_display === "Cộng điểm" ? "Cộng" : "Sử dụng"}  {Math.abs(item.points).toLocaleString("vn-VN")} điểm
        </Text>
        <Text size="small" style={{fontSize:"10px", }}>
        {item.description}
        </Text>
              </div>
            </div>
          ))}
       

  </div>
  
          </div>
          )
        }
        </>
     
      )}

      {/* <Box flex justifyContent="center" className="mt-16">
          <Spinner logo={undefined} />
        </Box> */}
      {/* {typeParams === "navigate" && (
        <NavigationBar navigateDeault={"/result?type=navigate"} />
      )} */}
      <Modal
        visible={openPopup}
        className="modal-point"
        title="Chương Trình 2025: Vì Một Cộng Đồng Sống Thọ Hơn"
        onClose={() => setOpenPopup(false)}
      >
       <Box className="flex flex-col justify-center gap-4"> <Text >
            Trở thành <strong> "đại sứ sống thọ"</strong> để giúp người thân bắt đầu hành trình sống thọ ngay hôm nay.
          </Text>
  <Text>
 
    <strong >Doctor Check</strong> sẽ có:
  </Text>
  <ul style={{ fontSize: "14px" }}>
    <li>✔️ Quà tặng người thân: Ưu đãi 300.000 vnđ trừ trực tiếp vào hoá đơn.</li>
    <li>✔️ Quà tặng bạn: Tích 300.000 điểm để sử dụng dịch vụ hoặc đổi quà.</li>
  </ul>

  <Text className="italic">
    P/s: Chương trình hiệu lực khi người thân dùng số điện thoại của bạn để đăng ký khám tổng quát lần đầu.
  </Text>

  <Text>
    <strong>Quà tặng dành cho khách hàng khám tổng quát:</strong>
  </Text>
  <ul style={{ fontSize: "13px" }}>
    <li>• <strong>Gói khuyến cáo:</strong> Tiêm ngừa cúm + Ly sứ thói quen sống thọ</li>
    <li>• <strong>Gói chuyên sâu:</strong> Tiêm ngừa cúm + Ly sứ thói quen sống thọ + Túi xách</li>
    <li>• <strong>Gói sống thọ:</strong> Tiêm ngừa cúm + Bộ 2 ly sứ thói quen sống thọ + Túi xách + Sách sống thọ</li>
  </ul>

  <Text>
    <strong>Quà tặng dành cho khách hàng nội soi:</strong>
  </Text>
  <ul style={{ fontSize: "13px" }}>
    <li>• <strong>Nội soi dạ dày:</strong> Ly sứ thói quen sống thọ</li>
    <li>• <strong>Nội soi đại tràng:</strong> Ly sứ thói quen sống thọ</li>
    <li>• <strong>Nội soi dạ dày & đại tràng:</strong> Ly sứ thói quen sống thọ + Túi xách</li>
  </ul>

  <div
    className="bg-[#04566e] text-[#fff] py-2 px-2 rounded-lg font-[600] text-center cursor-pointer"
    onClick={() => setOpenPopup(false)}
  >
    Đóng
  </div>
</Box>

      </Modal>
      <Modal
        visible={openPopupC}
        className="modal-point"
        title=""
        onClose={() => setOpenPopupC(false)}
      >
        <Box className="flex flex-col justify-center gap-4">
        <div
            className="px-2 rounded-lg font-[600] text-left text-[#04566e]"
          
          >
       Bạn thật tuyệt vời! 
          
 <p style={{marginTop:"10px"}}> Doctor Check xin chân thành cảm ơn và cảm kích vì bạn đã giới thiệu {loyaltyData?.customers_referral} người thân & bạn bè của mình đến tầm soát.</p>    


<p style={{marginTop:"10px"}}>Hãy tiếp tục lan tỏa thông điệp sống thọ cùng Doctor Check nhé. </p> <p style={{marginTop:"5px"}}> Danh sách {loyaltyData?.customers_referral} khách hàng mà bạn đã giới thiệu:</p>
          </div>
         {
          isopenPopupC === false ? <div className="flex items-center justify-center flex-col" style={{width:"100%", maxHeight:"46vh",minHeight:"10vh", overflowY:"scroll", clipPath:"inset(0)",display:'flex',flexDirection:"column",alignItems:"flex-start",padding:"10px",justifyContent:"flex-start",gap:"10px"}}>
          {stateListCustomerReferral?.map((item: any, index: any) => (
            <div className="w-full h-[fit-content]" style={{display:"flex",borderRadius:"5px",padding:"5px"}}>
              <div style={{marginRight:"5px"}}>
                <img src={iconPartner} alt="" style={{width:"36px",marginRight:"5px"}}/>
              </div>
              <div style={{maxWidth:"85%"}}>
              <Text size="small" style={{ fontWeight: "600",fontSize:"14px", }}>
             {index + 1}. {item?.customer_fullname} ({item?.year_of_birth + "," + item?.gender})
        </Text>
        <Text size="small" style={{fontSize:"11px", }}>
        {item?.customer_phone.replace('+84-', '0')} -  {item?.member_display_text}
        </Text>
              </div>
            </div>
          ))}
       

  </div> : <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}> <Spinner visible logo={logo} /></div>
         }
       
          
          <div
            className="bg-[#04566e] text-[#fff] py-2 px-2 rounded-lg font-[600] text-center"
            onClick={() => setOpenPopupC(false)}
          >
            Đóng
          </div>
        </Box>
      </Modal>
    </Page>
  );
}

export default ListPointPage;


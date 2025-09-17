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
import axios from "axios";
import { useMutation } from "react-query";
import { getHistoryPoint } from "../../services/apis/dashboard";
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
  nameDesRank21:string
}
type MemberInfo = {
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
  nameDesRank21
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
        <div
          className="absolute top-1/2 transform -translate-y-1/2"
          // style={
          //   progress === 100
          //     ? { right: '-2px', transform: 'translateY(-50%)' }
          //     : progress === 0
          //     ? { left: `${progress + 10}%`, transform: "translate(-50%, -50%)" }
          //     : { left: `${progress}%`, transform: "translate(-50%, -50%)" }
          // }
          style={{ left: `${-1}%`, transform: "translate(-50%, -52%)" }}
        >
          <img
            src={imgCheckPoint}
            alt="Avatar milestone"
            className="w-[1.6rem] h-[1.6rem] rounded-full  "
          />
        </div>
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
        <span className="text-[11px]" style={{fontWeight:"600",fontSize:"12px"}}>{nameRank}</span>
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
          style={{ right: `${-0}%`, transform: "translate(40%, -50%)" ,display:'flex',flexDirection:"column",alignItems:"center" }}
        >
          <span className="text-[11px]" style={{fontWeight:"600",fontSize:"12px"}}>{nameRank2}</span>
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

const FormSavePoint = ({ imgA ,data } : any) => {
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
    <Box className="w-full shadow-md border rounded-[5px] ">
    
      <div
        className="w-full flex justify-between items-center px-3 py-4 rounded-t-[5px] "
        style={{ background: "#e6f739" }}
      >
        <Text size="small" style={{ fontWeight: "600",fontSize:"15px" }}>
          Điểm đang có: <span style={{ color: "#ff0000" }}>{data.use_points.toLocaleString("vn-VN")}</span>
        </Text>
        <Text size="small" style={{ fontWeight: "600",fontSize:"15px" }}>
          Hạng thành viên: <span style={{ color: "#ff0000" }}>{data.member_display_text}</span>
        </Text>
      </div>
      <div
        className="w-full px-3 py-3 rounded-b-[5px] "
        style={{ background: "white" }}
      >
          {
       data.member_id === "VVIP" || pointneed <= 0 ?
     // pointneed <= 0 ?
        <div className="w-full flex justify-between items-center ">
        <Text size="small" style={{ fontWeight: "600",fontSize:"15px" }}>
        Bạn sẽ nhận được <span style={{ color: "#ff0000" }}>500,000</span> điểm cho mỗi lượt giới thiệu
        </Text>
      </div> :
       <div className="w-full flex justify-between items-center ">
       <Text size="small" style={{ fontWeight: "600",fontSize:"16px" }}>
         Chỉ cần giới thiệu <span style={{ color: "#ff0000" }}>{pointneed}</span> người
         nữa bạn sẽ lên: <span style={{ color: "#ff0000" }}>{data.next_level}</span>
       </Text>
     </div>
      }
       
        <Box mt={3}>
          {/* <Progress completed={10} trailColor="#eaeff5" showLabel className="text-[#ff0000] font-bold"/> <Progress completed={10} maxCompleted={100} trailColor="#eaeff5" showLabel className="text-[#ff0000] font-bold"/> <Progress completed={10} maxCompleted={100} trailColor="#eaeff5" showLabel className="text-[#ff0000] font-bold"/> */}
          <div className="flex px-[25px] w-full" style={{paddingLeft:"40px",paddingRight:"40px",paddingBottom:"10px"}}>
            <ProgressBar
              progress={(point - 2) >=  0 ? 100 : ((point- 2) === -1 ? 50 : 0)}
              wi="40"
              milestones={milestones}
              colorBg="rgb(12 159 50)"
              isRoleUser={data.member_id === "MEM"}
              nameRank={data.dm_members[0].member_display_text}
              imgAvt={imgA}
              imgCheckPoint={imgV2}
              imgCheckPointLast={imgVV1}
              isCheckPointLast={false}
              nameRank2=""
              nameDesRank="Giới thiệu"
              nameDesRank1="lần đầu"
              nameDesRank2=""
              nameDesRank21=""

            />
            <ProgressBar
              progress={(point - 2) >=  4 ? 100 : ((point - 2) <=0 ? 0 :(point - 2) * (100/3))}
              wi="60"
              milestones={milestones}
              colorBg="rgb(12 159 50)"
              isRoleUser={data.member_id === "VIPGold"}
              nameRank={data.dm_members[1].member_display_text}
              imgAvt={imgA}
              imgCheckPoint={(data.member_id === "VIPGold" || data.member_id === "VVIP") ? imgTT2 : imgTT1}
              imgCheckPointLast={data.member_id === "VVIP" ? imgVV2 : imgVV1}
              isCheckPointLast={true}
              nameRank2={data.dm_members[2].member_display_text}
              
         
          nameDesRank="Giới thiệu"
          nameDesRank1="2-4 người"
          nameDesRank2="Giới thiệu"
          nameDesRank21="5 người"
            />
            {/* <ProgressBar progress={0} milestones={milestones} colorBg="#03566E" isRoleUser={false} nameRank="V.VIP" imgAvt={imgA}/> */}
          </div>
          {/* <ProgressBar2/> */}
        </Box>
      </div>
    </Box>
  );
};

function ListRulePage() {
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
  const [notFound,setNotFounnd] = useState(false)
  // useEffect(() => {
  //   const body = {
    
  //     customer_id: customerId,
  //   }
  //   getPointsCustomer(body.customer_id);
  // }, [customerId]); 
  // const { mutate: getPointsCustomer } = useMutation(
  //   "post-footer-form",
  //   (body: any) => getHistoryPoint(body),
  //   {
  //     onSuccess: (data: any) => {
  //      // Ensure loading is stopped
  //       if (data.status) {
  //         setLoyaltyData(data.data)
  //         setLoad(false);
  //       }
  //       else {
  //         setLoad(false);
  //         openSnackbar({
  //           position: "top",
  //           duration: 3000,
  //           icon: true,
  //           text: `Không tìm thấy thông tin khách hàng...!`,
  //           type: "error",
  //         });
  //         setNotFounnd(true)
         
  //       }
  //     },
  //     onError: (error) => {
  //       // setAbnormalResultLoading(false); // Ensure loading is stopped

  //     },
  //   }
  // );
  // useEffect(() => {
  //   setState({
  //     ...state,
  //     loadingHistories: historiesCustomerLoading,
  //     loadingPrescription: prescriptionCustomerLoading,
  //   });
  // }, [historiesCustomerLoading, prescriptionCustomerLoading]);

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
        title="CHƯƠNG TRÌNH ĐẠI SỨ SỐNG THỌ"
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
      <Box className="flex flex-col justify-center gap-4 px-2">
      <Text size="xLarge" style={{color:"#04566e",textTransform:"uppercase",fontWeight:"600",textAlign:"center"}}>
      Chính sách giới thiệu khách hàng <br></br> đến tầm soát tại Doctor check
          </Text>
          <Text>
            Hãy trở thành Đại Sứ Sống Thọ bằng cách giới thiệu bạn bè đến Doctor
            Check và nhận những phần quà hấp dẫn:
          </Text>
          <Text>
  <strong>1. VIP Silver - Thành viên Bạc</strong>
  <br />
  <span style={{display:"flex",alignItems:"start", fontSize:"13px"}}><img src={iconPoint} alt="" style={{width:"15px",height:"15px", marginRight:"3px",marginTop:"3px",marginLeft:"1px"}}/><span> <strong> Áp dụng khi:</strong>  bạn giới thiệu 1 người thân.</span>  </span> 
  <strong style={{display:"flex",alignItems:"center" , fontSize:"13px"}}><img src={iconStar} alt="" style={{width:"15px",height:"15px", marginRight:"3px"}}/> Quyền lợi:</strong>
  <ul style={{ fontSize:"13px"}}>
    <li>• Bạn được tích điểm: 200,000 điểm (tương đương 200k để sử dụng dịch vụ).</li>
    <li>• Người thân của bạn: ưu đãi 200k để trừ vào hóa đơn.</li>
  </ul>
</Text>
<Text>
  <strong>2. VIP Gold - Thành viên Vàng</strong>
  <br />
  <span style={{display:"flex",alignItems:"start", fontSize:"13px"}}><img src={iconPoint} alt="" style={{width:"15px",height:"15px", marginRight:"3px",marginTop:"3px",marginLeft:"1px"}}/><span> <strong> Áp dụng khi:</strong> bạn giới thiệu từ 2 - 4 người thân. </span>  </span> 
  <strong style={{display:"flex",alignItems:"center", fontSize:"13px"}}><img src={iconStar} alt="" style={{width:"15px",height:"15px", marginRight:"3px"}}/> Quyền lợi:</strong>
  <ul style={{ fontSize:"13px"}}>
    <li>• Bạn được tích điểm: 300,000 điểm (tương đương 300k để sử dụng dịch vụ).</li>
    <li>• Người thân của bạn: ưu đãi 200k để trừ vào hóa đơn.</li>
  </ul>
</Text>
<Text>
  <strong>3. VIP Diamond - Thành viên Kim Cương</strong>
  <br />
  <span style={{display:"flex",alignItems:"start", fontSize:"13px"}}><img src={iconPoint} alt="" style={{width:"15px",height:"15px", marginRight:"3px",marginTop:"3px",marginLeft:"1px"}}/><span> <strong> Áp dụng khi:</strong>  bạn giới thiệu từ 5 người thân. </span>  </span> 
  <strong style={{display:"flex",alignItems:"center", fontSize:"13px"}}><img src={iconStar} alt="" style={{width:"15px",height:"15px", marginRight:"3px"}}/> Quyền lợi:</strong>
  <ul style={{ fontSize:"13px"}}>
    <li>• Bạn được tích điểm: 500,000 điểm (tương đương 500k để sử dụng dịch vụ).</li>
    <li>• Người thân của bạn: ưu đãi 200k để trừ vào hóa đơn.</li>
  </ul>
</Text>

          <Text className="italic">
            Lưu ý: Các ưu đãi sẽ được áp dụng sau khi khách hàng sử
            dụng dịch vụ.
          </Text>
       
        </Box>
      <Modal
        visible={openPopup}
        className="modal-point"
        title="Chính sách giới thiệu khách hàng đến tầm soát tại Doctor check"
        onClose={() => setOpenPopup(false)}
      >
        <Box className="flex flex-col justify-center gap-4">
          <Text>
            Hãy trở thành Đại Sứ Sống Thọ bằng cách giới thiệu bạn bè đến Doctor
            Check và nhận những phần quà hấp dẫn:
          </Text>
          <Text>
  <strong>1. VIP Silver - Thành viên Bạc</strong>
  <br />
  <span style={{display:"flex",alignItems:"start", fontSize:"13px"}}><img src={iconPoint} alt="" style={{width:"15px",height:"15px", marginRight:"3px",marginTop:"3px",marginLeft:"1px"}}/><span> <strong> Áp dụng khi:</strong>  bạn giới thiệu 1 người thân.</span>  </span> 
  <strong style={{display:"flex",alignItems:"center" , fontSize:"13px"}}><img src={iconStar} alt="" style={{width:"15px",height:"15px", marginRight:"3px"}}/> Quyền lợi:</strong>
  <ul style={{ fontSize:"13px"}}>
    <li>Bạn được tích điểm: 200,000 điểm (tương đương 200k để sử dụng dịch vụ).</li>
    <li>Người thân của bạn: ưu đãi 200k để trừ vào hóa đơn.</li>
  </ul>
</Text>
<Text>
  <strong>2. VIP Gold - Thành viên Vàng</strong>
  <br />
  <span style={{display:"flex",alignItems:"start", fontSize:"13px"}}><img src={iconPoint} alt="" style={{width:"15px",height:"15px", marginRight:"3px",marginTop:"3px",marginLeft:"1px"}}/><span> <strong> Áp dụng khi:</strong> bạn giới thiệu từ 2 - 4 người thân. </span>  </span> 
  <strong style={{display:"flex",alignItems:"center", fontSize:"13px"}}><img src={iconStar} alt="" style={{width:"15px",height:"15px", marginRight:"3px"}}/> Quyền lợi:</strong>
  <ul style={{ fontSize:"13px"}}>
    <li>Bạn được tích điểm: 300,000 điểm (tương đương 300k để sử dụng dịch vụ).</li>
    <li>Người thân của bạn: ưu đãi 200k để trừ vào hóa đơn.</li>
  </ul>
</Text>
<Text>
  <strong>3. VIP Diamond - Thành viên Kim Cương</strong>
  <br />
  <span style={{display:"flex",alignItems:"start", fontSize:"13px"}}><img src={iconPoint} alt="" style={{width:"15px",height:"15px", marginRight:"3px",marginTop:"3px",marginLeft:"1px"}}/><span> <strong> Áp dụng khi:</strong>  bạn giới thiệu từ 5 người thân. </span>  </span> 
  <strong style={{display:"flex",alignItems:"center", fontSize:"13px"}}><img src={iconStar} alt="" style={{width:"15px",height:"15px", marginRight:"3px"}}/> Quyền lợi:</strong>
  <ul style={{ fontSize:"13px"}}>
    <li>Bạn được tích điểm: 500,000 điểm (tương đương 500k để sử dụng dịch vụ).</li>
    <li>Người thân của bạn: ưu đãi 200k để trừ vào hóa đơn.</li>
  </ul>
</Text>

          <Text className="italic">
            Lưu ý: Các ưu đãi sẽ được áp dụng sau khi khách hàng sử
            dụng dịch vụ.
          </Text>
          <div
            className="bg-[#04566e] text-[#fff] py-2 px-2 rounded-lg font-[600] text-center"
            onClick={() => setOpenPopup(false)}
          >
            Đóng
          </div>
        </Box>
      </Modal>
    </Page>
  );
}

export default ListRulePage;


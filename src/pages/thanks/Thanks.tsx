import {
  Box,
  Page,
  useNavigate,
  Text,
  Header,
  Spinner,
  Icon,
} from "zmp-ui";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getStorage } from "zmp-sdk/apis";

import { Button } from "zmp-react";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { Profile } from "../../redux/booking/types";
import MedicalExamItem from "../../components/organisms/MedicalExamItem";
import { getVitalsignsCustomer, setListService, setMasterIdExam } from "../../redux/detailExam";
import Prescription from "../../components/organisms/PrescriptionItem";
import { getPrescriptionCustomer } from "../../redux/dashboard";
import NavigationBar from "../../components/organisms/navigation-bar";
import { useMutation } from "react-query";
import { SaveSurvey } from "../../services/apis/dashboard";


function Thanks() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = window.location;


  const searchParams = new URLSearchParams(location.search);
  const [typeParams, setTypeParams] = useState("");



  
  return (
    <Page className="bg-cover py-4 px-2 ">
      <Header
        title="KẾT THÚC SÀNG LỌC"
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
      
      <div style={{ height: "80%", display: "flex", justifyContent: "center",alignItems:"center"}}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
            
 
    <div
      style={{
        maxWidth: "80%",
        textAlign: "left",
        fontSize: "16px",
        fontWeight: "600",
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
        display: "flex",
        alignItems: "flex-start",
        gap: "15px",
      }}
    >
      {/* Icon hoặc ảnh */}
     

      {/* Nội dung thông báo */}
      <div>
        <p style={{ margin: 0, marginBottom: "10px", color: "#333" }}>
         
          Bạn đã hoàn thành trả lời bộ câu hỏi!
        </p>
        <p style={{ margin: "10px 0", lineHeight: "1.6", color: "#333" }}>
          Cảm ơn bạn đã cung cấp đầy đủ thông tin để các Bác sĩ nắm rõ tiền sử bệnh lý của bạn, qua đó có những phương án phù hợp để thăm khám và tầm soát bệnh cho bạn được chính xác và chu đáo nhất.
        </p>
        <p style={{ margin: "10px 0", lineHeight: "1.6", color: "#333" }}>
          <strong>Thông tin này hoàn toàn được bảo mật.</strong>
        </p>
        <p style={{ marginTop: "10px", color: "#333" }}>
          Cảm ơn bạn đã hợp tác & Trân trọng cảm ơn bạn rất nhiều!
        </p>
      </div>
            </div>
            <div style={{background:"#fe4d4d", padding:"8px",borderRadius:"4px", width:"fit-content" ,color:"white", cursor:"pointer", marginBottom:"10px"}} className='buttonD' onClick ={() =>  navigate(`/dashboard`, {
      replace: false,
      animate: true,
    })}>
                     Kết thúc
            </div> 
          </div>
            </div>
     
    </Page>
  );
}

export default Thanks;

import React, { useEffect, useState } from "react";
import { Box, Header, Page } from "zmp-ui";
import CCollapseXN from "../../components/atoms/CollapseXN";
import RangeResult from "../../components/atoms/ResultInRange";


 const Example: React.FC = () => {
    
     const data = [
         {
             id: "20920773-cca5-43e0-8027-456969725dad",
             servicespoint_detail_id: "e28e642d-2eb5-43af-93b7-8fc2fc2762f9",
             servicepoint_create_date: "2023-12-11T07:29:03+07:00",
             labtests_id: "XNHH0101",
             labtests_sid: "111223-1010",
             labtests_tube_id: "WB3",
             labtests_tube_name: "ống WB3 (xanh dương)",
             labtests_name: "WBC",
             labtests_result: "111",
             is_normal: true,
             is_higher: false,
             is_lower: false,
             is_abnormal_result: true,
             labtests_group_id: "XNHH",
             labtests_group_name: "XÉT NGHIỆM HUYẾT HỌC",
             result_group_header: "Tổng Phân Tích Tế Bào Máu (Công Thức Máu)",
             result_group_header_orderby: 23,
             service_id: "XNHH01",
             service_name: "Tổng Phân Tích Tế Bào Máu (Công Thức Máu)",
             normal_index: "4 - 10",
             higher_index: 10.0,
             lower_index: 4.0,
             min_abnormal_index: 2.0,
             max_abnormal_index: 50.0,
             unit_id: "K/uL",
             description: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
             warning_content: null,
             note_public: "",
             note_private: "",
             machine_id: "XN-M-001",
             machine_name: "Máy huyết học Cell Dyn Rubby",
             create_date: "2023-12-11T07:50:27.84+07:00",
             labtests_result_time: "2023-12-11T08:34:09.03+07:00",
             technician_employee_id: "NV00069",
             approved_employee_id: "NV00069",
             group_order_number: 31,
             order_number: 1,
             is_has_result: true,
             is_sent_to_out: null,
             is_approved: true,
             is_excuted: null,
             is_show_after_approved: null,
             is_machine_auto: true,
         }
     ];

    return (
        <Page>
            <Header
                title="demo"
                showBackIcon
                onBackClick={() =>{} }
                className="p-booking_headers"
            />
            <Box height={60} />
            <Box className="px-4 py-2">

            {data.map((item) => (
                <div key={item.id}>
                    <CCollapseXN
                        open
                        unit={item.unit_id}
                        title={item.labtests_name}
                        type="normal"
                        index={item.labtests_result}
                    >
                        <p className="text-[14px]">{item.description}</p>
                        <RangeResult
                            min={item.min_abnormal_index}
                            max={item.max_abnormal_index}
                            index={Number(item.labtests_result)}
                        />
                    </CCollapseXN>
                </div>
            ))}
            </Box>
        </Page>
    );
};
export default Example;
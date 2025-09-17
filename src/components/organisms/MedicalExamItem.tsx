import React from "react";
import { FunctionComponent } from "react";
import { Box, Text } from "zmp-ui";
import { HistoriesCustomerItem } from "../../redux/dashboard/types";
import moment from "moment";

interface RestaurantProps {
  exam: HistoriesCustomerItem;
  onClick?: () => void;
}

const MedicalExamItem: FunctionComponent<RestaurantProps> = ({ exam, onClick }) => (
  <div
    className="m-4 bg-[#fff] p-2 rounded-xl overflow-hidden shadow-sm border"
    onClick={onClick}
  >
    <Box
      flex
      justifyContent="space-between"
      alignItems="center"
      key={exam.customer_id}
      className="mb-2"
    >
      <Text className="text-[21px] font-[600] color_main">
        {exam.customer_id}
      </Text>
      <span
        style={{
          color: exam.status === "pendding" ? "#0068ff" : "#FDB714",
        }}
        className="font-[500]"
      >
        {exam.status === "done" ? "Hoàn thành" : "Đang thực hiện"}
      </span>
    </Box>
    <Text className="text-[14px] font-[500] text-[#0068ff]">{`Thời gian đến khám: ${moment(
      exam.register_date,
    ).format("HH:mm DD/MM/YYYY")}`}</Text>
  </div>
);

export default MedicalExamItem;

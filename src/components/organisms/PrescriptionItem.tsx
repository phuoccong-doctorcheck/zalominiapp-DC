import React from "react";
import { FunctionComponent } from "react";
import { Text } from "zmp-framework/react";
import { useNavigate } from "react-router-dom";
import { PrescriptionItem } from "../../redux/dashboard/types";
import { useAppDispatch } from "../../redux/common/hooks";
import { setPrescriptionCustomerItem } from "../../redux/dashboard";
import { Icon, Box } from "zmp-ui";
import moment from "moment";
import { formatNumber } from "../../utils/functions";

interface PrescriptionProps {
  prescription: PrescriptionItem;
}

const Prescription: FunctionComponent<PrescriptionProps> = ({
  prescription,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const viewDetail = (slug: string) => {
    navigate({
      pathname: slug,
      search: new URLSearchParams({
        id: String(prescription.customer_id),
      }).toString(),
    });
  };

  return (
    <div
      className="m-4 bg-[#fff] p-[4px_0_0_8px] rounded-xl overflow-hidden shadow-sm border"
      onClick={() => {
        dispatch(setPrescriptionCustomerItem(prescription));
        viewDetail(`/prescription-detail/${prescription.customer_id}`);
      }}
    >
      <Box
        flex
        justifyContent="space-between"
        alignItems="center"
        key={prescription.prescription_id}
        className="mb-2"
      >
        <Text className="text-[24px] font-[700] color_main">
          {prescription.master_id}
        </Text>
        <span className="font-[400] flex items-center">
          Chi tiết <Icon icon="zi-chevron-right" />
        </span>
      </Box>
      <Text className="text-[14px] font-[400] text-[#0068ff]">{`Ngày tạo: ${moment(
        prescription.create_datetime,
      ).format("HH:mm DD/MM/YYYY")}`}</Text>
      <Text className="text-[14px] font-[400] text-[#0068ff]">{`Uống thuốc theo toa: ${prescription.diagnoses_text}`}</Text>
      <Box className=" grid grid-cols-2 gap-2 mt-2">
        <Text
          style={{
            color: prescription.status === "pendding" ? "#f00" : "#00b616",
          }}
          className="text-[16px] font-[600] color_main uppercase mt-3 mb-2"
        >
          {prescription.status === "pendding"
            ? "Chưa thanh toán"
            : "đã thanh toán"}
        </Text>
        {/* <span className="font-[600] text-[#f00] bg-[#FDB714]  px-4 flex items-center justify-center rounded-[30px_0px_10px_0px]">
          {formatNumber(
            Number(
              prescription?.items.reduce(
                (accumulator, currentValue) => {
                  return (
                    accumulator +
                    currentValue?.drug_prices *
                    currentValue?.quantity_total
                  );
                },
                0,
              ),
            ),
          )} VND
        </span> */}
      </Box>
    </div>
  );
};

export default Prescription;

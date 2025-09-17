import { Box, Header, Page } from "zmp-ui";
import React from "react";
import { formatNumber } from "../utils/functions";
import { useAppSelector } from "../redux/common/hooks";

function PrescriptionDetail() {
  const prescriptionCustomerItem = useAppSelector(
    (state) => state.dashboard.prescriptionCustomerItem,
  );

  return (
    <Page className="bg-cover py-4 px-2 ">
      <Header
        title="Chi tiết toa thuốc"
        className="p-booking_header "
        showBackIcon
        backgroundColor="#fff"
      />
      <Box height={44}></Box>
      <Box className="">
        <Box className="t-result_item_tdv">
          <Box flex justifyContent="space-between" className="">
            <p className="text-[14px] min-w-[100px] font-[600] color_main">
              Người cấp thuốc:
            </p>
            <span className="text-[14px]">
              {prescriptionCustomerItem?.prescriber_employee?.name}
            </span>
          </Box>
          <Box flex justifyContent="space-between" className="">
            <p className="text-[14px] min-w-[100px] font-[600] color_main">
              Ngày cấp thuốc:
            </p>
            <span className="text-[14px]">{}</span>
          </Box>
          <Box flex justifyContent="space-between" className="">
            <p className="text-[14px] min-w-[100px] font-[600] color_main">
              Nơi cấp:
            </p>
            <span className="text-[14px]">
              {prescriptionCustomerItem?.prescriber_department?.name}
            </span>
          </Box>
          <Box className="">
            <p className="text-[14px] min-w-[100px] font-[600] color_main">
              Chuẩn đoán:
            </p>
            <span className="text-[13px]">
              {prescriptionCustomerItem?.diagnoses_text}
            </span>
          </Box>
          <Box className="">
            <p className="min-w-[100px] font-[600] color_main">Lời dặn:</p>
            <span className="text-[13px]">
              {prescriptionCustomerItem?.doctor_note}
            </span>
          </Box>
          <Box flex justifyContent="space-between" className="">
            <p className="text-[14px] min-w-[100px] font-[600] color_main">
              Ngày tái khám:
            </p>
            <span className="text-[14px]">{}</span>
          </Box>
          {/* <Box flex justifyContent="space-between" className="">
            <p className="text-[14px] min-w-[100px] font-[600] color_main">
              Tổng tiền thuốc:
            </p>
            <span className="text-[14px] font-[600] color_main">
              {prescriptionCustomerItem?.items.length &&
                formatNumber(
                  Number(
                    prescriptionCustomerItem?.items.reduce(
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
                )}{" "}
              đ
            </span>
          </Box> */}
          <Box className="border-t py-2 mt-2">
            {prescriptionCustomerItem?.items?.length
              ? prescriptionCustomerItem?.items?.map((drug) => (
                  <div
                    className="mb-4 bg-[#e7fbff] rounded-lg p-2"
                    key={drug?.drug_id}
                  >
                    <Box className="border-b pb-2">
                      <p className="text-[14px] min-w-[100px] font-[700] color_main">
                        {" "}
                        {drug?.drug_name}{" "}
                      </p>
                      <p className="text-[12px] font-[400] text-[black]">{`${drug.unit_id} - ${drug?.drug_prices} đ`}</p>
                    </Box>
                    <Box className="pt-2">
                      <p className="text-[13px] font-[400] text-[green]">
                        {" "}
                        {drug?.how_to_use}{" "}
                      </p>
                      <p className="text-[12px] font-[400] text-[black]">{`Số lượng: ${drug?.quantity_total}`}</p>
                    </Box>
                  </div>
                ))
              : null}
          </Box>
        </Box>
      </Box>
      <Box height={20}></Box>
    </Page>
  );
}

export default PrescriptionDetail;

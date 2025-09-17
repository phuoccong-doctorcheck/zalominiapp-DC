import React, { useState } from "react";
import { FunctionComponent } from "react";
import { Text, Checkbox } from "zmp-framework/react";
import { ResultType } from "./listCategoriesResult";
import { formatDate, formatNumber } from "../../utils/functions";
import moment from "moment";
import { Box } from "zmp-ui";
import RichTextEditor from "../atoms/RichTextEditor";
import PreviewImages, { ImageItem } from "../molecules/imagePreview";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { setImagePreview } from "../../redux/detailExam";
import CCollapseXN, { IconCollapseType } from "../atoms/CollapseXN";
import RangeResult from "../atoms/ResultInRange";

interface RestaurantProps {
  typeRender: ResultType;
  data: any;
}

const ResultCategoriesItem: FunctionComponent<RestaurantProps> = ({
  typeRender,
  data,
}) => {
  const dispatch = useAppDispatch();
  const dataImagePreview = useAppSelector((state) => state.detail.dataImagePreview);
  console.log(data,typeRender)
  const renderHeader = (
    dateImplement: string,
    returnResults: string,
    personExecutor: string,
    locationImplement: string,
    evaluation: string | any,
  ) => {
    console.log(data)
    return (
      <>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
            Thực hiện:
          </p>
          <span className="text-[14px]">{dateImplement}</span>
        </Box>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
            Trả kết quả:
          </p>
          <span className="text-[14px]">{returnResults}</span>
        </Box>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
            Người thực hiện:
          </p>
          <span className="text-[14px]">{personExecutor}</span>
        </Box>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
            Nơi thực hiện:
          </p>
          <span className="text-[14px]">{locationImplement}</span>
        </Box>
        <Box className="">
          <p className="min-w-[100px] font-[400] color_main">
            Nội dung đánh giá:
          </p>
          <span>{evaluation}</span>
        </Box>
      </>
    );
  };

  const handleCheckTypeXN = (): IconCollapseType => {
    return 'higher'
  }

  const handleRender = () => {
    switch (typeRender) {
      case "SA":
        return (
          <Box className="t-result_item_pcd">
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Thực hiện:
              </p>
              <span className="text-[14px]">
                {formatDate(data?.imaging?.checkin_time)}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Trả kết quả:
              </p>
              <span className="text-[14px]">
                {formatDate(data?.imaging?.checkout_time)}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Người thực hiện:
              </p>
              <span className="text-[14px]">
                {data?.imaging?.approved_employee?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Nơi thực hiện:
              </p>
              <span className="text-[14px]">
                {data?.imaging?.execution_department?.name} DOCTOR CHECK
              </span>
            </Box>
            <Box className="">
              <p className="min-w-[100px] font-[400] color_main">
                Nội dung đánh giá:
              </p>
              <RichTextEditor
                value={data?.imaging?.inferable_content}
                header="hide"
                readOnly
                handleChange={(value: string) => { }}
              />
              <Box className="">
                <p className="min-w-[100px] font-[600] color_main">
                  Kết luận:
                </p>
                <span className=" font-[400] text-[13px]">
                  {data?.imaging?.inferable_conclude}
                </span>
              </Box>
            </Box>
            <Box className="mt-2 border-t pt-2 overflow-hidden">
              <Box className="wrapper-box-images gap-x-2 gap-y-6 pr-4">
                <div>
                  {data?.imaging?.items?.length
                    ? (data?.imaging?.items
                    ).map((image, index) => {
                      if (index % 2 === 0) return (
                        <div key={image?.imaging_detail_id}>
                          <img
                            src={image?.image_base_data}
                            loading="lazy"
                            className="rounded-md"
                            onClick={() => {
                              dispatch(
                                setImagePreview({
                                  ...dataImagePreview,
                                  visible: true,
                                  activeIndex: index + 1,
                                  images: data?.imaging?.items.map((i, idex) => ({
                                    src: i.image_base_data,
                                    thumbnail: i.image_base_data,
                                  }))
                                })
                              )
                            }}
                          />
                        </div>
                      )
                    })
                    : null}
                </div>
                <div>
                  {data?.imaging?.items?.length
                    ? (data?.imaging?.items
                    ).map((image, index) => {
                      if (index % 2 !== 0) return (
                        <div key={image?.imaging_detail_id}>
                          <img
                            src={image?.image_base_data}
                            loading="lazy"
                            className="rounded-md"
                            onClick={() => {
                              dispatch(
                                setImagePreview({
                                  ...dataImagePreview,
                                  visible: true,
                                  activeIndex: index + 1,
                                  images: data?.imaging?.items.map((i, idex) => ({
                                    src: i.image_base_data,
                                    thumbnail: i.image_base_data,
                                  }))
                                })
                              )
                            }}
                          />
                        </div>
                      )
                    })
                    : null}
                </div>
              </Box>
            </Box>
          </Box>
        );
      case "NS":
        return (
          <Box className="t-result_item_ns">
            {renderHeader(
              moment(data?.imaging?.checkin_time).format("HH:mm - DD/MM/YYYY"),
              moment(data?.imaging?.approved_date).format("HH:mm - DD/MM/YYYY"),
              data?.imaging?.signature_print_name,
              `${data?.imaging?.execution_department?.name} DOCTOR CHECK`,
              "",
            )}
            <Box className="m-h-[200px] pb-4">
              <Box className="">
                <p className="min-w-[100px] font-[600] color_main">
                  Mô tả:
                </p>
                <RichTextEditor
                  value={data?.imaging?.inferable_content}
                  header="hide"
                  readOnly
                  handleChange={(value: string) => { }}
                />
              </Box>
              <Box className="">
                <p className="min-w-[100px] font-[600] color_main">
                  Kết luận:
                </p>
                <span className=" font-[400] text-[13px]">
                  {data?.imaging?.inferable_conclude}
                </span>
              </Box>
            </Box>
            <Box className="m-h-[200px] pb-4">
              <Box className="border-t pt-2">
                <Box
                  flex
                  justifyContent="flex-end"
                  alignItems="center"
                  className="gap-2"
                >
                  <p className="font-[600] color_main">Số lượng:</p>
                  <span className=" font-[400] text-[13px]">
                    {data?.imaging?.items?.length} ảnh
                  </span>
                </Box>
                <Box className="">
                  <Box className="gap-x-2 gap-y-6 wrapper-box-images">
                    <div
                    >

                      {data?.imaging?.items?.length
                        ? data?.imaging?.items.map((image, index) => {
                          if (index % 2 === 0) return (
                            <div
                              key={image?.imaging_detail_id}
                              onClick={() => {
                                dispatch(
                                  setImagePreview({
                                    ...dataImagePreview,
                                    visible: true,
                                    activeIndex: index + 1,
                                    images: data?.imaging?.items.map((i, idex) => ({
                                      src: i.image_base_data,
                                      thumbnail: i.image_base_data,
                                    }))
                                  })
                                )
                              }}>
                              <img
                                src={image?.image_base_data}
                                loading="lazy"
                                className="rounded-md"
                              />
                            </div>
                          )
                        })
                        : null}
                    </div>
                    <div >
                      {data?.imaging?.items?.length
                        ? data?.imaging?.items.map((image, index) => {
                          if (index % 2 !== 0) return (
                            <div
                              key={image?.imaging_detail_id}
                              onClick={() => {
                                dispatch(
                                  setImagePreview({
                                    ...dataImagePreview,
                                    visible: true,
                                    activeIndex: index + 1,
                                    images: data?.imaging?.items.map((i, idex) => ({
                                      src: i.image_base_data,
                                      thumbnail: i.image_base_data,
                                    }))
                                  })
                                )
                              }}>
                              <img
                                src={image?.image_base_data}
                                loading="lazy"
                                className="rounded-md"
                              />
                            </div>
                          )
                        })
                        : null}
                    </div>

                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      case "DT":
        return (
          <Box className="t-result_item_xq">
            {renderHeader(
              moment(data?.imaging?.checkin_time).format("HH:mm DD/MM/YYYY"),
              moment(data?.imaging?.approved_date).format("HH:mm DD/MM/YYYY"),
              data?.imaging?.signature_print_name,
              `${data?.imaging?.execution_department?.name} DOCTOR CHECK`,
              <RichTextEditor
                header="hide"
                handleChange={(value: string) => {
                }}
                value={data?.imaging?.inferable_content}
              />,
            )}
            <Box className="m-h-[200px] pb-4">
              <Box className="">
                <p className="min-w-[100px] font-[600] color_main">
                  Kết luận:
                </p>
                <span className=" font-[400] text-[13px]">
                  <RichTextEditor
                    header="hide"
                    handleChange={(value: string) => {
                    }}
                    value={data?.imaging?.inferable_conclude}
                  />
                </span>
              </Box>
            </Box>
            <Box className="border-t pt-2">
              <Box
                flex
                justifyContent="flex-end"
                alignItems="center"
                className="gap-2"
              >
                <p className="font-[600] color_main">Số lượng:</p>
                <span className=" font-[400] text-[13px]">
                  {data?.imaging?.items?.length} ảnh
                </span>
              </Box>
              <Box className="">
                {data?.imaging?.items?.length
                  ? data?.imaging?.items?.map((image, index) => (
                    <div key={image?.imaging_detail_id}>
                      <img
                        src={image?.image_base_data}
                        loading="lazy"
                        className="rounded-md"
                        onClick={() => {
                          dispatch(
                            setImagePreview({
                              ...dataImagePreview,
                              visible: true,
                              activeIndex: index + 1,
                              images: data?.imaging?.items.map((i, idex) => ({
                                src: i.image_base_data,
                                thumbnail: i.image_base_data,
                              }))
                            })
                          )
                        }}
                      />
                    </div>
                  ))
                  : null}
              </Box>
            </Box>
          </Box>
        );
      case "XQ":
        return (
          <Box className="t-result_item_xq">
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Thực hiện:
              </p>
              <span className="text-[14px]">
                {formatDate(data?.imaging?.checkin_time)}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Trả kết quả:
              </p>
              <span className="text-[14px]">
                {formatDate(data?.imaging?.checkout_time)}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Người thực hiện:
              </p>
              <span className="text-[14px]">
                {data?.imaging?.approved_employee?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Nơi thực hiện:
              </p>
              <span className="text-[14px]">
                {data?.imaging?.execution_department?.name} DOCTOR CHECK
              </span>
            </Box>
            <Box className="m-h-[200px] pb-4">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Nội dung đánh giá:
              </p>
              <RichTextEditor
                value={data?.imaging?.inferable_content}
                header="hide"
                readOnly
                handleChange={(value: string) => { }}
              />
              <Box className="">
                <p className="min-w-[100px] font-[600] color_main">
                  Kết luận:
                </p>
                <span className=" font-[400] text-[13px]">
                  {data?.imaging?.inferable_conclude}
                </span>
              </Box>
            </Box>
            <Box className="border-t pt-2">
              <Box
                flex
                justifyContent="flex-end"
                alignItems="center"
                className="gap-2"
              >
                <p className="font-[600] color_main">Số lượng:</p>
                <span className=" font-[400] text-[13px]">
                  {data?.imaging?.items?.length} ảnh
                </span>
              </Box>
              <Box className="">
                {data?.imaging?.items?.length
                  ? data?.imaging?.items?.map((image, index) => (
                    <div key={image?.imaging_detail_id}>
                      <img
                        src={image?.image_base_data}
                        loading="lazy"
                        className="rounded-md"
                        onClick={() => {
                          dispatch(
                            setImagePreview({
                              ...dataImagePreview,
                              visible: true,
                              activeIndex: index + 1,
                              images: data?.imaging?.items.map((i, idex) => ({
                                src: i.image_base_data,
                                thumbnail: i.image_base_data,
                              }))
                            })
                          )
                        }}
                      />
                    </div>
                  ))
                  : null}
              </Box>
            </Box>
          </Box>
        );
      case "PCD":
        return (
          <Box className="t-result_item_pcd">
            <Box flex justifyContent="space-between" className="">
              <p className="min-w-[100px] font-[400] color_main">
                Thời gian đăng kí:
              </p>
              <span>
                {moment(data?.data?.servicepoint_datetime).format(
                  "HH:mm DD/MM/YYYY",
                )}
              </span>
            </Box>
            <Box className="">
              <p className="min-w-[100px] font-[400] color_main">
                Bác sĩ chỉ định:
              </p>
              <span></span>
            </Box>
            <Box className="">
              <p className="min-w-[100px] font-[400] color_main">
                Chẩn đoán:
              </p>
              <span>{data?.data?.diagnose_note}</span>
            </Box>
            <Box className="mt-4 w-full">
              <table className="w-full">
                <thead className="w-full border-b mb-2">
                  <tr className="grid grid-cols-[1fr_30px_80px] w-full">
                    <th className="text-start w-full font-[400] text-[green]">
                      Tên dịch vụ
                    </th>
                    <th className="text-start w-full font-[400] text-[green]">
                      SL
                    </th>
                    <th className="text-end w-full font-[400] text-[green]">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.items?.map((record: any) => (
                    <>
                      <tr className="border-b pb-1">
                        <Text className="font-[700] color_main">
                          {record.group_name}
                        </Text>
                      </tr>
                      {record?.child?.length &&
                        record?.child?.map((item) => (
                          <tr
                            className="grid grid-cols-[1fr_30px_80px] w-full text-[main] my-2"
                            key={item?.servicespoint_detail_id}
                          >
                            <td className="text-[14px]">
                              {item?.service_name}
                            </td>
                            <td className="text-[14px]">{item?.quantity}</td>
                            <td className="text-center text-[14px]">
                              {item?.service_prices
                                ? `${formatNumber(item?.service_prices)} đ`
                                : ""}
                            </td>
                          </tr>
                        ))}
                    </>
                  ))}
                </tbody>
              </table>
              <Box className="pt-1 border-t mt-2 flex justify-between pf-1 pr-2">
                <Text className="font-bold color_main">Tổng tiền:</Text>
                <span className="font-bold text-[red]">
                  {data?.total_services
                    ? `${formatNumber(data?.total_services)} đ`
                    : ""}
                </span>
              </Box>
            </Box>
          </Box>
        );
      case "TDV":
        return (
          <Box className="t-result_item_tdv">
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[600] color_main">
                Người cấp thuốc:
              </p>
              <span className="text-[14px]">
                {data?.prescription?.prescriber_employee?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[600] color_main">
                Ngày cấp thuốc:
              </p>
              <span className="text-[14px]">{ }</span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[600] color_main">
                Nơi cấp:
              </p>
              <span className="text-[14px]">
                {data?.prescription?.prescriber_department?.name}
              </span>
            </Box>
            <Box className="">
              <p className="text-[14px] min-w-[100px] font-[600] color_main">
                Chuẩn đoán:
              </p>
              <span className="text-[14px]">
                {data?.prescription?.diagnoses_text}
              </span>
            </Box>
            <Box className="">
              <p className="min-w-[100px] font-[600] color_main">
                Lời dặn:
              </p>
              <span>{data?.prescription?.doctor_note}</span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[600] color_main">
                Ngày tái khám:
              </p>
              <span className="text-[14px]">{ }</span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[600] color_main">
                Tổng tiền thuốc:
              </p>
              <span className="text-[14px] font-[400] color_main">
                {data?.prescription?.items.length &&
                  formatNumber(
                    Number(
                      data?.prescription?.items.reduce(
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
                  )}
                {data?.prescription?.items.length && "đ"}
              </span>
            </Box>
            <Box className="border-t py-2 mt-2">
              {data?.prescription?.items?.length
                ? data?.prescription?.items?.map((drug) => (
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
        );
      case "XN":
        return (
          <Box className="t-result_item_xn">
            <Box flex justifyContent="space-between" className="w-[90vw]">
              <p className="text-[14px] min-w-[110px] font-[400] color_main ">
                Ngày lấy mẫu:
              </p>
              <span className="text-[14px] w-[200px] text-end">
                {formatDate(data.get_samples_time)}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="w-[90vw]">
              <p className="text-[14px] min-w-[110px] font-[400] color_main ">
                Ngày thực hiện:
              </p>
              <span className="text-[14px] w-[200px] text-end">
                {formatDate(data.approved_time)}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="w-[90vw]">
              <p className="text-[14px] min-w-[110px] font-[400] color_main ">
                Trả kết quả:
              </p>
              <span className="text-[14px] w-[200px] text-end">
                {formatDate(data.expected_results_time)}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="w-[90vw]">
              <p className="text-[14px] min-w-[110px] font-[400] color_main ">
                Người thực hiện:
              </p>
              <span className="text-[14px] w-[200px] text-end">
                {data?.approved_employee?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="w-[90vw]">
              <p className="text-[14px] min-w-[110px] font-[400] color_main ">
                Nơi thực hiện:
              </p>
              <span className="text-[14px] w-[220px] text-end">
                {data?.execution_department?.name} Doctor Check
              </span>
            </Box>
            {data?.diagnose_note &&
              <Box className="w-[90vw] mt-2 mx-2 shadow-sm border p-2 rounded-md translate-x-[-5px]">
                <p className="min-w-[70px] font-[600] color_main">
                  Kết luận:
                </p>
                <span>{data?.diagnose_note}</span>
              </Box>
            }
            <Box className="mt-2 w-full">
              {data?.items?.map((record: any, index) => (
                <>
                  <tr className="">
                    <Text className="font-[700] color_main my-2">
                      {record.group_name}
                    </Text>
                  </tr>
                  {record.child?.length &&
                    record.child.map((child, childex) => (
                      <div key={child.id} className="mb-3">
                        <CCollapseXN
                          unit={child.unit_id}
                          title={child.labtests_name}
                          type={handleCheckTypeXN()}
                          index={child.labtests_result}
                          isNormal={child.is_normal}
                          isHigher={child.is_higher}
                          isLower={child.is_lower}
                        >
                          <p className="text-[14px]">{child.description}</p>
                          <RangeResult
                            min={child.lower_index}
                            max={child.higher_index}
                            index={child.labtests_result}
                            isNormal={child.is_normal}
                            isHigher={child.is_higher}
                            isLower={child.is_lower}
                          />
                        </CCollapseXN>
                      </div>
                    ))}
                </>
              ))}
            </Box>
          </Box>
        );
      case "GPB":
        return (
          <Box className="t-result_item_pcd">
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Nơi nhận mẫu:
              </p>
              <span className="text-[14px]">
                {data.histopathology?.servicepoint_department?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Người nhận:
              </p>
              <span className="text-[14px]">
                {data.histopathology?.receive_employee?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Thời gian nhận:
              </p>
              <span className="text-[14px]">
                {data.histopathology?.receive_time &&
                  moment(data.histopathology?.receive_time).format(
                    "HH:mm - DD/MM/YYYY",
                  )}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Người bàn giao:
              </p>
              <span className="text-[14px]">
                {data.histopathology?.receive_employee?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Ngày trả kết quả:
              </p>
              <span className="text-[14px]">07:29 - 11/12/2023</span>
            </Box>
            <Box className="">
              <p className="min-w-[100px] font-[400] color_main">
                Chẩn đoán:
              </p>
              <span className="text-[14px]">
                {data?.histopathology?.diagnose_note}
              </span>
            </Box>
            <Box className="border-t mt-2 pt-2">
              <p className="min-w-[100px] font-[400] color_main">
                Yêu cầu xét nghiệm:
              </p>
              <span className="text-[14px]">
                {data?.histopathology?.diagnose_note}
              </span>
              <Box className="mt-2">
                <p className="min-w-[100px] font-[400] color_main">
                  Sinh thiết được lấy từ:
                </p>
                <span className="text-[14px]">
                  {data?.histopathology?.endoscopy_biopsy_node}
                </span>
              </Box>
            </Box>
            <Box className="border-t mt-2 pt-2">
              <p className="min-w-[100px] font-[400] color_main">
                Kết luận:
              </p>
              <span className="text-[14px]">
                {data?.histopathology?.diagnose_note}
              </span>
              <Box className="mt-2">
                <p className="min-w-[100px] font-[400] color_main">
                  Đề nghị (nếu có):
                </p>
                <span className="text-[14px]"></span>
              </Box>
              <Box className="mt-2">
                <p className="min-w-[100px] font-[400] color_main">
                  Kết quả:
                </p>
                <div
                  className="text-[13px] font-[400] text-[green]"
                  onTouchStart={() =>
                    window.open(data?.histopathology?.result_file?.path)
                  }
                >
                  {data?.histopathology?.result_file?.name}
                </div>
              </Box>
            </Box>
          </Box>
        );
      case "XNSHPT":
        return (
          <Box className="t-result_item_pcd">
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Ngày nhận chỉ định:
              </p>
              <span className="text-[14px]">07:29 - 11/12/2023</span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Người nhận:
              </p>
              <span className="text-[14px]">KTVXN. Trần Uyên Anh</span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Ngày duyệt kết quả::
              </p>
              <span className="text-[14px]">07:29 - 11/12/2023</span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Người duyệt:
              </p>
              <span className="text-[14px]">KTVXN. Trần Uyên Anh</span>
            </Box>
            <Box className="">
              <p className="min-w-[100px] font-[400] color_main">
                Xét nghiệm:
              </p>
              <p className="text-[14px]">- {data?.service?.service_name}.</p>
              <p className="text-[14px]">
                - {data?.molecule?.molecule_method}.
              </p>
            </Box>
            <Box className="mt-2">
              <p className="min-w-[100px] font-[400] color_main mb-2">
                Kết quả:
              </p>
              <img src={data?.molecule?.result_image} />
            </Box>
            <Box flex className="mt-2">
              <p className="min-w-[70px] font-[600] color_main mb-2">
                Kết luận:
              </p>
              <p className="text-[14px]">
                {data?.molecule?.result_is_positive ? "Dương tính" : "âm tính"}
              </p>
            </Box>
            <Box flex className="mt-2">
              <table className="w-full">
                <thead className="w-full border-b">
                  <tr className="grid grid-cols-[1fr_1fr] w-full">
                    <th className="text-start w-full font-[400] color_main">
                      KẾT QUẢ
                    </th>
                    <th className="text-start w-full font-[400] color_main">
                      NGƯỠNG PHÁT HIỆN
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.molecule?.items?.map((record: any, index) => (
                    <tr
                      className={`grid grid-cols-[1fr_1fr] w-full rounded-md p-1 text-[main] ${index % 2 === 0 ? "bg-[#52a0ff3d]" : ""
                        }`}
                      key={record?.id}
                    >
                      <td className="text-start text-[12px] font-[400]">
                        <RichTextEditor
                          value={`${record?.result_index} ${record?.unit_id}`}
                          header="hide"
                          readOnly
                          handleChange={(value: string) => { }}
                        />
                      </td>
                      <td
                        className={`text-center text-[12px] ${record.is_higher && "text-[#f00] font-[600]"
                          }`}
                      >
                        {record?.normal_index}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        );
      case "XNHT":
        const templateNXHT = [
          {
            question: "Quý khách hàng ngưng ăn trong vòng 4-6 giờ",
            answer: data?.breathtest?.stop_eating_yes,
          },
          {
            question:
              "Quý khách hàng ngưng sử dụng bia, rượu,nước ngọt, nước có ga trong vòng 4 giờ",
            answer: data?.breathtest?.stop_drink_yes,
          },
          {
            question:
              "Quý khách hàng ngưng sử dụng thuốc kháng sinh trong 4 tuần trở lại đây",
            answer: data?.breathtest?.stop_antibiotics_yes,
          },
          {
            question:
              "Quý khách hàng ngưng sử dụng thuốc ức chế bơm Proton dạ dày trong vòng 2 tuần trở lại đây",
            answer: data?.breathtest?.stop_slime_yes,
          },
        ];
        return (
          <Box className="t-result_item_xnht">
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Ngày nhận chỉ định:
              </p>
              <span className="text-[14px]">
                {formatDate(data?.breathtest?.checkin_time)}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Thời gian đo 1:
              </p>
              <span className="text-[14px]">
                {formatDate(data?.breathtest?.execution_first_time)}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Thời gian đo 2:
              </p>
              <span className="text-[14px]">
                {formatDate(data?.breathtest?.expected_second_time)}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="min-w-[100px] font-[400] color_main mb-2">
                Thời gian duyệt kết quả:
              </p>
              <span className="text-[14px]">
                {formatDate(data?.breathtest?.expected_result_time)}
              </span>
            </Box>
            <Box className="">
              <p className="min-w-[100px] font-[600] color_main mb-2">
                Đánh giá mức độ sẵn sàng trước khi xét nghiệm:
              </p>
              {templateNXHT.map((item, index) => (
                <div className="my-2" key={Math.floor(Math.random() * 10000)}>
                  <Checkbox
                    checked={item.answer}
                    label={item.question}
                    value={""}
                    className="italic"
                  />
                </div>
              ))}
            </Box>
            <Box className="">
              <p className="min-w-[100px] font-[600] color_main mb-2">
                Nguyên lý xét nghiệm:
              </p>
              <RichTextEditor
                value={data?.breathtest?.breathtest_helper_text}
                header="hide"
                readOnly
                handleChange={(value: string) => { }}
              />
            </Box>
            <Box className="mt-2">
              <Box className="">
                <p className="min-w-[100px] font-[600] color_main mb-2">
                  Kết luận:
                </p>
              </Box>
              <table className="w-full">
                <thead className="w-full border-b">
                  <tr className="grid grid-cols-[1fr_80px_60px_70px] w-full">
                    <th className="text-start text-[12px] w-full font-[600] color_main">
                      Tên xét nghiệm
                    </th>
                    <th className="text-center text-[12px] w-full font-[600] color_main">
                      Kết Quả
                    </th>
                    <th className="text-center text-[12px] w-full font-[600] color_main">
                      BT
                    </th>
                    <th className="text-center text-[12px] w-full font-[600] color_main">
                      Kết luận
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.breathtest?.items?.map((record: any, index) => (
                    <tr
                      className={`grid grid-cols-[1fr_60px_60px_70px] w-full rounded-md p-1 text-[main] ${index % 2 === 0 ? "bg-[#52a0ff3d]" : ""
                        }`}
                      key={record?.id}
                    >
                      <td className="text-start text-[14px] font-[500]">
                        {record?.service_name}
                      </td>
                      <td
                        className={`text-center text-[12px] ${record.is_higher && "text-[#f00] font-[600]"
                          }`}
                      >
                        {record?.breathtest_result}
                      </td>
                      <td className="text-center text-[12px]">
                        {record?.normal_index}
                      </td>
                      <td className="text-center text-[12px]">
                        {record?.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        );
        case "XNPAP":
        return (
            <>
                <Box className="t-result_item_xq">
              <>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
          BS Phụ khoa:
          </p>
          <span className="text-[14px]">{data?.doctor_signature_name}</span>
        </Box>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
          Thời gian nhận chỉ định:
          </p>
          <span className="text-[14px]">{data?.servicepoint_create_date && moment(data?.servicepoint_create_date).format('YYYY/MM/DD HH:mm')} </span>
        </Box>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
          Thời gian duyệt kết quả:
          </p>
          <span className="text-[14px]">{data?.approved_datetime && moment(data?.approved_datetime).format('YYYY/MM/DD HH:mm')} </span>
        </Box>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
          Người duyệt kết quả:
          </p>
          <span className="text-[14px]">{data?.signature_print_name}</span>
        </Box>
        
      </>
            
              
            </Box>
            <div style={{ display: "flex", flexDirection: "column", padding: "12px" }}>
              <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>Đánh giá lam:</div>
        
              <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <input type="checkbox" checked={data?.specimen_satisfactory} readOnly />
                <span style={{ marginLeft: "6px", fontSize: "14px" }}>Đạt</span>
              </div>
        
              <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <input type="checkbox" checked={data?.specimen_unsatisfactory} readOnly />
                <span style={{ marginLeft: "6px", fontSize: "14px" }}>Không đạt</span>
              </div>
        
              
              <div style={{display:"flex", alignItems:"center",marginBottom: "4px",gap:5}}>
              <div style={{ fontWeight: "bold", fontSize: "14px",  }}>Bình thường:</div>
        
              <div style={{ display: "flex", alignItems: "center",marginTop: "3px", }}>
                <input type="checkbox" checked={data?.normal_cell} readOnly />
              </div>
            </div>
              <div style={{display:"flex", alignItems:"center",marginBottom: "4px",gap:5}}>
              <div style={{ fontWeight: "bold", fontSize: "14px",  }}>Biến đổi lành tính:</div>
        
              <div style={{ display: "flex", alignItems: "center", }}>
                <input type="checkbox" checked={data?.benign_changes_detected} readOnly />
                <span style={{ marginLeft: "6px", fontSize: "14px", marginBottom:"2px" }}>Có</span>
              </div>
            </div>
              {[
                { checked: data?.benign_changes_trichomonas_vaginalis, label: "Trichomonas vaginalis" },
                { checked: data?.benign_changes_candida_spp, label: "Candida spp" },
                { checked: data?.benign_changes_actinomyces_spp, label: "Actinomyces spp" },
                { checked: data?.benign_changes_herpes_simplex_virus, label: "Herpes simplex virus" },
                { checked: data?.benign_changes_others, label: "Khác" },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <input type="checkbox" checked={item.checked} readOnly />
                  <span style={{ marginLeft: "6px", fontSize: "14px" }}>{item.label}</span>
                </div>
              ))}
        
            
              <div style={{display:"flex", alignItems:"center",marginBottom: "4px",gap:5}}>
              <div style={{ fontWeight: "bold", fontSize: "14px",  }}>Bất thường tế bào biểu mô: </div>
        
              <div style={{ display: "flex", alignItems: "center",marginTop: "3px", }}>
                <input type="checkbox" checked={data?.epithelial_cell_abnormality} readOnly />
              </div>
            </div>
              <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>Tế bào gai:</div>
              {[
                { checked: data?.squamous_cell_ascus, label: "ASC-US" },
                { checked: data?.squamous_cell_asc_h, label: "ASC-H" },
                { checked: data?.squamous_cell_lsil, label: "LSIL" },
                { checked: data?.squamous_cell_hpv, label: "HPV" },
                { checked: data?.squamous_cell_hsil, label: "HSIL" },
                { checked: data?.squamous_cell_carcinoma, label: "Carcinoma tế bào gai" },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <input type="checkbox" checked={item.checked} readOnly />
                  <span style={{ marginLeft: "6px", fontSize: "14px" }}>{item.label}</span>
                </div>
              ))}
        
              <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>Tế bào tuyến:</div>
              {[
                { checked: data?.suggestions_repeat_pap_test, label: "Phết lại" },
                { checked: data?.suggestions_endocervical_curettage, label: "Nạo kênh" },
                { checked: data?.suggestions_colposcopy, label: "Soi CTC" },
                { checked: data?.suggestions_endometrial_curettage, label: "Nạo lòng" },
                { checked: data?.suggestions_biopsy, label: "Bấm sinh thiết" },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <input type="checkbox" checked={item.checked} readOnly />
                  <span style={{ marginLeft: "6px", fontSize: "14px" }}>{item.label}</span>
                </div>
              ))}
        
              <div style={{ fontSize: "14px", marginTop: "12px" }}>
                Kết luận: <strong>{data?.thinprep_conclude}</strong>
              </div>
        
              {data?.thinprep_file && (
                <div style={{ marginTop: "12px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>File kết quả:</div>
                  <div style={{ display: "flex", alignItems: "center", marginTop: "6px" }}>
                    <p style={{ marginRight: "5px", fontSize: "14px", color: "#d32f2f" }}>📄</p>
                    <a
                      href={data?.thinprep_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      File kết quả (gốc)
                    </a>
                  </div>
                </div>
              )}
            </div></>
        );
        case "XNHPV":
          return (
            <Box className="t-result_item_xq">
              <>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
          BS Phụ khoa:
          </p>
          <span className="text-[14px]">{data?.doctor_signature_name}</span>
        </Box>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
          Thời gian nhận chỉ định:
          </p>
          <span className="text-[14px]">{data?.servicepoint_create_date && moment(data?.servicepoint_create_date).format('YYYY/MM/DD HH:mm')} </span>
        </Box>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
          Thời gian duyệt kết quả:
          </p>
          <span className="text-[14px]">{data?.approved_datetime && moment(data?.approved_datetime).format('YYYY/MM/DD HH:mm')} </span>
        </Box>
        <Box flex justifyContent="space-between" className="">
          <p className="text-[14px] min-w-[100px] font-[400] color_main">
          Người duyệt kết quả:
          </p>
          <span className="text-[14px]">{data?.signature_print_name}</span>
        </Box>
        
      </>
      <Box className="m-h-[200px] pb-1">
                <Box className="">
                <p className="text-[14px] min-w-[100px] font-[400] color_main">
                   Dịch vụ:
                  </p>
                  <span className=" font-[400] text-[13px]">
                    <RichTextEditor
                      header="hide"
                      handleChange={(value: string) => {
                      }}
                      value=   { data?.service_name}
                    />
                  </span>
                </Box>
              </Box>
              <Box className="m-h-[200px] pb-1">
                <Box className="">
                <p className="text-[14px] min-w-[100px] font-[400] color_main">
                  Phương pháp:
                  </p>
                  <span className=" font-[400] text-[13px]">
                    <RichTextEditor
                      header="hide"
                      handleChange={(value: string) => {
                      }}
                      value=   { data?.analytical_method}
                    />
                  </span>
                </Box>
              </Box>
              <div className="t-examination_result_header_diagnose_note" style={{marginTop:"8px"}}>
            <div style={{ display:"flex", gap:8}}>
            <p className="text-[14px] min-w-[100px] font-[400] color_main">
 KẾT QUẢ HPV:

              </p>
            <div> <input
  type="checkbox"
  checked={data?.hpv_result === "POSITIVE"}
  readOnly
  id="readonlyCheckbox"
/>

          <span style={{
            fontWeight: 400,
            color: '#dc3545',
            marginLeft: 4,
          }}
          >
          DƯƠNG TÍNH
                </span></div> 
                   <div><input
  type="checkbox"
  checked={data?.hpv_result !== "POSITIVE"}
  readOnly
  id="readonlyCheckbox"
/>
          <span style={{
            fontWeight: 400,
            color: '#28a745',
            marginLeft: 4,
          }}
          >
          ÂM TÍNH
          </span></div> 
            </div>
             <div style={{ display:"flex", gap:4,flexDirection:"column", marginTop:"8px"}}>
             <p className="text-[14px] min-w-[100px] font-[400] color_main">
KẾT LUẬN:

              </p>
              <div style={{ display:"flex",justifyContent:"space-between",flexDirection:"column",  gap:8}}>
          <div style={{ display:"flex", gap:8, flexDirection:"column"}}>
                  <span>
11 Other HPV High-Rick

              </span>
           <div style={{ display:"flex", gap:8, flexDirection:"row"}}>
           <div> <input
  type="checkbox"
  checked={data?.hpv_11_otherhpv_highrick === "POSITIVE"}
  readOnly
  id="readonlyCheckbox"
/>

          <span style={{
            fontWeight: 400,
            color: '#dc3545',
            marginLeft: 4,
          }}
          >
          DƯƠNG TÍNH
                </span></div> 
                   <div><input
  type="checkbox"
  checked={data?.hpv_11_otherhpv_highrick !== "POSITIVE"}
  readOnly
  id="readonlyCheckbox"
/>
          <span style={{
            fontWeight: 400,
            color: '#28a745',
            marginLeft: 4,
          }}
          >
          ÂM TÍNH
          </span></div> 
           </div>
                </div>
                   <div style={{ display:"flex", gap:8,flexDirection:"column" }}>
                  <span>
Genotype HPV 16

              </span>
              <div style={{ display:"flex", gap:8, flexDirection:"row"}}>
            <div> <input
  type="checkbox"
  checked={data?.hpv_genotype_hpv16 === "POSITIVE"}
  readOnly
  id="readonlyCheckbox"
/>

          <span style={{
            fontWeight: 400,
            color: '#dc3545',
            marginLeft: 4,
          }}
          >
          DƯƠNG TÍNH
                </span></div> 
                   <div><input
  type="checkbox"
  checked={data?.hpv_genotype_hpv16 !== "POSITIVE"}
  readOnly
  id="readonlyCheckbox"
/>
          <span style={{
            fontWeight: 400,
            color: '#28a745',
            marginLeft: 4,
          }}
          >
          ÂM TÍNH
          </span></div> </div>
                </div>
                   <div style={{ display:"flex", gap:8, flexDirection:"column"}}>
                  <span>
Genotype HPV 18/45

              </span>
              <div style={{ display:"flex", gap:8, flexDirection:"row"}}>
            <div> <input
  type="checkbox"
  checked={data?.hpv_genotype_hpv1845 === "POSITIVE"}
  readOnly
  id="readonlyCheckbox"
/>

          <span style={{
            fontWeight: 400,
            color: '#dc3545',
            marginLeft: 4,
          }}
          >
          DƯƠNG TÍNH
                </span></div> 
                   <div><input
  type="checkbox"
  checked={data?.hpv_genotype_hpv1845 !== "POSITIVE"}
  readOnly
  id="readonlyCheckbox"
/>
          <span style={{
            fontWeight: 400,
            color: '#28a745',
            marginLeft: 4,
          }}
          >
          ÂM TÍNH
          </span></div> </div>
            </div>
              </div>
            </div>
               <>
        {
            data?.hpv_file &&<div style={{ display:"flex", justifyContent:"start", alignItems:"end", gap:"10px",flexWrap:"wrap"}}>
              
                 <div style={{ fontSize: "14px", fontWeight: "bold",}}>
        File kết quả:
      </div>
      <div style={{ listStyleType: "none", padding: 0, display:"flex", justifyContent:"start", alignItems:"start",gap:"50px", marginTop:"8px"}}>
      
          <div
          
           style={{ listStyleType: "none", padding: 0, display:"flex", justifyContent:"start", alignItems:"end",}}

          >
            <p style={{ marginRight: "5px", fontSize: "14px", color: "#d32f2f", }}>
              📄
            </p>
            <a
                        href={ data?.hpv_file}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#007bff",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
             File kết quả (gốc)
            </a>
          </div>
       
      </div>
    </div>
        }
        </>
        </div>
              
            </Box>
          );
          case "SLLX":
        return (
          <Box className="t-result_item_pcd">
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Thời gian nhận chỉ định
              </p>
              <span className="text-[14px]">
              {data?.servicepoint_create_date && moment(data?.servicepoint_create_date).format('YYYY/MM/DD HH:mm')}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Thời gian thực hiện:
              </p>
              <span className="text-[14px]">
              {data?.servicepoint_create_date && moment(data?.approved_datetime).format('YYYY/MM/DD HH:mm')}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
                Người thực hiện:
              </p>
              <span className="text-[14px]">
                {data?.signature_print_name}
              </span>
            </Box>
            <Box flex justifyContent="flex-start" flexDirection="column" className="">
              <span className="text-[14px] min-w-[100px] font-[400] color_main">
              Dịch vụ: <span style={{color:"#141415"}}>
                {data?.service_name}
              </span>
              </span>
            
            </Box>
            <div className="t-examination_result_header_diagnose_note" style={{marginTop:"4px"}}>
           
            
           <div style={{ display:"flex", justifyContent:"start", alignItems:"end",flexWrap:"wrap"}}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent:"space-between" }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom:4 }}>
                 <span style={{  marginRight: 4 }}>Vị trí: <strong>{ data?.osteoporosis_site === "LeftFoot" ? "Chân trái" : "Chân phải"}</strong></span>
     </div>
     {/* Cột 1 */} 
     <div style={{display: 'flex', alignItems: 'center', marginBottom: 4 }}>
     
      <span style={{ marginLeft: 4, marginRight: 4 }}>T-Score: <strong>{ data?.osteoporosis_tscore}</strong></span>
     </div>

     {/* Cột 2 */}
     <div style={{display: 'flex', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ marginLeft: 4, marginRight: 4 }}>Z-Score: <strong>{ data?.osteoporosis_zscore}</strong></span>
     </div>

 
             </div>
             
   
   </div>
   <div style={{ marginBottom: 4 }}>
   <span className="text-[14px] min-w-[100px] font-[400] color_main">Ghi chú nội bộ: <span style={{color:"#141415"}}>{ data?.osteoporosis_note}</span></span>
     </div>
             <div style={{ fontSize: "14px", }}>
             <span className="text-[14px] min-w-[100px] font-[400] color_main">  Kết luận: <span style={{color:"#141415"}}> {data?.osteoporosis_conclude}</span> </span>
     </div>
       </div>
       <Box className="mt-2 mb-2">
                {data?.osteoporosis_image
                  ? 
                    <div>
                      <img
                        src={data?.osteoporosis_image}
                        loading="lazy"
                        className="rounded-md"
                      
                      />
                    </div>
                 
                  : null}
              </Box>

          </Box>
        );
        case 'KHAMPK' : 
          return (
            <Box className="t-result_item_pcd">
               <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Ngày khám:
              </p>
              <span className="text-[14px]">
              {data?.in_datetime && moment(data?.in_datetime).format('YYYY/MM/DD HH:mm')}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Nơi khám:
              </p>
              <span className="text-[14px]">
              {data?.doctor_department?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Bác sĩ khám:
              </p>
              <span className="text-[14px]">
              {data?.doctor_employee?.name}
              </span>
            </Box>
            <div className="bg-white rounded-md">
  <div>
    <div className="flex flex-col mb-4 mt-2">
      <p className="text-[16px] font-bold uppercase">Mô tả</p>
      <p className="text-[16px] font-semibold mt-1">I. Tiền sử phụ khoa</p>

      <div className="flex flex-col text-[14px] mt-2">
        <span className="mb-1">Tiền sử bệnh lý phụ khoa: {data?.gynecological_history}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-1 text-[14px]">
        <div className="flex gap-1">
          <span className="block font-medium">Tuổi bắt đầu kinh nguyệt:</span>
          <span className="text-[#000]">{data?.period_inyear || '--'}</span>
        </div>
        <div className="flex gap-1">
          <span className="block font-medium">Tính chất kinh nguyệt:</span>
          <span className="text-[#000]">
            {data?.period_regularity_yes ? 'Đều' : 'Không đều'}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="block font-medium">Chu kỳ kinh:</span>
          <span className="text-[#000]">
            {data?.period_cycledays ? `${data?.period_cycledays} ngày` : '--'}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="block font-medium">Lượng kinh:</span>
          <span className="text-[#000]">
            {data?.period_amountdays ? `${data?.period_amountdays} ngày` : '--'}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="block font-medium">Kinh chót:</span>
          <span className="text-[#000]">
            {data?.period_lastdate ? moment(data?.period_lastdate).format('DD/MM/YYYY HH:mm') : '--'}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="block font-medium">Đau bụng kinh:</span>
          <span className="text-[#000]">
            {data?.period_stomachache_yes ? 'Có' : 'Không'}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="block font-medium">Đã lập gia đình:</span>
          <span className="text-[#000]">
            {data?.married_yes ? 'Có' : 'Chưa'}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="block font-medium">PARA:</span>
          <span className="text-[#000]">{data?.para || '--'}</span>
        </div>
        <div className="flex gap-1">
          <span className="block font-medium">Đã từng mổ sản, phụ khoa:</span>
          <span className="text-[#000]">{data?.surgeries_yes ? 'Có -' : 'Chưa'}</span>
        </div>
        <div className="flex gap-1">
          <span className="block font-medium">Có đang áp dụng BPTT:</span>
          <span className="text-[#000]">{data?.contraception_yes ? 'Có -' : 'Không'}</span>
        </div>
      </div>

      <p className="text-[16px] font-semibold uppercase mt-5">II. Nội dung khám - Kết luận & Đề nghị:</p>
      {data?.examming_content && (
        <div
          className="text-[14px] mt-2"
          dangerouslySetInnerHTML={{ __html: data.examming_content }}
        />
      )}

      <p className="text-[16px] font-bold uppercase mt-2">Kết luận:</p>
      <div className="border rounded-md p-2 bg-gray-50 mt-1 text-[14px]">
        {data?.conclude}
      </div>
    </div>

    <div className="mt-3 text-[14px] mb-2">
      <span className="font-medium mr-1">Đề nghị:</span>
      <span className="text-black">{data?.recommend}</span>
    </div>
  </div>
</div>

            </Box>
          );
          case 'VACCINE' : 
          return (
            <Box className="t-result_item_pcd">
               <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Ngày giờ sàng lọc: 
              </p>
              <span className="text-[14px]">
              {data?.survey_datetime && moment(data?.survey_datetime).format('YYYY/MM/DD HH:mm')}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Nơi sàng lọc: 
              </p>
              <span className="text-[14px]">
              {data?.servicepoint_department?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
            BS sàng lọc: 
              </p>
              <span className="text-[14px]">
              {data?.survey_empoyee?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Ngày giờ tiêm:
              </p>
              <span className="text-[14px]">
              {data?.vaccine_datetime && moment(data?.vaccine_datetime).format('YYYY/MM/DD HH:mm')}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Nơi tiêm: 
              </p>
              <span className="text-[14px]">
              {data?.vaccine_department?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
           Người tiêm: 
              </p>
              <span className="text-[14px]">
              {data?.vaccine_empoyee?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Ngày giờ kiểm tra: 
              </p>
              <span className="text-[14px]">
              {data?.check_expected_datetime && moment(data?.check_expected_datetime).format('YYYY/MM/DD HH:mm')}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Nơi kiểm tra: 
              </p>
              <span className="text-[14px]">
              {data?.check_department?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
           Người kiểm tra: 
              </p>
              <span className="text-[14px]">
              {data?.check_empoyee?.name}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Số lô:
              </p>
              <span className="text-[14px]">
              {data?.lot_serial}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
              Hạn sử dụng:
              </p>
              <span className="text-[14px]">
              {data?.expiry}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <p className="text-[14px] min-w-[100px] font-[400] color_main">
             Đường tiêm:
              </p>
              <span className="text-[14px]">
              {data?.route}
              </span>
            </Box>
            <Box flex justifyContent="space-between" className="">
              <span className="text-[14px] min-w-[100px] font-[400] color_main">
              Tình trạng sau tiêm: <span className="text-[14px] text-black font-medium">
              {data?.check_conclude}
              </span>
              </span>
             
            </Box>
            <div style={{ display:"flex", justifyContent:"start", alignItems:"end",flexWrap:"wrap"}}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent:"space-between" }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom:4 }}>
                 <span style={{  marginRight: 4, fontWeight:600 }}>Mạch: <span style={{fontWeight:500 }}>{ data?.heart_rate} (lần/phút)</span></span>
     </div>
     {/* Cột 1 */} 
     <div style={{display: 'flex', alignItems: 'center', marginBottom: 4 }}>
     
     <span style={{  marginRight: 4, fontWeight:600 }}>Huyết áp: <span style={{fontWeight:500 }}>{ data?.blood_pressure_min}/{data?.blood_pressure_max} (mmHg)</span></span>

     </div>

     {/* Cột 2 */}
     <div style={{display: 'flex', alignItems: 'center', marginBottom: 4 }}>
     <span style={{  marginRight: 4, fontWeight:600 }}>Nhiệt độ: <span style={{fontWeight:500 }}>{data?.temperature} (°C)</span></span>
     </div>
     <div style={{display: 'flex', alignItems: 'center', marginBottom: 4 }}>
     <span style={{  marginRight: 4, fontWeight:600 }}>SpO2: <span style={{fontWeight:500 }}>{data?.spo2} (%)</span></span>
     </div>
 
             </div>
             
   
   </div>

            </Box>
          ); 
        }
  };

  return <Box className="t-result_item relative">
    {handleRender()}
  </Box>;
};

export default ResultCategoriesItem;

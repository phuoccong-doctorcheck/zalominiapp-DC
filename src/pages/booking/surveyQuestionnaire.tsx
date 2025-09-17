import React, { useEffect, useState } from "react";
import { Box, Checkbox, Radio } from "zmp-framework/react";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { mapModifiers } from "../../utils/functions";
import { dataServey } from "../../state";
import { Header, Text, Input, Page, useNavigate, Icon } from "zmp-ui";

interface SymptomsPickerProps {}

const SurveyQuestionnaire: React.FC<SymptomsPickerProps> = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRenderAllowType = (data: any) => {
    switch (data?.type) {
      case "text":
        return (
          <div className={""}>
            <Text className=" text-[#3185ff]">{`${data?.id}. ${data?.question}`}</Text>
            <Input.TextArea id={""} readOnly={false} />
          </div>
        );
      case "radio":
        return (
          <div className={""}>
            <Text className=" text-[#3185ff]">{`${data?.id}. ${data?.question}`}</Text>
            {data?.child.length
              ? data?.child?.map((child: any) => {
                  return child?.child_type === "text" ? (
                    <div
                      className="o-survey_item-radio_child_custom"
                      key={child?.child_id}
                    >
                      <Text content={child?.child_question} />
                      <Input value={child?.child_answer} multiple />
                    </div>
                  ) : (
                    <div className="my-2" key={child?.child_id}>
                      <Text className="font-[400]">
                        {" "}
                        <Icon icon="zi-bullet-solid" />
                        {child?.child_question}
                      </Text>
                      <Box className="grid grid-cols-3 mt-2 ml-8">
                        {child?.child_answer.map((key, index) => (
                          <Box key={index}>
                            <Radio
                              className="flex gap-1"
                              name={child?.child_question}
                              value={key}
                              label={key}
                            />
                          </Box>
                        ))}
                      </Box>
                    </div>
                  );
                })
              : null}
          </div>
        );
      case "group_radio":
        return (
          <div className={mapModifiers("o-survey_item", data?.type)}>
            <Text className=" text-[#3185ff]">{`${data?.id}. ${data?.question}`}</Text>
            <div className={mapModifiers("o-survey_item-group_radio")}>
              {data?.child?.length
                ? data?.child?.map((child: any) => (
                    <div
                      className="o-survey_item-group_radio_child mt-2"
                      key={child?.child_id}
                    >
                      <Text className="font-[400]">
                        <Icon icon="zi-bullet-solid" />
                        {child?.title}
                      </Text>
                      <Box className="grid grid-cols-2 mt-2 ml-8">
                        {child.anwers.map((key, index) => (
                          <Box key={index}>
                            <Radio
                              className="flex gap-1"
                              name={child?.title}
                              value={key}
                              label={key}
                            />
                          </Box>
                        ))}
                      </Box>
                    </div>
                  ))
                : null}
            </div>
          </div>
        );
      case "field":
        return (
          <div className={mapModifiers("o-survey_item", data?.type)}>
            <Text className=" text-[#3185ff]">{`${data?.id}. ${data?.question}`}</Text>
            <div className={mapModifiers("o-survey_item-field_wrap")}>
              {data?.child.length
                ? data?.child.map((item: any) => (
                    <div className="o-survey_item-field_item" key={item?.id}>
                      <Text>{item?.title}</Text>
                      <Input value={item?.anwser} />
                    </div>
                  ))
                : null}
            </div>
          </div>
        );
      case "text_row":
        return (
          <div className={mapModifiers("o-survey_item", data?.type)}>
            <Text className=" text-[#3185ff]">{`${data?.id}. ${data?.question}`}</Text>
            {data?.child.length
              ? data?.child?.map((row: any, idx: any) => (
                  <div
                    className="o-survey_item-text_row_item"
                    key={`${Math.floor(Math.random()) * 1000}-${idx}`}
                  >
                    {row?.child_answer.map((answer: any, index: any) => (
                      <div
                        className="o-survey_item-text_row_item_feild"
                        key={`${Math.floor(Math.random()) * 1000}-${index}`}
                      >
                        <span>{answer?.title}</span>
                        <Input value={answer?.anwers} />
                      </div>
                    ))}
                  </div>
                ))
              : null}
          </div>
        );
      case "radio_custom":
        return (
          <div className={mapModifiers("o-survey_item", data?.type)}>
            <Text className=" text-[#3185ff]">{`${data?.id}. ${data?.question}`}</Text>
            {data?.child?.length
              ? data?.child.map((y: any, idx: any) => (
                  <div className="my-2" key={idx}>
                    <Text>{y?.title}</Text>
                    <div className="grid grid-cols-1 ml-4" key={y?.child_id}>
                      {y?.child_answer?.map((child: any, idx: any) => (
                        <Checkbox
                          label={child?.title}
                          defaultChecked={child?.anwers}
                          key={idx}
                          value={""}
                          className="mt-[2px]"
                        />
                      ))}
                    </div>
                  </div>
                ))
              : null}
          </div>
        );
      case "yes_no":
        return (
          <div className={mapModifiers("o-survey_item", data?.type)}>
            <Text className=" text-[#3185ff]">{`${data?.id}. ${data?.question}`}</Text>
            <Box className="grid grid-cols-2 mt-2 ml-8">
              {data?.anwser.map((key, index) => (
                <Box key={index}>
                  <Radio
                    className="flex gap-1"
                    name={data?.question}
                    value={key}
                    label={key}
                  />
                </Box>
              ))}
            </Box>
          </div>
        );
    }
  };

  return (
    <Page className="overflow-scroll c-symptoms p-2 ">
      <Header
        title="Bộ câu hỏi khảo sát"
        className="p-booking_headers"
        showBackIcon
        backgroundColor="#fff"
      />
      <Box height={44} />
      <Box className="">
        {dataServey.map((survey) => handleRenderAllowType(survey))}
      </Box>
    </Page>
  );
};

SurveyQuestionnaire.defaultProps = {};

export default SurveyQuestionnaire;

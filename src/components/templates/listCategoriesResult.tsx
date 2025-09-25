import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FunctionComponent } from "react";
import { Box } from "zmp-framework/react";

import ResultCategoriesItem from "./resultCategoriesItem";
import { categoriesItem } from "../../utils/models";
import CCollapse from "../atoms/Collapse";
import {
  handleConvertPCD,
  handleConvertXN,
  mapModifiers,
} from "../../utils/functions";
import { useAppSelector } from "../../redux/common/hooks";
import { Spinner } from "zmp-ui";

import imgPCD from "./icons/ic_PCD.svg";
import imgXN from "./icons/ic_XN.svg";
import imgXQ from "./icons/ic_XQ.svg";
import imgDT from "./icons/ic_DT.svg";
import imgNS from "./icons/ic_NS.svg";
import imgTDV from "./icons/ic_TDV.svg";
import imgSA from "./icons/ic_SA.svg";
import imgGPB from "./icons/ic_GPB.svg";
import imgKSL from "./icons/ic_KLS.svg";
import imgVC from "./icons/ic_VC.svg";
import { useParams, useSearchParams } from "react-router-dom";

export type ResultType =
  | "PCD"
  | "XN"
  | "XQ"
  | "DT"
  | "NS"
  | "TDV"
  | "EMR"
  | "SA"
  | "GPB"
  | "XNHT"
  | "XNSHPT"
  | "KHAMPK"
  | "VACCINE"
  | "XNHPV"
  | "XNPAP"
  | "SLLX";

interface RestaurantProps {
  data: categoriesItem;
  pageActive: boolean;
  childActive: string;
  onClickCollapse: (item: any) => void;
  onClickCollapseChild: (id: string, type: string) => void;
}

const ListCategoriesResult: FunctionComponent<RestaurantProps> = ({
  data,
  pageActive,
  onClickCollapse,
  childActive,
  onClickCollapseChild,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy giá trị của các tham số từ URL
  const type = searchParams.get("type");
  const recordActiveRef = useRef<HTMLElement>(null);
  const dataParentResultLoading = useAppSelector(
    (state) => state.detail.resultParentLoading
  );
  const dataChildResultLoading = useAppSelector(
    (state) => state.detail.resultChildLoading
  );
  console.log(data)
  const dataParentResult = useAppSelector((state) => state.detail.resultParent);
  const dataChildResult = useAppSelector((state) => state.detail.resultChild);
  const [typeResult, setTypeResult] = useState<ResultType>(type as ResultType);

  const listIcon = [
    { id: 1, type: "PCD", icon: imgPCD }, //
    { id: 2, type: "XN", icon: imgXN }, //
    { id: 3, type: "CDHA", icon: imgXQ },
    { id: 4, type: "TDCN", icon: imgDT },
    { id: 5, type: "NS", icon: imgNS },
    { id: 6, type: "TDV", icon: imgTDV },
    { id: 7, type: "EMR", icon: "" },
    { id: 8, type: "SA", icon: imgSA },
    { id: 9, type: "GPB", icon: imgGPB },
    { id: 10, type: "TC", icon: imgVC },
    { id: 11, type: "KLS", icon: imgKSL },
  ];
  const listIcon1 = [
    { id: 1, type: "PCD", icon: imgPCD },
    { id: 2, type: "XN", icon: imgXN },
    { id: 3, type: "CDHA", icon: imgXQ },
    { id: 4, type: "TDCN", icon: imgDT },
    { id: 5, type: "NS", icon: imgNS },
    { id: 6, type: "TDV", icon: imgTDV },
    { id: 7, type: "EMR", icon: "" },
    { id: 8, type: "SA", icon: imgSA },
    { id: 9, type: "TC", icon: imgGPB },
    { id: 10, type: "VACCINE", icon: imgXN },
    { id: 11, type: "KLS", icon: imgTDV },
  ];

  const [state, setState] = useState({
    dataParentLoading: dataParentResultLoading,
    dataParent: dataParentResult?.data,
    dataChildLoading: dataChildResultLoading,
    dataChild: dataChildResult?.data,
  });
  console.log("state", state);
  useEffect(() => {
    setState({
      ...state,
      dataParentLoading: dataParentResultLoading,
      dataParent: dataParentResult?.data,
      dataChildLoading: dataChildResultLoading,
      dataChild: dataChildResult?.data,
    });
  }, [
    dataParentResultLoading,
    dataParentResult,
    dataChildResultLoading,
    dataChildResult,
  ]);

  const handleReturnData = (type: string, isChild: boolean) => {
    switch (type) {
      case "PCD":
        return {
          ...(isChild ? state.dataChild : state?.dataParent),
          items: handleConvertPCD(
            isChild ? state?.dataChild?.items : state?.dataParent?.items
          ),
        };
      case "XN":
        return {
          ...(isChild ? state.dataParent : state?.dataParent),
          items: handleConvertXN(
            isChild ? state?.dataChild?.items : state?.dataParent?.items
          ),
        };
      case "SA":
      case "XQ":
      case "NS":
      case "DT":
      case "TDV":
      case "GPB":
      case "XNHT":
      case "XNPAP":
      case "XNHPV":
      case "SLLX":
      case "KHAMPK":
      case "VACCINE":
      case "XNSHPT":
        return isChild ? state.dataChild : state?.dataParent;
    }
  };

  const renderListCategories = useMemo(
    () =>
      data.items !== null && data.items.length > 0 ? (
        <CCollapse
          styleTitle={
            pageActive ? "font-[700] text-[#ff8a00]" : "font-[400] text-[main]"
          }
          open={pageActive}
          headerIcon={pageActive ? "zi-pin-solid" : "zi-pin"}
          headerText={data.group_result_name}
          onClick={() => {
            if (onClickCollapse) onClickCollapse(data?.group_result_id);
            setTypeResult(data.group_result_id as ResultType);
            //console.log("data", data);
          }}
          icons={listIcon.find((i) => i.type === data.group_result_id)?.icon}
          isChild={false}
        >
          {data.items.map((child) => {
            return (
              <div key={child.id} id={childActive ? "record-active" : ""}>
                <CCollapse
                  isChild
                  open={childActive === child.id}
                  headerText={child.name}
                  styleTitle={"text-[12px]"}
                  ref={pageActive ? recordActiveRef : null}
                  headerIcon={
                    childActive === child.id ? "zi-pin-solid" : "zi-pin"
                  }
                  onClick={() => {
                     if(child.status.status === "done" || child.status.status === "new") {
                      console.log(child.status)
                    if (onClickCollapseChild) {
                      onClickCollapseChild(child.id, child.service_group_type);
                    }
                    setTypeResult(child.service_group_type as ResultType);
                   }
                  }}
                  textStatus={child.status}
                >
                  {state.dataChildLoading ? (
                    <Box className="flex justify-center">
                      <Spinner logo={undefined} />
                    </Box>
                  ) : (
                    <ResultCategoriesItem
                      typeRender={typeResult as ResultType}
                      data={handleReturnData(
                        typeResult || data?.service_group_type,
                        true
                      )}
                    />
                  )}
                </CCollapse>
              </div>
            );
          })}
        </CCollapse>
      ) : (
        <div id={pageActive ? "record-active" : ""}>
          <CCollapse
            styleTitle={
              pageActive
                ? "font-[700] text-[#ff8a00]"
                : "font-[400] text-[main]"
            }
            open={pageActive}
            idName={pageActive ? "record-active" : ""}
            ref={pageActive ? recordActiveRef : null}
            headerIcon={pageActive ? "zi-pin-solid" : "zi-pin"}
            headerText={data.group_result_name}
            onClick={() => {
              if (onClickCollapse) onClickCollapse(data?.service_group_type);
              setTypeResult(data.group_result_id as ResultType);
            }}
            isChild={false}
            icons={
              listIcon.find((i) => i.type === data.service_group_type)?.icon
            }
          >
            {state.dataParentLoading ? (
              <Box className="flex justify-center">
                <Spinner logo={undefined} />
              </Box>
            ) : (
              <ResultCategoriesItem
                typeRender={typeResult as ResultType}
                data={handleReturnData(
                  typeResult || data?.service_group_type,
                  false
                )}
              />
            )}
          </CCollapse>
        </div>
      ),
    [
      dataParentResult?.data,
      dataChildResult?.data,
      typeResult,
      handleReturnData,
      childActive,
    ]
  );

  return (
    <div
      className={`${mapModifiers(
        "t-categories_wrapper",
        data.items !== null && "have_child"
      )} transition-all`}
    >
      {renderListCategories}
    </div>
  );
};

export default ListCategoriesResult;

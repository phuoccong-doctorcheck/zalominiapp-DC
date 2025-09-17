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
import { getPrescriptionCustomer, getSurveyByCustomerID } from "../../redux/dashboard";
import NavigationBar from "../../components/organisms/navigation-bar";
import { useMutation } from "react-query";
import { fetchResultSurvey, SaveSurvey } from "../../services/apis/dashboard";

function Category({ setTabActive, tabId, tab }) {
  return (
    <Box className="grid grid-cols-2 p-2 shadow-sm border rounded-full gap-2 ">
      {tab.map((button, index) => (
        <div
          key={index}
          className={`flex justify-center items-center p-1 gap-2 ${
            tabId === button.id ? "result-category_active " : "result-category"
          } `}
          onClick={() => setTabActive(button)}
        >
          <Icon icon={button.icon as any} size={28} />
          <Text>{button.title}</Text>
        </div>
      ))}
    </Box>
  );
}

function ListSurvey() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = window.location;


  const searchParams = new URLSearchParams(location.search);
  const [typeParams, setTypeParams] = useState("");
  const SurveyCustomerLoading = useAppSelector(
    (state) => state.dashboard.loadingSurveyCustomer
  );
  const SurveyCustomer = useAppSelector(
    (state) => state.dashboard.SurveyCustomer
  );


  const [itemActive, setItemActive] = useState(0);
  const [data, setData] =  useState(SurveyCustomer?.data);
  const [dataItem, setSurveyData] = useState(SurveyCustomer?.data?.survey);
  const [state, setState] = useState({
    // loadingHistories: SurveyCustomerLoading,
    // listSurveys: SurveyCustomer?.data.survey,

    customerId: "",
    profileActive: undefined as unknown as Profile,
    accountUserName: "",
  });

  const getData = async () => {
    try {
      const { profileActive, profileIdActive, accountUserName } =
        await getStorage({
          keys: ["profileActive", "profileIdActive", "accountUserName"],
        });
      setState({
        ...state,
       // customerId: "DC22031810290002",
        customerId: profileIdActive,
        profileActive: profileActive,
        accountUserName: accountUserName,
      });
    } catch (error) {
      console.log(error);
    }
  };
 
  const [load, setLoad] = useState(true);
  useEffect(() => {
    handleGetSV()
  }, [state.customerId]);
  const handleGetSV = () => {
    const customer = state.customerId
    getPointsCustomer(customer)
  }
   const { mutate: getPointsCustomer } = useMutation(
      "post-footer-form",
      (body: any) => fetchResultSurvey(body),
      {
        onSuccess: (data: any) => {
         // Ensure loading is stopped
          if (data.status) {
            setSurveyData(data.data.survey)
            setData(data.data)
            setLoad(false);
          }
          else {
            setLoad(false);
            // openSnackbar({
            //   position: "top",
            //   duration: 3000,
            //   icon: true,
            //   text: `Không tìm thấy thông tin khách hàng...!`,
            //   type: "error",
            // });
            // setNotFounnd(true)
           
          }
        },
        onError: (error) => {
          // setAbnormalResultLoading(false); // Ensure loading is stopped
  
        },
      }
    );
  useEffect(() => {
    getData();
  }, []);
  
  // useEffect(() => {
  //   setSurveyData(SurveyCustomer?.data?.survey);
  // }, [SurveyCustomer]);
  // useEffect(() => {
  //   setData(SurveyCustomer?.data);
  // }, [SurveyCustomer]);
  // useLayoutEffect(() => {
  //   setState({
  //     ...state,
  //     loadingHistories: historiesCustomerLoading,
  //     loadingPrescription: prescriptionCustomerLoading,
  //     listHistories: historiesCustomer?.data,
  //     listPrescription: prescriptionCustomer?.data,
  //   });
  // }, [
  //   historiesCustomerLoading,
  //   prescriptionCustomerLoading,
  //   historiesCustomer,
  //   prescriptionCustomer,
  // ]);




  // const onClickChooseButtonType = () => {
  //   navigate(`/abnormal_result?masterId=24060409060011&customerId=DC24060409060007`, {
  //     replace: false,
  //     animate: true,
  //   });
  // };
  const navi = () => {
        navigate(`/done-survey`, {
      replace: false,
      animate: true,
    });
  
 }
  const [dataSurveyText, setDataSurvey] = useState({
    q1_text: dataItem?.survey.card.q1_text,
    q2_text: dataItem?.survey.card.q2_text,
    q3_text: dataItem?.survey.card.q3_text,
    q4_text: dataItem?.survey.card.q4_text,
    q5_text: dataItem?.survey.card.q5_text,
    q6_note_text: dataItem?.survey.card.q6_note_text,

    q7_bc1_text: dataItem?.survey.card.q7_bc1_text,
    q7_bc2_text: dataItem?.survey.card.q7_bc2_text,
    q7_bc3_text: dataItem?.survey.card.q7_bc3_text,
    q7_bl1_text: dataItem?.survey.card.q7_bl1_text,
    q7_bl2_text: dataItem?.survey.card.q7_bl2_text,
    q7_bl3_text: dataItem?.survey.card.q7_bl3_text,
    
    q7_n1_text: dataItem?.survey.card.q7_n1_text,
    q7_n2_text: dataItem?.survey.card.q7_n2_text,
    q7_n3_text: dataItem?.survey.card.q7_n3_text,
    q11_bc1_text: dataItem?.survey.card.q11_bc1_text,
    q11_bc2_text: dataItem?.survey.card.q11_bc2_text,
    q11_bc3_text: dataItem?.survey.card.q11_bc3_text,

    q11_n1_text: dataItem?.survey.card.q11_n1_text,
    q11_n2_text: dataItem?.survey.card.q11_n2_text,
    q11_n3_text: dataItem?.survey.card.q11_n3_text,
    q11_pt1_text: dataItem?.survey.card.q11_pt1_text,
    q11_pt2_text: dataItem?.survey.card.q11_pt2_text,
    q11_pt3_text: dataItem?.survey.card.q11_pt3_text,

    q14_l1_text: dataItem?.survey.card.q14_l1_text,
    q14_l2_text: dataItem?.survey.card.q14_l2_text,
    q14_l3_text: dataItem?.survey.card.q14_l3_text,
    q14_ls1_text: dataItem?.survey.card.q14_ls1_text,
    q14_ls2_text: dataItem?.survey.card.q14_ls2_text,
    q14_ls3_text: dataItem?.survey.card.q14_ls3_text,

    q14_t1_text: dataItem?.survey.card.q14_t1_text,
    q14_t2_text: dataItem?.survey.card.q14_t2_text,
    q14_t3_text: dataItem?.survey.card.q14_t3_text,
    q15_text: dataItem?.survey.card.q15_text,
    q16_aer_text: dataItem?.survey.card.q16_aer_text,
    q16_br_text: dataItem?.survey.card.q16_br_text,

    q16_mr_text: dataItem?.survey.card.q16_mr_text,

    q10_text: dataItem?.survey.card.q10_text,
    q12_htl_hdch_text: dataItem?.survey.card.q12_htl_hdch_text,
    q13_text: dataItem?.survey.card.q13_text,
    q16_cer_text: dataItem?.survey.card.q16_cer_text
  })
  const [dataSurveyCheck, setDataSurveyCheck] = useState({
    q6_bgm_no: dataItem?.survey.card.q6_bgm_no,
  q6_bgm_unknown: dataItem?.survey.card.q6_bgm_unknown,
  q6_bgm_yes: dataItem?.survey.card.q6_bgm_yes,
  q6_blhhk_no: dataItem?.survey.card.q6_blhhk_no,
  q6_blhhk_unknown: dataItem?.survey.card.q6_blhhk_unknown,
  q6_blhhk_yes: dataItem?.survey.card.q6_blhhk_yes,
  q6_bphhs_no: dataItem?.survey.card.q6_bphhs_no,
  q6_bphhs_unknown: dataItem?.survey.card.q6_bphhs_unknown,
  q6_bphhs_yes: dataItem?.survey.card.q6_bphhs_yes,
  q6_btg_no: dataItem?.survey.card.q6_btg_no,
  q6_btg_unknown: dataItem?.survey.card.q6_btg_unknown,
  q6_btg_yes: dataItem?.survey.card.q6_btg_yes,
  q6_btm_no: dataItem?.survey.card.q6_btm_no,
  q6_btm_unknown: dataItem?.survey.card.q6_btm_unknown,
  q6_btm_yes: dataItem?.survey.card.q6_btm_yes,
  q6_dkhdq_no: dataItem?.survey.card.q6_dkhdq_no,
  q6_dkhdq_unknown: dataItem?.survey.card.q6_dkhdq_unknown,
  q6_dkhdq_yes: dataItem?.survey.card.q6_dkhdq_yes,
  q6_dtd_no: dataItem?.survey.card.q6_dtd_no,
  q6_dtd_unknown: dataItem?.survey.card.q6_dtd_unknown,
  q6_dtd_yes: dataItem?.survey.card.q6_dtd_yes,
  q6_hiv_no: dataItem?.survey.card.q6_hiv_no,
  q6_hiv_unknown: dataItem?.survey.card.q6_hiv_unknown,
  q6_hiv_yes: dataItem?.survey.card.q6_hiv_yes,
  q6_lp_no: dataItem?.survey.card.q6_lp_no,
  q6_lp_unknown: dataItem?.survey.card.q6_lp_unknown,
  q6_lp_yes: dataItem?.survey.card.q6_lp_yes,
  q6_nhp_no: dataItem?.survey.card.q6_nhp_no,
  q6_nhp_unknown: dataItem?.survey.card.q6_nhp_unknown,
    q6_nhp_yes: dataItem?.survey.card.q6_nhp_yes,
    q6_pldtt_no: dataItem?.survey.card.q6_pldtt_no,
  q6_pldtt_unknown: dataItem?.survey.card.q6_pldtt_unknown,
  q6_pldtt_yes: dataItem?.survey.card.q6_pldtt_yes,
  q6_rldcm_no: dataItem?.survey.card.q6_rldcm_no,
  q6_rldcm_unknown: dataItem?.survey.card.q6_rldcm_unknown,
  q6_rldcm_yes: dataItem?.survey.card.q6_rldcm_yes,
  q6_rlttk_no: dataItem?.survey.card.q6_rlttk_no,
  q6_rlttk_unknown: dataItem?.survey.card.q6_rlttk_unknown,
  q6_rlttk_yes: dataItem?.survey.card.q6_rlttk_yes,
  q6_tha_no: dataItem?.survey.card.q6_tha_no,
  q6_tha_unknown: dataItem?.survey.card.q6_tha_unknown,
  q6_tha_yes: dataItem?.survey.card.q6_tha_yes,
  q6_tk_no: dataItem?.survey.card.q6_tk_no,
  q6_tk_unknown: dataItem?.survey.card.q6_tk_unknown,
  q6_tk_yes: dataItem?.survey.card.q6_tk_yes,
  q6_tm_no: dataItem?.survey.card.q6_tm_no,
  q6_tm_unknown: dataItem?.survey.card.q6_tm_unknown,
  q6_tm_yes: dataItem?.survey.card.q6_tm_yes,
  q6_tmg_no: dataItem?.survey.card.q6_tmg_no,
  q6_tmg_unknown: dataItem?.survey.card.q6_tmg_unknown,
  q6_tmg_yes: dataItem?.survey.card.q6_tmg_yes,
  q6_tri_no: dataItem?.survey.card.q6_tri_no,
  q6_tri_unknown: dataItem?.survey.card.q6_tri_unknown,
  q6_tri_yes: dataItem?.survey.card.q6_tri_yes,
  q6_ut_no: dataItem?.survey.card.q6_ut_no,
  q6_ut_unknown: dataItem?.survey.card.q6_ut_unknown,
  q6_ut_yes: dataItem?.survey.card.q6_ut_yes,
  q6_vg_no: dataItem?.survey.card.q6_vg_no,
  q6_vg_unknown: dataItem?.survey.card.q6_vg_unknown,
  q6_vg_yes: dataItem?.survey.card.q6_vg_yes,
  q6_vlddtt_no: dataItem?.survey.card.q6_vlddtt_no,
  q6_vlddtt_unknown: dataItem?.survey.card.q6_vlddtt_unknown,
  q6_vlddtt_yes: dataItem?.survey.card.q6_vlddtt_yes,
  q6_vldt_no: dataItem?.survey.card.q6_vldt_no,
  q6_vldt_unknown: dataItem?.survey.card.q6_vldt_unknown,
    q6_vldt_yes: dataItem?.survey.card.q6_vldt_yes,
    q8_no: dataItem?.survey.card.q8_no,
    q8_yes: dataItem?.survey.card.q8_yes,
    q9_no: dataItem?.survey.card.q9_no,
    q9_yes: dataItem?.survey.card.q9_yes,
    q12_htl_cth: dataItem?.survey.card.q12_htl_cth,
    q12_htl_hdch: dataItem?.survey.card.q12_htl_hdch,
    q12_htl_thvdb: dataItem?.survey.card.q12_htl_thvdb,
    q12_sdtgd_no: dataItem?.survey.card.q12_sdtgd_no,
    q12_sdtgd_yes: dataItem?.survey.card.q12_sdtgd_yes,
     q12_urb_no: dataItem?.survey.card.q12_urb_no,
    q12_urb_yes: dataItem?.survey.card.q12_urb_yes,
    q17_bt_no: dataItem?.survey.card.q17_bt_no,
  q17_bt_unknown: dataItem?.survey.card.q17_bt_unknown,
  q17_bt_yes: dataItem?.survey.card.q17_bt_yes,
  q17_btim_no: dataItem?.survey.card.q17_btim_no,
  q17_btim_unknown: dataItem?.survey.card.q17_btim_unknown,
  q17_btim_yes: dataItem?.survey.card.q17_btim_yes,
  q17_btm_no: dataItem?.survey.card.q17_btm_no,
  q17_btm_unknown: dataItem?.survey.card.q17_btm_unknown,
  q17_btm_yes: dataItem?.survey.card.q17_btm_yes,
  q17_dq_no: dataItem?.survey.card.q17_dq_no,
  q17_dq_unknown: dataItem?.survey.card.q17_dq_unknown,
  q17_dq_yes: dataItem?.survey.card.q17_dq_yes,
  q17_dtd_no: dataItem?.survey.card.q17_dtd_no,
  q17_dtd_unknown: dataItem?.survey.card.q17_dtd_unknown,
  q17_dtd_yes: dataItem?.survey.card.q17_dtd_yes,
  q17_lddtt_no: dataItem?.survey.card.q17_lddtt_no,
  q17_lddtt_unknown: dataItem?.survey.card.q17_lddtt_unknown,
  q17_lddtt_yes: dataItem?.survey.card.q17_lddtt_yes,
  q17_onmt_no: dataItem?.survey.card.q17_onmt_no,
  q17_onmt_unknown: dataItem?.survey.card.q17_onmt_unknown,
  q17_onmt_yes: dataItem?.survey.card.q17_onmt_yes,
  q17_pldd_no: dataItem?.survey.card.q17_pldd_no,
  q17_pldd_unknown: dataItem?.survey.card.q17_pldd_unknown,
  q17_pldd_yes: dataItem?.survey.card.q17_pldd_yes,
  q17_pldt_no: dataItem?.survey.card.q17_pldt_no,
  q17_pldt_unknown: dataItem?.survey.card.q17_pldt_unknown,
  q17_pldt_yes: dataItem?.survey.card.q17_pldt_yes,
  q17_rltt_no: dataItem?.survey.card.q17_rltt_no,
  q17_rltt_unknown: dataItem?.survey.card.q17_rltt_unknown,
  q17_rltt_yes: dataItem?.survey.card.q17_rltt_yes,
  q17_tha_no: dataItem?.survey.card.q17_tha_no,
  q17_tha_unknown: dataItem?.survey.card.q17_tha_unknown,
  q17_tha_yes: dataItem?.survey.card.q17_tha_yes,
  q17_utbt_no: dataItem?.survey.card.q17_utbt_no,
  q17_utbt_unknown: dataItem?.survey.card.q17_utbt_unknown,
  q17_utbt_yes: dataItem?.survey.card.q17_utbt_yes,
  q17_utdt_no: dataItem?.survey.card.q17_utdt_no,
  q17_utdt_unknown: dataItem?.survey.card.q17_utdt_unknown,
  q17_utdt_yes: dataItem?.survey.card.q17_utdt_yes,
  q17_utk_no: dataItem?.survey.card.q17_utk_no,
  q17_utk_unknown: dataItem?.survey.card.q17_utk_unknown,
  q17_utk_yes: dataItem?.survey.card.q17_utk_yes,
  q17_utt_no: dataItem?.survey.card.q17_utt_no,
  q17_utt_unknown: dataItem?.survey.card.q17_utt_unknown,
  q17_utt_yes: dataItem?.survey.card.q17_utt_yes,
  q17_uttq_no: dataItem?.survey.card.q17_uttq_no,
  q17_uttq_unknown: dataItem?.survey.card.q17_uttq_unknown,
  q17_uttq_yes: dataItem?.survey.card.q17_uttq_yes,
  q17_utv_no: dataItem?.survey.card.q17_utv_no,
  q17_utv_unknown: dataItem?.survey.card.q17_utv_unknown,
  q17_utv_yes: dataItem?.survey.card.q17_utv_yes,
  q17_vldt_no: dataItem?.survey.card.q17_vldt_no,
  q17_vldt_unknown: dataItem?.survey.card.q17_vldt_unknown,
    q17_vldt_yes: dataItem?.survey.card.q17_vldt_yes,
   q18_bingat_no: dataItem?.survey.card.q18_bingat_no,
  q18_bingat_yes: dataItem?.survey.card.q18_bingat_yes,
  q18_bn_no: dataItem?.survey.card.q18_bn_no,
  q18_bn_yes: dataItem?.survey.card.q18_bn_yes,
  q18_ca_no: dataItem?.survey.card.q18_ca_no,
  q18_ca_yes: dataItem?.survey.card.q18_ca_yes,
  q18_cb_no: dataItem?.survey.card.q18_cb_no,
  q18_cb_yes: dataItem?.survey.card.q18_cb_yes,
  q18_cm_no: dataItem?.survey.card.q18_cm_no,
  q18_cm_yes: dataItem?.survey.card.q18_cm_yes,
  q18_cmm_no: dataItem?.survey.card.q18_cmm_no,
  q18_cmm_yes: dataItem?.survey.card.q18_cmm_yes,
  q18_cvdvmmth_no: dataItem?.survey.card.q18_cvdvmmth_no,
  q18_cvdvmmth_yes: dataItem?.survey.card.q18_cvdvmmth_yes,
  q18_db_no: dataItem?.survey.card.q18_db_no,
  q18_db_yes: dataItem?.survey.card.q18_db_yes,
  q18_dck_no: dataItem?.survey.card.q18_dck_no,
  q18_dck_yes: dataItem?.survey.card.q18_dck_yes,
  q18_dcrm_no: dataItem?.survey.card.q18_dcrm_no,
  q18_dcrm_yes: dataItem?.survey.card.q18_dcrm_yes,
  q18_dk_no: dataItem?.survey.card.q18_dk_no,
  q18_dk_yes: dataItem?.survey.card.q18_dk_yes,
  q18_dl_no: dataItem?.survey.card.q18_dl_no,
  q18_dl_yes: dataItem?.survey.card.q18_dl_yes,
  q18_dm_no: dataItem?.survey.card.q18_dm_no,
    q18_dm_yes: dataItem?.survey.card.q18_dm_yes,
  q18_dmhtvd_no: dataItem?.survey.card.q18_dmhtvd_no,
  q18_dmhtvd_yes: dataItem?.survey.card.q18_dmhtvd_yes,
  q18_dn_no: dataItem?.survey.card.q18_dn_no,
  q18_dn_yes: dataItem?.survey.card.q18_dn_yes,
  q18_dnc_no: dataItem?.survey.card.q18_dnc_no,
  q18_dnc_yes: dataItem?.survey.card.q18_dnc_yes,
  q18_dnccknn_no: dataItem?.survey.card.q18_dnccknn_no,
  q18_dnccknn_yes: dataItem?.survey.card.q18_dnccknn_yes,
  q18_dtb_no: dataItem?.survey.card.q18_dtb_no,
  q18_dtb_yes: dataItem?.survey.card.q18_dtb_yes,
  q18_dtn_no: dataItem?.survey.card.q18_dtn_no,
  q18_dtn_yes: dataItem?.survey.card.q18_dtn_yes,
  q18_hd_no: dataItem?.survey.card.q18_hd_no,
  q18_hd_yes: dataItem?.survey.card.q18_hd_yes,
  q18_hk_no: dataItem?.survey.card.q18_hk_no,
  q18_hk_yes: dataItem?.survey.card.q18_hk_yes,
  q18_kk_no: dataItem?.survey.card.q18_kk_no,
  q18_kk_yes: dataItem?.survey.card.q18_kk_yes,
  q18_knn_no: dataItem?.survey.card.q18_knn_no,
  q18_knn_yes: dataItem?.survey.card.q18_knn_yes,
  q18_ktcdnhl_no: dataItem?.survey.card.q18_ktcdnhl_no,
  q18_ktcdnhl_yes: dataItem?.survey.card.q18_ktcdnhl_yes,
  q18_ktckn_no: dataItem?.survey.card.q18_ktckn_no,
  q18_ktckn_yes: dataItem?.survey.card.q18_ktckn_yes,
  q18_ktcknn_no: dataItem?.survey.card.q18_ktcknn_no,
  q18_ktcknn_yes: dataItem?.survey.card.q18_ktcknn_yes,
  q18_ktkgs_no: dataItem?.survey.card.q18_ktkgs_no,
  q18_ktkgs_yes: dataItem?.survey.card.q18_ktkgs_yes,
  q18_la_no: dataItem?.survey.card.q18_la_no,
  q18_la_yes: dataItem?.survey.card.q18_la_yes,
  q18_lm_no: dataItem?.survey.card.q18_lm_no,
    q18_lm_yes: dataItem?.survey.card.q18_lm_yes,
   q18_lr_no: dataItem?.survey.card.q18_lr_no,
  q18_lr_yes: dataItem?.survey.card.q18_lr_yes,
  q18_ltt_no: dataItem?.survey.card.q18_ltt_no,
  q18_ltt_yes: dataItem?.survey.card.q18_ltt_yes,
  q18_mm_no: dataItem?.survey.card.q18_mm_no,
  q18_mm_yes: dataItem?.survey.card.q18_mm_yes,
  q18_mtb_no: dataItem?.survey.card.q18_mtb_no,
  q18_mtb_yes: dataItem?.survey.card.q18_mtb_yes,
  q18_n_no: dataItem?.survey.card.q18_n_no,
  q18_n_yes: dataItem?.survey.card.q18_n_yes,
  q18_nd_no: dataItem?.survey.card.q18_nd_no,
  q18_nd_yes: dataItem?.survey.card.q18_nd_yes,
  q18_ndmdn_no: dataItem?.survey.card.q18_ndmdn_no,
  q18_ndmdn_yes: dataItem?.survey.card.q18_ndmdn_yes,
  q18_ndsn_no: dataItem?.survey.card.q18_ndsn_no,
  q18_ndsn_yes: dataItem?.survey.card.q18_ndsn_yes,
  q18_nkn_no: dataItem?.survey.card.q18_nkn_no,
  q18_nkn_yes: dataItem?.survey.card.q18_nkn_yes,
  q18_octa_no: dataItem?.survey.card.q18_octa_no,
  q18_octa_yes: dataItem?.survey.card.q18_octa_yes,
  q18_onoc_no: dataItem?.survey.card.q18_onoc_no,
  q18_onoc_yes: dataItem?.survey.card.q18_onoc_yes,
  q18_pc_no: dataItem?.survey.card.q18_pc_no,
  q18_pc_yes: dataItem?.survey.card.q18_pc_yes,
  q18_rlnn_no: dataItem?.survey.card.q18_rlnn_no,
  q18_rlnn_yes: dataItem?.survey.card.q18_rlnn_yes,
  q18_rlt_no: dataItem?.survey.card.q18_rlt_no,
  q18_rlt_yes: dataItem?.survey.card.q18_rlt_yes,
  q18_rt_no: dataItem?.survey.card.q18_rt_no,
  q18_rt_yes: dataItem?.survey.card.q18_rt_yes,
  q18_s_no: dataItem?.survey.card.q18_s_no,
  q18_s_yes: dataItem?.survey.card.q18_s_yes,
  q18_sc_no: dataItem?.survey.card.q18_sc_no,
  q18_sc_yes: dataItem?.survey.card.q18_sc_yes,
  q18_tb_no: dataItem?.survey.card.q18_tb_no,
  q18_tb_yes: dataItem?.survey.card.q18_tb_yes,
  q18_tc_no: dataItem?.survey.card.q18_tc_no,
  q18_tc_yes: dataItem?.survey.card.q18_tc_yes,
  q18_tdkd_no: dataItem?.survey.card.q18_tdkd_no,
  q18_tdkd_yes: dataItem?.survey.card.q18_tdkd_yes,
  q18_trc_no: dataItem?.survey.card.q18_trc_no,
  q18_trc_yes: dataItem?.survey.card.q18_trc_yes,
  q18_tth_no: dataItem?.survey.card.q18_tth_no,
  q18_tth_yes: dataItem?.survey.card.q18_tth_yes,
  q18_vd_no: dataItem?.survey.card.q18_vd_no,
    q18_vd_yes: dataItem?.survey.card.q18_vd_yes,
    q18_rlkn_yes: dataItem?.survey.card.q18_rlkn_yes,
   q18_rlkn_no: dataItem?.survey.card.q18_rlkn_no,
    q18_bcdmt_yes: dataItem?.survey.card.q18_bcdmt_yes,
  q18_bcdmt_no: dataItem?.survey.card.q18_bcdmt_no,
  })
  useEffect(() => {
    setDataSurvey(
      {
         q1_text: dataItem?.survey.card.q1_text,
    q2_text: dataItem?.survey.card.q2_text,
    q3_text: dataItem?.survey.card.q3_text,
    q4_text: dataItem?.survey.card.q4_text,
    q5_text: dataItem?.survey.card.q5_text,
    q6_note_text: dataItem?.survey.card.q6_note_text,

    q7_bc1_text: dataItem?.survey.card.q7_bc1_text,
    q7_bc2_text: dataItem?.survey.card.q7_bc2_text,
    q7_bc3_text: dataItem?.survey.card.q7_bc3_text,
    q7_bl1_text: dataItem?.survey.card.q7_bl1_text,
    q7_bl2_text: dataItem?.survey.card.q7_bl2_text,
    q7_bl3_text: dataItem?.survey.card.q7_bl3_text,
    
    q7_n1_text: dataItem?.survey.card.q7_n1_text,
    q7_n2_text: dataItem?.survey.card.q7_n2_text,
    q7_n3_text: dataItem?.survey.card.q7_n3_text,
    q11_bc1_text: dataItem?.survey.card.q11_bc1_text,
    q11_bc2_text: dataItem?.survey.card.q11_bc2_text,
    q11_bc3_text: dataItem?.survey.card.q11_bc3_text,

    q11_n1_text: dataItem?.survey.card.q11_n1_text,
    q11_n2_text: dataItem?.survey.card.q11_n2_text,
    q11_n3_text: dataItem?.survey.card.q11_n3_text,
    q11_pt1_text: dataItem?.survey.card.q11_pt1_text,
    q11_pt2_text: dataItem?.survey.card.q11_pt2_text,
    q11_pt3_text: dataItem?.survey.card.q11_pt3_text,

    q14_l1_text: dataItem?.survey.card.q14_l1_text,
    q14_l2_text: dataItem?.survey.card.q14_l2_text,
    q14_l3_text: dataItem?.survey.card.q14_l3_text,
    q14_ls1_text: dataItem?.survey.card.q14_ls1_text,
    q14_ls2_text: dataItem?.survey.card.q14_ls2_text,
    q14_ls3_text: dataItem?.survey.card.q14_ls3_text,

    q14_t1_text: dataItem?.survey.card.q14_t1_text,
    q14_t2_text: dataItem?.survey.card.q14_t2_text,
    q14_t3_text: dataItem?.survey.card.q14_t3_text,
    q15_text: dataItem?.survey.card.q15_text,
    q16_aer_text: dataItem?.survey.card.q16_aer_text,
    q16_br_text: dataItem?.survey.card.q16_br_text,

        q16_mr_text: dataItem?.survey.card.q16_mr_text,
        q10_text: dataItem?.survey.card.q10_text,
     q12_htl_hdch_text: dataItem?.survey.card.q12_htl_hdch_text,
        q13_text: dataItem?.survey.card.q13_text,
        q16_cer_text: dataItem?.survey.card.q16_cer_text,
     
      }
    )
  }, [dataItem?.survey])
    useEffect(() => {
    setDataSurveyCheck(
     {
    q6_bgm_no: dataItem?.survey.card.q6_bgm_no,
  q6_bgm_unknown: dataItem?.survey.card.q6_bgm_unknown,
  q6_bgm_yes: dataItem?.survey.card.q6_bgm_yes,
  q6_blhhk_no: dataItem?.survey.card.q6_blhhk_no,
  q6_blhhk_unknown: dataItem?.survey.card.q6_blhhk_unknown,
  q6_blhhk_yes: dataItem?.survey.card.q6_blhhk_yes,
  q6_bphhs_no: dataItem?.survey.card.q6_bphhs_no,
  q6_bphhs_unknown: dataItem?.survey.card.q6_bphhs_unknown,
  q6_bphhs_yes: dataItem?.survey.card.q6_bphhs_yes,
  q6_btg_no: dataItem?.survey.card.q6_btg_no,
  q6_btg_unknown: dataItem?.survey.card.q6_btg_unknown,
  q6_btg_yes: dataItem?.survey.card.q6_btg_yes,
  q6_btm_no: dataItem?.survey.card.q6_btm_no,
  q6_btm_unknown: dataItem?.survey.card.q6_btm_unknown,
  q6_btm_yes: dataItem?.survey.card.q6_btm_yes,
  q6_dkhdq_no: dataItem?.survey.card.q6_dkhdq_no,
  q6_dkhdq_unknown: dataItem?.survey.card.q6_dkhdq_unknown,
  q6_dkhdq_yes: dataItem?.survey.card.q6_dkhdq_yes,
  q6_dtd_no: dataItem?.survey.card.q6_dtd_no,
  q6_dtd_unknown: dataItem?.survey.card.q6_dtd_unknown,
  q6_dtd_yes: dataItem?.survey.card.q6_dtd_yes,
  q6_hiv_no: dataItem?.survey.card.q6_hiv_no,
  q6_hiv_unknown: dataItem?.survey.card.q6_hiv_unknown,
  q6_hiv_yes: dataItem?.survey.card.q6_hiv_yes,
  q6_lp_no: dataItem?.survey.card.q6_lp_no,
  q6_lp_unknown: dataItem?.survey.card.q6_lp_unknown,
  q6_lp_yes: dataItem?.survey.card.q6_lp_yes,
  q6_nhp_no: dataItem?.survey.card.q6_nhp_no,
  q6_nhp_unknown: dataItem?.survey.card.q6_nhp_unknown,
    q6_nhp_yes: dataItem?.survey.card.q6_nhp_yes,
    q6_pldtt_no: dataItem?.survey.card.q6_pldtt_no,
  q6_pldtt_unknown: dataItem?.survey.card.q6_pldtt_unknown,
  q6_pldtt_yes: dataItem?.survey.card.q6_pldtt_yes,
  q6_rldcm_no: dataItem?.survey.card.q6_rldcm_no,
  q6_rldcm_unknown: dataItem?.survey.card.q6_rldcm_unknown,
  q6_rldcm_yes: dataItem?.survey.card.q6_rldcm_yes,
  q6_rlttk_no: dataItem?.survey.card.q6_rlttk_no,
  q6_rlttk_unknown: dataItem?.survey.card.q6_rlttk_unknown,
  q6_rlttk_yes: dataItem?.survey.card.q6_rlttk_yes,
  q6_tha_no: dataItem?.survey.card.q6_tha_no,
  q6_tha_unknown: dataItem?.survey.card.q6_tha_unknown,
  q6_tha_yes: dataItem?.survey.card.q6_tha_yes,
  q6_tk_no: dataItem?.survey.card.q6_tk_no,
  q6_tk_unknown: dataItem?.survey.card.q6_tk_unknown,
  q6_tk_yes: dataItem?.survey.card.q6_tk_yes,
  q6_tm_no: dataItem?.survey.card.q6_tm_no,
  q6_tm_unknown: dataItem?.survey.card.q6_tm_unknown,
  q6_tm_yes: dataItem?.survey.card.q6_tm_yes,
  q6_tmg_no: dataItem?.survey.card.q6_tmg_no,
        q6_tmg_unknown: dataItem?.survey.card.q6_tmg_unknown,
  
  q6_tmg_yes: dataItem?.survey.card.q6_tmg_yes,
  q6_tri_no: dataItem?.survey.card.q6_tri_no,
  q6_tri_unknown: dataItem?.survey.card.q6_tri_unknown,
  q6_tri_yes: dataItem?.survey.card.q6_tri_yes,
  q6_ut_no: dataItem?.survey.card.q6_ut_no,
  q6_ut_unknown: dataItem?.survey.card.q6_ut_unknown,
  q6_ut_yes: dataItem?.survey.card.q6_ut_yes,
  q6_vg_no: dataItem?.survey.card.q6_vg_no,
  q6_vg_unknown: dataItem?.survey.card.q6_vg_unknown,
  q6_vg_yes: dataItem?.survey.card.q6_vg_yes,
  q6_vlddtt_no: dataItem?.survey.card.q6_vlddtt_no,
  q6_vlddtt_unknown: dataItem?.survey.card.q6_vlddtt_unknown,
  q6_vlddtt_yes: dataItem?.survey.card.q6_vlddtt_yes,
  q6_vldt_no: dataItem?.survey.card.q6_vldt_no,
  q6_vldt_unknown: dataItem?.survey.card.q6_vldt_unknown,
    q6_vldt_yes: dataItem?.survey.card.q6_vldt_yes,
    q8_no: dataItem?.survey.card.q8_no,
    q8_yes: dataItem?.survey.card.q8_yes,
    q9_no: dataItem?.survey.card.q9_no,
    q9_yes: dataItem?.survey.card.q9_yes,
    q12_htl_cth: dataItem?.survey.card.q12_htl_cth,
    q12_htl_hdch: dataItem?.survey.card.q12_htl_hdch,
    q12_htl_thvdb: dataItem?.survey.card.q12_htl_thvdb,
    q12_sdtgd_no: dataItem?.survey.card.q12_sdtgd_no,
    q12_sdtgd_yes: dataItem?.survey.card.q12_sdtgd_yes,
     q12_urb_no: dataItem?.survey.card.q12_urb_no,
    q12_urb_yes: dataItem?.survey.card.q12_urb_yes,
    q17_bt_no: dataItem?.survey.card.q17_bt_no,
  q17_bt_unknown: dataItem?.survey.card.q17_bt_unknown,
  q17_bt_yes: dataItem?.survey.card.q17_bt_yes,
  q17_btim_no: dataItem?.survey.card.q17_btim_no,
  q17_btim_unknown: dataItem?.survey.card.q17_btim_unknown,
  q17_btim_yes: dataItem?.survey.card.q17_btim_yes,
  q17_btm_no: dataItem?.survey.card.q17_btm_no,
  q17_btm_unknown: dataItem?.survey.card.q17_btm_unknown,
  q17_btm_yes: dataItem?.survey.card.q17_btm_yes,
  q17_dq_no: dataItem?.survey.card.q17_dq_no,
  q17_dq_unknown: dataItem?.survey.card.q17_dq_unknown,
  q17_dq_yes: dataItem?.survey.card.q17_dq_yes,
  q17_dtd_no: dataItem?.survey.card.q17_dtd_no,
  q17_dtd_unknown: dataItem?.survey.card.q17_dtd_unknown,
  q17_dtd_yes: dataItem?.survey.card.q17_dtd_yes,
  q17_lddtt_no: dataItem?.survey.card.q17_lddtt_no,
  q17_lddtt_unknown: dataItem?.survey.card.q17_lddtt_unknown,
  q17_lddtt_yes: dataItem?.survey.card.q17_lddtt_yes,
  q17_onmt_no: dataItem?.survey.card.q17_onmt_no,
  q17_onmt_unknown: dataItem?.survey.card.q17_onmt_unknown,
  q17_onmt_yes: dataItem?.survey.card.q17_onmt_yes,
  q17_pldd_no: dataItem?.survey.card.q17_pldd_no,
  q17_pldd_unknown: dataItem?.survey.card.q17_pldd_unknown,
  q17_pldd_yes: dataItem?.survey.card.q17_pldd_yes,
  q17_pldt_no: dataItem?.survey.card.q17_pldt_no,
  q17_pldt_unknown: dataItem?.survey.card.q17_pldt_unknown,
  q17_pldt_yes: dataItem?.survey.card.q17_pldt_yes,
  q17_rltt_no: dataItem?.survey.card.q17_rltt_no,
  q17_rltt_unknown: dataItem?.survey.card.q17_rltt_unknown,
  q17_rltt_yes: dataItem?.survey.card.q17_rltt_yes,
  q17_tha_no: dataItem?.survey.card.q17_tha_no,
  q17_tha_unknown: dataItem?.survey.card.q17_tha_unknown,
  q17_tha_yes: dataItem?.survey.card.q17_tha_yes,
  q17_utbt_no: dataItem?.survey.card.q17_utbt_no,
  q17_utbt_unknown: dataItem?.survey.card.q17_utbt_unknown,
  q17_utbt_yes: dataItem?.survey.card.q17_utbt_yes,
  q17_utdt_no: dataItem?.survey.card.q17_utdt_no,
  q17_utdt_unknown: dataItem?.survey.card.q17_utdt_unknown,
  q17_utdt_yes: dataItem?.survey.card.q17_utdt_yes,
  q17_utk_no: dataItem?.survey.card.q17_utk_no,
  q17_utk_unknown: dataItem?.survey.card.q17_utk_unknown,
  q17_utk_yes: dataItem?.survey.card.q17_utk_yes,
  q17_utt_no: dataItem?.survey.card.q17_utt_no,
  q17_utt_unknown: dataItem?.survey.card.q17_utt_unknown,
  q17_utt_yes: dataItem?.survey.card.q17_utt_yes,
  q17_uttq_no: dataItem?.survey.card.q17_uttq_no,
  q17_uttq_unknown: dataItem?.survey.card.q17_uttq_unknown,
  q17_uttq_yes: dataItem?.survey.card.q17_uttq_yes,
  q17_utv_no: dataItem?.survey.card.q17_utv_no,
  q17_utv_unknown: dataItem?.survey.card.q17_utv_unknown,
  q17_utv_yes: dataItem?.survey.card.q17_utv_yes,
  q17_vldt_no: dataItem?.survey.card.q17_vldt_no,
  q17_vldt_unknown: dataItem?.survey.card.q17_vldt_unknown,
    q17_vldt_yes: dataItem?.survey.card.q17_vldt_yes,
   q18_bingat_no: dataItem?.survey.card.q18_bingat_no,
  q18_bingat_yes: dataItem?.survey.card.q18_bingat_yes,
  q18_bn_no: dataItem?.survey.card.q18_bn_no,
  q18_bn_yes: dataItem?.survey.card.q18_bn_yes,
  q18_ca_no: dataItem?.survey.card.q18_ca_no,
  q18_ca_yes: dataItem?.survey.card.q18_ca_yes,
  q18_cb_no: dataItem?.survey.card.q18_cb_no,
  q18_cb_yes: dataItem?.survey.card.q18_cb_yes,
  q18_cm_no: dataItem?.survey.card.q18_cm_no,
  q18_cm_yes: dataItem?.survey.card.q18_cm_yes,
  q18_cmm_no: dataItem?.survey.card.q18_cmm_no,
  q18_cmm_yes: dataItem?.survey.card.q18_cmm_yes,
        q18_cvdvmmth_no: dataItem?.survey.card.q18_cvdvmmth_no,
  

  q18_cvdvmmth_yes: dataItem?.survey.card.q18_cvdvmmth_yes,
  q18_db_no: dataItem?.survey.card.q18_db_no,
  q18_db_yes: dataItem?.survey.card.q18_db_yes,
  q18_dck_no: dataItem?.survey.card.q18_dck_no,
  q18_dck_yes: dataItem?.survey.card.q18_dck_yes,
  q18_dcrm_no: dataItem?.survey.card.q18_dcrm_no,
  q18_dcrm_yes: dataItem?.survey.card.q18_dcrm_yes,
  q18_dk_no: dataItem?.survey.card.q18_dk_no,
  q18_dk_yes: dataItem?.survey.card.q18_dk_yes,
  q18_dl_no: dataItem?.survey.card.q18_dl_no,
  q18_dl_yes: dataItem?.survey.card.q18_dl_yes,
  q18_dm_no: dataItem?.survey.card.q18_dm_no,
    q18_dm_yes: dataItem?.survey.card.q18_dm_yes,
  q18_dmhtvd_no: dataItem?.survey.card.q18_dmhtvd_no,
  q18_dmhtvd_yes: dataItem?.survey.card.q18_dmhtvd_yes,
  q18_dn_no: dataItem?.survey.card.q18_dn_no,
  q18_dn_yes: dataItem?.survey.card.q18_dn_yes,
  q18_dnc_no: dataItem?.survey.card.q18_dnc_no,
  q18_dnc_yes: dataItem?.survey.card.q18_dnc_yes,
  q18_dnccknn_no: dataItem?.survey.card.q18_dnccknn_no,
  q18_dnccknn_yes: dataItem?.survey.card.q18_dnccknn_yes,
  q18_dtb_no: dataItem?.survey.card.q18_dtb_no,
  q18_dtb_yes: dataItem?.survey.card.q18_dtb_yes,
  q18_dtn_no: dataItem?.survey.card.q18_dtn_no,
  q18_dtn_yes: dataItem?.survey.card.q18_dtn_yes,
  q18_hd_no: dataItem?.survey.card.q18_hd_no,
  q18_hd_yes: dataItem?.survey.card.q18_hd_yes,
  q18_hk_no: dataItem?.survey.card.q18_hk_no,
  q18_hk_yes: dataItem?.survey.card.q18_hk_yes,
  q18_kk_no: dataItem?.survey.card.q18_kk_no,
  q18_kk_yes: dataItem?.survey.card.q18_kk_yes,
  q18_knn_no: dataItem?.survey.card.q18_knn_no,
  q18_knn_yes: dataItem?.survey.card.q18_knn_yes,
  q18_ktcdnhl_no: dataItem?.survey.card.q18_ktcdnhl_no,
  q18_ktcdnhl_yes: dataItem?.survey.card.q18_ktcdnhl_yes,
  q18_ktckn_no: dataItem?.survey.card.q18_ktckn_no,
  q18_ktckn_yes: dataItem?.survey.card.q18_ktckn_yes,
  q18_ktcknn_no: dataItem?.survey.card.q18_ktcknn_no,
  q18_ktcknn_yes: dataItem?.survey.card.q18_ktcknn_yes,
  q18_ktkgs_no: dataItem?.survey.card.q18_ktkgs_no,
  q18_ktkgs_yes: dataItem?.survey.card.q18_ktkgs_yes,
  q18_la_no: dataItem?.survey.card.q18_la_no,
  q18_la_yes: dataItem?.survey.card.q18_la_yes,
  q18_lm_no: dataItem?.survey.card.q18_lm_no,
    q18_lm_yes: dataItem?.survey.card.q18_lm_yes,
   q18_lr_no: dataItem?.survey.card.q18_lr_no,
  q18_lr_yes: dataItem?.survey.card.q18_lr_yes,
  q18_ltt_no: dataItem?.survey.card.q18_ltt_no,
  q18_ltt_yes: dataItem?.survey.card.q18_ltt_yes,
  q18_mm_no: dataItem?.survey.card.q18_mm_no,
  q18_mm_yes: dataItem?.survey.card.q18_mm_yes,
  q18_mtb_no: dataItem?.survey.card.q18_mtb_no,
  q18_mtb_yes: dataItem?.survey.card.q18_mtb_yes,
  q18_n_no: dataItem?.survey.card.q18_n_no,
  q18_n_yes: dataItem?.survey.card.q18_n_yes,
  q18_nd_no: dataItem?.survey.card.q18_nd_no,
  q18_nd_yes: dataItem?.survey.card.q18_nd_yes,
  q18_ndmdn_no: dataItem?.survey.card.q18_ndmdn_no,
  q18_ndmdn_yes: dataItem?.survey.card.q18_ndmdn_yes,
  q18_ndsn_no: dataItem?.survey.card.q18_ndsn_no,
  q18_ndsn_yes: dataItem?.survey.card.q18_ndsn_yes,
  q18_nkn_no: dataItem?.survey.card.q18_nkn_no,
  q18_nkn_yes: dataItem?.survey.card.q18_nkn_yes,
  q18_octa_no: dataItem?.survey.card.q18_octa_no,
  q18_octa_yes: dataItem?.survey.card.q18_octa_yes,
  q18_onoc_no: dataItem?.survey.card.q18_onoc_no,
  q18_onoc_yes: dataItem?.survey.card.q18_onoc_yes,
  q18_pc_no: dataItem?.survey.card.q18_pc_no,
  q18_pc_yes: dataItem?.survey.card.q18_pc_yes,
  q18_rlnn_no: dataItem?.survey.card.q18_rlnn_no,
  q18_rlnn_yes: dataItem?.survey.card.q18_rlnn_yes,
  q18_rlt_no: dataItem?.survey.card.q18_rlt_no,
  q18_rlt_yes: dataItem?.survey.card.q18_rlt_yes,
  q18_rt_no: dataItem?.survey.card.q18_rt_no,
  q18_rt_yes: dataItem?.survey.card.q18_rt_yes,
  q18_s_no: dataItem?.survey.card.q18_s_no,
  q18_s_yes: dataItem?.survey.card.q18_s_yes,
  q18_sc_no: dataItem?.survey.card.q18_sc_no,
  q18_sc_yes: dataItem?.survey.card.q18_sc_yes,
  q18_tb_no: dataItem?.survey.card.q18_tb_no,
  q18_tb_yes: dataItem?.survey.card.q18_tb_yes,
  q18_tc_no: dataItem?.survey.card.q18_tc_no,
  q18_tc_yes: dataItem?.survey.card.q18_tc_yes,
  q18_tdkd_no: dataItem?.survey.card.q18_tdkd_no,
  q18_tdkd_yes: dataItem?.survey.card.q18_tdkd_yes,
  q18_trc_no: dataItem?.survey.card.q18_trc_no,
  q18_trc_yes: dataItem?.survey.card.q18_trc_yes,
  q18_tth_no: dataItem?.survey.card.q18_tth_no,
  q18_tth_yes: dataItem?.survey.card.q18_tth_yes,
  q18_vd_no: dataItem?.survey.card.q18_vd_no,
        q18_vd_yes: dataItem?.survey.card.q18_vd_yes,
        q18_rlkn_yes: dataItem?.survey.card.q18_rlkn_yes,
    q18_rlkn_no: dataItem?.survey.card.q18_rlkn_no,
    q18_bcdmt_yes: dataItem?.survey.card.q18_bcdmt_yes,
  q18_bcdmt_no: dataItem?.survey.card.q18_bcdmt_no,
  }
    )
  },[dataItem?.survey])
  const handleChange = (questionGroup: string, selectedKey: string) => {
    setDataSurveyCheck((prevState) => ({
      ...prevState,
      // Đặt tất cả trạng thái trong nhóm về false và chỉ bật trạng thái được chọn
      [`${questionGroup}_yes`]: selectedKey === `${questionGroup}_yes`,
      [`${questionGroup}_no`]: selectedKey === `${questionGroup}_no`,
      [`${questionGroup}_unknown`]: selectedKey === `${questionGroup}_unknown`,
    }));

 
  };
  const { mutate: SaveSV } = useMutation(
    'post-footer-form',
    (data: any) => SaveSurvey(data),
    {
      onSuccess: (data: any) => new Promise((resolve, reject) => {
        try {
          navigate(`/done-survey`, {
            replace: false,
            animate: true,
          });
           resolve(true);
        } catch (err) {
          console.log("🚀 ~ file: index.tsx:96 ~ onSuccess: ~ err:", err)
          reject(err);
        }
      }),
      onError: () => {
        
        // toast.error('Vui lòng kiếm tra lại số điện thoại!');
     
      },
    },
);
  const handleSaveSV = () => {
    const body = {
      card_survey_id: dataItem?.survey.card_survey_id,
      customer_id: dataItem?.survey.customer_id,
      master_id: dataItem?.survey.master_id,
      card: {
        q1: "Hãy mô tả ngắn gọn lý do chính (vấn đề sức khỏe) khiến Quý khách tới khám bệnh (ví dụ: đau bụng, nuốt khó, bệnh gan, các vấn đề khác, …)",
        q2: "Quý khách có vấn đề sức khỏe này từ khi nào?",
        q3: "Trước đây Quý khách đã đi khám về vấn đề sức khỏe này ở bệnh viện/phòng khám khác chưa?",
          q4:"Quý khách hàng đã từng nội soi trước đây chưa? Nếu có thì lần nội soi gần đây nhất đã bao lâu? Từ kết quả nội soi đó Bác sĩ đã chẩn đoán bệnh lý của Quý khách hàng là gì? Quý khách hàng vui lòng cung cấp kết quả nội soi lần gần nhất.",
        q5:"Hãy liệt kê các điều trị hay tên thuốc mà quý khách hàng đã sử dụng để điều trị vấn đề sức khỏe này.",
        q6: "Quý khách hàng có tiền sử bị bất kỳ bệnh lý nào dưới đây không?",
        q7: "Hãy liệt kê các tình trạng bệnh lý khác (chưa được kể ở trên) mà Quý khách đang có hoặc đã từng mắc phải:",
          q8: "Quý khách có cần sử dụng kháng sinh dự phòng trước khi chữa răng không?",
        q9: "Quý khách có van tim nhân tạo, từng thay khớp hoặc có mảnh ghép mạch máu nhân tạo không?",
          q10: "Quý khách đã từng truyền máu, truyền tiểu cầu hoặc các chế phẩm máu nào không? Nếu có thì lý do là gì? Khi nào?",
        q11:"Liệt kê các phẫu thuật mà Quý khách từng thực hiện và ghi chú nếu có biến chứng:",
          q12:"Thói quen:",
        q13:"Dị ứng thuốc: Vui lòng liệt kê bất kỳ loại thuốc nào mà Quý khách có tiền sử bị dị ứng",
          q14:"Thuốc đang uống: Vui lòng liệt kê các loại thuốc mà Quý khách sử dụng thường xuyên",
        q15: "Kể tên tất cả các thuốc khác mà Quý khách có sử dụng trong vòng 6 tháng vừa qua",
          q16:"Tiền sử gia đình: Quý khách hãy liệt kê các vấn đề sức khỏe/ bệnh lý mắc phải của từng thành viên trong gia đình sau đây:",
        q17:"Quý khách có bất kỳ người thân hay họ hàng có quan hệ huyết thống trong gia đình có các bệnh lý liệt kê dưới đây không?",
          q18:"Lược qua các cơ quan: Hiện tại hoặc gần đây Quý khách có bất kỳ triệu chứng nào sau đây không (hoặc liệu Quý khách có từng bị các triệu chứng này rõ và gây khó chịu trong quá khứ không)?",
         q1_text: dataSurveyText?.q1_text,
    q2_text: dataSurveyText?.q2_text,
    q3_text: dataSurveyText?.q3_text,
    q4_text: dataSurveyText?.q4_text,
    q5_text: dataSurveyText?.q5_text,
    q6_note_text: dataSurveyText?.q6_note_text,

    q7_bc1_text: dataSurveyText?.q7_bc1_text,
    q7_bc2_text: dataSurveyText?.q7_bc2_text,
    q7_bc3_text: dataSurveyText?.q7_bc3_text,
    q7_bl1_text: dataSurveyText?.q7_bl1_text,
    q7_bl2_text: dataSurveyText?.q7_bl2_text,
    q7_bl3_text: dataSurveyText?.q7_bl3_text,

    q7_n1_text: dataSurveyText?.q7_n1_text,
    q7_n2_text: dataSurveyText?.q7_n2_text,
    q7_n3_text: dataSurveyText?.q7_n3_text,
    q11_bc1_text: dataSurveyText?.q11_bc1_text,
    q11_bc2_text: dataSurveyText?.q11_bc2_text,
    q11_bc3_text: dataSurveyText?.q11_bc3_text,

    q11_n1_text: dataSurveyText?.q11_n1_text,
    q11_n2_text: dataSurveyText?.q11_n2_text,
    q11_n3_text: dataSurveyText?.q11_n3_text,
    q11_pt1_text: dataSurveyText?.q11_pt1_text,
    q11_pt2_text: dataSurveyText?.q11_pt2_text,
    q11_pt3_text: dataSurveyText?.q11_pt3_text,

    q14_l1_text: dataSurveyText?.q14_l1_text,
    q14_l2_text: dataSurveyText?.q14_l2_text,
    q14_l3_text: dataSurveyText?.q14_l3_text,
    q14_ls1_text: dataSurveyText?.q14_ls1_text,
    q14_ls2_text: dataSurveyText?.q14_ls2_text,
    q14_ls3_text: dataSurveyText?.q14_ls3_text,

    q14_t1_text: dataSurveyText?.q14_t1_text,
    q14_t2_text: dataSurveyText?.q14_t2_text,
    q14_t3_text: dataSurveyText?.q14_t3_text,
    q15_text: dataSurveyText?.q15_text,
    q16_aer_text: dataSurveyText?.q16_aer_text,
    q16_br_text: dataSurveyText?.q16_br_text,

    q16_mr_text: dataSurveyText?.q16_mr_text,
    q10_text: dataSurveyText?.q10_text,
    q12_htl_hdch_text: dataSurveyText?.q12_htl_hdch_text,
    q13_text: dataSurveyText?.q13_text,
        q16_cer_text: dataSurveyText?.q16_cer_text,
      q6_bgm_no: dataSurveyCheck?.q6_bgm_no,
    q6_bgm_unknown: dataSurveyCheck?.q6_bgm_unknown,
    q6_bgm_yes: dataSurveyCheck?.q6_bgm_yes,
    q6_blhhk_no: dataSurveyCheck?.q6_blhhk_no,
    q6_blhhk_unknown: dataSurveyCheck?.q6_blhhk_unknown,
    q6_blhhk_yes: dataSurveyCheck?.q6_blhhk_yes,
    q6_bphhs_no: dataSurveyCheck?.q6_bphhs_no,
    q6_bphhs_unknown: dataSurveyCheck?.q6_bphhs_unknown,
    q6_bphhs_yes: dataSurveyCheck?.q6_bphhs_yes,
    q6_btg_no: dataSurveyCheck?.q6_btg_no,
    q6_btg_unknown: dataSurveyCheck?.q6_btg_unknown,
    q6_btg_yes: dataSurveyCheck?.q6_btg_yes,
    q6_btm_no: dataSurveyCheck?.q6_btm_no,
    q6_btm_unknown: dataSurveyCheck?.q6_btm_unknown,
    q6_btm_yes: dataSurveyCheck?.q6_btm_yes,
    q6_dkhdq_no: dataSurveyCheck?.q6_dkhdq_no,
    q6_dkhdq_unknown: dataSurveyCheck?.q6_dkhdq_unknown,
    q6_dkhdq_yes: dataSurveyCheck?.q6_dkhdq_yes,
    q6_dtd_no: dataSurveyCheck?.q6_dtd_no,
    q6_dtd_unknown: dataSurveyCheck?.q6_dtd_unknown,
    q6_dtd_yes: dataSurveyCheck?.q6_dtd_yes,
    q6_hiv_no: dataSurveyCheck?.q6_hiv_no,
    q6_hiv_unknown: dataSurveyCheck?.q6_hiv_unknown,
    q6_hiv_yes: dataSurveyCheck?.q6_hiv_yes,
    q6_lp_no: dataSurveyCheck?.q6_lp_no,
    q6_lp_unknown: dataSurveyCheck?.q6_lp_unknown,
    q6_lp_yes: dataSurveyCheck?.q6_lp_yes,
    q6_nhp_no: dataSurveyCheck?.q6_nhp_no,
    q6_nhp_unknown: dataSurveyCheck?.q6_nhp_unknown,
    q6_nhp_yes: dataSurveyCheck?.q6_nhp_yes,
    q6_pldtt_no: dataSurveyCheck?.q6_pldtt_no,
    q6_pldtt_unknown: dataSurveyCheck?.q6_pldtt_unknown,
    q6_pldtt_yes: dataSurveyCheck?.q6_pldtt_yes,
    q6_rldcm_no: dataSurveyCheck?.q6_rldcm_no,
    q6_rldcm_unknown: dataSurveyCheck?.q6_rldcm_unknown,
    q6_rldcm_yes: dataSurveyCheck?.q6_rldcm_yes,
    q6_rlttk_no: dataSurveyCheck?.q6_rlttk_no,
    q6_rlttk_unknown: dataSurveyCheck?.q6_rlttk_unknown,
    q6_rlttk_yes: dataSurveyCheck?.q6_rlttk_yes,
    q6_tha_no: dataSurveyCheck?.q6_tha_no,
    q6_tha_unknown: dataSurveyCheck?.q6_tha_unknown,
    q6_tha_yes: dataSurveyCheck?.q6_tha_yes,
    q6_tk_no: dataSurveyCheck?.q6_tk_no,
    q6_tk_unknown: dataSurveyCheck?.q6_tk_unknown,
    q6_tk_yes: dataSurveyCheck?.q6_tk_yes,
    q6_tm_no: dataSurveyCheck?.q6_tm_no,
    q6_tm_unknown: dataSurveyCheck?.q6_tm_unknown,
    q6_tm_yes: dataSurveyCheck?.q6_tm_yes,
    q6_tmg_no: dataSurveyCheck?.q6_tmg_no,
        q6_tmg_unknown: dataSurveyCheck?.q6_tmg_unknown,
       q6_tmg_yes: dataSurveyCheck?.q6_tmg_yes,
    q6_tri_no: dataSurveyCheck?.q6_tri_no,
    q6_tri_unknown: dataSurveyCheck?.q6_tri_unknown,
    q6_tri_yes: dataSurveyCheck?.q6_tri_yes,
    q6_ut_no: dataSurveyCheck?.q6_ut_no,
    q6_ut_unknown: dataSurveyCheck?.q6_ut_unknown,
    q6_ut_yes: dataSurveyCheck?.q6_ut_yes,
    q6_vg_no: dataSurveyCheck?.q6_vg_no,
    q6_vg_unknown: dataSurveyCheck?.q6_vg_unknown,
    q6_vg_yes: dataSurveyCheck?.q6_vg_yes,
    q6_vlddtt_no: dataSurveyCheck?.q6_vlddtt_no,
    q6_vlddtt_unknown: dataSurveyCheck?.q6_vlddtt_unknown,
    q6_vlddtt_yes: dataSurveyCheck?.q6_vlddtt_yes,
    q6_vldt_no: dataSurveyCheck?.q6_vldt_no,
    q6_vldt_unknown: dataSurveyCheck?.q6_vldt_unknown,
    q6_vldt_yes: dataSurveyCheck?.q6_vldt_yes,
    q8_no: dataSurveyCheck?.q8_no,
    q8_yes: dataSurveyCheck?.q8_yes,
    q9_no: dataSurveyCheck?.q9_no,
    q9_yes: dataSurveyCheck?.q9_yes,
    q12_htl_cth: dataSurveyCheck?.q12_htl_cth,
    q12_htl_hdch: dataSurveyCheck?.q12_htl_hdch,
    q12_htl_thvdb: dataSurveyCheck?.q12_htl_thvdb,
    q12_sdtgd_no: dataSurveyCheck?.q12_sdtgd_no,
    q12_sdtgd_yes: dataSurveyCheck?.q12_sdtgd_yes,
    q12_urb_no: dataSurveyCheck?.q12_urb_no,
    q12_urb_yes: dataSurveyCheck?.q12_urb_yes,
    q17_bt_no: dataSurveyCheck?.q17_bt_no,
    q17_bt_unknown: dataSurveyCheck?.q17_bt_unknown,
    q17_bt_yes: dataSurveyCheck?.q17_bt_yes,
    q17_btim_no: dataSurveyCheck?.q17_btim_no,
    q17_btim_unknown: dataSurveyCheck?.q17_btim_unknown,
    q17_btim_yes: dataSurveyCheck?.q17_btim_yes,
    q17_btm_no: dataSurveyCheck?.q17_btm_no,
    q17_btm_unknown: dataSurveyCheck?.q17_btm_unknown,
    q17_btm_yes: dataSurveyCheck?.q17_btm_yes,
    q17_dq_no: dataSurveyCheck?.q17_dq_no,
    q17_dq_unknown: dataSurveyCheck?.q17_dq_unknown,
    q17_dq_yes: dataSurveyCheck?.q17_dq_yes,
    q17_dtd_no: dataSurveyCheck?.q17_dtd_no,
    q17_dtd_unknown: dataSurveyCheck?.q17_dtd_unknown,
    q17_dtd_yes: dataSurveyCheck?.q17_dtd_yes,
    q17_lddtt_no: dataSurveyCheck?.q17_lddtt_no,
    q17_lddtt_unknown: dataSurveyCheck?.q17_lddtt_unknown,
    q17_lddtt_yes: dataSurveyCheck?.q17_lddtt_yes,
    q17_onmt_no: dataSurveyCheck?.q17_onmt_no,
    q17_onmt_unknown: dataSurveyCheck?.q17_onmt_unknown,
    q17_onmt_yes: dataSurveyCheck?.q17_onmt_yes,
    q17_pldd_no: dataSurveyCheck?.q17_pldd_no,
    q17_pldd_unknown: dataSurveyCheck?.q17_pldd_unknown,
    q17_pldd_yes: dataSurveyCheck?.q17_pldd_yes,
    q17_pldt_no: dataSurveyCheck?.q17_pldt_no,
    q17_pldt_unknown: dataSurveyCheck?.q17_pldt_unknown,
    q17_pldt_yes: dataSurveyCheck?.q17_pldt_yes,
    q17_rltt_no: dataSurveyCheck?.q17_rltt_no,
    q17_rltt_unknown: dataSurveyCheck?.q17_rltt_unknown,
    q17_rltt_yes: dataSurveyCheck?.q17_rltt_yes,
    q17_tha_no: dataSurveyCheck?.q17_tha_no,
    q17_tha_unknown: dataSurveyCheck?.q17_tha_unknown,
    q17_tha_yes: dataSurveyCheck?.q17_tha_yes,
    q17_utbt_no: dataSurveyCheck?.q17_utbt_no,
    q17_utbt_unknown: dataSurveyCheck?.q17_utbt_unknown,
    q17_utbt_yes: dataSurveyCheck?.q17_utbt_yes,
    q17_utdt_no: dataSurveyCheck?.q17_utdt_no,
    q17_utdt_unknown: dataSurveyCheck?.q17_utdt_unknown,
    q17_utdt_yes: dataSurveyCheck?.q17_utdt_yes,
    q17_utk_no: dataSurveyCheck?.q17_utk_no,
    q17_utk_unknown: dataSurveyCheck?.q17_utk_unknown,
    q17_utk_yes: dataSurveyCheck?.q17_utk_yes,
    q17_utt_no: dataSurveyCheck?.q17_utt_no,
    q17_utt_unknown: dataSurveyCheck?.q17_utt_unknown,
    q17_utt_yes: dataSurveyCheck?.q17_utt_yes,
    q17_uttq_no: dataSurveyCheck?.q17_uttq_no,
    q17_uttq_unknown: dataSurveyCheck?.q17_uttq_unknown,
    q17_uttq_yes: dataSurveyCheck?.q17_uttq_yes,
    q17_utv_no: dataSurveyCheck?.q17_utv_no,
    q17_utv_unknown: dataSurveyCheck?.q17_utv_unknown,
    q17_utv_yes: dataSurveyCheck?.q17_utv_yes,
    q17_vldt_no: dataSurveyCheck?.q17_vldt_no,
    q17_vldt_unknown: dataSurveyCheck?.q17_vldt_unknown,
    q17_vldt_yes: dataSurveyCheck?.q17_vldt_yes,
    q18_bingat_no: dataSurveyCheck?.q18_bingat_no,
    q18_bingat_yes: dataSurveyCheck?.q18_bingat_yes,
    q18_bn_no: dataSurveyCheck?.q18_bn_no,
    q18_bn_yes: dataSurveyCheck?.q18_bn_yes,
    q18_ca_no: dataSurveyCheck?.q18_ca_no,
    q18_ca_yes: dataSurveyCheck?.q18_ca_yes,
    q18_cb_no: dataSurveyCheck?.q18_cb_no,
    q18_cb_yes: dataSurveyCheck?.q18_cb_yes,
    q18_cm_no: dataSurveyCheck?.q18_cm_no,
    q18_cm_yes: dataSurveyCheck?.q18_cm_yes,
    q18_cmm_no: dataSurveyCheck?.q18_cmm_no,
    q18_cmm_yes: dataSurveyCheck?.q18_cmm_yes,
    q18_cvdvmmth_no: dataSurveyCheck?.q18_cvdvmmth_no,
         q18_cvdvmmth_yes: dataSurveyCheck?.q18_cvdvmmth_yes,
    q18_db_no: dataSurveyCheck?.q18_db_no,
    q18_db_yes: dataSurveyCheck?.q18_db_yes,
    q18_dck_no: dataSurveyCheck?.q18_dck_no,
    q18_dck_yes: dataSurveyCheck?.q18_dck_yes,
    q18_dcrm_no: dataSurveyCheck?.q18_dcrm_no,
    q18_dcrm_yes: dataSurveyCheck?.q18_dcrm_yes,
    q18_dk_no: dataSurveyCheck?.q18_dk_no,
    q18_dk_yes: dataSurveyCheck?.q18_dk_yes,
    q18_dl_no: dataSurveyCheck?.q18_dl_no,
    q18_dl_yes: dataSurveyCheck?.q18_dl_yes,
    q18_dm_no: dataSurveyCheck?.q18_dm_no,
    q18_dm_yes: dataSurveyCheck?.q18_dm_yes,
    q18_dmhtvd_no: dataSurveyCheck?.q18_dmhtvd_no,
    q18_dmhtvd_yes: dataSurveyCheck?.q18_dmhtvd_yes,
    q18_dn_no: dataSurveyCheck?.q18_dn_no,
    q18_dn_yes: dataSurveyCheck?.q18_dn_yes,
    q18_dnc_no: dataSurveyCheck?.q18_dnc_no,
    q18_dnc_yes: dataSurveyCheck?.q18_dnc_yes,
    q18_dnccknn_no: dataSurveyCheck?.q18_dnccknn_no,
    q18_dnccknn_yes: dataSurveyCheck?.q18_dnccknn_yes,
    q18_dtb_no: dataSurveyCheck?.q18_dtb_no,
    q18_dtb_yes: dataSurveyCheck?.q18_dtb_yes,
    q18_dtn_no: dataSurveyCheck?.q18_dtn_no,
    q18_dtn_yes: dataSurveyCheck?.q18_dtn_yes,
    q18_hd_no: dataSurveyCheck?.q18_hd_no,
    q18_hd_yes: dataSurveyCheck?.q18_hd_yes,
    q18_hk_no: dataSurveyCheck?.q18_hk_no,
    q18_hk_yes: dataSurveyCheck?.q18_hk_yes,
    q18_kk_no: dataSurveyCheck?.q18_kk_no,
    q18_kk_yes: dataSurveyCheck?.q18_kk_yes,
    q18_knn_no: dataSurveyCheck?.q18_knn_no,
    q18_knn_yes: dataSurveyCheck?.q18_knn_yes,
    q18_ktcdnhl_no: dataSurveyCheck?.q18_ktcdnhl_no,
    q18_ktcdnhl_yes: dataSurveyCheck?.q18_ktcdnhl_yes,
    q18_ktckn_no: dataSurveyCheck?.q18_ktckn_no,
    q18_ktckn_yes: dataSurveyCheck?.q18_ktckn_yes,
    q18_ktcknn_no: dataSurveyCheck?.q18_ktcknn_no,
    q18_ktcknn_yes: dataSurveyCheck?.q18_ktcknn_yes,
    q18_ktkgs_no: dataSurveyCheck?.q18_ktkgs_no,
    q18_ktkgs_yes: dataSurveyCheck?.q18_ktkgs_yes,
    q18_la_no: dataSurveyCheck?.q18_la_no,
    q18_la_yes: dataSurveyCheck?.q18_la_yes,
    q18_lm_no: dataSurveyCheck?.q18_lm_no,
    q18_lm_yes: dataSurveyCheck?.q18_lm_yes,
    q18_lr_no: dataSurveyCheck?.q18_lr_no,
    q18_lr_yes: dataSurveyCheck?.q18_lr_yes,
    q18_ltt_no: dataSurveyCheck?.q18_ltt_no,
    q18_ltt_yes: dataSurveyCheck?.q18_ltt_yes,
    q18_mm_no: dataSurveyCheck?.q18_mm_no,
    q18_mm_yes: dataSurveyCheck?.q18_mm_yes,
    q18_mtb_no: dataSurveyCheck?.q18_mtb_no,
    q18_mtb_yes: dataSurveyCheck?.q18_mtb_yes,
    q18_n_no: dataSurveyCheck?.q18_n_no,
    q18_n_yes: dataSurveyCheck?.q18_n_yes,
    q18_nd_no: dataSurveyCheck?.q18_nd_no,
    q18_nd_yes: dataSurveyCheck?.q18_nd_yes,
    q18_ndmdn_no: dataSurveyCheck?.q18_ndmdn_no,
    q18_ndmdn_yes: dataSurveyCheck?.q18_ndmdn_yes,
    q18_ndsn_no: dataSurveyCheck?.q18_ndsn_no,
    q18_ndsn_yes: dataSurveyCheck?.q18_ndsn_yes,
    q18_nkn_no: dataSurveyCheck?.q18_nkn_no,
    q18_nkn_yes: dataSurveyCheck?.q18_nkn_yes,
    q18_octa_no: dataSurveyCheck?.q18_octa_no,
    q18_octa_yes: dataSurveyCheck?.q18_octa_yes,
    q18_onoc_no: dataSurveyCheck?.q18_onoc_no,
    q18_onoc_yes: dataSurveyCheck?.q18_onoc_yes,
    q18_pc_no: dataSurveyCheck?.q18_pc_no,
    q18_pc_yes: dataSurveyCheck?.q18_pc_yes,
    q18_rlnn_no: dataSurveyCheck?.q18_rlnn_no,
    q18_rlnn_yes: dataSurveyCheck?.q18_rlnn_yes,
    q18_rlt_no: dataSurveyCheck?.q18_rlt_no,
    q18_rlt_yes: dataSurveyCheck?.q18_rlt_yes,
    q18_rt_no: dataSurveyCheck?.q18_rt_no,
    q18_rt_yes: dataSurveyCheck?.q18_rt_yes,
    q18_s_no: dataSurveyCheck?.q18_s_no,
    q18_s_yes: dataSurveyCheck?.q18_s_yes,
    q18_sc_no: dataSurveyCheck?.q18_sc_no,
    q18_sc_yes: dataSurveyCheck?.q18_sc_yes,
    q18_tb_no: dataSurveyCheck?.q18_tb_no,
    q18_tb_yes: dataSurveyCheck?.q18_tb_yes,
    q18_tc_no: dataSurveyCheck?.q18_tc_no,
    q18_tc_yes: dataSurveyCheck?.q18_tc_yes,
    q18_tdkd_no: dataSurveyCheck?.q18_tdkd_no,
    q18_tdkd_yes: dataSurveyCheck?.q18_tdkd_yes,
    q18_trc_no: dataSurveyCheck?.q18_trc_no,
    q18_trc_yes: dataSurveyCheck?.q18_trc_yes,
    q18_tth_no: dataSurveyCheck?.q18_tth_no,
    q18_tth_yes: dataSurveyCheck?.q18_tth_yes,
    q18_vd_no: dataSurveyCheck?.q18_vd_no,
    q18_vd_yes: dataSurveyCheck?.q18_vd_yes,
    q18_rlkn_yes: dataSurveyCheck?.q18_rlkn_yes,
    q18_rlkn_no: dataSurveyCheck?.q18_rlkn_no,
    q18_bcdmt_yes: dataSurveyCheck?.q18_bcdmt_yes,
    q18_bcdmt_no: dataSurveyCheck?.q18_bcdmt_no,
      },
      status: dataItem?.survey.status === "new" ? "inprogress" : "done"
    }
    SaveSV(body)
  }
  return (
    <Page className="bg-cover py-4 px-2 ">
      <Header
        title="CÂU HỎI SÀNG LỌC VỀ TIỀN SỬ BỆNH LÝ"
        className="p-booking_headers1"
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
      {/* <Box>
          <Button
            className='filter-button'
            typeName='primary'
            onClick={() => onClickChooseButtonType()}
          >
            Primary
          </Button>
        </Box>
      <Box height={40} /> */}
      {
        load === true ? <div>s</div> 
        : 
        <>
         {
        dataItem === undefined ?  <div className="flex flex-col items-center justify-center h-[80%]  text-center">
        <div className="bg-white rounded-lg p-6 max-w-sm flex flex-col items-center">
  
            <svg width="200" height="167" viewBox="0 0 200 167" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M164.62 80.6665C164.506 79.9185 163.801 79.3972 163.027 79.5106C162.276 79.6239 161.753 80.3265 161.867 81.0972C162.071 82.3891 162.322 86.4236 160.911 88.0555C160.615 88.4181 160.251 88.6221 159.773 88.7128L159.91 81.0292C159.933 79.9185 159.022 78.9893 157.908 78.9893C156.77 78.9893 155.883 79.9185 155.905 81.0292L156.269 95.6258C155.792 95.5578 155.405 95.3311 155.086 94.9685C153.698 93.3366 153.949 89.3021 154.131 88.0102C154.244 87.2622 153.721 86.5369 152.97 86.4236C152.219 86.3102 151.491 86.8315 151.377 87.5795C151.286 88.2141 150.467 93.8805 152.947 96.7591C153.812 97.7564 154.95 98.323 156.315 98.4137L156.474 104.76H159.5L159.728 91.478C161.048 91.3647 162.185 90.8207 163.004 89.8461C165.507 86.9449 164.711 81.3011 164.62 80.6665Z" fill="#BDBDBD"></path><path d="M35.1309 93.0418C35.0626 92.5659 34.6075 92.2259 34.1297 92.3165C33.6519 92.3845 33.3106 92.8379 33.4016 93.3138C33.5381 94.1298 33.6974 96.7137 32.7873 97.7563C32.6053 97.9829 32.355 98.1189 32.0592 98.1643L32.1502 93.2685C32.1729 92.5659 31.5814 91.9766 30.876 91.9766C30.1479 91.9766 29.5791 92.5659 29.6018 93.2912L29.8294 102.607C29.5336 102.561 29.2833 102.425 29.0785 102.199C28.1911 101.156 28.3504 98.5949 28.4642 97.7563C28.5324 97.2803 28.2139 96.827 27.7361 96.759C27.2583 96.691 26.8032 97.0083 26.7349 97.4843C26.6667 97.8923 26.1661 101.496 27.7361 103.332C28.2822 103.967 29.0103 104.329 29.8749 104.375L29.9659 108.432H31.8999L32.0364 99.9775C32.8783 99.9095 33.6064 99.5469 34.1297 98.9349C35.6997 97.0537 35.1991 93.4272 35.1309 93.0418Z" fill="#BDBDBD"></path><path d="M100 167C155.228 167 200 151.21 200 131.732C200 112.255 155.228 96.4648 100 96.4648C44.7715 96.4648 0 112.255 0 131.732C0 151.21 44.7715 167 100 167Z" fill="url(#paint0_linear_4899_28223)"></path><path d="M115.972 88.9843C115.972 88.9843 115.904 92.3841 115.972 92.7241C116.018 93.0641 114.63 95.0587 114.061 94.968C113.492 94.8773 112.354 94.696 112.195 94.492C112.036 94.3107 112.104 93.8574 112.172 93.4494C112.241 93.0414 112.65 89.3469 112.65 89.1656C112.65 88.9843 115.335 88.463 115.972 88.9843Z" fill="#FFD3BC"></path><path d="M113.766 92.5209C113.061 92.9062 112.652 94.0622 112.561 94.0848C112.469 94.1075 112.265 94.0622 112.265 93.9488C112.265 93.8355 112.287 93.4502 112.174 93.4502C112.037 93.4502 111.901 94.0848 111.878 95.0141C111.855 95.9434 111.514 98.142 111.878 98.414C112.105 98.5953 114.153 99.6606 114.221 99.8192C114.29 99.9552 114.176 100.975 114.358 101.134C114.54 101.292 114.927 101.678 115.245 101.7C115.564 101.723 117.407 101.904 118.272 101.7C119.136 101.496 120.228 101.088 120.274 100.975C120.297 100.862 120.046 98.414 119.773 98.1193C119.5 97.8247 117.521 95.1048 117.361 94.8555C117.202 94.6061 117.088 94.0168 117.088 93.6768C117.088 93.3369 116.77 92.5662 116.201 92.3849C115.541 92.1583 114.29 92.2263 113.766 92.5209Z" fill="url(#paint1_linear_4899_28223)"></path><path d="M95.2002 90.9339C95.2002 90.9339 95.2002 92.9058 95.132 93.2458C95.0864 93.5858 96.4744 95.5804 97.0432 95.4897C97.612 95.399 98.7497 95.2177 98.909 95.0137C99.0682 94.8324 99 94.3791 98.9317 93.9711C98.8635 93.5631 98.4994 91.2966 98.4994 91.0926C98.5222 90.9339 95.8373 90.4353 95.2002 90.9339Z" fill="#FFD3BC"></path><path d="M97.0198 47.3253C96.2234 50.2492 94.699 60.222 94.699 65.0951C94.699 69.9456 94.2212 82.321 94.2212 84.2022C94.2212 86.0835 94.0164 90.7526 94.5169 91.0019C94.9948 91.2512 96.1324 91.9765 97.6796 91.7272C99.2268 91.4779 99.6364 90.5033 99.6819 89.6193C99.7274 88.7353 100.091 82.321 100.456 79.8504C100.82 77.3799 102.116 72.6201 102.981 69.5376C103.846 66.4777 105.825 60.3127 106.349 60.3354C106.872 60.358 110.171 73.8667 110.444 74.6374C110.717 75.408 111.24 86.2875 111.286 87.1941C111.309 88.1007 111.286 88.9847 111.855 89.3473C112.424 89.71 114.198 90.6393 115.109 90.7073C116.019 90.7752 116.633 89.3246 116.815 88.8713C116.974 88.4407 117.293 73.8894 117.179 69.9002C117.065 65.9111 117.384 58.4768 117.202 56.0516C117.02 53.6264 116.428 48.4359 116.041 47.3253C115.632 46.2374 97.0198 47.3253 97.0198 47.3253Z" fill="#192B59"></path><path d="M91.3548 13.4401C92.1284 12.5788 95.7007 8.56697 96.4288 8.43098C97.1341 8.29498 98.8634 7.97767 99.2502 7.56969C99.637 7.16171 101.275 2.06195 100.615 1.13266C99.9783 0.203372 97.4754 0.475359 96.7246 2.03928C95.9737 3.62587 95.9965 4.44184 94.7678 5.52978C93.5164 6.61773 88.0784 11.0375 87.5778 11.4908C87.0772 11.9441 88.0784 14.12 88.8747 14.4827C89.6483 14.8907 91.3548 13.4401 91.3548 13.4401Z" fill="url(#paint2_linear_4899_28223)"></path><path d="M101.252 14.6645C99.4088 15.0498 96.3826 15.3671 95.3815 15.6844C94.3803 16.0018 90.4213 17.3844 90.444 16.795C90.4668 16.2057 92.287 13.6219 91.9457 13.3499C91.6272 13.0779 89.6704 12.7606 89.3519 12.3526C89.0333 11.9446 88.5783 10.97 88.146 11.0833C87.7136 11.1966 82.5714 15.9791 82.9127 17.7923C83.7319 22.0988 95.882 25.2266 96.1551 27.1079C96.4281 28.9891 95.2222 46.9856 95.882 47.6429C96.5419 48.3002 103.595 50.8387 107.122 51.0654C110.672 51.2921 116.883 50.0455 117.224 49.1162C117.566 48.1869 115.495 30.3037 115.746 30.3037C115.996 30.3037 116.064 35.9248 118.749 37.3981C120.524 38.35 122.981 37.3754 123.459 36.8314C123.937 36.3101 121.775 28.8078 120.819 26.2919C119.841 23.776 118.931 18.563 116.724 16.7044C114.54 14.8458 111.422 15.1631 110.353 14.7325C109.284 14.3018 105.711 14.6192 104.801 14.5058C103.914 14.4605 101.252 14.6645 101.252 14.6645Z" fill="url(#paint3_linear_4899_28223)"></path><path d="M124.141 33.4768C124.141 33.4768 120.979 34.4287 120.728 34.746C120.478 35.0634 120.046 36.378 120.728 36.9219C121.411 37.4659 122.162 37.8739 122.981 37.2393C123.8 36.6046 124.528 35.766 125.006 35.6527C125.484 35.5393 126.872 35.7433 127.463 35.5167C128.055 35.29 129.17 30.8476 128.715 30.5756C128.26 30.3263 124.141 33.4768 124.141 33.4768Z" fill="url(#paint4_linear_4899_28223)"></path><path d="M101.274 14.0523C100.25 13.8483 98.2936 11.9218 98.1116 9.97251C97.9296 8.0686 96.5416 2.74219 101.411 0.747622C105.984 -1.13362 110.694 0.792954 111.377 3.12751C112.014 5.28074 106.644 5.39407 104.665 6.79933C102.685 8.2046 102.571 9.13389 102.071 8.9299C101.57 8.68058 101.274 14.0523 101.274 14.0523Z" fill="#E64D4E"></path><path d="M101.184 10.2669C101.115 11.1282 100.911 15.344 101.275 15.956C101.616 16.5226 102.208 18.1772 104.551 18.1092C106.895 18.0412 108.396 15.7067 108.533 15.4347C108.669 15.1627 108.396 11.7855 108.396 11.2415C108.396 10.6749 105.257 9.33763 103.982 9.38296C102.708 9.40563 101.252 9.45096 101.184 10.2669Z" fill="url(#paint5_linear_4899_28223)"></path><path d="M101.411 10.267C101.684 10.267 101.365 11.8536 101.843 12.3749C102.321 12.8962 104.392 15.6388 106.599 15.3668C108.51 15.1401 108.237 13.5082 108.51 12.1483C108.76 10.9243 109.556 10.811 109.83 7.63783C109.943 6.41389 110.512 4.46465 109.443 4.12467C108.373 3.76202 104.323 2.81006 103.322 4.12467C102.321 5.43927 102.23 8.56712 101.707 8.1818C101.183 7.77382 100.091 5.80192 99.4313 6.8672C98.7715 7.93248 100 10.3124 101.411 10.267Z" fill="#F2DAD4"></path><path d="M118.385 26.5861L111.991 34.655C111.65 35.0857 111.968 35.6976 112.492 35.675L124.323 35.471C124.528 35.471 124.71 35.3803 124.824 35.2217L130.876 27.1754C131.172 26.7901 130.876 26.2461 130.398 26.2461L118.863 26.3368C118.681 26.3368 118.499 26.4274 118.385 26.5861Z" fill="url(#paint6_linear_4899_28223)"></path><path d="M128.51 29.8275C127.896 29.8955 126.986 30.2355 126.986 30.5528C126.986 30.8701 127.714 30.9608 127.919 31.0061C128.123 31.0288 128.374 31.0968 128.306 31.1874C128.237 31.2781 128.078 31.7767 127.668 31.7087C127.259 31.6181 125.507 31.5954 125.166 31.5954C124.824 31.5954 124.437 31.8221 124.392 32.0714C124.369 32.3207 124.301 32.366 124.096 32.3887C123.891 32.4114 123.527 32.5927 123.527 32.91C123.527 33.2273 124.324 33.522 124.324 33.6353C124.324 33.7486 125.894 34.7006 126.212 34.8819C126.531 35.0632 127.1 35.5166 127.418 35.5166C127.737 35.5166 128.283 35.1992 128.328 34.7686C128.374 34.3153 129.011 33.998 129.011 33.7713C129.011 33.5446 128.806 33.386 128.829 33.25C128.852 33.114 129.42 32.91 129.42 32.57C129.42 32.23 129.193 31.7541 129.17 31.5954C129.147 31.4594 129.011 31.1421 129.147 31.0968C129.284 31.0514 129.739 30.6435 129.648 30.2355C129.602 29.8955 128.806 29.8048 128.51 29.8275Z" fill="#FFD3BC"></path><path d="M97.3389 93.0649C98.0443 93.4502 98.4538 94.6061 98.5448 94.6288C98.6358 94.6514 98.8406 94.6061 98.8406 94.4928C98.8406 94.3795 98.8179 93.9941 98.9316 93.9941C99.0681 93.9941 99.2047 94.6288 99.2274 95.5581C99.2502 96.4874 99.5915 98.6859 99.2274 98.9579C98.9999 99.1392 96.9521 100.205 96.8838 100.363C96.8156 100.499 96.9294 101.519 96.7473 101.678C96.5653 101.836 96.1785 102.222 95.86 102.244C95.5414 102.267 93.6984 102.448 92.8338 102.244C91.9692 102.04 90.877 101.632 90.8315 101.519C90.8088 101.406 91.059 98.9579 91.3321 98.6632C91.6051 98.3686 93.5846 95.6487 93.7439 95.3994C93.9032 95.1501 94.017 94.5608 94.017 94.2208C94.017 93.8808 94.3355 93.1102 94.9043 92.9289C95.5642 92.7022 96.8156 92.7702 97.3389 93.0649Z" fill="url(#paint7_linear_4899_28223)"></path><defs><linearGradient id="paint0_linear_4899_28223" x1="100.001" y1="80.4757" x2="100.001" y2="135.854" gradientUnits="userSpaceOnUse"><stop stop-color="#E5E5E5"></stop><stop offset="0.4764" stop-color="#F4F4F4"></stop><stop offset="1" stop-color="white"></stop></linearGradient><linearGradient id="paint1_linear_4899_28223" x1="117.556" y1="96.1637" x2="112.396" y2="100.091" gradientUnits="userSpaceOnUse"><stop stop-color="#4E9CFF"></stop><stop offset="0.9844" stop-color="#176AD4"></stop></linearGradient><linearGradient id="paint2_linear_4899_28223" x1="102.816" y1="8.54029" x2="93.0292" y2="7.44392" gradientUnits="userSpaceOnUse"><stop stop-color="#F2BFAD"></stop><stop offset="1" stop-color="#F2DAD4"></stop></linearGradient><linearGradient id="paint3_linear_4899_28223" x1="91.107" y1="20.7277" x2="124.373" y2="46.0421" gradientUnits="userSpaceOnUse"><stop stop-color="#4E9CFF"></stop><stop offset="0.9844" stop-color="#176AD4"></stop></linearGradient><linearGradient id="paint4_linear_4899_28223" x1="124.675" y1="34.9298" x2="125.17" y2="43.3402" gradientUnits="userSpaceOnUse"><stop stop-color="#F2BFAD"></stop><stop offset="0.7043" stop-color="#F2DAD4"></stop></linearGradient><linearGradient id="paint5_linear_4899_28223" x1="104.085" y1="12.0403" x2="107.301" y2="18.7825" gradientUnits="userSpaceOnUse"><stop stop-color="#F2BFAD"></stop><stop offset="1" stop-color="#F2DAD4"></stop></linearGradient><linearGradient id="paint6_linear_4899_28223" x1="119.246" y1="26.9521" x2="124.847" y2="37.2956" gradientUnits="userSpaceOnUse"><stop stop-color="#F6DBDB"></stop><stop offset="1" stop-color="#EB9A99"></stop></linearGradient><linearGradient id="paint7_linear_4899_28223" x1="93.5495" y1="96.7089" x2="98.71" y2="100.636" gradientUnits="userSpaceOnUse"><stop stop-color="#4E9CFF"></stop><stop offset="0.9844" stop-color="#176AD4"></stop></linearGradient></defs></svg>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            Không tìm thấy thông tin bộ câu hỏi
          </h1>
          <div style={{background:"#04566e", padding:"8px",borderRadius:"4px", width:"fit-content" ,color:"white", cursor:"pointer", marginBottom:"10px"}} className='buttonD' onClick ={() =>  navigate(`/dashboard`, {
      replace: false,
      animate: true,
    })}>
       <Icon
                  icon= {"zi-backup-arrow-solid" }
                  size={20}
                  className="font-[500]"
                  style={{marginBottom:"0.1rem", marginLeft:"3px"}}
                />   
                     Trở về trang chủ
            </div> 
         
        </div>
      </div> :
        <div className="bg-white rounded-full  px-1 py-1 restaurant-with-cover " style={{height:"83vh"}}>
        <div style={{maxHeight:"100%", overflowY:"auto", padding:"8px"}}>
            <div ng-if="dataItem?.survey.card">
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px",}} >1. {dataItem?.survey.card.q1}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
                  <textarea id="tb_q1_text" tabIndex={1} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}}  value={String(dataSurveyText.q1_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q1_text: e.target.value})}}></textarea>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}} >2. {dataItem?.survey.card.q2}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
              <textarea id="tb_q2_text" name="q2_text" tabIndex={2} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}}  value={String(dataSurveyText.q2_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q2_text: e.target.value})}}></textarea>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}} >3. {dataItem?.survey.card.q3}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
              <textarea id="tb_q3_text" name="q3_text" tabIndex={3} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}}   value={String(dataSurveyText.q3_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q3_text: e.target.value})}}></textarea>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>4. {dataItem?.survey.card.q4}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
              <textarea id="tb_q4_text" name="q4_text" tabIndex={4} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} value={String(dataSurveyText.q4_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q4_text: e.target.value})}}></textarea>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}} >5. {dataItem?.survey.card.q5}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
                  <textarea id="tb_q5_text" name="q5_text" tabIndex={5} className="htmlForm-control htmlForm-control-sm"  style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}}   value={String(dataSurveyText.q5_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q5_text: e.target.value})}}></textarea>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}} >6. {dataItem?.survey.card.q6}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Bất thường xét nghiệm gan/ tăng men gan:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px", marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}        onChange={() => handleChange('q6_tmg', 'q6_tmg_yes')}>
                        <input tabIndex={6} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tmg_yes" name="chk_q6_tmg"
                          checked={!!dataSurveyCheck.q6_tmg_yes}
                   
                        />
                          <label htmlFor="chk_q6_tmg_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}   onChange={() => handleChange('q6_tmg', 'q6_tmg_no')}>
                        <input tabIndex={7} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tmg_no" name="chk_q6_tmg"   checked={!!dataSurveyCheck.q6_tmg_no}
                          onChange={() => handleChange('q6_tmg', 'q6_tmg_no')} />
                          <label htmlFor="chk_q6_tmg_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}   onChange={() => handleChange('q6_tmg', 'q6_tmg_unknown')}>
                        <input tabIndex={8} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tmg_unknown" name="chk_q6_tmg"
                          checked={!!dataSurveyCheck.q6_tmg_unknown}
                         />
                          <label htmlFor="chk_q6_tmg_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                      </div>
                      </div>
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-6 font-weight-bold" style={{marginBottom:"5px"}}>Viêm gan:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                       <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_vg', 'q6_vg_yes')}>
                        <input tabIndex={9} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_vg_yes" name="chk_q6_vg"  checked={!!dataSurveyCheck.q6_vg_yes}
                          />
                          <label htmlFor="chk_q6_vg_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_vg', 'q6_vg_no')}>
                        <input tabIndex={10} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_vg_no" name="chk_q6_vg" checked={!!dataSurveyCheck.q6_vg_no}
                         />
                          <label htmlFor="chk_q6_vg_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}    onChange={() => handleChange('q6_vg', 'q6_vg_unknown')}>
                        <input tabIndex={11} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_vg_unknown" name="chk_q6_vg" checked={!!dataSurveyCheck.q6_vg_unknown}
                       />
                          <label htmlFor="chk_q6_vg_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div>
                  </div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh gan mật:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2"> 
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_bgm', 'q6_bgm_yes')}>
                          <input
              type="radio"
              id="chk_q6_bgm_yes"
              name="chk_q6_bgm"
              checked={!!dataSurveyCheck.q6_bgm_yes}
             
            />
            <label
              htmlFor="chk_q6_bgm_yes"
              className="custom-control-label cursor-pointer text-danger"
            >
              Có
            </label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_bgm', 'q6_bgm_no')}>
                         <input
              type="radio"
              id="chk_q6_bgm_no"
              name="chk_q6_bgm"
              checked={!!dataSurveyCheck.q6_bgm_no}
              
            />
            <label
              htmlFor="chk_q6_bgm_no"
              className="custom-control-label cursor-pointer"
            >
              Không
            </label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_bgm', 'q6_bgm_unknown')}>
                          <input
              type="radio"
              id="chk_q6_bgm_unknown"
              name="chk_q6_bgm"
              checked={!!dataSurveyCheck.q6_bgm_unknown}
            
            />
            <label
              htmlFor="chk_q6_bgm_unknown"
              className="custom-control-label cursor-pointer"
            >
              Không rõ
            </label>
                      </div>
                    </div>
                    </div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Viêm loét dạ dày tá tràng:</div>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_vlddtt', 'q6_vlddtt_yes')}>
                        <input tabIndex={15} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_vlddtt_yes" name="chk_q6_vlddtt" ng-checked={dataItem?.survey.card.q6_vlddtt_yes} 
                         checked={!!dataSurveyCheck.q6_vlddtt_yes}
             
                        />
                          <label htmlFor="chk_q6_vlddtt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}    onChange={() => handleChange('q6_vlddtt', 'q6_vlddtt_no')}>
                        <input tabIndex={16} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_vlddtt_no" name="chk_q6_vlddtt" ng-checked={dataItem?.survey.card.q6_vlddtt_no}
                          checked={!!dataSurveyCheck.q6_vlddtt_no}
           
                        />
                          <label htmlFor="chk_q6_vlddtt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_vlddtt', 'q6_vlddtt_unknown')}>
                        <input tabIndex={17} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_vlddtt_unknown" name="chk_q6_vlddtt" ng-checked={dataItem?.survey.card.q6_vlddtt_unknown}
                          checked={!!dataSurveyCheck.q6_vlddtt_unknown}
              
                        />
                          <label htmlFor="chk_q6_vlddtt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div>
              </div></div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Nhiễm Hp:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}    onChange={() => handleChange('q6_nhp', 'q6_nhp_yes')}>
                        <input tabIndex={18} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_nhp_yes" name="chk_q6_nhp" ng-checked={dataItem?.survey.card.q6_nhp_yes}
                          checked={!!dataSurveyCheck.q6_nhp_yes}
           
                        />
                          <label htmlFor="chk_q6_nhp_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}   onChange={() => handleChange('q6_nhp', 'q6_nhp_no')}>
                        <input tabIndex={19} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_nhp_no" name="chk_q6_nhp" ng-checked={dataItem?.survey.card.q6_nhp_no}
                         checked={!!dataSurveyCheck.q6_nhp_no}
            
                        />
                          <label htmlFor="chk_q6_nhp_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_nhp', 'q6_nhp_unknown')}>
                        <input tabIndex={20} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_nhp_unknown" name="chk_q6_nhp" ng-checked={dataItem?.survey.card.q6_nhp_unknown}
                        checked={!!dataSurveyCheck.q6_nhp_unknown}
              
                        />
                          <label htmlFor="chk_q6_nhp_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Viêm loét đại tràng:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}   onChange={() => handleChange('q6_vldt', 'q6_vldt_yes')}>
                        <input tabIndex={21} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_vldt_yes" name="chk_q6_vldt" ng-checked={dataItem?.survey.card.q6_vldt_yes}
                        checked={!!dataSurveyCheck.q6_vldt_yes}
            
                        />
                          <label htmlFor="chk_q6_vldt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_vldt', 'q6_vldt_no')}>
                        <input tabIndex={22} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_vldt_no" name="chk_q6_vldt" ng-checked={dataItem?.survey.card.q6_vldt_no}
                         checked={!!dataSurveyCheck.q6_vldt_no}
             
                        />
                          <label htmlFor="chk_q6_vldt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_vldt', 'q6_vldt_unknown')}>
                        <input tabIndex={23} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_vldt_unknown" name="chk_q6_vldt" ng-checked={dataItem?.survey.card.q6_vldt_unknown}
                         checked={!!dataSurveyCheck.q6_vldt_unknown}
              
                        />
                          <label htmlFor="chk_q6_vldt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Polyp đại trực tràng:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_pldtt', 'q6_pldtt_yes')}>
                        <input tabIndex={24} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_pldtt_yes" name="chk_q6_pldtt" ng-checked={dataItem?.survey.card.q6_pldtt_yes}
                         checked={!!dataSurveyCheck.q6_pldtt_yes}
              
                        />
                          <label htmlFor="chk_q6_pldtt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_pldtt', 'q6_pldtt_no')}>
                        <input tabIndex={25} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_pldtt_no" name="chk_q6_pldtt" ng-checked={dataItem?.survey.card.q6_pldtt_no}
                         checked={!!dataSurveyCheck.q6_pldtt_no}
              
                        />
                          <label htmlFor="chk_q6_pldtt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_pldtt', 'q6_pldtt_unknown')}>
                        <input tabIndex={26} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_pldtt_unknown" name="chk_q6_pldtt" ng-checked={dataItem?.survey.card.q6_pldtt_unknown}
                        checked={!!dataSurveyCheck.q6_pldtt_unknown}
              
                        />
                          <label htmlFor="chk_q6_pldtt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Trĩ:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_tri', 'q6_tri_yes')}>
                        <input tabIndex={27} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tri_yes" name="chk_q6_tri" ng-checked={dataItem?.survey.card.q6_tri_yes}
                        checked={!!dataSurveyCheck.q6_tri_yes}
              
                        
                        />
                          <label htmlFor="chk_q6_tri_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_tri', 'q6_tri_no')}>
                        <input tabIndex={28} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tri_no" name="chk_q6_tri" ng-checked={dataItem?.survey.card.q6_tri_no}
                         checked={!!dataSurveyCheck.q6_tri_no}
              
                        />
                          <label htmlFor="chk_q6_tri_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_tri', 'q6_tri_unknown')}>
                        <input tabIndex={29} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tri_unknown" name="chk_q6_tri" ng-checked={dataItem?.survey.card.q6_tri_unknown}
                        checked={!!dataSurveyCheck.q6_tri_unknown}
              
                        />
                          <label htmlFor="chk_q6_tri_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Thiếu máu:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_tm', 'q6_tm_yes')}>
                        <input tabIndex={30} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tm_yes" name="chk_q6_tm" ng-checked={dataItem?.survey.card.q6_tm_yes}
                         checked={!!dataSurveyCheck.q6_tm_yes}
              
                        />
                          <label htmlFor="chk_q6_tm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_tm', 'q6_tm_no')}>
                        <input tabIndex={31} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tm_no" name="chk_q6_tm" ng-checked={dataItem?.survey.card.q6_tm_no}
                           checked={!!dataSurveyCheck.q6_tm_no}
             
                        />
                          <label htmlFor="chk_q6_tm_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_tm', 'q6_tm_unknown')}>
                        <input tabIndex={32} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tm_unknown" name="chk_q6_tm" ng-checked={dataItem?.survey.card.q6_tm_unknown}
                           checked={!!dataSurveyCheck.q6_tm_unknown}
              
                        />
                          <label htmlFor="chk_q6_tm_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Rối loạn đông cầm máu:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_rldcm', 'q6_rldcm_yes')}>
                        <input tabIndex={33} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_rldcm_yes" name="chk_q6_rldcm" ng-checked={dataItem?.survey.card.q6_rldcm_yes}
                        checked={!!dataSurveyCheck.q6_rldcm_yes}
              
                        />
                          <label htmlFor="chk_q6_rldcm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_rldcm', 'q6_rldcm_no')}>
                        <input tabIndex={34} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_rldcm_no" name="chk_q6_rldcm" ng-checked={dataItem?.survey.card.q6_rldcm_no}
                        checked={!!dataSurveyCheck.q6_rldcm_no}
             
                        />
                          <label htmlFor="chk_q6_rldcm_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_rldcm', 'q6_rldcm_unknown')}>
                        <input tabIndex={35} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_rldcm_unknown" name="chk_q6_rldcm" ng-checked={dataItem?.survey.card.q6_rldcm_unknown}
                         checked={!!dataSurveyCheck.q6_rldcm_unknown}
             
                        />
                          <label htmlFor="chk_q6_rldcm_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Bệnh lý huyết học khác:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_blhhk', 'q6_blhhk_yes')}>
                        <input tabIndex={36} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_blhhk_yes" name="chk_q6_blhhk" ng-checked={dataItem?.survey.card.q6_blhhk_yes}
                         checked={!!dataSurveyCheck.q6_blhhk_yes}
              
                        />
                          <label htmlFor="chk_q6_blhhk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_blhhk', 'q6_blhhk_no')}>
                        <input tabIndex={37} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_blhhk_no" name="chk_q6_blhhk" ng-checked={dataItem?.survey.card.q6_blhhk_no}
                          checked={!!dataSurveyCheck.q6_blhhk_no}
              
                        />
                          <label htmlFor="chk_q6_blhhk_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_blhhk', 'q6_blhhk_unknown')}>
                        <input tabIndex={38} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_blhhk_unknown" name="chk_q6_blhhk" ng-checked={dataItem?.survey.card.q6_blhhk_unknown}
                         checked={!!dataSurveyCheck.q6_blhhk_unknown}
              
                        />
                          <label htmlFor="chk_q6_blhhk_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Động kinh hoặc đột quỵ/ tai biến mạch máu não:</div>
                       <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}   onChange={() => handleChange('q6_dkhdq', 'q6_dkhdq_yes')}>
                        <input tabIndex={39} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_dkhdq_yes" name="chk_q6_dkhdq" ng-checked={dataItem?.survey.card.q6_dkhdq_yes}
                         checked={!!dataSurveyCheck.q6_dkhdq_yes}
            
                        />
                          <label htmlFor="chk_q6_dkhdq_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_dkhdq', 'q6_dkhdq_no')}>
                        <input tabIndex={40} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_dkhdq_no" name="chk_q6_dkhdq" ng-checked={dataItem?.survey.card.q6_dkhdq_no}
                         checked={!!dataSurveyCheck.q6_dkhdq_no}
             
                        />
                          <label htmlFor="chk_q6_dkhdq_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}} onChange={() => handleChange('q6_dkhdq', 'q6_dkhdq_unknown')}>
                        <input tabIndex={41} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_dkhdq_unknown" name="chk_q6_dkhdq" ng-checked={dataItem?.survey.card.q6_dkhdq_unknown}
                         checked={!!dataSurveyCheck.q6_dkhdq_unknown}
              
                        />
                          <label htmlFor="chk_q6_dkhdq_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Tăng huyết áp:</div>
                       <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}    onChange={() => handleChange('q6_tha', 'q6_tha_yes')}>
                        <input tabIndex={42} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tha_yes" name="chk_q6_tha" ng-checked={dataItem?.survey.card.q6_tha_yes}
                         checked={!!dataSurveyCheck.q6_tha_yes}
           
                        />
                          <label htmlFor="chk_q6_tha_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}     onChange={() => handleChange('q6_tha', 'q6_tha_no')}>
                        <input tabIndex={43} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tha_no" name="chk_q6_tha" ng-checked={dataItem?.survey.card.q6_tha_no}
                         checked={!!dataSurveyCheck.q6_tha_no}
          
                        />
                          <label htmlFor="chk_q6_tha_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}  onChange={() => handleChange('q6_tha', 'q6_tha_unknown')}>
                        <input tabIndex={44} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tha_unknown" name="chk_q6_tha" ng-checked={dataItem?.survey.card.q6_tha_unknown}
                        checked={!!dataSurveyCheck.q6_tha_unknown}
             
                        />
                          <label htmlFor="chk_q6_tha_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh tim mạch:</div>
                       <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={45} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_btm_yes" name="chk_q6_btm" ng-checked={dataItem?.survey.card.q6_btm_yes}
                           checked={!!dataSurveyCheck.q6_btm_yes}
              onChange={() => handleChange('q6_btm', 'q6_btm_yes')}
                        />
                          <label htmlFor="chk_q6_btm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={46} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_btm_no" name="chk_q6_btm" ng-checked={dataItem?.survey.card.q6_btm_no}
                         checked={!!dataSurveyCheck.q6_btm_no}
              onChange={() => handleChange('q6_btm', 'q6_btm_no')}
                        />
                          <label htmlFor="chk_q6_btm_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={47} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_btm_unknown" name="chk_q6_btm" ng-checked={dataItem?.survey.card.q6_btm_unknown}
                         checked={!!dataSurveyCheck.q6_btm_unknown}
              onChange={() => handleChange('q6_btm', 'q6_btm_unknown')}
                        />
                          <label htmlFor="chk_q6_btm_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đái tháo đường:</div>
                       <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={48} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_dtd_yes" name="chk_q6_dtd" ng-checked={dataItem?.survey.card.q6_dtd_yes}
                            checked={!!dataSurveyCheck.q6_dtd_yes}
              onChange={() => handleChange('q6_dtd', 'q6_dtd_yes')}
                        />
                          <label htmlFor="chk_q6_dtd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={49} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_dtd_no" name="chk_q6_dtd" ng-checked={dataItem?.survey.card.q6_dtd_no}
                         checked={!!dataSurveyCheck.q6_dtd_no}
              onChange={() => handleChange('q6_dtd', 'q6_dtd_no')}
                        />
                          <label htmlFor="chk_q6_dtd_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={50} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_dtd_unknown" name="chk_q6_dtd" ng-checked={dataItem?.survey.card.q6_dtd_unknown}
                         checked={!!dataSurveyCheck.q6_dtd_unknown}
              onChange={() => handleChange('q6_dtd', 'q6_dtd_unknown')}
                        />
                          <label htmlFor="chk_q6_dtd_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Rối loạn tâm thần kinh:</div>
                       <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={51} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_rlttk_yes" name="chk_q6_rlttk" ng-checked={dataItem?.survey.card.q6_rlttk_yes}
                         checked={!!dataSurveyCheck.q6_rlttk_yes}
              onChange={() => handleChange('q6_rlttk', 'q6_rlttk_yes')}
                        />
                          <label htmlFor="chk_q6_rlttk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={52} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_rlttk_no" name="chk_q6_rlttk" ng-checked={dataItem?.survey.card.q6_rlttk_no}
                         checked={!!dataSurveyCheck.q6_rlttk_no}
              onChange={() => handleChange('q6_rlttk', 'q6_rlttk_no')}
                        />
                          <label htmlFor="chk_q6_rlttk_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={53} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_rlttk_unknown" name="chk_q6_rlttk" ng-checked={dataItem?.survey.card.q6_rlttk_unknown}
                         checked={!!dataSurveyCheck.q6_rlttk_unknown}
              onChange={() => handleChange('q6_rlttk', 'q6_rlttk_unknown')}
                        />
                          <label htmlFor="chk_q6_rlttk_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Lao phổi:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={54} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_lp_yes" name="chk_q6_lp" ng-checked={dataItem?.survey.card.q6_lp_yes}
                        checked={!!dataSurveyCheck.q6_lp_yes}
              onChange={() => handleChange('q6_lp', 'q6_lp_yes')}
                        />
                          <label htmlFor="chk_q6_lp_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={55} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_lp_no" name="chk_q6_lp" ng-checked={dataItem?.survey.card.q6_lp_no}
                        checked={!!dataSurveyCheck.q6_lp_no}
              onChange={() => handleChange('q6_lp', 'q6_lp_no')}
                        />
                          <label htmlFor="chk_q6_lp_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={56} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_lp_unknown" name="chk_q6_lp" ng-checked={dataItem?.survey.card.q6_lp_unknown}
                        checked={!!dataSurveyCheck.q6_lp_unknown}
              onChange={() => handleChange('q6_lp', 'q6_lp_unknown')}
                        />
                          <label htmlFor="chk_q6_lp_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Bệnh phổi hoặc hen suyễn:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={57} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_bphhs_yes" name="chk_q6_bphhs" ng-checked={dataItem?.survey.card.q6_bphhs_yes}
                        checked={!!dataSurveyCheck.q6_bphhs_yes}
              onChange={() => handleChange('q6_bphhs', 'q6_bphhs_yes')}
                        />
                          <label htmlFor="chk_q6_bphhs_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={58} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_bphhs_no" name="chk_q6_bphhs" ng-checked={dataItem?.survey.card.q6_bphhs_no}
                          checked={!!dataSurveyCheck.q6_bphhs_no}
              onChange={() => handleChange('q6_bphhs', 'q6_bphhs_no')}
                        />
                          <label htmlFor="chk_q6_bphhs_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={59} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_bphhs_unknown" name="chk_q6_bphhs" ng-checked={dataItem?.survey.card.q6_bphhs_unknown}
                          checked={!!dataSurveyCheck.q6_bphhs_unknown}
              onChange={() => handleChange('q6_bphhs', 'q6_bphhs_unknown')}
                        />
                          <label htmlFor="chk_q6_bphhs_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh tuyến giáp:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={60} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_btg_yes" name="chk_q6_btg" ng-checked={dataItem?.survey.card.q6_btg_yes}
                        checked={!!dataSurveyCheck.q6_btg_yes}
              onChange={() => handleChange('q6_btg', 'q6_btg_yes')}
                        />
                          <label htmlFor="chk_q6_btg_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={61} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_btg_no" name="chk_q6_btg" ng-checked={dataItem?.survey.card.q6_btg_no}
                         checked={!!dataSurveyCheck.q6_btg_no}
              onChange={() => handleChange('q6_btg', 'q6_btg_no')}
                        />
                          <label htmlFor="chk_q6_btg_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={62} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_btg_unknown" name="chk_q6_btg" ng-checked={dataItem?.survey.card.q6_btg_unknown}
                         checked={!!dataSurveyCheck.q6_btg_unknown}
              onChange={() => handleChange('q6_btg', 'q6_btg_unknown')}
                        />
                          <label htmlFor="chk_q6_btg_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Thấp khớp:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={63} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tk_yes" name="chk_q6_tk" ng-checked={dataItem?.survey.card.q6_tk_yes}
                        checked={!!dataSurveyCheck.q6_tk_yes}
              onChange={() => handleChange('q6_tk', 'q6_tk_yes')}
                        />
                          <label htmlFor="chk_q6_tk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={64} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tk_no" name="chk_q6_tk" ng-checked={dataItem?.survey.card.q6_tk_no}
                         checked={!!dataSurveyCheck.q6_tk_no}
              onChange={() => handleChange('q6_tk', 'q6_tk_no')}
                        />
                          <label htmlFor="chk_q6_tk_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={65} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_tk_unknown" name="chk_q6_tk" ng-checked={dataItem?.survey.card.q6_tk_unknown}
                         checked={!!dataSurveyCheck.q6_tk_unknown}
              onChange={() => handleChange('q6_tk', 'q6_tk_unknown')}
                        />
                          <label htmlFor="chk_q6_tk_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>HIV/AIDS</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={66} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_hiv_yes" name="chk_q6_hiv" ng-checked={dataItem?.survey.card.q6_hiv_yes}
                        checked={!!dataSurveyCheck.q6_hiv_yes}
              onChange={() => handleChange('q6_hiv', 'q6_hiv_yes')}
                        />
                          <label htmlFor="chk_q6_hiv_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={67} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_hiv_no" name="chk_q6_hiv" ng-checked={dataItem?.survey.card.q6_hiv_no}
                        checked={!!dataSurveyCheck.q6_hiv_no}
              onChange={() => handleChange('q6_hiv', 'q6_hiv_no')}
                        />
                          <label htmlFor="chk_q6_hiv_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={68} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_hiv_unknown" name="chk_q6_hiv" ng-checked={dataItem?.survey.card.q6_hiv_unknown}
                        checked={!!dataSurveyCheck.q6_hiv_unknown}
              onChange={() => handleChange('q6_hiv', 'q6_hiv_unknown')}
                        />
                          <label htmlFor="chk_q6_hiv_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ung thư</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={69} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_ut_yes" name="chk_q6_ut" ng-checked={dataItem?.survey.card.q6_ut_yes}
                         checked={!!dataSurveyCheck.q6_ut_yes}
              onChange={() => handleChange('q6_ut', 'q6_ut_yes')}
                        />
                          <label htmlFor="chk_q6_ut_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={70} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_ut_no" name="chk_q6_ut" ng-checked={dataItem?.survey.card.q6_ut_no}
                         checked={!!dataSurveyCheck.q6_ut_no}
              onChange={() => handleChange('q6_ut', 'q6_ut_no')}
                        />
                          <label htmlFor="chk_q6_ut_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={71} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q6_ut_unknown" name="chk_q6_ut" ng-checked={dataItem?.survey.card.q6_ut_unknown}
                         checked={!!dataSurveyCheck.q6_ut_unknown}
              onChange={() => handleChange('q6_ut', 'q6_ut_unknown')}
                        />
                          <label htmlFor="chk_q6_ut_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-2">Ghi chú (nếu có):</div>
                  <div className="col-sm-10">
                      <input id="tb_q6_note_text" tabIndex={72} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px",}}className="htmlForm-control htmlForm-control-sm"  value={String(dataSurveyText.q6_note_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q6_note_text: e.target.value})}}/>
                  </div>
              </div>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>7. {dataItem?.survey.card.q7}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
              <div className="row htmlForm-group">
                  <div className="col-sm-1 font-weight-bold pb-1">Bệnh lý:</div>
                  <div className="col-sm-3">
                      <input id="tb_q7_bl1_text" tabIndex={73} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q7_bl1_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bl1_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-1 text-left">Năm:</div>
                  <div className="col-sm-1 font-weight-bold pb-1">
                      <input id="tb_q7_n1_text" tabIndex={74} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q7_n1_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_n1_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-2 text-left">Biến chứng (nếu có):</div>
                  <div className="col-sm-4">
                      <input id="tb_q7_bc1_text" tabIndex={75} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q7_bc1_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bc1_text: e.target.value})}}/>
                  </div>
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-1 font-weight-bold pb-1">Bệnh lý:</div>
                  <div className="col-sm-3">
                      <input id="tb_q7_bl2_text" tabIndex={76} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q7_bl2_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bl2_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-1 text-left">Năm:</div>
                  <div className="col-sm-1 font-weight-bold pb-1">
                      <input id="tb_q7_n2_text" tabIndex={77} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm "   value={String(dataSurveyText.q7_n2_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_n2_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-2 text-left">Biến chứng (nếu có):</div>
                  <div className="col-sm-4">
                      <input id="tb_q7_bc2_text" tabIndex={78} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q7_bc2_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bc2_text: e.target.value})}}/>
                  </div>
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-1 font-weight-bold pb-1">Bệnh lý:</div>
                  <div className="col-sm-3">
                      <input id="tb_q7_bl3_text" tabIndex={79} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={String(dataSurveyText.q7_bl3_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bl3_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-1 text-left">Năm:</div>
                  <div className="col-sm-1 font-weight-bold pb-1">
                      <input id="tb_q7_n3_text" tabIndex={80} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm "  value={String(dataSurveyText.q7_n3_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_n3_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-2 text-left">Biến chứng (nếu có):</div>
                  <div className="col-sm-4">
                      <input id="tb_q7_bc3_text" tabIndex={81} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q7_bc3_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q7_bc3_text: e.target.value})}}/>
                  </div>
              </div>
          </div>
      </div>
      <div className="row htmlForm-group" >
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>8. {dataItem?.survey.card.q8}</div>
      </div>
      <div className="row htmlForm-group" style={{display:"flex",gap:"40px", marginBottom:"6px",paddingLeft:"40px"}}>
          <div className="col-sm-2">
              <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                    <input tabIndex={82} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q8_yes" name="chk_q8" ng-checked={dataItem?.survey.card.q8_yes}
                       checked={!!dataSurveyCheck.q8_yes}
              onChange={() => handleChange('q8', 'q8_yes')}
                    />
                  <label htmlFor="chk_q8_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
              </div>
          </div>
          <div className="col-sm-2">
              <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                    <input tabIndex={83} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q8_no" name="chk_q8" ng-checked={dataItem?.survey.card.q8_no}
                        checked={!!dataSurveyCheck.q8_no}
              onChange={() => handleChange('q8', 'q8_no')}
                    />
                  <label htmlFor="chk_q8_no" className="custom-control-label cursor-pointer">Không</label>
              </div>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>9. {dataItem?.survey.card.q9}</div>
      </div>
      <div className="row htmlForm-group"style={{display:"flex",gap:"40px", marginBottom:"6px",paddingLeft:"40px"}}>
          <div className="col-sm-2">
              <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                    <input tabIndex={84} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q9_yes" name="chk_q9" ng-checked={dataItem?.survey.card.q9_yes}
                     checked={!!dataSurveyCheck.q9_yes}
              onChange={() => handleChange('q9', 'q9_yes')}
                    />
                  <label htmlFor="chk_q9_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
              </div>
          </div>
          <div className="col-sm-2">
              <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                    <input tabIndex={85} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q9_no" name="chk_q9" ng-checked={dataItem?.survey.card.q9_no}
                     checked={!!dataSurveyCheck.q9_no}
              onChange={() => handleChange('q9', 'q9_no')}
                    />
                  <label htmlFor="chk_q9_no" className="custom-control-label cursor-pointer">Không</label>
              </div>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>10. {dataItem?.survey.card.q10}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
                  <textarea id="tb_q10_text" tabIndex={86} className="htmlForm-control htmlForm-control-sm"  style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}}  value={String(dataSurveyText.q10_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q10_text: e.target.value})}}></textarea>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>11. {dataItem?.survey.card.q11}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
              <div className="row htmlForm-group">
                  <div className="col-sm-1 font-weight-bold pb-1">Phẫu thuật:</div>
                  <div className="col-sm-3">
                      <input id="tb_q11_pt1_text" tabIndex={87} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={String(dataSurveyText.q11_pt1_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_pt1_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-1 text-left">Năm:</div>
                  <div className="col-sm-1 font-weight-bold pb-1">
                      <input id="tb_q11_n1_text" tabIndex={88} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm "  value={String(dataSurveyText.q11_n1_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_n1_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-2 text-left">Biến chứng (nếu có):</div>
                  <div className="col-sm-4">
                      <input id="tb_q11_bc1_text" tabIndex={89} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={String(dataSurveyText.q11_bc1_text || '')} onChange={(e) => { setDataSurvey({ ...dataSurveyText, q11_bc1_text: e.target.value }) }} />
                   </div>   
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-1 font-weight-bold pb-1">Phẫu thuật:</div>
                  <div className="col-sm-3">
                      <input id="tb_q11_pt2_text" tabIndex={90} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q11_pt2_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_pt2_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-1 text-left">Năm:</div>
                  <div className="col-sm-1 font-weight-bold pb-1">
                      <input id="tb_q11_n2_text" tabIndex={91} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm "   value={String(dataSurveyText.q11_n2_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_n2_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-2 text-left">Biến chứng (nếu có):</div>
                  <div className="col-sm-4">
                      <input id="tb_q11_bc2_text" tabIndex={92} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q11_bc2_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_bc2_text: e.target.value})}}/>
                  </div>
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-1 font-weight-bold pb-1">Phẫu thuật:</div>
                  <div className="col-sm-3">
                      <input id="tb_q11_pt3_text" tabIndex={93} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q11_pt3_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_pt3_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-1 text-left">Năm:</div>
                  <div className="col-sm-1 font-weight-bold pb-1">
                      <input id="tb_q11_n3_text" tabIndex={94} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm "   value={String(dataSurveyText.q11_n3_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_n3_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-2 text-left">Biến chứng (nếu có):</div>
                  <div className="col-sm-4">
                      <input id="tb_q11_bc3_text" tabIndex={95} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q11_bc3_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q11_bc3_text: e.target.value})}}/>
                  </div>
              </div>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>12. {dataItem?.survey.card.q12}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
              <div className="row htmlForm-group">
                    <div className="col-sm-2 font-weight-bold" style={{  marginBottom: "5px" }}>Hút thuốc lá:</div>
                    
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                          <input tabIndex={96} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q12_htl_cth" name="chk_q12_htl"
                         
                                 checked={!!dataSurveyCheck.q12_htl_cth}
              onChange={() => handleChange('q12_htl', 'q12_htl_cth')}
                        />
                          <label htmlFor="chk_q12_htl_cth" className="custom-control-label cursor-pointer">Chưa từng hút</label>

                          
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                          <input tabIndex={97} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q12_htl_thvdb" name="chk_q12_htl"
                  
                         checked={!!dataSurveyCheck.q12_htl_thvdb}
              onChange={() => handleChange('q12_htl', 'q12_htl_thvdb')}
                        />
                          <label htmlFor="chk_q12_htl_thvdb" className="custom-control-label cursor-pointer">Từng hút và đã bỏ</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                          <input tabIndex={98} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q12_htl_hdch" name="chk_q12_htl"
                         
                         checked={!!dataSurveyCheck.q12_htl_hdch}
              onChange={() => handleChange('q12_htl', 'q12_htl_hdch')}
                        />
                          <label htmlFor="chk_q12_htl_hdch" className="custom-control-label cursor-pointer text-danger">Hiện đang còn hút</label>
                      </div>
                  </div>
                  <div className="col-sm-4" ng-show="dataItem?.survey.card.q12_htl_hdch">
                      <input id="tb_q12_htl_hdch_text" tabIndex={99} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm" placeholder="Bao nhiêu điếu thuốc/ngày?"
                               value={String(dataSurveyText.q12_htl_hdch_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q12_htl_hdch_text: e.target.value})}}/>
                  </div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-2 font-weight-bold" style={{ marginBottom: "5px" }}>Uống rượu bia:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={100} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q12_urb_yes" name="chk_q12_urb" ng-checked={dataItem?.survey.card.q12_urb_yes}
                           checked={!!dataSurveyCheck.q12_urb_yes}
              onChange={() => handleChange('q12_urb', 'q12_urb_yes')}
                        />
                          <label htmlFor="chk_q12_urb_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={101} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q12_urb_no" name="chk_q12_urb" ng-checked={dataItem?.survey.card.q12_urb_no}
                          checked={!!dataSurveyCheck.q12_urb_no}
              onChange={() => handleChange('q12_urb', 'q12_urb_no')}
                        />
                          <label htmlFor="chk_q12_urb_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-2 font-weight-bold" style={{  marginBottom: "5px" }}>Sử dụng thuốc giảm đau:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={102} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q12_sdtgd_yes" name="chk_q12_sdtgd" ng-checked={dataItem?.survey.card.q12_sdtgd_yes}
                           checked={!!dataSurveyCheck.q12_sdtgd_yes}
              onChange={() => handleChange('q12_sdtgd', 'q12_sdtgd_yes')}
                        />
                          <label htmlFor="chk_q12_sdtgd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={103} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q12_sdtgd_no" name="chk_q12_sdtgd" ng-checked={dataItem?.survey.card.q12_sdtgd_no}
                           checked={!!dataSurveyCheck.q12_sdtgd_no}
              onChange={() => handleChange('q12_sdtgd', 'q12_sdtgd_no')}
                        />
                          <label htmlFor="chk_q12_sdtgd_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px",width:"100%", marginTop:"10px"}}>13. {dataItem?.survey.card.q13}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
                  <textarea id="tb_q13_text" tabIndex={104} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}}  value={String(dataSurveyText.q13_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q13_text: e.target.value})}}></textarea>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>14. {dataItem?.survey.card.q14}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
              <div className="row htmlForm-group">
                  <div className="col-sm-1 font-weight-bold pb-1">Thuốc:</div>
                  <div className="col-sm-3">
                      <input id="tb_q14_t1_text" tabIndex={105} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q14_t1_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_t1_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-1 text-left">Liều:</div>
                  <div className="col-sm-2">
                      <input id="tb_q14_l1_text" tabIndex={106} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={String(dataSurveyText.q14_l1_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_l1_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-2 text-left">Số lần uống mỗi ngày:</div>
                  <div className="col-sm-3">
                      <input id="tb_q14_ls1_text" tabIndex={107} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q14_ls1_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_ls1_text: e.target.value})}}/>
                  </div>
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-1 font-weight-bold pb-1">Thuốc:</div>
                  <div className="col-sm-3">
                      <input id="tb_q14_t2_text" tabIndex={108} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q14_t2_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_t2_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-1 text-left">Liều:</div>
                  <div className="col-sm-2">
                      <input id="tb_q14_l2_text" tabIndex={109} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm "   value={String(dataSurveyText.q14_l2_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_l2_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-2 text-left">Số lần uống mỗi ngày:</div>
                  <div className="col-sm-3">
                      <input id="tb_q14_ls2_text" tabIndex={110} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q14_ls2_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_ls2_text: e.target.value})}}/>
                  </div>
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-1 font-weight-bold pb-1">Thuốc:</div>
                  <div className="col-sm-3">
                      <input id="tb_q14_t3_text" tabIndex={111} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q14_t3_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_t3_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-1 text-left">Liều:</div>
                  <div className="col-sm-2">
                      <input id="tb_q14_l3_text" tabIndex={112} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm "   value={String(dataSurveyText.q14_l3_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_l3_text: e.target.value})}}/>
                  </div>
                  <div className="col-sm-2 text-left">Số lần uống mỗi ngày:</div>
                  <div className="col-sm-3">
                      <input id="tb_q14_ls3_text" tabIndex={113} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={String(dataSurveyText.q14_ls3_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q14_ls3_text: e.target.value})}}/>
                  </div>
              </div>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>15. {dataItem?.survey.card.q15}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
                <textarea id="tb_q15_text" tabIndex={114} className="htmlForm-control htmlForm-control-sm" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}}    value={String(dataSurveyText.q15_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q15_text: e.target.value})}}></textarea>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>16. {dataItem?.survey.card.q16}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12">
              <div className="row htmlForm-group">
                  <div className="col-sm-2">Bố ruột:</div>
                  <div className="col-sm-10">
                      <input id="tb_q16_br_text" tabIndex={115} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q16_br_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q16_br_text: e.target.value})}}/>
                  </div>
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-2">Mẹ ruột:</div>
                  <div className="col-sm-10">
                      <input id="tb_q16_mr_text" tabIndex={116} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q16_mr_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q16_mr_text: e.target.value})}}/>
                  </div>
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-2">Anh/Em trai ruột:</div>
                  <div className="col-sm-10">
                      <input id="tb_q16_aer_text" tabIndex={117} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"  value={String(dataSurveyText.q16_aer_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q16_aer_text: e.target.value})}}/>
                  </div>
              </div>
              <div className="row htmlForm-group">
                  <div className="col-sm-2">Chị/Em gái ruột:</div>
                  <div className="col-sm-10">
                      <input id="tb_q16_cer_text" tabIndex={118} type="text" style={{width:"100%",border:"1px solid rgb(169, 167, 167)",borderRadius:"5px",padding:"5px"}} className="htmlForm-control htmlForm-control-sm"   value={String(dataSurveyText.q16_cer_text || '')} onChange={(e) => {setDataSurvey({...dataSurveyText,q16_cer_text: e.target.value})}}/>
                  </div>
              </div>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>17. {dataItem?.survey.card.q17}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-7">
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ung thư vú:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={119} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utv_yes" name="chk_q17_utv" ng-checked={dataItem?.survey.card.q17_utv_yes}
                         checked={!!dataSurveyCheck.q17_utv_yes}
              onChange={() => handleChange('q17_utv', 'q17_utv_yes')}
                        />
                          <label htmlFor="chk_q17_utv_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={120} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utv_no" name="chk_q17_utv" ng-checked={dataItem?.survey.card.q17_utv_no}
                        checked={!!dataSurveyCheck.q17_utv_no}
              onChange={() => handleChange('q17_utv', 'q17_utv_no')}
                        />
                          <label htmlFor="chk_q17_utv_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={121} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utv_unknown" name="chk_q17_utv" ng-checked={dataItem?.survey.card.q17_utv_unknown}
                        checked={!!dataSurveyCheck.q17_utv_unknown}
              onChange={() => handleChange('q17_utv', 'q17_utv_unknown')}
                        />
                          <label htmlFor="chk_q17_utv_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{marginBottom: "5px" }}>Ợ nóng mạn tính:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={122} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_onmt_yes" name="chk_q17_onmt" ng-checked={dataItem?.survey.card.q17_onmt_yes}
                          checked={!!dataSurveyCheck.q17_onmt_yes}
              onChange={() => handleChange('q17_onmt', 'q17_onmt_yes')}
                        />
                          <label htmlFor="chk_q17_onmt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={123} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_onmt_no" name="chk_q17_onmt" ng-checked={dataItem?.survey.card.q17_onmt_no}
                           checked={!!dataSurveyCheck.q17_onmt_no}
              onChange={() => handleChange('q17_onmt', 'q17_onmt_no')}
                        />
                          <label htmlFor="chk_q17_onmt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={124} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_onmt_unknown" name="chk_q17_onmt" ng-checked={dataItem?.survey.card.q17_onmt_unknown}
                           checked={!!dataSurveyCheck.q17_onmt_unknown}
              onChange={() => handleChange('q17_onmt', 'q17_onmt_unknown')}
                        />
                          <label htmlFor="chk_q17_onmt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Ung thư đại tràng:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={125} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utdt_yes" name="chk_q17_utdt" ng-checked={dataItem?.survey.card.q17_utdt_yes}
                        checked={!!dataSurveyCheck.q17_utdt_yes}
              onChange={() => handleChange('q17_utdt', 'q17_utdt_yes')}
                        />
                          <label htmlFor="chk_q17_utdt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={126} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utdt_no" name="chk_q17_utdt" ng-checked={dataItem?.survey.card.q17_utdt_no}
                         checked={!!dataSurveyCheck.q17_utdt_no}
              onChange={() => handleChange('q17_utdt', 'q17_utdt_no')}
                        />
                          <label htmlFor="chk_q17_utdt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={127} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utdt_unknown" name="chk_q17_utdt" ng-checked={dataItem?.survey.card.q17_utdt_unknown}
                         checked={!!dataSurveyCheck.q17_utdt_unknown}
              onChange={() => handleChange('q17_utdt', 'q17_utdt_unknown')}
                        />
                          <label htmlFor="chk_q17_utdt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Polyp đại tràng:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={128} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_pldt_yes" name="chk_q17_pldt" ng-checked={dataItem?.survey.card.q17_pldt_yes}
                         checked={!!dataSurveyCheck.q17_pldt_yes}
              onChange={() => handleChange('q17_pldt', 'q17_pldt_yes')}
                        />
                          <label htmlFor="chk_q17_pldt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={129} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_pldt_no" name="chk_q17_pldt" ng-checked={dataItem?.survey.card.q17_pldt_no}
                        checked={!!dataSurveyCheck.q17_pldt_no}
              onChange={() => handleChange('q17_pldt', 'q17_pldt_no')}
                        />
                          <label htmlFor="chk_q17_pldt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={130} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_pldt_unknown" name="chk_q17_pldt" ng-checked={dataItem?.survey.card.q17_pldt_unknown}
                        checked={!!dataSurveyCheck.q17_pldt_unknown}
              onChange={() => handleChange('q17_pldt', 'q17_pldt_unknown')}
                        />
                          <label htmlFor="chk_q17_pldt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Bệnh Crohn/ Viêm loét đại tràng:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={131} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_vldt_yes" name="chk_q17_vldt" ng-checked={dataItem?.survey.card.q17_vldt_yes}
                           checked={!!dataSurveyCheck.q17_vldt_yes}
              onChange={() => handleChange('q17_vldt', 'q17_vldt_yes')}
                        />
                          <label htmlFor="chk_q17_vldt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={132} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_vldt_no" name="chk_q17_vldt" ng-checked={dataItem?.survey.card.q17_vldt_no}
                        checked={!!dataSurveyCheck.q17_vldt_no}
              onChange={() => handleChange('q17_vldt', 'q17_vldt_no')}
                        />
                          <label htmlFor="chk_q17_vldt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={133} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_vldt_unknown" name="chk_q17_vldt" ng-checked={dataItem?.survey.card.q17_vldt_unknown}
                        checked={!!dataSurveyCheck.q17_vldt_unknown}
              onChange={() => handleChange('q17_vldt', 'q17_vldt_unknown')}
                        />
                          <label htmlFor="chk_q17_vldt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đái tháo đường:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={134} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_dtd_yes" name="chk_q17_dtd" ng-checked={dataItem?.survey.card.q17_dtd_yes}
                         checked={!!dataSurveyCheck.q17_dtd_yes}
              onChange={() => handleChange('q17_dtd', 'q17_dtd_yes')}
                        />
                          <label htmlFor="chk_q17_dtd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={135} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_dtd_no" name="chk_q17_dtd" ng-checked={dataItem?.survey.card.q17_dtd_no}
                           checked={!!dataSurveyCheck.q17_dtd_no}
              onChange={() => handleChange('q17_dtd', 'q17_dtd_no')}
                        />
                          <label htmlFor="chk_q17_dtd_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={136} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_dtd_unknown" name="chk_q17_dtd" ng-checked={dataItem?.survey.card.q17_dtd_unknown}
                           checked={!!dataSurveyCheck.q17_dtd_unknown}
              onChange={() => handleChange('q17_dtd', 'q17_dtd_unknown')}
                        />
                          <label htmlFor="chk_q17_dtd_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Rối loạn tâm thần:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={137} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_rltt_yes" name="chk_q17_rltt" ng-checked={dataItem?.survey.card.q17_rltt_yes}
                         checked={!!dataSurveyCheck.q17_rltt_yes}
              onChange={() => handleChange('q17_rltt', 'q17_rltt_yes')}
                        />
                          <label htmlFor="chk_q17_rltt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={138} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_rltt_no" name="chk_q17_rltt" ng-checked={dataItem?.survey.card.q17_rltt_no}
                        checked={!!dataSurveyCheck.q17_rltt_no}
              onChange={() => handleChange('q17_rltt', 'q17_rltt_no')}
                        />
                          <label htmlFor="chk_q17_rltt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={139} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_rltt_unknown" name="chk_q17_rltt" ng-checked={dataItem?.survey.card.q17_rltt_unknown}
                        checked={!!dataSurveyCheck.q17_rltt_unknown}
              onChange={() => handleChange('q17_rltt', 'q17_rltt_unknown')}
                        />
                          <label htmlFor="chk_q17_rltt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Ung thư thực quản/ rối loạn thực quản:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={140} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_uttq_yes" name="chk_q17_uttq" ng-checked={dataItem?.survey.card.q17_uttq_yes}
                           checked={!!dataSurveyCheck.q17_uttq_yes}
              onChange={() => handleChange('q17_uttq', 'q17_uttq_yes')}
                        />
                          <label htmlFor="chk_q17_uttq_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={141} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_uttq_no" name="chk_q17_uttq" ng-checked={dataItem?.survey.card.q17_uttq_no}
                        checked={!!dataSurveyCheck.q17_uttq_no}
              onChange={() => handleChange('q17_uttq', 'q17_uttq_no')}
                        />
                          <label htmlFor="chk_q17_uttq_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={142} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_uttq_unknown" name="chk_q17_uttq" ng-checked={dataItem?.survey.card.q17_uttq_unknown}
                         checked={!!dataSurveyCheck.q17_uttq_unknown}
              onChange={() => handleChange('q17_uttq', 'q17_uttq_unknown')}
                        />
                          <label htmlFor="chk_q17_uttq_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh túi mật:</div>
                     <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={143} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_btm_yes" name="chk_q17_btm" ng-checked={dataItem?.survey.card.q17_btm_yes}
                           checked={!!dataSurveyCheck.q17_btm_yes}
              onChange={() => handleChange('q17_btm', 'q17_btm_yes')}
                        />
                          <label htmlFor="chk_q17_btm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={144} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_btm_no" name="chk_q17_btm" ng-checked={dataItem?.survey.card.q17_btm_no}
                         checked={!!dataSurveyCheck.q17_btm_no}
              onChange={() => handleChange('q17_btm', 'q17_btm_no')}
                        />
                          <label htmlFor="chk_q17_btm_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={145} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_btm_unknown" name="chk_q17_btm" ng-checked={dataItem?.survey.card.q17_btm_unknown}
                         checked={!!dataSurveyCheck.q17_btm_unknown}
              onChange={() => handleChange('q17_btm', 'q17_btm_unknown')}
                        />
                          <label htmlFor="chk_q17_btm_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh tim mạch:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={146} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_btim_yes" name="chk_q17_btim" ng-checked={dataItem?.survey.card.q17_btim_yes}
                        checked={!!dataSurveyCheck.q17_btim_yes}
              onChange={() => handleChange('q17_btim', 'q17_btim_yes')}
                        />
                          <label htmlFor="chk_q17_btim_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={147} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_btim_no" name="chk_q17_btim" ng-checked={dataItem?.survey.card.q17_btim_no}
                        checked={!!dataSurveyCheck.q17_btim_no}
              onChange={() => handleChange('q17_btim', 'q17_btim_no')}
                        />
                          <label htmlFor="chk_q17_btim_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={148} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_btim_unknown" name="chk_q17_btim" ng-checked={dataItem?.survey.card.q17_btim_unknown}
                        checked={!!dataSurveyCheck.q17_btim_unknown}
              onChange={() => handleChange('q17_btim', 'q17_btim_unknown')}
                        />
                          <label htmlFor="chk_q17_btim_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div>
              </div></div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Tăng huyết áp:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={149} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_tha_yes" name="chk_q17_tha" ng-checked={dataItem?.survey.card.q17_tha_yes}
                         checked={!!dataSurveyCheck.q17_tha_yes}
              onChange={() => handleChange('q17_tha', 'q17_tha_yes')}
                        />
                          <label htmlFor="chk_q17_tha_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={150} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_tha_no" name="chk_q17_tha" ng-checked={dataItem?.survey.card.q17_tha_no}
                           checked={!!dataSurveyCheck.q17_tha_no}
              onChange={() => handleChange('q17_tha', 'q17_tha_no')}
                        />
                          <label htmlFor="chk_q17_tha_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={151} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_tha_unknown" name="chk_q17_tha" ng-checked={dataItem?.survey.card.q17_tha_unknown}
                           checked={!!dataSurveyCheck.q17_tha_unknown}
              onChange={() => handleChange('q17_tha', 'q17_tha_unknown')}
                        />
                          <label htmlFor="chk_q17_tha_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bệnh thận:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={152} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_bt_yes" name="chk_q17_bt" ng-checked={dataItem?.survey.card.q17_bt_yes}
                        checked={!!dataSurveyCheck.q17_bt_yes}
              onChange={() => handleChange('q17_bt', 'q17_bt_yes')}
                        />
                          <label htmlFor="chk_q17_bt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={153} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_bt_no" name="chk_q17_bt" ng-checked={dataItem?.survey.card.q17_bt_no}
                          checked={!!dataSurveyCheck.q17_bt_no}
              onChange={() => handleChange('q17_bt', 'q17_bt_no')}
                        />
                          <label htmlFor="chk_q17_bt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={154} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_bt_unknown" name="chk_q17_bt" ng-checked={dataItem?.survey.card.q17_bt_unknown}
                          checked={!!dataSurveyCheck.q17_bt_unknown}
              onChange={() => handleChange('q17_bt', 'q17_bt_unknown')}
                        />
                          <label htmlFor="chk_q17_bt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{marginBottom: "5px" }}>Ung thư buồng trứng:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={155} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utbt_yes" name="chk_q17_utbt" ng-checked={dataItem?.survey.card.q17_utbt_yes}
                        checked={!!dataSurveyCheck.q17_utbt_yes}
              onChange={() => handleChange('q17_utbt', 'q17_utbt_yes')}
                        />
                          <label htmlFor="chk_q17_utbt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={156} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utbt_no" name="chk_q17_utbt" ng-checked={dataItem?.survey.card.q17_utbt_no}
                         checked={!!dataSurveyCheck.q17_utbt_no}
              onChange={() => handleChange('q17_utbt', 'q17_utbt_no')}
                        />
                          <label htmlFor="chk_q17_utbt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={157} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utbt_unknown" name="chk_q17_utbt" ng-checked={dataItem?.survey.card.q17_utbt_unknown}
                         checked={!!dataSurveyCheck.q17_utbt_unknown}
              onChange={() => handleChange('q17_utbt', 'q17_utbt_unknown')}
                        />
                          <label htmlFor="chk_q17_utbt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ung thư tụy/bệnh lý tụy:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={158} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utt_yes" name="chk_q17_utt" ng-checked={dataItem?.survey.card.q17_utt_yes}
                        checked={!!dataSurveyCheck.q17_utt_yes}
              onChange={() => handleChange('q17_utt', 'q17_utt_yes')}
                        />
                          <label htmlFor="chk_q17_utt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={159} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utt_no" name="chk_q17_utt" ng-checked={dataItem?.survey.card.q17_utt_no}
                        checked={!!dataSurveyCheck.q17_utt_no}
              onChange={() => handleChange('q17_utt', 'q17_utt_no')}
                        />
                          <label htmlFor="chk_q17_utt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={160} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utt_unknown" name="chk_q17_utt" ng-checked={dataItem?.survey.card.q17_utt_unknown}
                        checked={!!dataSurveyCheck.q17_utt_unknown}
              onChange={() => handleChange('q17_utt', 'q17_utt_unknown')}
                        />
                          <label htmlFor="chk_q17_utt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Loét dạ dày – tá tràng:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={161} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_lddtt_yes" name="chk_q17_lddtt" ng-checked={dataItem?.survey.card.q17_lddtt_yes}
                        checked={!!dataSurveyCheck.q17_lddtt_yes}
              onChange={() => handleChange('q17_lddtt', 'q17_lddtt_yes')}
                        />
                          <label htmlFor="chk_q17_lddtt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={162} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_lddtt_no" name="chk_q17_lddtt" ng-checked={dataItem?.survey.card.q17_lddtt_no}
                           checked={!!dataSurveyCheck.q17_lddtt_no}
              onChange={() => handleChange('q17_lddtt', 'q17_lddtt_no')}
                        />
                          <label htmlFor="chk_q17_lddtt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={163} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_lddtt_unknown" name="chk_q17_lddtt" ng-checked={dataItem?.survey.card.q17_lddtt_unknown}
                           checked={!!dataSurveyCheck.q17_lddtt_unknown}
              onChange={() => handleChange('q17_lddtt', 'q17_lddtt_unknown')}
                        />
                          <label htmlFor="chk_q17_lddtt_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Polyp dạ dày/ ung thư dạ dày:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={164} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_pldd_yes" name="chk_q17_pldd" ng-checked={dataItem?.survey.card.q17_pldd_yes}
                         checked={!!dataSurveyCheck.q17_pldd_yes}
              onChange={() => handleChange('q17_pldd', 'q17_pldd_yes')}
                        />
                          <label htmlFor="chk_q17_pldd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={165} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_pldd_no" name="chk_q17_pldd" ng-checked={dataItem?.survey.card.q17_pldd_no}
                        checked={!!dataSurveyCheck.q17_pldd_no}
              onChange={() => handleChange('q17_pldd', 'q17_pldd_no')}
                        />
                          <label htmlFor="chk_q17_pldd_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={166} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_pldd_unknown" name="chk_q17_pldd" ng-checked={dataItem?.survey.card.q17_pldd_unknown}
                        checked={!!dataSurveyCheck.q17_pldd_unknown}
              onChange={() => handleChange('q17_pldd', 'q17_pldd_unknown')}
                        />
                          <label htmlFor="chk_q17_pldd_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đột quỵ/ tai biến mạch máu não/ động kinh:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={167} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_dq_yes" name="chk_q17_dq" ng-checked={dataItem?.survey.card.q17_dq_yes}
                          checked={!!dataSurveyCheck.q17_dq_yes}
              onChange={() => handleChange('q17_dq', 'q17_dq_yes')}
                        />
                          <label htmlFor="chk_q17_dq_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={168} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_dq_no" name="chk_q17_dq" ng-checked={dataItem?.survey.card.q17_dq_no}
                         checked={!!dataSurveyCheck.q17_dq_no}
              onChange={() => handleChange('q17_dq', 'q17_dq_no')}
                        />
                          <label htmlFor="chk_q17_dq_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={169} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_dq_unknown" name="chk_q17_dq" ng-checked={dataItem?.survey.card.q17_dq_unknown}
                         checked={!!dataSurveyCheck.q17_dq_unknown}
              onChange={() => handleChange('q17_dq', 'q17_dq_unknown')}
                        />
                          <label htmlFor="chk_q17_dq_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Các loại ung thư khác:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={170} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utk_yes" name="chk_q17_utk" ng-checked={dataItem?.survey.card.q17_utk_yes}
                         checked={!!dataSurveyCheck.q17_utk_yes}
              onChange={() => handleChange('q17_utk', 'q17_utk_yes')}
                        />
                          <label htmlFor="chk_q17_utk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={171} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utk_no" name="chk_q17_utk" ng-checked={dataItem?.survey.card.q17_utk_no}
                         checked={!!dataSurveyCheck.q17_utk_no}
              onChange={() => handleChange('q17_utk', 'q17_utk_no')}
                        />
                          <label htmlFor="chk_q17_utk_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={172} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q17_utk_unknown" name="chk_q17_utk" ng-checked={dataItem?.survey.card.q17_utk_unknown}
                          checked={!!dataSurveyCheck.q17_utk_unknown}
              onChange={() => handleChange('q17_utk', 'q17_utk_unknown')}
                        />
                          <label htmlFor="chk_q17_utk_unknown" className="custom-control-label cursor-pointer">Không rõ</label>
                      </div>
                  </div></div>
              </div>
          </div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-12 font-14 font-weight-bold" style={{fontWeight:"600",marginBottom:"5px", marginTop:"10px"}}>18. {dataItem?.survey.card.q18}</div>
      </div>
      <div className="row htmlForm-group">
          <div className="col-sm-7">
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Mệt mỏi:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={173} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_mm_yes" name="chk_q18_mm" ng-checked={dataItem?.survey.card.q18_mm_yes}
                          checked={!!dataSurveyCheck.q18_mm_yes}
              onChange={() => handleChange('q18_mm', 'q18_mm_yes')}
                        />
                          <label htmlFor="chk_q18_mm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={174} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_mm_no" name="chk_q18_mm" ng-checked={dataItem?.survey.card.q18_mm_no}
                        checked={!!dataSurveyCheck.q18_mm_no}
              onChange={() => handleChange('q18_mm', 'q18_mm_no')}
                        />
                          <label htmlFor="chk_q18_mm_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{marginBottom: "5px" }}>Chán ăn:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={175} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ca_yes" name="chk_q18_ca" ng-checked={dataItem?.survey.card.q18_ca_yes}
                         checked={!!dataSurveyCheck.q18_ca_yes}
              onChange={() => handleChange('q18_ca', 'q18_ca_yes')}
                        />
                          <label htmlFor="chk_q18_ca_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={176} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ca_no" name="chk_q18_ca" ng-checked={dataItem?.survey.card.q18_ca_no}
                           checked={!!dataSurveyCheck.q18_ca_no}
              onChange={() => handleChange('q18_ca', 'q18_ca_no')}
                        />
                          <label htmlFor="chk_q18_ca_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Sút cân:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={177} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_sc_yes" name="chk_q18_sc" ng-checked={dataItem?.survey.card.q18_sc_yes}
                         checked={!!dataSurveyCheck.q18_sc_yes}
              onChange={() => handleChange('q18_sc', 'q18_sc_yes')}
                        />
                          <label htmlFor="chk_q18_sc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={178} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_sc_no" name="chk_q18_sc" ng-checked={dataItem?.survey.card.q18_sc_no}
                         checked={!!dataSurveyCheck.q18_sc_no}
              onChange={() => handleChange('q18_sc', 'q18_sc_no')}
                        />
                          <label htmlFor="chk_q18_sc_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Sốt:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={179} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_s_yes" name="chk_q18_s" ng-checked={dataItem?.survey.card.q18_s_yes}
                        checked={!!dataSurveyCheck.q18_s_yes}
              onChange={() => handleChange('q18_s', 'q18_s_yes')}
                        />
                          <label htmlFor="chk_q18_s_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={180} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_s_no" name="chk_q18_s" ng-checked={dataItem?.survey.card.q18_s_no}
                          checked={!!dataSurveyCheck.q18_s_no}
              onChange={() => handleChange('q18_s', 'q18_s_no')}
                        />
                          <label htmlFor="chk_q18_s_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Lạnh run:</div>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={181} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_lr_yes" name="chk_q18_lr" ng-checked={dataItem?.survey.card.q18_lr_yes}
                          checked={!!dataSurveyCheck.q18_lr_yes}
              onChange={() => handleChange('q18_lr', 'q18_lr_yes')}
                        />
                          <label htmlFor="chk_q18_lr_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={182} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_lr_no" name="chk_q18_lr" ng-checked={dataItem?.survey.card.q18_lr_no}
                          checked={!!dataSurveyCheck.q18_lr_no}
              onChange={() => handleChange('q18_lr', 'q18_lr_no')}
                        />
                          <label htmlFor="chk_q18_lr_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đổ mồ hôi trộm về đêm:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={183} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dmhtvd_yes" name="chk_q18_dmhtvd" ng-checked={dataItem?.survey.card.q18_dmhtvd_yes}
                        checked={!!dataSurveyCheck.q18_dmhtvd_yes}
              onChange={() => handleChange('q18_dmhtvd', 'q18_dmhtvd_yes')}
                        />
                          <label htmlFor="chk_q18_dmhtvd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={184} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dmhtvd_no" name="chk_q18_dmhtvd" ng-checked={dataItem?.survey.card.q18_dmhtvd_no}
                        checked={!!dataSurveyCheck.q18_dmhtvd_no}
              onChange={() => handleChange('q18_dmhtvd', 'q18_dmhtvd_no')}
                        />
                          <label htmlFor="chk_q18_dmhtvd_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Các vấn đề về mắt, mũi, tai, họng:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={185} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_cvdvmmth_yes" name="chk_q18_cvdvmmth" ng-checked={dataItem?.survey.card.q18_cvdvmmth_yes}
                        checked={!!dataSurveyCheck.q18_cvdvmmth_yes}
              onChange={() => handleChange('q18_cvdvmmth', 'q18_cvdvmmth_yes')}
                        />
                          <label htmlFor="chk_q18_cvdvmmth_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={186} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_cvdvmmth_no" name="chk_q18_cvdvmmth" ng-checked={dataItem?.survey.card.q18_cvdvmmth_no}
                        checked={!!dataSurveyCheck.q18_cvdvmmth_no}
              onChange={() => handleChange('q18_cvdvmmth', 'q18_cvdvmmth_no')}
                        />
                          <label htmlFor="chk_q18_cvdvmmth_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Chảy máu mũi:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={187} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_cmm_yes" name="chk_q18_cmm" ng-checked={dataItem?.survey.card.q18_cmm_yes}
                         checked={!!dataSurveyCheck.q18_cmm_yes}
              onChange={() => handleChange('q18_cmm', 'q18_cmm_yes')}
                        />
                          <label htmlFor="chk_q18_cmm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={188} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_cmm_no" name="chk_q18_cmm" ng-checked={dataItem?.survey.card.q18_cmm_no}
                         checked={!!dataSurveyCheck.q18_cmm_no}
              onChange={() => handleChange('q18_cmm', 'q18_cmm_no')}
                        />
                          <label htmlFor="chk_q18_cmm_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Loét miệng:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={189} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_lm_yes" name="chk_q18_lm" ng-checked={dataItem?.survey.card.q18_lm_yes}
                         checked={!!dataSurveyCheck.q18_lm_yes}
              onChange={() => handleChange('q18_lm', 'q18_lm_yes')}
                        />
                          <label htmlFor="chk_q18_lm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={190} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_lm_no" name="chk_q18_lm" ng-checked={dataItem?.survey.card.q18_lm_no}
                        checked={!!dataSurveyCheck.q18_lm_no}
              onChange={() => handleChange('q18_lm', 'q18_lm_no')}
                        />
                          <label htmlFor="chk_q18_lm_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đau mắt:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={191} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dm_yes" name="chk_q18_dm" ng-checked={dataItem?.survey.card.q18_dm_yes}
                        checked={!!dataSurveyCheck.q18_dm_yes}
              onChange={() => handleChange('q18_dm', 'q18_dm_yes')}
                        />
                          <label htmlFor="chk_q18_dm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={192} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dm_no" name="chk_q18_dm" ng-checked={dataItem?.survey.card.q18_dm_no}
                        checked={!!dataSurveyCheck.q18_dm_no}
              onChange={() => handleChange('q18_dm', 'q18_dm_no')}
                        />
                          <label htmlFor="chk_q18_dm_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ho khan:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={193} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_hk_yes" name="chk_q18_hk" ng-checked={dataItem?.survey.card.q18_hk_yes}
                        checked={!!dataSurveyCheck.q18_hk_yes}
              onChange={() => handleChange('q18_hk', 'q18_hk_yes')}
                        />
                          <label htmlFor="chk_q18_hk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={194} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_hk_no" name="chk_q18_hk" ng-checked={dataItem?.survey.card.q18_hk_no}
                        checked={!!dataSurveyCheck.q18_hk_no}
              onChange={() => handleChange('q18_hk', 'q18_hk_no')}
                        />
                          <label htmlFor="chk_q18_hk_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Ho đàm:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={195} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_hd_yes" name="chk_q18_hd" ng-checked={dataItem?.survey.card.q18_hd_yes}
                        checked={!!dataSurveyCheck.q18_hd_yes}
              onChange={() => handleChange('q18_hd', 'q18_hd_yes')}
                        />
                          <label htmlFor="chk_q18_hd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={196} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_hd_no" name="chk_q18_hd" ng-checked={dataItem?.survey.card.q18_hd_no}
                         checked={!!dataSurveyCheck.q18_hd_no}
              onChange={() => handleChange('q18_hd', 'q18_hd_no')}
                        />
                          <label htmlFor="chk_q18_hd_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Khò khè:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={197} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_kk_yes" name="chk_q18_kk" ng-checked={dataItem?.survey.card.q18_kk_yes}
                        checked={!!dataSurveyCheck.q18_kk_yes}
              onChange={() => handleChange('q18_kk', 'q18_kk_yes')}
                        />
                          <label htmlFor="chk_q18_kk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={198} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_kk_no" name="chk_q18_kk" ng-checked={dataItem?.survey.card.q18_kk_no}
                          checked={!!dataSurveyCheck.q18_kk_no}
              onChange={() => handleChange('q18_kk', 'q18_kk_no')}
                        />
                          <label htmlFor="chk_q18_kk_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Khó thở khi gắng sức:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={199} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ktkgs_yes" name="chk_q18_ktkgs" ng-checked={dataItem?.survey.card.q18_ktkgs_yes}
                        checked={!!dataSurveyCheck.q18_ktkgs_yes}
              onChange={() => handleChange('q18_ktkgs', 'q18_ktkgs_yes')}
                        />
                          <label htmlFor="chk_q18_ktkgs_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={200} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ktkgs_no" name="chk_q18_ktkgs" ng-checked={dataItem?.survey.card.q18_ktkgs_no}
                         checked={!!dataSurveyCheck.q18_ktkgs_no}
              onChange={() => handleChange('q18_ktkgs', 'q18_ktkgs_no')}
                        />
                          <label htmlFor="chk_q18_ktkgs_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Khó thở cả khi nghỉ ngơi:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={201} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ktcknn_yes" name="chk_q18_ktcknn" ng-checked={dataItem?.survey.card.q18_ktcknn_yes}
                        checked={!!dataSurveyCheck.q18_ktcknn_yes}
              onChange={() => handleChange('q18_ktcknn', 'q18_ktcknn_yes')}
                        />
                          <label htmlFor="chk_q18_ktcknn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={202} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ktcknn_no" name="chk_q18_ktcknn" ng-checked={dataItem?.survey.card.q18_ktcknn_no}
                        checked={!!dataSurveyCheck.q18_ktcknn_no}
              onChange={() => handleChange('q18_ktcknn', 'q18_ktcknn_no')}
                        />
                          <label htmlFor="chk_q18_ktcknn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Khó thở cả khi nằm:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={203} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ktckn_yes" name="chk_q18_ktckn" ng-checked={dataItem?.survey.card.q18_ktckn_yes}
                         checked={!!dataSurveyCheck.q18_ktckn_yes}
              onChange={() => handleChange('q18_ktckn', 'q18_ktckn_yes')}
                        />
                          <label htmlFor="chk_q18_ktckn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={204} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ktckn_no" name="chk_q18_ktckn" ng-checked={dataItem?.survey.card.q18_ktckn_no}
                         checked={!!dataSurveyCheck.q18_ktckn_no}
              onChange={() => handleChange('q18_ktckn', 'q18_ktckn_no')}
                        />
                          <label htmlFor="chk_q18_ktckn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đau ngực:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={205} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dn_yes" name="chk_q18_dn" ng-checked={dataItem?.survey.card.q18_dn_yes}
                           checked={!!dataSurveyCheck.q18_dn_yes}
              onChange={() => handleChange('q18_dn', 'q18_dn_yes')}
                        />
                          <label htmlFor="chk_q18_dn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={206} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dn_no" name="chk_q18_dn" ng-checked={dataItem?.survey.card.q18_dn_no}
                           checked={!!dataSurveyCheck.q18_dn_no}
              onChange={() => handleChange('q18_dn', 'q18_dn_no')}
                        />
                          <label htmlFor="chk_q18_dn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Tim đập không đều:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={207} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_tdkd_yes" name="chk_q18_tdkd" ng-checked={dataItem?.survey.card.q18_tdkd_yes}
                        checked={!!dataSurveyCheck.q18_tdkd_yes}
              onChange={() => handleChange('q18_tdkd', 'q18_tdkd_yes')}
                        />
                          <label htmlFor="chk_q18_tdkd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={208} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_tdkd_no" name="chk_q18_tdkd" ng-checked={dataItem?.survey.card.q18_tdkd_no}
                        checked={!!dataSurveyCheck.q18_tdkd_no}
              onChange={() => handleChange('q18_tdkd', 'q18_tdkd_no')}
                        />
                          <label htmlFor="chk_q18_tdkd_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Phù chân:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={209} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_pc_yes" name="chk_q18_pc" ng-checked={dataItem?.survey.card.q18_pc_yes}
                        checked={!!dataSurveyCheck.q18_pc_yes}
              onChange={() => handleChange('q18_pc', 'q18_pc_yes')}
                        />
                          <label htmlFor="chk_q18_pc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={210} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_pc_no" name="chk_q18_pc" ng-checked={dataItem?.survey.card.q18_pc_no}
                        checked={!!dataSurveyCheck.q18_pc_no}
              onChange={() => handleChange('q18_pc', 'q18_pc_no')}
                        />
                          <label htmlFor="chk_q18_pc_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đau nhức chân khi đi lại hoặc khi tập thể thao:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={211} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dnc_yes" name="chk_q18_dnc" ng-checked={dataItem?.survey.card.q18_dnc_yes}
                        checked={!!dataSurveyCheck.q18_dnc_yes}
              onChange={() => handleChange('q18_dnc', 'q18_dnc_yes')}
                        />
                          <label htmlFor="chk_q18_dnc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={212} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dnc_no" name="chk_q18_dnc" ng-checked={dataItem?.survey.card.q18_dnc_no}
                        checked={!!dataSurveyCheck.q18_dnc_no}
              onChange={() => handleChange('q18_dnc', 'q18_dnc_no')}
                        />
                          <label htmlFor="chk_q18_dnc_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đau nhức chân cả khi nghỉ ngơi:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={213} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dnccknn_yes" name="chk_q18_dnccknn" ng-checked={dataItem?.survey.card.q18_dnccknn_yes}
                         checked={!!dataSurveyCheck.q18_dnccknn_yes}
              onChange={() => handleChange('q18_dnccknn', 'q18_dnccknn_yes')}
                        />
                          <label htmlFor="chk_q18_dnccknn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={214} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dnccknn_no" name="chk_q18_dnccknn" ng-checked={dataItem?.survey.card.q18_dnccknn_no}
                         checked={!!dataSurveyCheck.q18_dnccknn_no}
              onChange={() => handleChange('q18_dnccknn', 'q18_dnccknn_no')}
                        />
                          <label htmlFor="chk_q18_dnccknn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đau lưng:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={215} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dl_yes" name="chk_q18_dl" ng-checked={dataItem?.survey.card.q18_dl_yes}
                           checked={!!dataSurveyCheck.q18_dl_yes}
              onChange={() => handleChange('q18_dl', 'q18_dl_yes')}
                        />
                          <label htmlFor="chk_q18_dl_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={216} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dl_no" name="chk_q18_dl" ng-checked={dataItem?.survey.card.q18_dl_no}
                         checked={!!dataSurveyCheck.q18_dl_no}
              onChange={() => handleChange('q18_dl', 'q18_dl_no')}
                        />
                          <label htmlFor="chk_q18_dl_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Không thể chịu được nóng hoặc lạnh:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={217} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ktcdnhl_yes" name="chk_q18_ktcdnhl" ng-checked={dataItem?.survey.card.q18_ktcdnhl_yes}
                         checked={!!dataSurveyCheck.q18_ktcdnhl_yes}
              onChange={() => handleChange('q18_ktcdnhl', 'q18_ktcdnhl_yes')}
                        />
                          <label htmlFor="chk_q18_ktcdnhl_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={218} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ktcdnhl_no" name="chk_q18_ktcdnhl" ng-checked={dataItem?.survey.card.q18_ktcdnhl_no}
                          checked={!!dataSurveyCheck.q18_ktcdnhl_no}
              onChange={() => handleChange('q18_ktcdnhl', 'q18_ktcdnhl_no')}
                        />
                          <label htmlFor="chk_q18_ktcdnhl_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Run tay:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={219} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_rt_yes" name="chk_q18_rt" ng-checked={dataItem?.survey.card.q18_rt_yes}
                        checked={!!dataSurveyCheck.q18_rt_yes}
              onChange={() => handleChange('q18_rt', 'q18_rt_yes')}
                        />
                          <label htmlFor="chk_q18_rt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={220} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_rt_no" name="chk_q18_rt" ng-checked={dataItem?.survey.card.q18_rt_no}
                        checked={!!dataSurveyCheck.q18_rt_no}
              onChange={() => handleChange('q18_rt', 'q18_rt_no')}
                        />
                          <label htmlFor="chk_q18_rt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Rậm lông tóc:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={221} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_rlt_yes" name="chk_q18_rlt" ng-checked={dataItem?.survey.card.q18_rlt_yes}
                          checked={!!dataSurveyCheck.q18_rlt_yes}
              onChange={() => handleChange('q18_rlt', 'q18_rlt_yes')}
                        />
                          <label htmlFor="chk_q18_rlt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={222} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_rlt_no" name="chk_q18_rlt" ng-checked={dataItem?.survey.card.q18_rlt_no}
                         checked={!!dataSurveyCheck.q18_rlt_no}
              onChange={() => handleChange('q18_rlt', 'q18_rlt_no')}
                        />
                          <label htmlFor="chk_q18_rlt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Lông tóc thưa:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={223} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ltt_yes" name="chk_q18_ltt" ng-checked={dataItem?.survey.card.q18_ltt_yes}
                         checked={!!dataSurveyCheck.q18_ltt_yes}
              onChange={() => handleChange('q18_ltt', 'q18_ltt_yes')}
                        />
                          <label htmlFor="chk_q18_ltt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={224} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ltt_no" name="chk_q18_ltt" ng-checked={dataItem?.survey.card.q18_ltt_no}
                         checked={!!dataSurveyCheck.q18_ltt_no}
              onChange={() => handleChange('q18_ltt', 'q18_ltt_no')}
                        />
                          <label htmlFor="chk_q18_ltt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Khát nước nhiều:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={225} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_knn_yes" name="chk_q18_knn" ng-checked={dataItem?.survey.card.q18_knn_yes}
                         checked={!!dataSurveyCheck.q18_knn_yes}
              onChange={() => handleChange('q18_knn', 'q18_knn_yes')}
                        />
                          <label htmlFor="chk_q18_knn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={226} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_knn_no" name="chk_q18_knn" ng-checked={dataItem?.survey.card.q18_knn_no}
                        checked={!!dataSurveyCheck.q18_knn_no}
              onChange={() => handleChange('q18_knn', 'q18_knn_no')}
                        />
                          <label htmlFor="chk_q18_knn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đi tiểu nhiều:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={227} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dtn_yes" name="chk_q18_dtn" ng-checked={dataItem?.survey.card.q18_dtn_yes}
                          checked={!!dataSurveyCheck.q18_dtn_yes}
              onChange={() => handleChange('q18_dtn', 'q18_dtn_yes')}
                        />
                          <label htmlFor="chk_q18_dtn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={228} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dtn_no" name="chk_q18_dtn" ng-checked={dataItem?.survey.card.q18_dtn_no}
                          checked={!!dataSurveyCheck.q18_dtn_no}
              onChange={() => handleChange('q18_dtn', 'q18_dtn_no')}
                        />
                          <label htmlFor="chk_q18_dtn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Nuốt khó/ nghẹn:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={229} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_nkn_yes" name="chk_q18_nkn" ng-checked={dataItem?.survey.card.q18_nkn_yes}
                        checked={!!dataSurveyCheck.q18_nkn_yes}
              onChange={() => handleChange('q18_nkn', 'q18_nkn_yes')}
                        />
                          <label htmlFor="chk_q18_nkn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={230} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_nkn_no" name="chk_q18_nkn" ng-checked={dataItem?.survey.card.q18_nkn_no}
                        checked={!!dataSurveyCheck.q18_nkn_no}
              onChange={() => handleChange('q18_nkn', 'q18_nkn_yes')}
                        />
                          <label htmlFor="chk_q18_nkn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Nuốt đau:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={231} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_nd_yes" name="chk_q18_nd" ng-checked={dataItem?.survey.card.q18_nd_yes}
                         checked={!!dataSurveyCheck.q18_nd_yes}
              onChange={() => handleChange('q18_nd', 'q18_nd_yes')}
                        />
                          <label htmlFor="chk_q18_nd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={232} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_nd_no" name="chk_q18_nd" ng-checked={dataItem?.survey.card.q18_nd_no}
                          checked={!!dataSurveyCheck.q18_nd_no}
              onChange={() => handleChange('q18_nd', 'q18_nd_no')}
                        />
                          <label htmlFor="chk_q18_nd_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ợ nóng/ Ợ chua:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={233} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_onoc_yes" name="chk_q18_onoc" ng-checked={dataItem?.survey.card.q18_onoc_yes}
                         checked={!!dataSurveyCheck.q18_onoc_yes}
              onChange={() => handleChange('q18_onoc', 'q18_onoc_yes')}
                        />
                          <label htmlFor="chk_q18_onoc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={234} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_onoc_no" name="chk_q18_onoc" ng-checked={dataItem?.survey.card.q18_onoc_no}
                          checked={!!dataSurveyCheck.q18_onoc_no}
              onChange={() => handleChange('q18_onoc', 'q18_onoc_no')}
                        />
                          <label htmlFor="chk_q18_onoc_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ợ trớ thức ăn/dịch dạ dày:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={235} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_octa_yes" name="chk_q18_octa" ng-checked={dataItem?.survey.card.q18_octa_yes}
                         checked={!!dataSurveyCheck.q18_onoc_no}
              onChange={() => handleChange('q18_onoc', 'q18_onoc_no')}
                        />
                          <label htmlFor="chk_q18_octa_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={236} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_octa_no" name="chk_q18_octa" ng-checked={dataItem?.survey.card.q18_octa_no}
                         checked={!!dataSurveyCheck.q18_onoc_no}
              onChange={() => handleChange('q18_onoc', 'q18_onoc_no')}
                        />
                          <label htmlFor="chk_q18_octa_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Buồn nôn:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={237} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_bn_yes" name="chk_q18_bn" ng-checked={dataItem?.survey.card.q18_bn_yes}
                         checked={!!dataSurveyCheck.q18_bn_yes}
              onChange={() => handleChange('q18_bn', 'q18_bn_yes')}
                        />
                          <label htmlFor="chk_q18_bn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={238} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_bn_no" name="chk_q18_bn" ng-checked={dataItem?.survey.card.q18_bn_no}
                        checked={!!dataSurveyCheck.q18_bn_no}
              onChange={() => handleChange('q18_bn', 'q18_bn_no')}
                        />
                          <label htmlFor="chk_q18_bn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Nôn:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={239} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_n_yes" name="chk_q18_n" ng-checked={dataItem?.survey.card.q18_n_yes}
                        checked={!!dataSurveyCheck.q18_n_yes}
              onChange={() => handleChange('q18_n', 'q18_n_yes')}
                        />
                          <label htmlFor="chk_q18_n_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={240} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_n_no" name="chk_q18_n" ng-checked={dataItem?.survey.card.q18_n_no}
                        checked={!!dataSurveyCheck.q18_n_no}
              onChange={() => handleChange('q18_n', 'q18_n_no')}
                        />
                          <label htmlFor="chk_q18_n_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đau bụng:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={241} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_db_yes" name="chk_q18_db" ng-checked={dataItem?.survey.card.q18_db_yes}
                        checked={!!dataSurveyCheck.q18_db_yes}
              onChange={() => handleChange('q18_db', 'q18_db_yes')}
                        />
                          <label htmlFor="chk_q18_db_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={242} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_db_no" name="chk_q18_db" ng-checked={dataItem?.survey.card.q18_db_no}
                         checked={!!dataSurveyCheck.q18_db_no}
              onChange={() => handleChange('q18_db', 'q18_db_no')}
                        />
                          <label htmlFor="chk_q18_db_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Chướng bụng:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={243} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_cb_yes" name="chk_q18_cb" ng-checked={dataItem?.survey.card.q18_cb_yes}
                          checked={!!dataSurveyCheck.q18_cb_yes}
              onChange={() => handleChange('q18_cb', 'q18_cb_yes')}
                        />
                          <label htmlFor="chk_q18_cb_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={244} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_cb_no" name="chk_q18_cb" ng-checked={dataItem?.survey.card.q18_cb_no}
                        checked={!!dataSurveyCheck.q18_cb_no}
              onChange={() => handleChange('q18_cb', 'q18_cb_no')}
                        />
                          <label htmlFor="chk_q18_cb_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Tiêu chảy:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={245} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_tc_yes" name="chk_q18_tc" ng-checked={dataItem?.survey.card.q18_tc_yes}
                         checked={!!dataSurveyCheck.q18_tc_yes}
              onChange={() => handleChange('q18_tc', 'q18_tc_yes')}
                        />
                          <label htmlFor="chk_q18_tc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={246} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_tc_no" name="chk_q18_tc" ng-checked={dataItem?.survey.card.q18_tc_no}
                          checked={!!dataSurveyCheck.q18_tc_no}
              onChange={() => handleChange('q18_tc', 'q18_tc_no')}
                        />
                          <label htmlFor="chk_q18_tc_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Táo bón:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={247} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_tb_yes" name="chk_q18_tb" ng-checked={dataItem?.survey.card.q18_tb_yes}
                         checked={!!dataSurveyCheck.q18_tb_yes}
              onChange={() => handleChange('q18_tb', 'q18_tb_yes')}
                        />
                          <label htmlFor="chk_q18_tb_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={248} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_tb_no" name="chk_q18_tb" ng-checked={dataItem?.survey.card.q18_tb_no}
                          checked={!!dataSurveyCheck.q18_tb_no}
              onChange={() => handleChange('q18_tb', 'q18_tb_no')}
                        />
                          <label htmlFor="chk_q18_tb_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đi cầu ra máu:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={249} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dcrm_yes" name="chk_q18_dcrm" ng-checked={dataItem?.survey.card.q18_dcrm_yes}
                        checked={!!dataSurveyCheck.q18_dcrm_yes}
              onChange={() => handleChange('q18_dcrm', 'q18_dcrm_yes')}
                        />
                          <label htmlFor="chk_q18_dcrm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={250} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dcrm_no" name="chk_q18_dcrm" ng-checked={dataItem?.survey.card.q18_dcrm_no}
                         checked={!!dataSurveyCheck.q18_dcrm_no}
              onChange={() => handleChange('q18_dcrm', 'q18_dcrm_no')}
                        />
                          <label htmlFor="chk_q18_dcrm_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Vàng da:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={251} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_vd_yes" name="chk_q18_vd" ng-checked={dataItem?.survey.card.q18_vd_yes}
                        checked={!!dataSurveyCheck.q18_vd_yes}
              onChange={() => handleChange('q18_vd', 'q18_vd_yes')}
                        />
                          <label htmlFor="chk_q18_vd_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={252} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_vd_no" name="chk_q18_vd" ng-checked={dataItem?.survey.card.q18_vd_no}
                         checked={!!dataSurveyCheck.q18_vd_no}
              onChange={() => handleChange('q18_vd', 'q18_vd_no')}
                        />
                          <label htmlFor="chk_q18_vd_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Ngứa da mức độ nhiều:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={253} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ndmdn_yes" name="chk_q18_ndmdn" ng-checked={dataItem?.survey.card.q18_ndmdn_yes}
                        checked={!!dataSurveyCheck.q18_ndmdn_yes}
              onChange={() => handleChange('q18_ndmdn', 'q18_ndmdn_yes')}
                        />
                          <label htmlFor="chk_q18_ndmdn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={254} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ndmdn_no" name="chk_q18_ndmdn" ng-checked={dataItem?.survey.card.q18_ndmdn_no}
                          checked={!!dataSurveyCheck.q18_ndmdn_no}
              onChange={() => handleChange('q18_ndmdn', 'q18_ndmdn_no')}
                        />
                          <label htmlFor="chk_q18_ndmdn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đi cầu khó (phải rặn nhiều):</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={255} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dck_yes" name="chk_q18_dck" ng-checked={dataItem?.survey.card.q18_dck_yes}
                         checked={!!dataSurveyCheck.q18_dck_yes}
              onChange={() => handleChange('q18_dck', 'q18_dck_yes')}
                        />
                          <label htmlFor="chk_q18_dck_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={256} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dck_no" name="chk_q18_dck" ng-checked={dataItem?.survey.card.q18_dck_no}
                        checked={!!dataSurveyCheck.q18_dck_no}
              onChange={() => handleChange('q18_dck', 'q18_dck_no')}
                        />
                          <label htmlFor="chk_q18_dck_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Đi tiểu buốt:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={257} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dtb_yes" name="chk_q18_dtb" ng-checked={dataItem?.survey.card.q18_dtb_yes}
                         checked={!!dataSurveyCheck.q18_dtb_yes}
              onChange={() => handleChange('q18_dtb', 'q18_dtb_yes')}
                        />
                          <label htmlFor="chk_q18_dtb_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={258} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dtb_no" name="chk_q18_dtb" ng-checked={dataItem?.survey.card.q18_dtb_no}
                        checked={!!dataSurveyCheck.q18_dtb_no}
              onChange={() => handleChange('q18_dtb', 'q18_dtb_no')}
                        />
                          <label htmlFor="chk_q18_dtb_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Đau khớp:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={259} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dk_yes" name="chk_q18_dk" ng-checked={dataItem?.survey.card.q18_dk_yes}
                        checked={!!dataSurveyCheck.q18_dk_yes}
              onChange={() => handleChange('q18_dk', 'q18_dk_yes')}
                        />
                          <label htmlFor="chk_q18_dk_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={260} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_dk_no" name="chk_q18_dk" ng-checked={dataItem?.survey.card.q18_dk_no}
                         checked={!!dataSurveyCheck.q18_dk_no}
              onChange={() => handleChange('q18_dk', 'q18_dk_no')}
                        />
                          <label htmlFor="chk_q18_dk_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Lo âu:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={261} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_la_yes" name="chk_q18_la" ng-checked={dataItem?.survey.card.q18_la_yes}
                        checked={!!dataSurveyCheck.q18_la_yes}
              onChange={() => handleChange('q18_la', 'q18_la_yes')}
                        />
                          <label htmlFor="chk_q18_la_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={262} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_la_no" name="chk_q18_la" ng-checked={dataItem?.survey.card.q18_la_no}
                        checked={!!dataSurveyCheck.q18_la_no}
              onChange={() => handleChange('q18_la', 'q18_la_no')}
                        />
                          <label htmlFor="chk_q18_la_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Trầm cảm:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={263} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_trc_yes" name="chk_q18_trc" ng-checked={dataItem?.survey.card.q18_trc_yes}
                        checked={!!dataSurveyCheck.q18_trc_yes}
              onChange={() => handleChange('q18_trc', 'q18_trc_yes')}
                        />
                          <label htmlFor="chk_q18_trc_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={264} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_trc_no" name="chk_q18_trc" ng-checked={dataItem?.survey.card.q18_trc_no}
                        checked={!!dataSurveyCheck.q18_trc_no}
              onChange={() => handleChange('q18_trc', 'q18_trc_no')}
                        />
                          <label htmlFor="chk_q18_trc_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Bị ngất:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={265} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_bingat_yes" name="chk_q18_bingat" ng-checked={dataItem?.survey.card.q18_bingat_yes}
                         checked={!!dataSurveyCheck.q18_bingat_yes}
              onChange={() => handleChange('q18_bingat', 'q18_bingat_yes')}
                        />
                          <label htmlFor="chk_q18_bingat_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={266} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_bingat_no" name="chk_q18_bingat" ng-checked={dataItem?.survey.card.q18_bingat_no}
                        checked={!!dataSurveyCheck.q18_bingat_no}
              onChange={() => handleChange('q18_bingat', 'q18_bingat_no')}
                        />
                          <label htmlFor="chk_q18_bingat_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Chóng mặt:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={267} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_cm_yes" name="chk_q18_cm" ng-checked={dataItem?.survey.card.q18_cm_yes}
                        checked={!!dataSurveyCheck.q18_cm_yes}
              onChange={() => handleChange('q18_cm', 'q18_cm_yes')}
                        />
                          <label htmlFor="chk_q18_cm_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={268} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_cm_no" name="chk_q18_cm" ng-checked={dataItem?.survey.card.q18_cm_no}
                         checked={!!dataSurveyCheck.q18_cm_no}
              onChange={() => handleChange('q18_cm', 'q18_cm_no')}
                        />
                          <label htmlFor="chk_q18_cm_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Nhìn đôi/ song thị (nhìn thấy hai hình ảnh của một đối tượng):</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={269} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ndsn_yes" name="chk_q18_ndsn" ng-checked={dataItem?.survey.card.q18_ndsn_yes}
                          checked={!!dataSurveyCheck.q18_ndsn_yes}
              onChange={() => handleChange('q18_ndsn', 'q18_ndsn_yes')}
                        />
                          <label htmlFor="chk_q18_ndsn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={270} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_ndsn_no" name="chk_q18_ndsn" ng-checked={dataItem?.survey.card.q18_ndsn_no}
                          checked={!!dataSurveyCheck.q18_ndsn_no}
              onChange={() => handleChange('q18_ndsn', 'q18_ndsn_no')}
                        />
                          <label htmlFor="chk_q18_ndsn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Mất thăng bằng hoặc khả năng phối hợp động tác:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={271} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_mtb_yes" name="chk_q18_mtb" ng-checked={dataItem?.survey.card.q18_mtb_yes}
                         checked={!!dataSurveyCheck.q18_mtb_yes}
              onChange={() => handleChange('q18_mtb', 'q18_mtb_yes')}
                        />
                          <label htmlFor="chk_q18_mtb_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={272} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_mtb_no" name="chk_q18_mtb" ng-checked={dataItem?.survey.card.q18_mtb_no}
                        checked={!!dataSurveyCheck.q18_mtb_no}
              onChange={() => handleChange('q18_mtb', 'q18_mtb_no')}
                        />
                          <label htmlFor="chk_q18_mtb_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              <div className="row htmlForm-group">
                    <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Rối loạn ngôn ngữ:</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={273} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_rlnn_yes" name="chk_q18_rlnn" ng-checked={dataItem?.survey.card.q18_rlnn_yes}
                           checked={!!dataSurveyCheck.q18_rlnn_yes}
              onChange={() => handleChange('q18_rlnn', 'q18_rlnn_yes')}
                        />
                          <label htmlFor="chk_q18_rlnn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                        <input tabIndex={274} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_rlnn_no" name="chk_q18_rlnn" ng-checked={dataItem?.survey.card.q18_rlnn_no}
                        checked={!!dataSurveyCheck.q18_rlnn_no}
              onChange={() => handleChange('q18_rlnn', 'q18_rlnn_no')}
                        />
                          <label htmlFor="chk_q18_rlnn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
                  </div>
                  {
                    data?.customer?.gender?.id === "M" ?
                      <div className="row htmlForm-group" ng-show="dataItem.customer.gender != null && dataItem.customer.gender.id == 'M'">
                        <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Teo tinh hoàn:</div>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                            <input tabIndex={275} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_tth_yes" name="chk_q18_tth" ng-checked={dataItem?.survey.card.q18_tth_yes}
                            checked={!!dataSurveyCheck.q18_tth_yes}
              onChange={() => handleChange('q18_tth', 'q18_tth_yes')}
                            />
                          <label htmlFor="chk_q18_tth_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                            <input tabIndex={276} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_tth_no" name="chk_q18_tth" ng-checked={dataItem?.survey.card.q18_tth_no}
                            checked={!!dataSurveyCheck.q18_tth_no}
              onChange={() => handleChange('q18_tth', 'q18_tth_no')}
                            />
                          <label htmlFor="chk_q18_tth_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div> : <></>
                  }
                  {
                   data?.customer?.gender?.id === "M" ? <></> :
                       <div className="row htmlForm-group" ng-show="dataItem.customer.gender != null && dataItem.customer.gender.id == 'F'">
                        <div className="col-sm-6 font-weight-bold" style={{ marginBottom: "5px" }}>Rối loạn kinh nguyệt:</div>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                            <input tabIndex={277} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_rlkn_yes" name="chk_q18_rlkn" ng-checked={dataItem?.survey.card.q18_rlkn_yes}
                             checked={!!dataSurveyCheck.q18_rlkn_yes}
              onChange={() => handleChange('q18_rlkn', 'q18_rlkn_yes')}
                            />
                          <label htmlFor="chk_q18_rlkn_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                            <input tabIndex={278} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_rlkn_no" name="chk_q18_rlkn" ng-checked={dataItem?.survey.card.q18_rlkn_no}
                            checked={!!dataSurveyCheck.q18_rlkn_no}
              onChange={() => handleChange('q18_rlkn', 'q18_rlkn_no')}
                            />
                          <label htmlFor="chk_q18_rlkn_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
              }
                  {
                   data?.customer?.gender?.id === "M" ? <></> : 
                        <div className="row htmlForm-group" ng-show="dataItem.customer.gender != null && dataItem.customer.gender.id == 'F'">
                        <div className="col-sm-6 font-weight-bold" style={{  marginBottom: "5px" }}>Bạn có đang mang thai?</div>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"start",gap:"40px",marginBottom:"6px", paddingLeft:"40px"}}>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                            <input tabIndex={279} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_bcdmt_yes" name="chk_q18_bcdmt" ng-checked={dataItem?.survey.card.q18_bcdmt_yes}
                             checked={!!dataSurveyCheck.q18_bcdmt_yes}
              onChange={() => handleChange('q18_bcdmt', 'q18_bcdmt_yes')}
                            />
                          <label htmlFor="chk_q18_bcdmt_yes" className="custom-control-label cursor-pointer text-danger">Có</label>
                      </div>
                  </div>
                  <div className="col-sm-2">
                      <div className="custom-control custom-radio" style={{display:"flex", gap:"5px"}}>
                            <input tabIndex={280} className="custom-control-input cursor-pointer" style={{marginTop:"3px"}}  type="radio" id="chk_q18_bcdmt_no" name="chk_q18_bcdmt" 
                         checked={!!dataSurveyCheck.q18_bcdmt_no} 
              onChange={() => handleChange('q18_bcdmt', 'q18_bcdmt_no')}
                            />
                          <label htmlFor="chk_q18_bcdmt_no" className="custom-control-label cursor-pointer">Không</label>
                      </div>
                  </div></div>
              </div>
             }
            
          </div>
      </div>
  </div>
       </div>
       <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"15px",width:"100%"}}>
            <div
                 onClick={
                 ( dataItem?.survey.status === "new" || dataItem?.survey.status === "inprogress")
                    ? handleSaveSV
                    : navi
                }
              style={{ color: "white", fontSize: "14px", background: `${dataItem?.survey.status === "done" ? "#fe4d4d" : "#00556e"}`, width: "fit-content", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", padding: "8px", paddingLeft: "12px", paddingRight: "12px", borderRadius: "3px" }}>
            
   <Icon
                  icon= {dataItem?.survey.status === "done" ? "zi-close-circle" : "zi-note"}
                  size={20}
                  className="font-[500]"
                  style={{marginTop:"0.1rem"}}
                />           {dataItem?.survey.status === "new" ? "Hoàn thành": dataItem?.survey.status === "done" ? "Thoát"  : "Điều chỉnh"  }</div>
            </div>
          </div>
      }
        </>
      }
     
     
    </Page>
  );
}

export default ListSurvey;

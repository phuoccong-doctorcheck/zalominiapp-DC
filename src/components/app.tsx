import React from "react";
import { App } from "zmp-framework/react";
import { Route } from "react-router";
import ResultPage from "../pages/result";
import MedicalExamPage from "../pages/detailExams";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/common";
import { PersistGate } from "redux-persist/integration/react";
import { AnimationRoutes, SnackbarProvider, ZMPRouter } from "zmp-ui";
import PrescriptionDetail from "../pages/detailPrescription";
import CommingPage from "../pages/comming";
import { AuthenticationAccount } from "./custom/authen-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { getSystemInfo } from "zmp-sdk";
import HomePage from "../pages/dashboard";
import BookingPage from "../pages/booking";
import SurveyQuestionnaire from "../pages/booking/surveyQuestionnaire";
import TimePicker from "../pages/booking/timePicker";
import ProfilePicker from "../pages/booking/profilePicker";
import SymptomsPicker from "../pages/booking/symptomPicker";
import { Notification } from "../pages/notification";
import Introduce from "../pages/affilate";
import PackagePage from "../pages/package/package";
import PackageDetailPage from "../pages/package/detailPackage";
import FollowBooking from "../pages/booking/followBooking";
import CustomerInformation from "../pages/customerInfo";
import Relatives from "../pages/customerInfo/relatives";
import Incentives from "../pages/customerInfo/incentives";
import Redemption from "../pages/customerInfo/redemption";
import DetailRedemption from "../pages/customerInfo/detailRedemption";
import SupportCustomer from "../pages/supports";
import DetailBooking from "../pages/booking/detailBooking";
import RegisterPage from "../pages/register";
import AuthenticationPage from "../pages/authentication";
import GetPermission from "../pages/getPermision";
import InvoiceDetails from "../pages/payment/invoiceDetail";
import Example from "../pages/example";
import RegisterAccount from "../pages/register/registerAccount";
import SwitchProfile from "../pages/switchProfile";
import AbnormalResultPage from "../pages/abnormalResult";
import ListPointPage from "../pages/list-point/ListPointPage";
import ListRulePage from "../pages/list-rule/ListRulePage";
import ListSurvey from "../pages/list-survey/ListSurvey";
import Thanks from "../pages/thanks/Thanks";
import MedicalExamPageZNS from "../pages/detailExamsZNS";
import RegisterExamPage from "../pages/registerExam";

if (getSystemInfo().platform === "android") {
  document.body.style.setProperty("--zaui-safe-area-top", `0px`);
}

const MyApp = () => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <AuthenticationAccount>
            <App>
              <SnackbarProvider>
                <ZMPRouter>
                  <AnimationRoutes>
                    <Route path="/permission" element={<GetPermission />} />
                    <Route path="/dashboard" element={<HomePage />} />
                    <Route path="/" element={<AuthenticationPage />} />
                    <Route path="/404" element={<RegisterPage />} />
                    <Route
                      path="/create-account"
                      element={<RegisterAccount />}
                    />
                     <Route
                      path="/register-appointment"
                      element={<RegisterExamPage />}
                    />
                    <Route path="/result" element={<ResultPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/survey" element={<SurveyQuestionnaire />} />
                    <Route path="/package/:type" element={<PackagePage />} />
                    <Route path="/time-picker" element={<TimePicker />} />
                    <Route path="/profile-picker" element={<ProfilePicker />} />
                    <Route path="/introduce" element={<Introduce />} />
                    <Route path="/follow-booking" element={<FollowBooking />} />
                    <Route path="/infos" element={<CustomerInformation />} />
                    <Route path="/relatives" element={<Relatives />} />
                    <Route path="/support" element={<SupportCustomer />} />
                    <Route path="/incentives" element={<Incentives />} />
                    <Route path="/redemption" element={<Redemption />} />
                    <Route path="/detail-booking" element={<DetailBooking />} />
                    <Route path="/customer_point_view" element={<ListPointPage />} />
                    <Route path="/examming-survey" element={<ListSurvey />} />
                    <Route path="/customer_contest_rules" element={<ListRulePage />} />
                    <Route path="/done-survey" element={<Thanks />} />
                    <Route
                      path="/detail-redemption"
                      element={<DetailRedemption />}
                    />
                    <Route
                      path="/package-detail/:id"
                      element={<PackageDetailPage />}
                    />
                    <Route path="/detail-exam" element={<MedicalExamPage />} />
                    <Route path="/detail-exam-zns" element={<MedicalExamPageZNS />} />
                    <Route
                      path="/prescription-detail/:id"
                      element={<PrescriptionDetail />}
                    />
                    <Route
                      path="/symptoms-picker"
                      element={<SymptomsPicker />}
                    />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/detail-bill" element={<InvoiceDetails />} />
                    <Route path="/example" element={<Example />} />
                    <Route path="/switch-profile" element={<SwitchProfile />} />
                    <Route path="/abnormal_result" element={<AbnormalResultPage />} />
                    <Route path="*" element={<CommingPage />} />
                  </AnimationRoutes>
                </ZMPRouter>
              </SnackbarProvider>
            </App>
          </AuthenticationAccount>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};
export default MyApp;

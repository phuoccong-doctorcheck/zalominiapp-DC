export interface ResponseServicePackage {
  data: ServicePackageItem[];
  message: string;
  status: boolean;
  total_items: number;
  client_ip: string;
}

export interface ServicePackageItem {
  package_id: string;
  package_icon: null;
  package_image: string;
  package_name: string;
  package_summary: null;
  package_content: null;
  package_prices: number;
  package_real_prices: number;
  package_group_id: null;
  update_date: Date;
  items: ServicePackageItemChild[];
}

export interface ServicePackageItemChild {
  service_id: string;
  service_name: string;
  service_group_id: string;
  service_order_number: number;
  unit_id: string;
  string_name: string;
  service_prices: number;
}

export interface ResponseVideo {
  kind: string;
  etag: string;
  nextPageToken: string;
  items: VideoItem[];
  pageInfo: PageInfo;
}

export interface ResponsePackageServiceGroup {
  data: PackageServiceGroupItem[];
  message: string;
  status: boolean;
  total_items: number;
  client_ip: string;
}

export interface PackageServiceGroupItem {
  service_group_id: string;
  service_group_icon: null;
  service_group_image: null;
  service_group_name: string;
  service_group_type: string;
  is_subclinical: boolean;
  order_number: number;
}

export interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: SnippetVideo;
  contentDetails: ContentDetailsVideo;
}

export interface ContentDetailsVideo {
  videoId: string;
  videoPublishedAt: Date;
}

export interface SnippetVideo {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceID;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface ResourceID {
  kind: string;
  videoId: string;
}

export interface Thumbnails {
  default: ThumbnailsDefault;
  medium: ThumbnailsDefault;
  high: ThumbnailsDefault;
  standard: ThumbnailsDefault;
  maxres?: ThumbnailsDefault;
}

export interface ThumbnailsDefault {
  url: string;
  width: number;
  height: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ResponseHistoriesCustomer {
  data: HistoriesCustomerItem[];
  message: string;
  status: boolean;
  client_ip: string;
}

export interface HistoriesCustomerItem {
  datetime: Date;
  customer_id: string;
  master_id: string;
  status: string;
  is_re_exams: boolean | null;
  register_date: Date;
  items: HistoriesCustomerItemService[];
}

export interface HistoriesCustomerItemService {
  service_group_type: string;
  service_group_type_name: string;
  group_result_name:string;
  group_result_id:string
  order_number: number;
  items: ItemItem[] | null;
}

export interface ItemItem {
  id: string;
  name: string;
  title: string;
  order_number: number;
  service_group_type:string;
  status: Status;
}

export interface Status {
  status: string;
  displayname: string;
  color: string;
}

/* ----------- */

export interface ResponsePrescription {
  data: PrescriptionItem[];
  message: string;
  status: boolean;
  total_items: number;
  client_ip: string;
}

export interface PrescriptionItem {
  prescription_id: string;
  master_id: string;
  customer_id: string;
  exams_card_id: string;
  specialist_id: string;
  disease_level_id: string;
  advices: Advice[];
  diagnose_icd10s: DiagnoseIcd10[];
  treatment_duration: TreatmentDuration;
  diagnose_digestive_text: string;
  diagnose_other_text: string;
  disease_cause_text: string;
  disease_jeopardy_text: string;
  disease_complication_text: string;
  diagnoses_text: string;
  doctor_note: string;
  pharmacist_note: null;
  insurance_card_refcode: string;
  insurance_hospital_text: string;
  insurance_object_text: string;
  insurance_object_ratio: number;
  update_employee: ExamEmployee;
  granted_employee: ExamEmployee;
  exam_employee: ExamEmployee;
  prescriber_employee: ExamEmployee;
  prescriber_department: ExamEmployee;
  drugs_use_in_days: number;
  create_datetime: Date;
  update_datetime: Date;
  granted_datetime: Date;
  begin_date: Date;
  is_granted: boolean;
  is_insurance: boolean;
  is_calendar: boolean;
  is_no_drugs: boolean;
  status: string;
  items: any[];
}

export interface Advice {
  advice_id: string;
  advice_text: string;
  is_advice: boolean;
  order_number: number;
}

export interface DiagnoseIcd10 {
  id: string;
  disease_name_vi: string;
  disease_name_en: string;
  disease_group_name: string;
  is_icd10: boolean;
  order_number: number;
}

export interface ExamEmployee {
  id: string;
  name: string;
}

export interface TreatmentDuration {
  treatment_duration_number: number;
  treatment_duration_type: string;
  treatment_duration_text: string;
}
/* -------- */

export interface ResponsePackageService {
  data: PackageServiceItem[];
  message: string;
  status: boolean;
  total_items: number;
  client_ip: string;
}

export interface PackageServiceItem {
  service_id: string;
  service_name: string;
  service_group_id: string;
  service_order_number: number;
  unit_id: string;
  unit_name: string;
  service_prices: number;
}

/* ---------- Profile ------------ */

export interface ResponseProfile {
  data: ProfileData | string;
  message: string;
  status: boolean;
  client_ip: string;
}

export interface ProfileData {
  user: User;
  affiliate: any;
  config: Config;
  message_unread_count: number;
  is_approved_points: boolean;
}

export interface Config {
  welcome: string;
  colors: Color[];
  doctorcheck_list_info: DoctorcheckListInfo[];
  noti_toggles: NotiToggle[];
  symptoms: string[];
  drugtimes: Drugtime[];
  survey: Survey;
  app_version: string;
}

export interface Color {
  id: number;
  name: string;
  bgcolor: string;
  fontcolor: string;
  active: boolean;
}

export interface DoctorcheckListInfo {
  short_name: string;
  full_name: string;
  slogan: string;
  address: string;
  phone: string;
  tax: string;
  clinic_id: number;
  email: string;
  chat_link: string;
  open_time: string;
  close_time: string;
  open_day: string;
  close_day: string;
}

export interface Drugtime {
  shift_id: string;
  shift_name: string;
  time: string;
}

export interface NotiToggle {
  service_group_type: string;
  data_type: string;
  data_type_name: string;
  is_send_notification: boolean;
  order_number: number;
}

export interface Survey {
  key: string;
  code: string;
  url: string;
  status: string;
}

export interface User {
  customer_id: string;
  customer_type: string;
  owner_type: string;
  owner_id: string;
  parent_id: null;
  customer_fullname: string;
  customer_lastname: string;
  customer_prefix_gender: string;
  customer_phone: string;
  customer_identity_card: string;
  customer_email: string;
  birthday: Date;
  day_of_birth: number;
  month_of_birth: number;
  year_of_birth: number;
  customer_full_address: string;
  customer_address: string;
  gender: Career;
  country: Career;
  province: Career;
  district: Career;
  ward: Career;
  nation: null;
  career: Career;
  launch_source_group_id: number;
  launch_source_group: LaunchSource;
  launch_source: LaunchSource;
  launch_source_type: LaunchSource;
  relation_type: null;
  portrait_survey_type: string;
  facebook_id: null;
  zalo_id: null;
  facebook_ads_id: null;
  create_date: Date;
  update_date: Date;
  is_parent_show: boolean;
  is_actived: boolean;
  is_affiliate_doctor: boolean;
}

export interface Career {
  id: string;
  name: string;
}

export interface LaunchSource {
  id: number;
  name: string;
}

export interface ResponseProfileStorge {
  user: UserProfileStorge;
  config: ConfigProfileStorge;
}

export interface ConfigProfileStorge {
  welcome: string;
  colors: Color[];
  doctorcheck_list_info: DoctorcheckListInfo[];
  noti_toggles: NotiToggle[];
  symptoms: string[];
  drugtimes: Drugtime[];
  survey: any;
  app_version: string;
}

export interface Color {
  id: number;
  name: string;
  bgcolor: string;
  fontcolor: string;
  active: boolean;
}

export interface DoctorcheckListInfo {
  short_name: string;
  full_name: string;
  slogan: string;
  address: string;
  phone: string;
  tax: string;
  clinic_id: number;
  email: string;
  chat_link: string;
  open_time: string;
  close_time: string;
  open_day: string;
  close_day: string;
}

export interface Drugtime {
  shift_id: string;
  shift_name: string;
  time: string;
}

export interface NotiToggle {
  service_group_type: string;
  data_type: string;
  data_type_name: string;
  is_send_notification: boolean;
  order_number: number;
}

export interface UserProfileStorge {
  customer: Customer;
  auth: Auth;
  extension: Extension;
}

export interface Auth {
  api_app_id: string;
  api_app_key: string;
  login_sso_token: null;
  customer_password: string;
  uid_zalo: null;
  uid_firebase: string;
}

export interface Customer {
  customer_id: string;
  parent_id: null;
  customer_fullname: string;
  customer_lastname: string;
  customer_prefix_gender: null;
  customer_phone: string;
  customer_identity_card: string;
  customer_email: string;
  gender: Gender;
  birthday: Date;
  day_of_birth: null;
  month_of_birth: null;
  year_of_birth: null;
  customer_full_address: string;
  customer_address: string;
  relation_type: null;
  customer_profile_avatar: null;
  create_date: null;
  update_date: Date;
  is_parent_show: boolean;
  is_actived: boolean;
  member: Member;
}

export interface Gender {
  id: string;
  name: string;
}

export interface Member {
  member_code: null;
  member_name: null;
  pending_points: number;
  use_points: number;
  loyalty_points: number;
}

export interface Extension {
  devices: any[];
  social_connects: any[];
}

/* ------------- */

export interface ResponseNotify {
  data: NotifyData;
  message: string;
  status: boolean;
  total_items: number;
  client_ip: string;
}

export interface NotifyData {
  data: NotifyData[];
  paging: Paging;
}

export interface NotifyItem {
  message_id: string;
  message_title: string;
  message_content: string;
  data_type: string;
  data_id: string;
  card_id: string;
  is_read: boolean;
  write_date: Date;
}

export interface Paging {
  page_number: number;
  page_size: number;
  total_count: number;
  total_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
}

export interface ResponseAffiliateCode {
  data: AffiliateCodeItem;
  message: string;
  status: boolean;
  client_ip: string;
}

export interface AffiliateCodeItem {
  share_title: string;
  share_content: string;
  share_message: string;
  customer_id: string;
  affiliate_code: string;
  dependent_code: string;
  loyalty_points: number;
}


export interface ResponseGift {
  data: GiftItem[];
  message: string;
  status: boolean;
  total_items: number;
  client_ip: string;
}

export interface GiftItem {
  name: string;
  code: string;
  image: string;
  unit_name: string;
  redeem_point: number;
  content: string;
}



///////// Survey
interface GenderS {
  id: string;
  name: string;
}

interface Country {
  id: string;
  name: string;
}

interface Province {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
}

interface Ward {
  id: string;
  name: string;
}

interface Nation {
  id: string;
  name: string;
}

interface LaunchSourceGroup {
  id: number;
  name: string;
}

interface LaunchSourceS {
  id: number;
  name: string;
}

interface LaunchSourceType {
  id: number;
  name: string;
}

interface CustomerS {
  customer_id: string;
  customer_type: string;
  owner_type: string | null;
  owner_id: string | null;
  parent_id: string | null;
  customer_fullname: string;
  customer_lastname: string;
  customer_prefix_gender: string;
  customer_phone: string;
  customer_identity_card: string;
  customer_email: string;
  birthday: string;
  day_of_birth: number;
  month_of_birth: number;
  year_of_birth: number;
  customer_full_address: string;
  customer_address: string;
  gender: Gender;
  country: Country;
  province: Province;
  district: District;
  ward: Ward;
  nation: Nation;
  career: string | null;
  launch_source_group_id: number;
  launch_source_group: LaunchSourceGroup;
  launch_source: LaunchSource;
  launch_source_type: LaunchSourceType;
  relation_type: string | null;
  portrait_survey_type: string | null;
  gclid: string | null;
  facebook_id: string | null;
  zalo_id: string | null;
  facebook_ads_id: string | null;
  create_date: string;
  update_date: string;
  is_parent_show: boolean;
  is_actived: boolean;
  is_affiliate_doctor: boolean;
  member: string | null;
}

interface Card {
  [key: string]: boolean | string | null;
}

interface SurveyS {
  card_survey_id: string;
  survey_id: string;
  customer_id: string;
  master_id: string;
  survey_type: string;
  survey_version: string;
  survey_title: string;
  card: Card;
  review_employee: string | null;
  create_date: string;
  update_date: string;
  review_date: string | null;
  is_review: boolean;
  status: string;
}

interface SurveyNoticesVisibility {
  q6_visibility: boolean;
  q8_visibility: boolean;
  q9_visibility: boolean;
  q12_visibility: boolean;
  q17_visibility: boolean;
  q18_visibility: boolean;
  q_visibility: boolean;
}

interface SurveyNoticesCard {
  [key: string]: boolean | string;
}

interface SurveyNotices {
  visibility: SurveyNoticesVisibility;
  card: SurveyNoticesCard;
}

interface SurveyData {
  survey: SurveyS;
  surveynotices: SurveyNotices;
}

export interface Data {
  master_id: string;
  checkin: string;
  type: string;
  customer: CustomerS;
  survey: SurveyData;
}

export interface ApiResponseSurvey {
  data: Data;
  message: string;
  status: boolean;
}

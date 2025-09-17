export interface Restaurant {
  id: number;
  name: string;
  districtId: number;
  location: Location;
  views: number;
  image: string;
  address: string;
  hours: {
    opening: Hours;
    closing: Hours;
  };
  days: {
    opening: number;
    closing: number;
  };
  hotline: string;
  map: string;
  rating: number;
}

export interface District {
  id: number;
  name: string;
}

export interface Location {
  lat: number;
  long: number;
}

export interface Menu {
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  foods: Food[];
}

export interface Food {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categories: string[];
  extras: Extra[];
  options: Option[];
}

export interface Option {
  key: string;
  label: string;
  selected: boolean;
}

export interface Extra {
  key: string;
  label: string;
  options: {
    key: string;
    label: string;
    selected?: boolean;
  }[];
}

export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  quantity: number;
  food: Food;
  note: string;
}

export type Hours = [number, number, "AM" | "PM"];

export interface Booking {
  id: string;
  restaurant: Restaurant;
  cart?: Cart;
  bookingInfo?: {
    date: Date;
    hour: Hours;
    table: string;
    seats: number;
  };
}

export type TabType = "info" | "menu" | "book";
type ExaminationItemStatus = "done" | "pendding";

export interface ExaminationItem {
  id: string;
  time: string;
  status: ExaminationItemStatus;
  statusDisplay: string;
}
export interface PrescriptionItem {
  id: string;
  time: string;
  description: string;
  total: string;
  statusDisplay: string;
  status: ExaminationItemStatus;
}

export interface BMIItem {
  id: number;
  title: string;
  value: string;
  unit: string;
}

export interface ResponseCategories {
  customer_id: string;
  master_id: string;
  status: string;
  is_re_exams: boolean;
  register_date: string;
  items: categoriesItem[];
}

export interface categoriesItem {
  service_group_type: string;
  service_group_type_name: string;
  group_result_name:string;
  group_result_id:string;
  order_number: number;
  items: CategoriesChild[] | null;
}

export interface CategoriesChild {
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

/* --------------- */

export interface ResponseAbnormalResult {
  data: AbnormalResult;
  message: string;
  status: boolean;
  client_ip: string;
}

export interface AbnormalResult {
  master_id: string;
  customer: Customer;
  page_title: string;
  items: AbnormalResultItem[];
}

export interface Customer {
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
  day_of_birth: null;
  month_of_birth: null;
  year_of_birth: number;
  customer_full_address: string;
  customer_address: string;
  gender: Country;
  country: Country;
  province: Country;
  district: Country;
  ward: Country;
  nation: null;
  career: null;
  launch_source_group_id: number;
  launch_source_group: LaunchSource;
  launch_source: LaunchSource;
  launch_source_type: LaunchSource;
  relation_type: null;
  portrait_survey_type: string;
  gclid: string;
  facebook_id: null;
  zalo_id: null;
  facebook_ads_id: null;
  create_date: Date;
  update_date: Date;
  is_parent_show: boolean;
  is_actived: boolean;
  is_affiliate_doctor: boolean;
  member: null;
}

export interface Country {
  id: string;
  name: string;
}

export interface LaunchSource {
  id: number;
  name: string;
}

export interface AbnormalResultItem {
  index: number;
  service_group_type: string;
  title: string;
  data: AbnormalResultItemTests[] | ReExamMing | string;
}

export interface AbnormalResultItemTests {
  id: string;
  servicespoint_detail_id: string;
  servicepoint_create_date: Date;
  labtests_id: string;
  labtests_sid: string;
  labtests_tube_id: string;
  labtests_tube_name: string;
  labtests_name: string;
  labtests_result: string;
  is_normal: boolean;
  is_higher: boolean;
  is_lower: boolean;
  is_abnormal_result: boolean;
  labtests_group_id: string;
  labtests_group_name: string;
  result_group_header: null | string;
  result_group_header_orderby: number | null;
  service_id: string;
  service_name: string;
  normal_index: string;
  higher_index: number;
  lower_index: number;
  min_abnormal_index: null;
  max_abnormal_index: null;
  unit_id: string;
  description: string;
  warning_content: null;
  note_public: string;
  note_private: string;
  machine_id: null | string;
  machine_name: null | string;
  create_date: Date;
  labtests_result_time: Date;
  technician_employee_id: string;
  approved_employee_id: string;
  group_order_number: number;
  order_number: number;
  is_has_result: boolean;
  is_sent_to_out: null;
  is_approved: boolean;
  is_excuted: null;
  is_show_after_approved: null;
  is_machine_auto: boolean;
}

export interface ReExamMing {
  reexamming_date: Date;
  note: string;
}

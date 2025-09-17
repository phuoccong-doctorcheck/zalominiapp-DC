export interface FormBooking {
  clinic_id: number;
  customer_id: string;
  appointment_datetime: string;
  dateTime: Date;
  appointment_note: string;
  is_exams: boolean;
  is_register_package: boolean;
  data: string;
  package_name: string;
  package_price: number;
  time_id: number;
  time_value: string;
  symptom: SmyptomItem[];
  other_symptoms: string;
  profileName: string;
  profileId: string;
}

export interface SmyptomItem {
  id: number;
  label: string;
  value: string;
}

export interface ResponseGetAppointment {
  data: AppointmentItem[];
  message: string;
  status: boolean;
  total_items: number;
  client_ip: string;
}

export interface AppointmentItem {
  master_id: string;
  customer_id: string;
  appointment_note: null | string;
  appointment_order_number: null | string;
  appointment_date: Date | null;
  create_date: Date;
  status: Status;
}

export interface Status {
  status: string;
  displayname: string;
  color: string;
}

export interface ResponseGetProfiles {
  data: Profile[];
  message: string;
  status: boolean;
  total_items: number;
  client_ip: string;
}

export interface Profile {
  username: string;
  customer_id: string;
  customer_fullname: string;
  gender: string;
  year_of_birth: number;
  age: number;
  relation_type_id: number;
  relationship_type_name: string;
}

export interface ResponseGetAccount {
  data: ResponseAccountData;
  message: string;
  status: boolean;
  client_ip: string;
}

export interface ResponseAccountData {
  account: Account;
  profile_id: string;
  message_unread_count: number;
}

export interface Account {
  success: boolean;
  message: string;
  error_code: number;
  data: AccountData;
}

export interface AccountData {
  username: string;
  password: string;
  zalo_id: string;
  phone: string;
  email: string;
  displayname: string;
  pending_points: number;
  use_points: number;
  loyalty_points: number;
  members_id: string;
  member_display_text: string;
  create_datetime: Date;
  update_datetime: Date;
  status: string;
}

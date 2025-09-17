import { ImageItem } from "../../components/molecules/imagePreview";

export interface ResponseVitalsignsCustomer {
  data: VitalsignsCustomerItem[];
  message: string;
  status: boolean;
  total_items: number;
  client_ip: string;
}

export interface VitalsignsCustomerItem {
  id: string;
  master_id: string;
  customer_id: string;
  respiratory_rate: string;
  heart_rate: string;
  temperature: string;
  blood_pressure_min: string;
  blood_pressure_max: string;
  eyes_right: null;
  eyes_left: null;
  sp02: null;
  height: string;
  weight: string;
  bmi: string;
  employee: Employee;
  datetime: Date;
}

export interface Employee {
  employee_id: string;
  fullname: string;
  signature_name: string;
}


export interface ImagePreviewItem {
  visible?: boolean;
  activeIndex?: number;
  images: ImageItem[];
}
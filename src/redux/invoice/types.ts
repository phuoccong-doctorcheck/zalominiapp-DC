export interface ResponseInvoice {
  data: InvoiceData;
  message: string;
  status: boolean;
  client_ip: string;
}

export interface InvoiceData {
  is_hide_discount: boolean;
  order_ref: string;
  status: string;
  title: string;
  master_ref: string;
  is_insurance: boolean;
  customer_name: string;
  customer_code: string;
  payment_datetime: string;
  created_datetime: string;
  total_discount: number;
  amount_total: number;
  advance_money: number;
  insurance_price_total: number;
  patient_price_total: number;
  amount_paid: number;
  amount_refund: number;
  cashier: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  service_name: string;
  quantity: number;
  unit_name: string;
  unit_price: number;
  discount: number;
  discount_value: number;
  price_subtotal: number;
  insurance_price: number;
  insurance_object_ratio: number;
  insurance_ratio: number;
  insurance_price_subtotal: number;
  patient_price_subtotal: number;
}

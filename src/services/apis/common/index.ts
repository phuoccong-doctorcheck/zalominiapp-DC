import HttpClient from "../../HttpClient";


export async function getInvoiceDetailsById(orderRef: string) {
    try {
        const response = await HttpClient.getMethod(
            `/master/get-invoice-by-orderref/?order_ref=${orderRef}`,
           // `/master/get-invoice-by-orderref/?order_ref=SERV2024/022795`,
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getCustomerById(customerId: string) {
  try {
    const response = await HttpClient.getMethod(
      `/customer/get-by-id/?id=${customerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
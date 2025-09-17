import HttpClient from "../../HttpClient";

export async function createAppointment(body: any) {
  try {
    const response = await HttpClient.postMethod(
      "master/create-appointment",
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchAppointment(customer_id: any) {
  try {
    const response = await HttpClient.getMethod(
      `/master/get-appointments/${customer_id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
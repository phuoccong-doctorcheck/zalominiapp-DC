import HttpClient from "../../HttpClient";

export async function getProvinces(id: any) {
  try {
    const response = await HttpClient.getMethod(`dm/provinces/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getDistricts(id: any) {
  try {
    const response = await HttpClient.getMethod(`dm/districts/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getWards(id: any) {
  try {
    const response = await HttpClient.getMethod(`dm/wards/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

import HttpClient from "../../HttpClient";

export async function fetchServicePackage() {
  try {
    const response = await HttpClient.getMethod(
      "/dm/service-packages-with-items"
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchServicePackageGroup() {
  try {
    const response = await HttpClient.getMethod(
      "/dm/service-groups?is_subclinical=true"
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchServicePackageDetail(id: string) {
  try {
    const response = await HttpClient.getMethod(
      `/dm/service-package-details?package_id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchMasterByMasterIdV1(id: string) {
  try {
    const response = await HttpClient.getMethod(
      `/result/get-histories-master-id/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function fetchHistoriesCustomerV1(id: string) {
  try {
    const response = await HttpClient.getMethod(
      `/result/get-histories-customer-id/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function fetchMasterByMasterId(id: string) {
  try {
    const response = await HttpClient.getMethod(
      `/result/get-historiesv2-master-id/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function fetchHistoriesCustomer(id: string) {
  try {
    const response = await HttpClient.getMethod(
      `/result/get-historiesv2-customer-id/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function fetchPrescriptionCustomer(id: string) {
  try {
    const response = await HttpClient.getMethod(
      `/prescription/get-by-customer-id/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function fetchVitalsignsCustomer(id: string) {
  try {
    const response = await HttpClient.getMethod(
      `/result/get-vitalsigns-customer-id/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchResultDetailV1(body: any) {
  try {
    const response = await HttpClient.postMethod(
      `/result/get-result-details`,
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function fetchResultDetail(body: any) {
  try {
    const response = await HttpClient.postMethod(
      `/result/get-resultv2-details`,
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchProfileByPhone(body: any) {
  try {
    const response = await HttpClient.postMethod(
      `/customer/get-profile-on-zalo-app`,
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getAccountByMiniApp(body: any) {
    try {
      const response = await HttpClient.postMethod(
        `/member/get-account-by-zalominiapp`,
        body
      );
      return response?.data;
    } catch (error) {
      console.error("Error:", error);
    }
}
export async function getAccountByIDCustomer(body: any) {
  try {
    console.log(body)
    const response = await HttpClient.getMethod(
      `/customer/get-customer-by-id?id=${body}`,
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getListProfile(username: any) {
  try {
    const response = await HttpClient.getMethod(
      `/member/get-profiles/?username=${username}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getListProfile1(username: any) {
  try {
    const response = await HttpClient.getMethod(
      `/customer/get-customer-by-id?id=${username}`,
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getHistoryPoint(customerId: any) {
  try {
    const response = await HttpClient.getMethod(
      `/member/get-info-member-and-history-points?customer_id=${customerId}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getCustomersReferral(customerId: any) {
  try {
    const response = await HttpClient.postMethod(
      `/customer/get-customers-by-referrer`,
      {
        owner_id:customerId
    }
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function createProfile(body: any) {
  try {
    const response = await HttpClient.postMethod(
      "customer/create-my-profile",
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function createSurvey(body: any) {
  try {
    const response = await HttpClient.postMethod(
      "customer/create-survey",
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getMessage(params: any) {
  try {
    const response = await HttpClient.getMethod(
      `firebase/get-messages/?user_id=${params.customer_id}&app_type=member&page_number=${params.page}&page_size=${params.size}&key_word=${params.key_word}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getAffiliateCode(id: any) {
  try {
    const response = await HttpClient.getMethod(
      `/customer/get-customer-affiliat-code/?customer_id=${id}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getGift() {
  try {
    const response = await HttpClient.getMethod(`member/get-gifts`);
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function postGiftOrder(body: any) {
  try {
    const response = await HttpClient.postMethod(
      `member/create-gift-order`,
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getMasterById(id: string) {
  try {
    const response = await HttpClient.getMethod(`master/get-by-id/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function createAccount(body: any) {
  try {
    const response = await HttpClient.postMethod(
      `/member/create-account`,
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function createNewProfile(body: any) {
  try {
    const response = await HttpClient.postMethod(
      `/member/create-profile`,
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function removeProfile(body: any) {
  try {
    const response = await HttpClient.postMethod(
      `/member/remove-profile`,
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function linkProfileCustomer(body: any) {
  try {
    const response = await HttpClient.postMethod(`/member/add-profile`, body);
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getAbnormalResults(body: any) {
  try {
    const response = await HttpClient.postMethod(
      `/result/get-abnormal-results`,
      body
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}



export async function fetchResultSurvey(body: any) {

  try {
    const response = await HttpClient.postMethod(
      `/member/get-surveys`,
     {
      customer_id: body
     }
    );
    
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function SaveSurvey(body: any) {

  try {
    const response = await HttpClient.postMethod(
      `/member/save-survey`,
      body
    );
    
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

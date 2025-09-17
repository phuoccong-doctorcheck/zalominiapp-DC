import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  getAccessToken,
  getDeviceIdAsync,
  getPhoneNumber,
  getSystemInfo,
  getUserID,
  getUserInfo,
  setStorage,
} from "zmp-sdk/apis";
import axios from "axios";

interface AuthenticationData {
  fetchData: () => void;
  userAccessToken: string;
  code: string;
  uuid: string;
  zaloName: string;
  phone: string | number | any;
  isDone: boolean;
  havePhone: boolean;
  isCancel: boolean;
  handleSetPhone: (phone: string, isHavePhone: boolean) => void;
  handleSetZaloName: (name: string) => void;
  handleSetCancel: (name: boolean) => void;
  handleSetScope: ( userInfo: boolean, userLocation: boolean, userPhonenumber: boolean ) => void;
  scope: { userInfo: boolean; userLocation: boolean; userPhoneNumber: boolean; };
  fetchAccessToken: () => void;
  getDeviceId: () => void;
  version: string;
  platform: string;
  deviceId: string;
}

interface AuthenticationProps {
  children?: React.ReactNode;
}

const AuthenticationContext = createContext<AuthenticationData>(
  {} as AuthenticationData
);

const AuthenticationAccount: React.FC<AuthenticationProps> = ({ children }) => {
  const [userAccessToken, setUserAccessToken] = useState("");
  const [code, setCode] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [uuid, setUuid] = useState("");
  const [phone, setPhone] = useState("");
  const [havePhone, setHavePhone] = useState(false);
  const [zaloName, setZaloName] = useState("");
  const [isCancel, setIsCancel] = useState(false);
  const [scope, setScope] = useState({
    userInfo: false,
    userLocation: false,
    userPhoneNumber: false,
  });
  const { version, apiVersion, zaloVersion, platform, language } = getSystemInfo();
  const [deviceId, setDeviceId] = useState("");


  useEffect(() => {
    if (
      userAccessToken?.trim().length > 0 &&
      code?.trim().length > 0 &&
      uuid?.trim().length > 0
    ) {
      setIsDone(true);
      setIsCancel(false);
    } else {
      setIsDone(false);
    }
  }, [userAccessToken, code, uuid]);

  const handleSetCancel = (cancel: boolean) => {
    setIsCancel(cancel);
  };
  const handleSetPhone = (phone: string, isHavePhone: boolean) => {
    setPhone(phone);
    setHavePhone(isHavePhone);
  };
  const handleSetZaloName = (name: string) => {
    setZaloName(name);
  };
  const handleSetScope = (
    userInfo: boolean,
    userLocation: boolean,
    userPhonenumber: boolean
  ) => {
    setScope({
      userInfo: userInfo,
      userLocation: userLocation,
      userPhoneNumber: userPhonenumber,
    });
  };

  const handleGetPhoneNumber = async () => {
    try {
      console.log(import.meta.env.VITE_IS_DEMO);
      if(import.meta.env.VITE_IS_DEMO==true){
        setPhone('0369513600');
        setHavePhone(true);
      }else{
        const fetching = await axios.get(import.meta.env.VITE_API_ZALO_URL, {
          headers: {
            access_token: userAccessToken,
            code: code,
            secret_key: import.meta.env.VITE_ZMP_SECRET,
          },
        });
        if (fetching?.status === 200) {
          setPhone(fetching?.data?.data?.number);
          setHavePhone(true);
        }
      }
    } catch (error) {
      setIsCancel(true);
      console.log(
        "🚀 ~ file: authen-provider.tsx:71 ~ handleGetPhoneNumber:",
        error
      );
    }
  };

  useEffect(() => {
    if (isDone) {
      handleGetPhoneNumber();
    }
  }, [isDone]);

  const getDeviceId = useCallback(() => {
    getDeviceIdAsync({
      success: (id) => {
        setDeviceId(id);
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }, []);



  const fetchUserID = () => {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const userID = await getUserID();
        if (userID) {
          setUuid(userID);
          resolve(0);
        }
      } catch (error) {
        setIsCancel(true);
        console.log("Error: fetchUserInfo ->", error);
        reject(error);
      }
    });
  };

  const fetchUserInfo = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setZaloName(userInfo?.userInfo?.name);
          await setStorage({
            data: {
              zalo_avatar: userInfo?.userInfo?.avatar,
              zaloName: userInfo?.userInfo?.name,
            },
          });
          resolve(0);
        }
      } catch (error) {
        setIsCancel(true);
        console.log("Error: fetchUserInfo ->", error);
        reject(error);
      }
    });
  };

  const fetchAccessToken = () => {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const accessToken = await getAccessToken();
        if (accessToken) {
          setUserAccessToken(accessToken);
          resolve(0);
        }
      } catch (error) {
        setIsCancel(true);
        console.log("Error: fetchAccessToken ->", error);
        reject(error);
      }
    });
  };

  const fetchToken = () => {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const phoneNumber = await getPhoneNumber();
        if (phoneNumber) {
          setCode(phoneNumber?.token as string);
          resolve(0);
        }
      } catch (error) {
        setIsCancel(true);
        console.log("Error: fetchToken ->", error);
        reject(error);
      }
    });
  };

  const fetchData = async () => {
    console.log(import.meta.env.VITE_IS_DEMO)
    if(import.meta.env.VITE_IS_DEMO=='true'){
      return;
    }
    try {
      await fetchAccessToken();
      await fetchUserID();
      await fetchToken();
      await fetchUserInfo();
      await getDeviceId();
    } catch (error) {
      console.error("Error: fetchData ->", error);
    }
  };

  const valueProvider = useMemo(
    () => ({
      fetchData,
      userAccessToken,
      code,
      uuid,
      phone,
      isDone,
      havePhone,
      zaloName,
      isCancel,
      scope,
      handleSetPhone,
      handleSetZaloName,
      handleSetCancel,
      handleSetScope,
      fetchAccessToken,
      version, platform,
      getDeviceId,
      deviceId
    }),
    [
      fetchData,
      userAccessToken,
      code,
      scope,
      uuid,
      isDone,
      isCancel,
      handleSetZaloName,
      fetchAccessToken,
      handleSetCancel,
      handleSetScope,
      zaloName,
      phone,
      havePhone,
      handleSetPhone,
      version, platform,
      getDeviceId,
      deviceId,
    ]
  );

  return (
    <AuthenticationContext.Provider value={valueProvider}>
      {children}
    </AuthenticationContext.Provider>
  );
};

function useAuthentication(): AuthenticationData {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("Have issues !");
  }
  return context;
}

export { AuthenticationAccount, useAuthentication };

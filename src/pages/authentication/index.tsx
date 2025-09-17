import React, { useEffect, useLayoutEffect } from "react";
import { Page, useNavigate, useSnackbar } from "zmp-ui";
import { clearStorage, getSetting, getStorage, setStorage } from "zmp-sdk/apis";
import { infoGuest, profileGuest } from "../../utils/state";
import "./styles.scss";
import { useAuthentication } from "../../components/custom/authen-provider";
import Loading from "../../components/atoms/Loading";

interface AuthenProps { }

const AuthenticationPage: React.FC<AuthenProps> = ({ }) => {
  const { handleSetPhone, handleSetZaloName, handleSetScope } = useAuthentication();

  const navigate = useNavigate();

  const getStorageZaloInfo = async () => {
    try {
      const { isLogin = false, uuidZalo, phoneNumber, zaloName, profileActive } = await getStorage({
        keys: ["isLogin", "uuidZalo", "phoneNumber", "zaloName", "profileActive"],
      });
      if (!isLogin) {
        if (!!phoneNumber) {
          handleSetPhone(phoneNumber, true);
        }
        if (!!zaloName) {
          handleSetZaloName(zaloName);
        }
        setStorage({ data: { profileActive: profileGuest, account: infoGuest } });
        return navigate("/dashboard");
      } else {
        return navigate("/switch-profile", {
          replace: false,
          animate: false,
          direction: "forward",
        });
      }
    } catch (error) {
      console.log(`Authentication Error: ${error}`);
      setStorage({
        data: { profileActive: profileGuest, account: infoGuest }
      }).then(() => {
        navigate("/dashboard");
      });
    }
  };
  const getSettingUser = async () => {
    try {
      const data = await getSetting({});
      if (data) {
        handleSetScope(
          data.authSetting["scope.userInfo"],
          data.authSetting["scope.userLocation"],
          data.authSetting["scope.userPhonenumber"]
        );
      }
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  useEffect(() => {
    getSettingUser().then(() => {
      getStorageZaloInfo();
    });
  }, []);

  return (
    <Page className="p-authenticating overflow-hidden">
      <div className="p-authenticating_content flex items-end justify-center">
        <Loading hasText={true} text={"Tiến hành xác thực tài khoản"} />
      </div>
    </Page>
  );
};

AuthenticationPage.defaultProps = {};

export default AuthenticationPage;

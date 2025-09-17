import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { Box, useNavigate, Text, Icon, Spinner } from "zmp-ui";
import {
  getServicePackage,
  getServicePackageGroup,
} from "../../redux/dashboard";
import PackageItem from "../../components/organisms/packageItem";

const { Header, Title } = Text;

export const PackageRecommend: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const packageServiceLoading = useAppSelector(
    (state) => state.dashboard.loadingPackageService
  );
  const listPackage = useAppSelector((state) => state.dashboard.packageService);
  const packageServiceGroup = useAppSelector((state) => state.dashboard.packageServiceGroup);

  const [state, setState] = useState({
    package: listPackage?.data,
    packageLoading: packageServiceLoading,
  });

  useEffect(() => {
    setState({
      ...state,
      package: listPackage?.data,
      packageLoading: packageServiceLoading,
    });
  }, [packageServiceLoading, listPackage?.data]);

  useEffect(() => {
    if (!listPackage?.data?.length) {
      dispatch(getServicePackage());
    }
  }, []);

  return (
    <>
      <Box className="mb-2 mt-4 ">
        <Header className="color_main flex justify-between items-center">
          <Text className="font-[700] uppercase">Gói khám tổng quát</Text>
          <div onClick={() => {
            navigate("/package/price");
          }}>
            <Icon icon={"zi-chevron-right"} size={28} />
          </div>
        </Header>
      </Box>
      <div className="overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar">
        {state.packageLoading ? (
          <Box flex justifyContent="center">
            <Spinner logo={undefined} />
          </Box>
        ) : (
          <Box flex className="w-max">
              {state.package?.length ?state.package.slice(0,4).map((item) => (
              <Box
                key={item.package_id}
                ml={2}
                mr={0}
                className="border rounded-xl border h-full min-h-[220px]"
                style={{ width: "calc(100vw - 100px)" }}
              >
                <PackageItem packageData={item} />
              </Box>
              )) : <Box mx={4} className="text-[red] text-center">
                Không tìm thấy danh sách các gói khám
              </Box>}
          </Box>
        )}
      </div>
    </>
  );
};

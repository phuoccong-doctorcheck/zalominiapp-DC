import React from "react";
import { FunctionComponent } from "react";
import { Box, Button, Icon, Text, useNavigate } from "zmp-ui";
import { ServicePackageItem } from "../../redux/dashboard/types";
import { formatNumber } from "../../utils/functions";
import { getServicePackageGroup, setDetailPackageItem } from "../../redux/dashboard";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";

const { Title } = Text;

interface RestaurantProps {
  packageData: ServicePackageItem;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PackageItem: FunctionComponent<RestaurantProps> = ({
  packageData,
  before,
  after,
  onClick,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const packageServiceGroup = useAppSelector((state) => state.dashboard.packageServiceGroup);

  return (
    <div
      onClick={() => {
        if (!packageServiceGroup?.data) {
          dispatch(getServicePackageGroup());
        }
        dispatch(setDetailPackageItem(packageData));
        navigate(`/package-detail/${packageData.package_id}`, {
          replace: true,
        });
      }}
      className="relative bg-white rounded-xl overflow-hidden shadow-sm p-0 restaurant-with-cover min-h-[245px]"
    >
      <div className="aspect-cinema relative w-full border-none h-full min-h-[140px]">
        <img
          src={packageData.package_image}
          className="absolute w-full h-full object-cover border-none"
        />
      </div>
      <Title size="small" className="mt-2 mb-2 mx-2 font-[600] min-h-[40px] color_main">
        {packageData.package_name}
      </Title>
      <Box
        flex
        justifyContent="space-between"
        alignItems="center"
        mt={0}
        mb={2}
        className="h-[33px] border-t border-l-0 border-b-0 border-r-0 border-l-0 border-b-0 border-r-0 border-[#dbdbdb] border-solid px-0"
      >
        {/* <Button className="py-4 px-2" size="small" variant="tertiary">
          <span className="text-[#f00] flex justify-start gap-1 font-[600]">
            <Text className="font-[600]">
              {formatNumber(packageData.package_real_prices)}
            </Text>
            <span>VND</span>
          </span>
        </Button> */}
        <Button className=" py-4 px-2 " size="small" variant="tertiary">
          <span className="text-gray-500 flex ">
            <Text
              className="color_main font-[500]"
              onClick={() => {
                dispatch(setDetailPackageItem(packageData));
                navigate(`/package-detail/${packageData.package_id}`, {
                  replace: true,
                });
              }}
            >
              {"Chi tiết"}
            </Text>
            <Icon
              icon="zi-chevron-right"
              className="color_main font-[600]"
              size={20}
            />
          </span>
        </Button>
      </Box>
    </div>
  );
};

export default PackageItem;

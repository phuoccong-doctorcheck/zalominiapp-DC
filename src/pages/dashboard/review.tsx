import React, { useState } from "react";
import { Box, useNavigate, Text, Icon } from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import ReviewItem from "../../components/organisms/reviewItem";

export const Review: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const videoReviewLoading = useAppSelector(
    (state) => state.dashboard.loadingVideoReview,
  );
  const listVideoReview = useAppSelector(
    (state) => state.dashboard.videoReview,
  );

  const [state, setState] = useState({
    videos: listVideoReview?.items ?? [],
    loading: videoReviewLoading,
  });

  // useEffect(() => {
  //   dispatch(getVideoReview())
  // }, [])

  const viewDetail = () => {
    navigate({
      pathname: "",
      search: new URLSearchParams({
        id: String(""),
      }).toString(),
    });
  };
  return (
    <>
      <Box className="mb-2">
        <Text className="color_main flex justify-between items-center">
          <Text className="font-[700] uppercase">Doctor Check review</Text>
          <div onClick={viewDetail}>
            <Icon icon={"zi-chevron-right"} size={28} />
          </div>
        </Text>
      </Box>

      {state.videos?.length ? (
        <div className="overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar">
          <Box flex className="w-max">
            {state.videos?.map((restaurant) => (
              <Box
                key={restaurant.id}
                className="snap-start"
                style={{ width: "calc(100vw - 120px)" }}
              >
                <ReviewItem layout="cover" restaurant={restaurant as any} />
              </Box>
            ))}
          </Box>
        </div>
      ) : (
        <Box className="text-[red] text-center">
          Không tìm thấy video review nào
        </Box>
      )}
    </>
  );
};

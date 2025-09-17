import React from "react";
import { FunctionComponent } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../utils/models";

const { Title } = Text;

interface RestaurantProps {
  layout: "cover" | "list-item" | "contain";
  restaurant: Restaurant;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ReviewItem: FunctionComponent<RestaurantProps> = ({
  layout,
  restaurant,
  before,
  after,
  onClick,
}) => {
  const navigate = useNavigate();
  const viewDetail = (slug: string) => {
    navigate({
      pathname: slug,
      search: new URLSearchParams({
        id: String(restaurant.id),
      }).toString(),
    });
  };
  switch (layout) {
    case "cover":
      return (
        <div
          onClick={() => onClick ?? viewDetail(`${restaurant.id}`)}
          className="relative bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover "
        >
          <div className="aspect-cinema relative w-full min-h-[220px] bg-contain">
            <img
              src={restaurant.image}
              className="absolute w-full h-full object-cover"
            />
          </div>
        </div>
      );

    default:
      return (
        <div
          onClick={() => onClick ?? viewDetail(`${restaurant.id}`)}
          className="bg-white rounded-lg overflow-hidden p-0 restaurant-with-cover"
        >
          <Box m={0} flex>
            <div className="flex-none aspect-card relative w-32">
              <img
                src={restaurant.image}
                className="absolute w-full h-full object-cover rounded-xl"
              />
            </div>
            <Box my={4} mx={5} className="min-w-0">
              {before}
              <Title size="small">{restaurant.name}</Title>
              {after}
              <Box mx={0} mb={0} flex>
                <Button
                  prefixIcon={
                    <Icon className="text-yellow-400" icon="zi-star-solid" />
                  }
                  size="small"
                  className="pl-0"
                  variant="tertiary"
                >
                  <span className="text-gray-500 font-semibold">
                    {restaurant.rating}
                  </span>
                </Button>
              </Box>
            </Box>
          </Box>
        </div>
      );
  }
};

export default ReviewItem;

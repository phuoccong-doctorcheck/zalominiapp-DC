//* LIB
// eslint-disable-next-line import/order
import { useSelector } from "react-redux";

//* IMPORT
import { RootState } from "../redux/RootReducer";
import { useRecoilValue } from "recoil";
import { useMemo } from "react";
import { restaurantsState } from "../utils/state";

const useStores = () => {
  const state = useSelector((state: RootState) => state.stores);

  return state;
};

export default useStores;

export const useRestaurant = (id?: number) => {
  const restaurants = useRecoilValue(restaurantsState);
  const restaurant = useMemo(() => {
    return restaurants.find(
      (restaurant) =>
        restaurant.id ==
        (id ? id : Number(new URLSearchParams(location.search).get("id"))),
    );
  }, [restaurants, id, location.search]);
  return restaurant;
};

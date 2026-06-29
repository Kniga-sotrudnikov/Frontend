export { favoritesApi } from "./api/favorites-api";

export type {
  NormalizedFavorite,
  NormalizedFavoritesResponse,
  AddFavoriteRequest,
  UseToggleFavoriteReturn,
} from "./model/types";

export {
  useGetFavorites,
  useAddFavorite,
  useRemoveFavorite,
  useToggleFavorite,
  favoritesKeys,
} from "./hooks/use-favorites";

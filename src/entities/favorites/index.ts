export { favoritesApi } from "./api/favorites-api";

export type {
  FavoriteItem,
  FavoritesListResponse,
  FavoritesListParams,
  AddFavoriteRequest,
  UseToggleFavoriteReturn,
} from "./model/types";

export {
  useGetFavorites,
  useToggleFavorite,
  favoritesKeys,
} from "./hooks/use-favorites";

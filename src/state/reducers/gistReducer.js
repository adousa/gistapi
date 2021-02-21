import {
  GET_GIST_PUBLIC_DATA_COMPLETED,
  GET_GIST_PUBLIC_DATA_FAILED,
  SEARCH_GIST_BY_USERNAME_COMPLETED,
  SEARCH_GIST_BY_USERNAME_FAILED,
} from "../actions/gistAction";

const initialState = {
  data: [],
  isError: false,
  searchResult: [],
  searchQuery: undefined,
};

const gistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GIST_PUBLIC_DATA_COMPLETED:
      return {
        ...initialState,
        data: action.data,
      };
    case GET_GIST_PUBLIC_DATA_FAILED:
      return {
        ...initialState,
        isError: action.isError,
      };
    case SEARCH_GIST_BY_USERNAME_COMPLETED:
      return {
        ...state,
        searchQuery: action.searchQuery,
        searchResult: action.data,
      };
    case SEARCH_GIST_BY_USERNAME_FAILED:
      return {
        ...initialState,
        isError: action.isError,
      };
    default:
      return state;
  }
};

export default gistReducer;

import {
  GET_GIST_PUBLIC_DATA_COMPLETED,
  GET_GIST_PUBLIC_DATA_FAILED,
  SEARCH_GIST_BY_USERNAME_COMPLETED,
} from "../actions/gistAction";

const initialState = {
  data: [],
};

const gistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GIST_PUBLIC_DATA_COMPLETED:
      return {
        data: action.data,
      };
    case GET_GIST_PUBLIC_DATA_FAILED:
      return {
        errors: action.errors,
      };
    case SEARCH_GIST_BY_USERNAME_COMPLETED:
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export default gistReducer;

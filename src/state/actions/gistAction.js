export const GET_GIST_PUBLIC_DATA_STARTED = "GET_GIST_PUBLIC_DATA_STARTED";
export const GET_GIST_PUBLIC_DATA_COMPLETED = "GET_GIST_PUBLIC_DATA_COMPLETED";
export const GET_GIST_PUBLIC_DATA_FAILED = "GET_GIST_PUBLIC_DATA_FAILED";

export const SEARCH_GIST_BY_USERNAME_STARTED =
  "SEARCH_GIST_BY_USERNAME_STARTED";
export const SEARCH_GIST_BY_USERNAME_COMPLETED =
  "SEARCH_GIST_BY_USERNAME_COMPLETED";
export const SEARCH_GIST_BY_USERNAME_FAILED = "SEARCH_GIST_BY_USERNAME_FAILED";

export function getGistData() {
  return {
    type: GET_GIST_PUBLIC_DATA_STARTED,
  };
}

export function searchGistByUsername(query) {
  return {
    type: SEARCH_GIST_BY_USERNAME_STARTED,
    query,
  };
}

export function clearSearchQuery() {
  return {
    type: SEARCH_GIST_BY_USERNAME_COMPLETED,
    query: undefined,
  };
}

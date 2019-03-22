export const search = params => {
  return {type: 'SEARCH', payload: params};
};
export const searchSuccess = name => {
  return {type: 'SEARCH_SUCCESS', name: name};
};
export const searchFail = error => {
  return {type: 'SEARCH_FAIL', error: error};
};

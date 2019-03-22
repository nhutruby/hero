const SearchReducer = (state, action) => {
  if (state === undefined) 
    return [];
  
  switch (action.type) {
    case "SEARCH":
      if (state.find(victor => victor.name === action.payload.name) === undefined) {
        state = [
          ...state, {
            name: action.payload.name
          }
        ];
      }
      return state;
    case "SEARCH_FAIL":
      return {
        ...state,
        error: action.message
      };
    case "SEARCH_SUCCESS":
      let victor = {};
      victor = state.find(victor => victor.name === action.victor.meta.pagination.name) || {
        name: action.victor.meta.pagination.name
      };
      console.log(victor);
      victor.list = victor.list || [];
      action.victor.victors.forEach(function (v) {
        console.log(v);
        victor.list.push({slug: v._source.slug, image_portrait: v._source.image_portrait, image_splash: v._source.image_card_background, updated_at: v._source.updated_at, image_card_background: v._source.image_card_background});
      });

      victor.mega = {
        pagination: {
          per_page: action.victor.meta.pagination.per_page,
          total_pages: action.victor.meta.pagination.total_pages,
          total_objects: action.victor.meta.pagination.total_objects
        }
      };
      console.log(state);
      return state;
    default:
      return state;
  }
};
export default SearchReducer;

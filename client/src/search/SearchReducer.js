const SearchReducer = (state, action) => {
  if (state === undefined) 
    return {data: [], current_name: ""};
  
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        current_name: action.payload.name
      };
    case "SEARCH_FAIL":
      return {
        ...state,
        error: action.message
      };
    case "SEARCH_SUCCESS":
      let victor = {};

      victor = state.data.find(victor => victor.name === state.current_name) || {
        name: state.current_name
      };
      victor.list = victor.list || [];
      const remove = state.data.map(function (i) {
        return i.name;
      }).indexOf(state.current_name);
      if (state.current_name !== "") {
        action.victor.victors.forEach(function (v) {
          let index = victor.list.find(el => el && v._source && el.name === v._source.name);
          if (v._source && index === undefined) {
            victor.list.push({
              name: v._source.name,
              slug: v._source.slug,
              image_portrait: v._source.image_portrait,
              image_splash: v._source.image_splash,
              updated_at: v._source.updated_at,
              image_card_background: v._source.image_card_background
            });
          }
        });
      } else {
        action.victor.victors.forEach(function (v) {
               let index = victor.list.find(el => el.name === v.name);
            if (index === undefined) {
            victor.list.push({
              name: v.name,
              slug: v.slug,
              image_portrait: v.image_portrait,
              image_splash: v.image_splash,
              updated_at: v.updated_at,
              image_card_background: v.image_card_background
            });
          }
        });
      }
      victor.mega = {
        pagination: {
          per_page: action.victor.meta.pagination.per_page,
          total_pages: action.victor.meta.pagination.total_pages,
          total_objects: action.victor.meta.pagination.total_objects
        }
      };
       if (remove !== -1) {
        state.data.splice(remove, 1);
      }
      const updatedArray = [
        ...state.data,
        victor
      ];

      state = {
        ...state,
        data: updatedArray
      };
  
      return {
        ...state,
        dataLength: state.data.length
      };

    default:
      return state;
  }
};
export default SearchReducer;

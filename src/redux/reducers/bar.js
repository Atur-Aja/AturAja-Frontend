const initialState = {
  create: false,
  sidebar: false,
  today: false,
};

export default function bar(state = initialState, action) {
  switch (action.type) {
    // case "SHOW_CREATE":
    //   return {
    //     ...state,
    //     create: true,
    //   };
    // case "CLOSE_CREATE":
    //   return {
    //     ...state,
    //     create: false,
    //   };
    // case "SHOW_SIDEBAR":
    //   return {
    //     ...state,
    //     sidebar: true,
    //   };
    // case "CLOSE_SIDEBAR":
    //   return {
    //     ...state,
    //     sidebar: false,
    //   };
    case "TOGGLE_CREATE":
      return {
        ...state,
        create: action.payload,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebar: action.payload,
      };
    case "SET_TODAY":
      return {
        ...state,
        today: action.payload,
      };
    default:
      return state;
  }
}

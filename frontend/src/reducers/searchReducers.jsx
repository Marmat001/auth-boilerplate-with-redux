export const searchFilterReducer = (state = { text: '' }, action) => {
  switch (action.type) {
    case 'FILTER_SEARCH':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

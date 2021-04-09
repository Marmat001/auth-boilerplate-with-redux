export const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'AUTHENTICATED_USER':
      return action.payload

    case 'LOGOUT_USER':
      return action.payload

    default:
      return state
  }
}

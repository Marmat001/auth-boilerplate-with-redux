export const paymentReducer = (
  state = {
    price: window.localStorage.getItem('paymentStatus')
      ? window.localStorage.getItem('paymentStatus')
      : null,
  },
  action
) => {
  switch (action.type) {
    case 'PAYMENT_HANDLER':
      return action.payload

    default:
      return state
  }
}

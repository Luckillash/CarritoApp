const reducer = (state, action) => {
  if (action.type === 'LIMPIAR_CARRITO') {
    return { ...state, cart: [] }
  }
  if (action.type === 'REMOVER') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    }
  }
  if (action.type === 'TOTAL') {
    var { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount

        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))

    return { ...state, total, amount }
  }
  if (action.type === 'CARGANDO') {
    return { ...state, loading: true }
  }
  if (action.type === 'MOSTRAR_ITEMS') {
    return { ...state, cart: action.payload, loading: false }
  }
  if (action.type === 'TOGGLE_AMOUNT') {
    var tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return { ...cartItem, amount: cartItem.amount + 1 }
          }
          if (action.payload.type === 'dec') {
            return { ...cartItem, amount: cartItem.amount - 1 }
          }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)
    return { ...state, cart: tempCart }
  }
  throw new Error('Ninguna acción se correlaciona')
}

export default reducer

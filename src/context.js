import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const estadoInicial = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, estadoInicial)

  const limpiarCarrito = () => {
    dispatch({ type: 'LIMPIAR_CARRITO' })
  }
  const remover = (id) => {
    dispatch({ type: 'REMOVER', payload: id })
  }
  const incrementar = (id) => {
    dispatch({ type: 'INCREMENTAR', payload: id })
  }
  const reducir = (id) => {
    dispatch({ type: 'REDUCIR', payload: id })
  }
  const fetchData = async () => {
    dispatch({ type: 'CARGANDO' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'MOSTRAR_ITEMS', payload: cart })
  }
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({ type: 'TOTAL' })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        limpiarCarrito,
        remover,
        incrementar,
        reducir,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

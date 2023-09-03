import { createContext, useEffect, useReducer } from 'react'
import { useContext } from 'react';
const initial_state = {
   // user: localStorage.getItem("user") !== undefined ? JSON.stringify(localStorage.getItem("user")) : null,
   // user: localStorage.getItem("user") !== undefined ? localStorage.getItem("user") : null,
   user: localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")) : null,
   loading: false,
   error: null
}

export const AuthContext = createContext(initial_state)
export function useAuth() {
  return useContext(AuthContext);
}

const AuthReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_START':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          user: null,
          loading: false,
          error: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  };


export const AuthContextProvider = ({ children }) => {

   const [state, dispatch] = useReducer(AuthReducer, initial_state)

   useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user))
   }, [state.user])

   return <AuthContext.Provider value={{
      user: state.user,
      loading: state.loading,
      error: state.error,
      dispatch,
   }}>
      {children}
   </AuthContext.Provider>
}
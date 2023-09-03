import { BOOKS_CREATE, BOOKS_ERROR, BOOKS_GET_ALL, BOOKS_LOADING, BOOKS_SUCCESS } from "../types"

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case BOOKS_CREATE:
      return {
        ...state,
        success: action.payload,
        loading: false,
        error: "",
      }
    case BOOKS_LOADING:
      return {
        ...state,
        error: "",
        success: "",
        loading: action.payload,
      }
    case BOOKS_GET_ALL:
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: "",
        success: ""
      }
    case BOOKS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: ""
      }
    case BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: "",
      }
    default:
      return state
  }
}

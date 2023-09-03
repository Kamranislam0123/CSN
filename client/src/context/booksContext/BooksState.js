import React, { useReducer } from "react"
import { BooksContext } from "./BooksContext"
import BooksReducer from "./BooksReducer"
import axios from "axios"
import { API } from "../../utils/proxy"
import { BOOKS_ERROR, BOOKS_GET_ALL, BOOKS_LOADING, BOOKS_CREATE, BOOKS_SUCCESS } from "../types"

export const BooksState = ({ children }) => {
  const initialState = {
    books: [],
    error: "",
    success: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(BooksReducer, initialState)

  const getAllBooks = async () => {
    try {
      dispatch({
        type: BOOKS_LOADING,
        payload: true,
      })
      const response = await axios.get(`${API}/books`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      // console.log("from 28 ",response)
      if (response.status === 200) {
        dispatch({
          type: BOOKS_GET_ALL,
          payload: response.data,
        })
      }
    } catch (error) {
      dispatch({
        type: BOOKS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const createBook = async (userId, bookData) => {
    // console.log("from 43 ", bookData, userId);
    try {
      dispatch({
        type: BOOKS_LOADING,
        payload: true,
      })

      const response = await axios.post(
        `${API}/create/book/${userId}`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        dispatch({
          type: BOOKS_CREATE,
          payload: "Successfully created!",
        })
        getAllBooks()
        // console.log(response.data)
      }
    } catch (error) {
      // console.log(error.response)
      dispatch({
        type: BOOKS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const deleteBook = async (userID, bookId) => {
    try {
      const response = await axios.delete(
        `${API}/delete/book/${userID}/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        dispatch({
          type: BOOKS_SUCCESS,
          payload: response.data.message,
        })
        getAllBooks()
      }
    } catch (error) {
      dispatch({
        type: BOOKS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const likeBooks = async (bookId, userId) => {
    await axios.put(
      `${API}/book/like/${userId}/${bookId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      }
    )
    try {
    } catch (error) {
      dispatch({
        type: BOOKS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const unLikeBook = async (bookId, userId) => {
    try {
      await axios.put(
        `${API}/book/unlike/${userId}/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
    } catch (error) {
      dispatch({
        type: BOOKS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const addComment = async (bookId, userId, comment) => {
    try {
      const response = await axios.put(
        `${API}/book/comment/${userId}/${bookId}`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        getAllBooks()
      }
    } catch (error) {
      dispatch({
        type: BOOKS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  return (
    <BooksContext.Provider
      value={{
        books: state.books,
        error: state.error,
        loading: state.loading,
        success: state.success,
        getAllBooks,
        createBook,
        deleteBook,
        likeBooks,
        unLikeBook,
        addComment,
      }}
    >
      {children}
    </BooksContext.Provider>
  )
}

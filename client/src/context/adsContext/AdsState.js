import React, { useReducer } from "react"
import { AdsContext } from "./AdsContext"
import AdsReducer from "./AdsReducer"
import axios from "axios"
import { API } from "../../utils/proxy"
import { ADS_ERROR, ADS_GET_ALL, ADS_LOADING, ADS_CREATE } from "../types"

export const AdsState = ({ children }) => {
  const initialState = {
    ads: [],
    error: "",
    loading: false,
    success: false,
  }
  const [state, dispatch] = useReducer(AdsReducer, initialState)

  const getAllAds = async () => {
    try {
      dispatch({
        type: ADS_LOADING,
        payload: true,
      })
      const response = await axios.get(`${API}/ads`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      // console.log(response)
      if (response.status === 200) {
        dispatch({
          type: ADS_GET_ALL,
          payload: response.data,
        })
      }
    } catch (error) {
      dispatch({
        type: ADS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const createAd = async (formData, userId) => {
    // console.log("from 43 ", formData, userId);
    try {
      dispatch({
        type: ADS_LOADING,
        payload: true,
      })

      const response = await axios.post(
        `${API}/create/ad/${userId}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        dispatch({
          type: ADS_CREATE,
          payload: "Successfully created!",
        })
        getAllAds()
        // console.log(response.data)
      }
    } catch (error) {
      // console.log(error.response)
      dispatch({
        type: ADS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
    // try {
    //   dispatch({
    //     type: ADS_LOADING,
    //     payload: true,
    //   })
    //   const response = await axios.get(`${API}/create/ad/${userId}`, formData, {
    //     headers: {
    //       Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
    //     },
    //   })
    //   console.log(response)
    //   if (response.status === 200) {
    //     dispatch({
    //       type: ADS_GET_ALL,
    //       payload: response.data,
    //     })
    //   }
    // } catch (error) {
    //   dispatch({
    //     type: ADS_ERROR,
    //     payload: error.response.data.errorMsg,
    //   })
    // }
  }

  return (
    <AdsContext.Provider
      value={{
        ads: state.ads,
        error: state.error,
        loading: state.loading,
        success: state.success,
        getAllAds,
        createAd
      }}
    >
      {children}
    </AdsContext.Provider>
  )
}

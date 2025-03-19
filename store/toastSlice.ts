import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { toast, type ToastOptions, type ToastPosition } from "react-toastify"

type ToastType = "success" | "error" | "info" | "warning" | "default"
type ToastPositionType = "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left"

interface UseToastOptions {
  position?: ToastPositionType
  autoClose?: number
  hideProgressBar?: boolean
  closeOnClick?: boolean
  pauseOnHover?: boolean
  draggable?: boolean
  theme?: "light" | "dark" | "colored"
}

interface ToastState {
  message: string
  type: ToastType
  options?: UseToastOptions
}

const initialState: ToastState = {
  message: "",
  type: "default",
  options: {},
}

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ message: string; type: ToastType; options?: UseToastOptions }>) => {
      const { message, type, options } = action.payload
      const toastOptions: ToastOptions = {
        position: (options?.position as ToastPosition) || "top-right",
        autoClose: options?.autoClose || 5000,
        hideProgressBar: options?.hideProgressBar || false,
        closeOnClick: options?.closeOnClick || true,
        pauseOnHover: options?.pauseOnHover || true,
        draggable: options?.draggable || true,
        theme: options?.theme || "light",
      }

      switch (type) {
        case "success":
          toast.success(message, toastOptions)
          break
        case "error":
          toast.error(message, toastOptions)
          break
        case "info":
          toast.info(message, toastOptions)
          break
        case "warning":
          toast.warning(message, toastOptions)
          break
        default:
          toast(message, toastOptions)
          break
      }

      state.message = message
      state.type = type
      state.options = options
    },
  },
})

export const { showToast } = toastSlice.actions

export default toastSlice.reducer


// //**************************************************************** */
// //**************************************************************** */

// import React from "react"
// import { useDispatch } from "react-redux"
// import { showToast } from "./toastSlice"

// const MyComponent = () => {
//   const dispatch = useDispatch()

//   const handleClick = () => {
//     dispatch(showToast({ message: "Hello, World!", type: "success" }))
//   }

//   return (
//     <div>
//       <button onClick={handleClick}>Show Toast</button>
//     </div>
//   )
// }

// export default MyComponent

// //**************************************************************** */
// //**************************************************************** */

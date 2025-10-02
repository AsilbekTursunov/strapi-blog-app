import { useMutation } from "@tanstack/react-query"
import { useAppDispatch } from "./useStoreSelector"
import { setUser } from "../store/user.slice"
import $axios from "../lib/axios"


export const useEnterForm = ({ url, method }: { url: string, method: string }) => {
  const dispatch = useAppDispatch()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios(`/auth/${url}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      })
      const result = await response.data
      localStorage.setItem('token', result.jwt)
      return result
    },
    onSuccess: (data) => {
      console.log(data)
      dispatch(setUser(data.user))
      localStorage.setItem('token', data.jwt)
    }
  })
}
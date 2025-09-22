import { useMutation } from "@tanstack/react-query"
import { useAppDispatch } from "./useStoreSelector"
import { setUser } from "../store/user.slice"


export const useEnterForm = ({ url, method }: { url: string, method: string }) => {
  const dispatch = useAppDispatch()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/auth/${url}?populate=*`, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
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
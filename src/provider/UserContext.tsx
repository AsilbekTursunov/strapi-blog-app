import React from 'react'
import { useAppDispatch } from '../hooks/useStoreSelector'
import { useQuery } from '@tanstack/react-query'
import { setUser } from '../store/user.slice'
import type { IArticle } from '../types'
import { Box, Spinner } from '@chakra-ui/react'
import $axios from '../lib/axios'

export interface IUser {
  id: number,
  documentId: string,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string,
  publishedAt: string
  articles: IArticle[] | null
}

interface UserContextProps {
  children: React.ReactNode
}

interface UserContextType {
  user: IUser | null
}

const UserContext = React.createContext<UserContextType | null>(null)

export const UserContextProvider = ({ children }: UserContextProps) => {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token) return null
      const response = await $axios.get(`/users/me?populate=*`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const result = await response.data
      dispatch(setUser(result))
      return result
    },
    enabled: !!token
  })

  if (isLoading) return <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
    <Spinner />
  </Box>
  return (
    <UserContext.Provider value={{ user: data, }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
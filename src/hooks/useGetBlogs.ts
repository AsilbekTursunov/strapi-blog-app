import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toSlug } from "../lib/helpers"
import { useAppSelector } from "./useStoreSelector"
import $axios from "../lib/axios"



export const useGetBlogs = (page: number = 1, pageSize: number = 6) => {
  return useQuery({
    queryKey: ['blogs', page, pageSize],
    queryFn: async () => {
      const response = await $axios.get(`/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
      const result = await response.data
      return result
    },
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

export const useGetBlog = (slug: string) => {
  return useQuery({ 
    queryKey: ['blog', slug],
    queryFn: async () => {
      const response = await $axios.get(`/blogs?populate=*&filters[slug][$eq]=${slug}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const result = await response.data
      return result
    }
  })
}

export const useGetUserBlogs = (id: number, page: number = 1, pageSize: number = 6) => {
  return useQuery({
    queryKey: ['user-blogs', id, page, pageSize],
    queryFn: async () => {
      const response = await $axios.get(`/blogs?populate=*&filters[author][$eq]=${id}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
      const result = await response.data
      return result
    },
    enabled: !!id
  })
}

export const useCreateBlog = () => {
  const queryClient = useQueryClient()
  const formData = new FormData()
  return useMutation({
    mutationFn: async (data: any) => {
      formData.append('files', data.image)
      const image = await $axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const newImage = await image.data
      const response = await $axios.post(`/blogs`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          title: data.title,
          description: data.description,
          image: newImage[0].id,
          views: 0,
          author: data.author,
          slug: toSlug(data.title),
        }
      })
      const result = await response.data
      return result
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-blogs', data.author] })
      queryClient.invalidateQueries({ queryKey: ['blogs', 1, 6] })
    }
  })
}

export const useEditBlog = () => {
  const queryClient = useQueryClient()
  const { user } = useAppSelector((state) => state.user)
  const formData = new FormData()
  return useMutation({
    mutationFn: async ({ slug, data }: { slug: string, data: any, id: number }) => {
      const newData: any = {}
      if (data.title) {
        newData.title = data.title
        newData.slug = toSlug(data.title)
      }
      if (data.description) {
        newData.description = data.description
      }
      if (data.image) {
        formData.append('files', data.image)
        const image = await $axios.post('/upload', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          data: formData,
        })
        const newImage = await image.data
        newData.image = newImage[0].id
      }
      const response = await $axios.put(`/blogs/slug/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: newData,
      })
      const result = await response.data
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-blogs', user?.id] })
    }
  })
}

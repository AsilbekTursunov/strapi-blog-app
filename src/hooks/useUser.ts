import { useMutation } from "@tanstack/react-query"


export const useCreateAuthor = () => {
  return useMutation({
    mutationKey: ['createAuthor'],
    mutationFn: async (user: any) => {
      const response = await fetch("/api/authors", {
        method: "POST",
        body: JSON.stringify({
          data: {
            username: user.username,
            email: user.email,
            userId: user.id,
            image: user.image || null,
          },
        })
      })
      const result = await response.json()
      return result.data
    },
    onSuccess: (data) => {
      console.log(data)
    }
  })
}
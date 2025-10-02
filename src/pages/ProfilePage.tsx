import { Box, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import BlogCardHome from "../components/cards/blog_card_home"
import CreateBlog from "../components/CreateBlog"
import CustomContainer from "../components/CustomContainer"
import CustomPaginate from "../components/CustomPaginate"
import { useGetUserBlogs } from "../hooks/useGetBlogs"
import { useAppSelector } from "../hooks/useStoreSelector"
import type { IBlog } from "../types"

const ProfilePage = () => {
  const [page, setPage] = useState(1)
  const { user } = useAppSelector((state) => state.user)
  const { data } = useGetUserBlogs(user?.id!, page, 6)



  return (
    <CustomContainer marginY={5} padding={0}>
      <Box className="profile-content" marginY={5}>
        <Box display={'flex'} alignItems={'center'} gap={2}>
          <Image width={20} height={20} border={'1px solid rgb(132, 132, 132)'} src={'/images/user.png'} borderRadius={"full"} />
          <Box>
            <Text>{user?.username}</Text>
            <Text>{user?.email}</Text>
          </Box>
        </Box>
      </Box>
      <Box marginY={5} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize={{ base: 16, md: 24 }} fontWeight={'semibold'} as="h2">Your all blogs</Text>
        <CreateBlog />
      </Box>
      <Box display={'flex'} gap={5} flexDirection={'column'}>
        {data?.data && data?.data.map((blog: IBlog) => (
          <BlogCardHome key={blog.id} {...blog} />
        ))}
      </Box>
      <Box display={'flex'} justifyContent={'end'} marginTop={'20px'}>
        <CustomPaginate count={data?.meta?.pagination?.total} pageSize={6} onNext={() => setPage(page + 1)} onPrev={() => setPage(page - 1)} onSelect={(page) => setPage(page)} page={data?.meta?.pagination?.page} />
      </Box>
    </CustomContainer>
  )
}

export default ProfilePage
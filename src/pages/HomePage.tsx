import { Box, createListCollection, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import BlogCardHome from "../components/cards/blog_card_home";
import CustomContainer from "../components/CustomContainer";
import CustomPaginate from "../components/CustomPaginate";
import CustomSelect from "../components/CustomSelect";
import { useGetBlogs } from "../hooks/useGetBlogs";
import type { IBlog } from "../types";

const options = createListCollection({
  items: [
    { value: '', label: 'All' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'react', label: 'React' },
    { value: 'node.js', label: 'Node.js' },
    { value: 'ai', label: 'AI' },
  ],
})

const HomePage = () => {
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState('')
  const { data: blogs, isLoading } = useGetBlogs(page, 6, selected)


  return (
    <div>
      <CustomContainer padding={0}>
        <Box margin="50px 0px" spaceY={5}>
          <Text as="h1" fontSize={20} fontWeight={'bold'}>Home</Text>
          {!isLoading && <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
            <Text fontSize={20} fontWeight={'bold'}>
              Filter by title
            </Text>
            <CustomSelect value={[selected]} title="Filter by title" collection={options} onValueChange={(val) => setSelected(val.value[0])} />
          </Box>}
          {isLoading && <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
            <Spinner role="home_page_loader" />
          </Box>}
          {!isLoading && blogs?.data ? <>
            {blogs?.data.map((item: IBlog, key: number) => (
              <BlogCardHome key={key} {...item} />
            ))}
            <Box role="pagination_box" display={'flex'} justifyContent={'end'} marginTop={'20px'}>
              <CustomPaginate count={blogs?.meta?.pagination?.total} pageSize={6} onNext={() => setPage(page + 1)} onPrev={() => setPage(page - 1)} onSelect={(page) => setPage(page)} page={blogs?.meta?.pagination?.page} />
            </Box>
          </> : <Text display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>No blogs found</Text>}
        </Box>
      </CustomContainer>
    </div>
  )
}

export default HomePage
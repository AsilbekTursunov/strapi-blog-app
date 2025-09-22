import { useState } from "react";
import { Box } from "@chakra-ui/react";
import CustomPaginate from "../components/CustomPaginate";
import BlogCardHome from "../components/cards/blog_card_home";
import CustomContainer from "../components/CustomContainer";
import { useGetBlogs } from "../hooks/useGetBlogs";
import type { IBlog } from "../types";

const HomePage = () => {
  const [page, setPage] = useState(1)
  const { data: blogs } = useGetBlogs(page, 6)
  return (
    <div>
      <CustomContainer padding={0}>
        {/* <div className="filterbar-container">
          <div className="filterbar-lists">
            {tabs.map((tab) => (
              <Button variant={selected === tab.id ? 'solid' : 'ghost'} onClick={() => setSelected(tab.id)} className={`filterbar-list-item`} colorPalette={selected === tab.id ? 'blue' : 'transparent'}>{tab.title}</Button>
            ))}
          </div>
        </div>
        <h3 className="section-headline">
          История последних новостей
        </h3>
        <div className="story-container">
          <div className="story-content-list">
            {data.map((item) => (
              <div key={item.id} className="story-content-item">
                <img src={item.image} alt="story" />
              </div>
            ))}
          </div>
        </div> */}
        <Box margin="50px 0px" spaceY={5}>
          {/* <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }} gap="4">
            {data.slice((page - 1) * 12, page * 12).map((item) => (
              <MiniCard key={item.id}   {...item} />
            ))}
          </Grid> */}
          {blogs?.data && <>
            {blogs?.data.map((item: IBlog, key: number) => (
              <BlogCardHome key={key} {...item} />
            ))}
            <Box display={'flex'} justifyContent={'end'} marginTop={'20px'}>
              <CustomPaginate count={blogs?.meta?.pagination?.total} pageSize={6} onNext={() => setPage(page + 1)} onPrev={() => setPage(page - 1)} onSelect={(page) => setPage(page)} page={blogs?.meta?.pagination?.page} />
            </Box>
          </>}
        </Box>
      </CustomContainer>

    </div>
  )
}

export default HomePage
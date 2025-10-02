import { Box, Button, Heading, Image, Spinner, Text } from '@chakra-ui/react'
import { Bookmark } from 'lucide-react'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import CustomContainer from '../components/CustomContainer'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { useGetBlog } from '../hooks/useGetBlogs'

const PostDetails = () => {
  const { slug } = useParams()  
  const { data, isLoading } = useGetBlog(slug as string) 

  if (isLoading && !data) return <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
    <Spinner role='post_details_loader' />
  </Box>


  return (
    <CustomContainer>
      {data?.data ? <Box maxW={'90%'} margin={'20px auto'} alignItems={'start'} display={'flex'} gap={10} flexDirection={{ base: 'column', md: 'row' }}>
        <Box display={'flex'} marginTop={'40%'} alignItems={'start'} flexDirection={'column'} justifyContent={'center'} gap={3}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={3}>
            <Image
              src={data?.data.author?.image || '/images/user.png'}
              boxSize="120px"
              borderRadius="full"
              fit="cover"
              alt="user-image"
            />
            <Text textTransform={'capitalize'} fontSize={'14px'} textAlign={'center'}>{data?.data.author?.username}</Text>
            <Box display={'flex'} justifyContent={'center'} gap={3}>
              <Button borderRadius={'30px'} colorPalette={'blue'}>Follow</Button>
              <Button borderRadius={'10px'} variant={'outline'}><Bookmark color='blue' size={20} /></Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box width={'full'}>
            <Box>
              <Image className='post-details-image' src={`${data?.data.image.url}`} alt="post-image" />
            </Box>
            <Box marginTop={'10px'}>
              <Text fontStyle={'italic'} fontSize={'14px'} className='author'>FOTO: {data?.data.author?.username}</Text>
              <Box display={'flex'} gap={5} marginTop={'10px'} color={'gray.400'}>
                <Text fontSize={'12px'} className='date'>{moment(data?.data.publishedAt).format('DD.MM.YYYY')}</Text>
                <Text fontSize={'12px'} className='comments'>{data?.data.views} комментарий</Text>
              </Box>
            </Box>
          </Box>
          <Box width={'full'}>
            <Heading margin={'20px 0px'} size={{ base: 'md', md: 'lg', xl: '2xl' }} className='title'>{data?.data.title}</Heading>
            <Box as={'div'} className='description'>
              <MarkdownRenderer clamp={2000} content={data?.data.description} />
            </Box>
          </Box>
        </Box>
      </Box> : <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
        <Text>No blog found</Text>
      </Box>}
    </CustomContainer>
  )
}

export default PostDetails


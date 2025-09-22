import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { Bookmark } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useGetBlog } from '../hooks/useGetBlogs'
import { baseUrl } from '../constants'
import moment from 'moment'
import MarkdownRenderer from '../components/MarkdownRenderer'
import type { IBlog } from '../types'
import CustomContainer from '../components/CustomContainer'

const PostDetails = () => {
  const { slug } = useParams()
  const { data, isLoading } = useGetBlog(slug as string)
  if (isLoading) return <div>Loading...</div>
  const { createdAt, title, views, image, description, author }: IBlog = data?.data[0]
  return (
    <CustomContainer>
      <Box maxW={'90%'} margin={'20px auto'} alignItems={'start'} display={'flex'} gap={10} flexDirection={{ base: 'column', md: 'row' }}>
        <Box display={'flex'} marginTop={'40%'} alignItems={'start'} flexDirection={'column'} justifyContent={'center'} gap={3}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={3}>
            <Image
              src={`${baseUrl}${image.url}`}
              boxSize="120px"
              borderRadius="full"
              fit="cover"
              alt="user-image"
            />
            <Text textTransform={'capitalize'} fontSize={'14px'} textAlign={'center'}>{author?.username}</Text>
            <Box display={'flex'} justifyContent={'center'} gap={3}>
              <Button borderRadius={'30px'} colorPalette={'blue'}>Follow</Button>
              <Button borderRadius={'10px'} variant={'outline'}><Bookmark color='blue' size={20} /></Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box width={'full'}>
            <Box>
              <Image className='post-details-image' src={`${baseUrl}${image.url}`} alt="post-image" />
            </Box>
            <Box marginTop={'10px'}>
              <Text fontStyle={'italic'} fontSize={'14px'} className='author'>FOTO: {author?.username}</Text>
              <Box display={'flex'} gap={5} marginTop={'10px'} color={'gray.400'}>
                <Text fontSize={'12px'} className='date'>{moment(createdAt).format('DD.MM.YYYY')}</Text>
                <Text fontSize={'12px'} className='comments'>{views} комментарий</Text>
              </Box>
            </Box>
          </Box>
          <Box width={'full'}>
            <Heading margin={'20px 0px'} size={{ base: 'md', md: 'lg', xl: '2xl' }} className='title'>{title}</Heading>
            <Box as={'div'} className='description'>
              <MarkdownRenderer clamp={2000} content={description} />
            </Box>
          </Box>
        </Box>
      </Box>
    </CustomContainer>
  )
}

export default PostDetails
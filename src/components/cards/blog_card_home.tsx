import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { IBlog } from '../../types'
import { Box, Button, Dialog, Heading, Image, Portal, Text } from '@chakra-ui/react'
import { Eye } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import UpdateBlog from '../UpdateBlog'
import $axios from '../../lib/axios'

const BlogCardHome = (blog: IBlog) => {
  const { slug, image, title, description, createdAt, views, author } = blog
  const [remove, setRemove] = useState(false)
  const pathname = useLocation()
  const isProfile = pathname.pathname.includes('profile')
  const queryClient = useQueryClient()


  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteBlog'],
    mutationFn: async () => {
      await $axios.delete(`/blogs/slug/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    },
    onSuccess: () => {
      setRemove(false)
      queryClient.invalidateQueries({ queryKey: ['user-blogs', author?.id] })
    }
  })

  return (

    <Box width={'100%'} display={'flex'} flexDirection={{ base: 'column', md: 'row' }}>
      <Box width={{ base: '100%', md: isProfile ? '30%' : '50%' }} >
        <Image src={image ? `${image.url}` : '/images/not-found.webp'} borderRadius={'10px'} width={'100%'} height={{ base: isProfile ? 'fit-content' : '250px', md: isProfile ? 'fit-content' : '388px' }} objectFit={'cover'} imageOrientation={'top'} />
      </Box>
      <Box as={'div'} spaceY={isProfile ? 2 : 5} width={{ base: '100%', md: isProfile ? '70%' : '50%' }} padding={isProfile ? '10px' : '20px'}>
        {isProfile ? <Heading fontSize={'18px'}>{title}</Heading> : <Heading size={{ base: 'xl', md: '2xl', lg: '4xl' }}>{title}</Heading>}
        <Box display={'flex'} gap={5} fontSize={'14px'}>
          <Text borderRight={'1px solid #b3b3b3'} pr={5} color={'gray.400'}>{moment(createdAt).format('DD.MM.YYYY')}</Text>
          <Text display={'flex'} color={'gray.400'} alignItems={'center'} gap={2}><Eye size={16} color="#b3b3b3" /> {views}</Text>
          <Text textTransform={'capitalize'} color={'blue.500'}>{author?.username}</Text>
        </Box>
        <Text marginY={4} hyphens={'auto'} lineClamp={4} lineHeight={isProfile ? '18px' : '32px'} fontSize={isProfile ? '12px' : { base: '14px', md: '18px' }}>{description}</Text>
        <Box display={'flex'} gap={4} alignItems={'center'}>
          <Link to={`/blog/${slug}`}>
            <Button width={{ base: '100%', md: 'fit-content' }} colorPalette={'blue'}>
              Читать
            </Button>
          </Link>
          {isProfile && (
            <>
              <Button width={{ base: '100%', md: 'fit-content' }} colorPalette={'red'} onClick={() => setRemove(true)}>
                Удалить
              </Button>
              <UpdateBlog blog={blog} />
            </>
          )}
        </Box>
      </Box>
      <Dialog.Root open={remove} role="alertdialog">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Удаление статьи?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text as="p">
                  Вы уверены, что хотите удалить эту статью?
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={() => setRemove(false)}>Отмена</Button>
                </Dialog.ActionTrigger>
                <Button loading={isPending} colorPalette="red" onClick={() => mutate()}>Удалить</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  )
}

export default BlogCardHome
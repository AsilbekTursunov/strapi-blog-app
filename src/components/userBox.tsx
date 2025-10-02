import { Box, Button, Image, Menu, Portal, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useStoreSelector'
import { setLogout } from '../store/user.slice'

const UserBox = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild role='user_box'>
          <Box cursor={'pointer'} border={'1px solid rgb(132, 132, 132)'} width={10} height={10} borderRadius={"full"}>
            <Image src="/images/user.png" width={'full'} height={'full'} borderRadius={"full"} />
          </Box>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content padding={2} display={'flex'} flexDirection={'column'} gap={2}>
              <Link className="nav_link" to={`/profile`}>
                <Text>Профиль</Text>
              </Link>
              <Link className="nav_link" to="/">
                <Text>Написать публикацию</Text>
              </Link>
              <Link className="nav_link" to="/">
                <Text>Избранные</Text>
              </Link>
              <Button colorPalette={'red'} borderTop={'1px solid rgb(132, 132, 132)'} onClick={() => { navigate('/'); dispatch(setLogout()) }}>Выйти</Button>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  )
}

export default UserBox
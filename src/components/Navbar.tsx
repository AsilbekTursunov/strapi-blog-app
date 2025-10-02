import { Button, Text } from '@chakra-ui/react'
import { Bell } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CustomModal from '../components/Modal'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import { tabs } from '../constants'
import { useAppSelector } from '../hooks/useStoreSelector'
import CustomContainer from './CustomContainer'
import SideBar from './SideBar'
import UserBox from './userBox'
const Navbar = () => {
  const [openModal, setOpenModal] = useState(false)
  const [enterType, setEnterType] = useState('signin')
  const { user } = useAppSelector((state) => state.user)
  const pathname = useLocation().pathname
  return (
    <>
      <header className="head-block">
        <CustomContainer display={'flex'} padding={'20px 0px'} justifyContent={'space-between'} alignItems={'center'}>
          <Link to="/" className='main-logo'>
            <img className="cursor-pointer" src="/images/logo.png" alt="logo" /></Link>

          <Text as='nav' display={{ base: 'none', lg: 'inline-flex' }}>
            {tabs.map((tab) => (
              <Link to={`/${tab.id}`} key={tab.id}>
                <Text fontSize={{ base: '10px', lg: '12px', xl: '16px' }} _hover={{ color: 'blue.500' }} textDecoration={'none'} className={`filterbar-list-item`} color={pathname === `/${tab.id}` ? 'blue.500' : 'gray.500'}>{tab.title}</Text>
              </Link>
            ))}
          </Text>
          <div className="nav-container">
            <Button type="button" variant={'ghost'}>
              <Bell color="#345345" size={20} /></Button>
            {user ? <UserBox /> : <Button colorPalette={'blue'} border={'none'} onClick={() => setOpenModal(true)}>Войти</Button>}
            <SideBar />
          </div>
        </CustomContainer>
      </header>
      <CustomModal open={openModal} onClose={() => setOpenModal(false)}>
        {enterType === 'signin' ? <SignIn onSuccess={() => setOpenModal(false)} onChange={() => setEnterType('signup')} /> : <SignUp onSuccess={() => setOpenModal(false)} onChange={() => setEnterType('signin')} />}
      </CustomModal>

    </>
  )
}

export default Navbar
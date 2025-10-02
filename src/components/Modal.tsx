import { Button } from '@chakra-ui/react'
import { X } from 'lucide-react'
import React from 'react'
import { Box } from '@chakra-ui/react'

const CustomModal = ({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) => {
  return (
    <div role='modalbox' className={`modal-wrapper ${open ? 'block' : 'hidden'}`}>
      <Box width={{ base: '90%', md: '40%' }} position={'relative'} bg="#fff" p={7} borderRadius={10}>
        <Button role='modalbox_close' _hover={{ backgroundColor: 'transparent' }} padding={0} variant={'outline'} borderRadius={'full'} position={'absolute'} top={-10} right={-10} onClick={onClose}><X color="#fff" size={20} /></Button>
        {children}
      </Box>
    </div>
  )
}

export default CustomModal
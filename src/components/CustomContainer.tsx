import { Container, type ContainerProps } from '@chakra-ui/react'
import React from 'react'

const CustomContainer = ({ children, ...props }: ContainerProps & { children: React.ReactNode }) => {
  return (
    <Container
      maxW={{ base: '90%', md: '768px', lg: '992px', xl: '1200px', '2xl': '1400px' }}
      {...props}
    >
      {children}
    </Container>
  )
}

export default CustomContainer

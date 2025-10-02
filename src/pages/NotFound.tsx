import { Box, Text } from "@chakra-ui/react"
import CustomContainer from "../components/CustomContainer"

const NotFound = () => {
  return (
    <CustomContainer height={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Box width={'full'} height={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={24} fontWeight={'bold'}>404 Not Found</Text>
      </Box>
    </CustomContainer>
  )
}

export default NotFound